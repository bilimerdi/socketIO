const socket = require('socket.io-client')('http://192.168.2.194:101');
const fs = require('fs');
const sql = require('mssql');

const RECEIVED_FILE_PATH = 'create_table.sql';
const DB_CONFIG = {
    user: 'sa',
    password: 'Dahi.1234',
    server: '192.168.2.195\\SQLEXPRESS',
    database: 'kutuphaneyeni',
    options: {
        enableArithAbort: true ,
		encrypt: false
    }
};

socket.on('connect', () => {
    console.log('Sunucuya bağlanıldı.');
});

socket.on('script', async (scriptData) => {
    try {
		
		//Betikdosyasını diske kaydet
		await fs.writeFileSync(RECEIVED_FILE_PATH, scriptData);
		console.log('Script dosyası başarıyla alındı.');
		
        // Betik dosyasını diskten oku
        const sqlScript = fs.readFileSync(RECEIVED_FILE_PATH, 'utf-8');
        
        // SQL Server ile bağlantı kur
        await sql.connect(DB_CONFIG);

        // SQL sorgularını çalıştır
        await sql.query(sqlScript);

        console.log('SQL sorguları başarıyla çalıştırıldı.');
    } catch (err) {
        console.error('SQL sorguları çalıştırılırken bir hata oluştu:', err.message);
    } finally {
        // Bağlantıyı kapat
        sql.close();
        socket.disconnect();
    }
});

socket.on('disconnect', () => {
    console.log('Sunucu bağlantısı kesildi.');
});

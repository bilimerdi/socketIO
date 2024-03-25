const socket = require('socket.io-client')('http://192.168.2.194:101');
const fs = require('fs');

const RECEIVED_FILE_PATH = 'create_table.sql';

socket.on('connect', () => {
    console.log('Sunucuya bağlanıldı.');
});

socket.on('script', (scriptData) => {
    fs.writeFileSync(RECEIVED_FILE_PATH, scriptData);
    console.log('Script dosyası başarıyla alındı.');
    socket.disconnect();
});

socket.on('disconnect', () => {
    console.log('Sunucu bağlantısı kesildi.');
});

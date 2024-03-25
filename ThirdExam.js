const fs = require("fs");
const http = require("http");
const socketIo = require("socket.io");
const sql = require("mssql");

const PORT = 101;
const SCRIPT_FILE_PATH = "./scripts/create_table.sql";

const server = http.createServer();

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("İstemci bağlandı.");

  sendVersion(socket);
  sendDescriptions(socket);
  sendScript(socket);

  socket.on("disconnect", () => {
    console.log("İstemci bağlantısı kesildi.");
  });
});

function sendVersion(socket) {
  const latestVersion = "1.2.0";
  socket.emit("version", latestVersion);
}

async function sendDescriptions(socket) {
  try {
    const DB_CONFIG = {
      user: "sa",
      password: "Dahi.1234",
      server: "192.168.2.194\\SQLEXPRESS",
      database: "kutuphaneyeni",
      options: {
        encrypt: false,
      },
    };

    await sql.connect(DB_CONFIG);

    const result = await sql.query`SELECT * FROM version`;

    socket.emit("Description", result.recordset);

    await sql.close();

    console.log("Veritabanı bağlantısı başarıyla kapatıldı.");
  } catch (err) {
    console.error(
      "Veritabanından veri alınırken bir hata oluştu:",
      err.message
    );
  }
}

function sendScript(socket) {
  const scriptData = fs.readFileSync(SCRIPT_FILE_PATH);
  socket.emit("script", scriptData);
  console.log("Script dosyası başarıyla gönderildi.");
}

server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

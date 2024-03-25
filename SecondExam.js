const fs = require("fs");
const http = require("http");
const socketIo = require("socket.io");

const PORT = 101;
const SCRIPT_FILE_PATH = "./scripts/create_table.sql";

const server = http.createServer();

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("İstemci bağlandı.");

  sendScript(socket);
  sendVersion(socket);

  socket.on("disconnect", () => {
    console.log("İstemci bağlantısı kesildi.");
  });
});

function sendVersion(socket) {
  const latestVersion = "1.0.0";
  socket.emit("version", latestVersion);
}

function sendDescriptions(socket){
  
}

function sendScript(socket) {
  const scriptData = fs.readFileSync(SCRIPT_FILE_PATH);
  socket.emit("script", scriptData);
  console.log("Script dosyası başarıyla gönderildi.");
}

server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

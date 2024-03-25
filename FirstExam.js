const io = require("socket.io")(101);

io.on("connection", (socket) => {
  console.log("İstemci bağlantısı sağlandı:", socket.id);

  socket.on("message", (data) => {
    console.log("Alınan veri:", data);
  });
});

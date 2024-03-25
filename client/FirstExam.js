const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const io = require('socket.io-client');
const socket = io('http://192.168.2.178:101');

socket.on('connect', () => {
  console.log('Sunucuya bağlanıldı.');
  
  rl.question('Gönderilecek mesajı girin: ', (message) => {
    socket.emit('message', message);
    rl.close();
  });
});

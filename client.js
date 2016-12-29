const net = require('net');
const PORT = 8080;

const client = net.connect({port: PORT}, () => {

  process.stdin.on('data', (data) => {
    client.write(data.toString());
  })
    console.log('connected to the server!');
});


client.on('data', (data) => {
  process.stdout.write(data.toString());
});
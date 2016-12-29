const net = require('net');
const PORT = 8080;

const client = net.connect({port: PORT}, () => {

  process.stdin.on('data', (data) => {
    //do something
  })
    console.log('connected to the server!');
});


client.on('data', (data) => {
  // process.stdout.on
});
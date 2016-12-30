const net = require('net');

const PORT = 8080;
const EVENT_DATA = 'data';



const client = net.connect({port: PORT}, () => {


  process.stdin.on( EVENT_DATA, () => {
    client.write(`GET /index.html HTTP/1.1
      Date: ${new Date}
      User-Agent: jay/\n\n`);

  })
    console.log('connected to the server!');
});


client.on( EVENT_DATA, (data) => {
  process.stdout.write(data.toString());
});
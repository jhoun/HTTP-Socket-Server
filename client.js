const net = require('net');

const EVENT_DATA = 'data';
const HOST = process.argv[2].split('/')[0];
const HOST_PATH = process.argv[2].split('/')[1];

let port;

// console.log(hostPath);
if (HOST === 'localhost'){
  port = 8080;
} else {
  port = 80;
}

const client = net.connect(port, HOST, () => {

  //creates header to send to server
  process.stdin.on( EVENT_DATA, () => {
  client.write(`GET /${HOST_PATH} HTTP/1.1
Date: ${new Date}
Host: ${HOST}
User-Agent: jay\r\n\r\n`);
  })

  console.log('connected to the server');
});

//returned header and body from server
client.on( EVENT_DATA, (returnedServerData) => {
  process.stdout.write(returnedServerData.toString());
});
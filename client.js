const net = require('net');

const EVENT_DATA = 'data';
const host = process.argv[2].split('/')[0];
const hostPath = process.argv[2].split('/')[1];
let port;

// console.log(hostPath);
if (host === 'localhost'){
  port = 8080;
} else {
  port = 80;
}

const client = net.connect(port, host, () => {
  console.log(hostPath);

  process.stdin.on( EVENT_DATA, () => {
    client.write(`GET /${hostPath} HTTP/1.1
Date: ${new Date}
Host: localhost
User-Agent: jay\r\n\r\n`);

  })
    console.log('connected to the server!');
});


client.on( EVENT_DATA, (data) => {
  process.stdout.write(data.toString());
});
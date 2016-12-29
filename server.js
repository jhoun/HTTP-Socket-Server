const net = require('net');
const index = require('./HTML-files/index');

console.log(index);
let server = net.createServer((client) => {
  //recieves client from data
  client.on('data', (data) =>{
    var wordArr = data.toString().split(' ');
    for (var i = 0; i < wordArr.length; i++){
      if (wordArr[i] === "GET" && wordArr[i + 1] === '/' || wordArr[i + 1] === "/index.html"){
        // process.stdout.write(data);
        client.write(`HTTP/1.1 200 OK
          Date: ${new Date()};
          Content-Type: text/html; charset=utf-8
          Content-Length: ${index.length}
          Connection: keep-alive\n\n`);
        client.write(index);
        client.end();
      }
    }
  });

  client.on('end', () => {
    console.log('client has been disconnected');
  });


  client.on('error', (err) => {
    // handle errors here
    throw err;
  });
})

server.on('error', (err) => {
  throw err;
})


// grab a random port.
server.listen(8080,() => {
  console.log('opened server on', server.address());
});
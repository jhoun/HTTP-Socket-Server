const net = require('net');
const fs = require('fs');

var server = net.createServer((client) => {
  //recieves client from data
  client.on('data', (data) =>{
    fs.readFile('./index.html', (err, data) => {
      if (err) throw err;
    console.log(data.toString());
    });
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
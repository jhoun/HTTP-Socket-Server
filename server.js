const net = require('net');

var server = net.createServer((client) => {
  //recieves client from data
  client.on('data', (data) =>{

  });

  client.on('end', () => {
    console.log('client has been connected');
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
const net = require('net');
const index = require('./HTML-files/index');
const hydrogen = require('./HTML-files/hydrogen');
const helium = require('./HTML-files/helium');
const error404 = require('./HTML-files/404');


let server = net.createServer((client) => {
  //recieves client from data
  client.on('data', (data) =>{
    var wordArr = data.toString().split(' ');
    console.log(wordArr);

    //finds '/' and 'index.html'
    for (var i = 0; i < wordArr.length; i++){
      if (wordArr[i] === "GET" && wordArr[i + 1] === '/' || wordArr[i + 1] === "/index.html"){
        // process.stdout.write(data);
        client.write(`HTTP/1.1 200 OK
          Date: ${new Date()};
          Content-Type: text/html; charset=utf-8
          Content-Length: ${index.length}
          Connection: keep-alive\n\n`);
        client.write(index);

      }
    }

    //finds 'hydrogen'
    for (var i = 0; i < wordArr.length; i++){
      if (wordArr[i] === "GET" && wordArr[i + 1] === "/index/hydrogen.html"){
        // process.stdout.write(data);
        client.write(`HTTP/1.1 200 OK
          Date: ${new Date()};
          Content-Type: text/html; charset=utf-8
          Content-Length: ${hydrogen.length}
          Connection: keep-alive\n\n`);
        client.write(hydrogen);
      }
    }

    //finds 'helium'
    for (var i = 0; i < wordArr.length; i++){
      if (wordArr[i] === "GET" && wordArr[i + 1] === "/index/helium.html"){
        // process.stdout.write(data);
        client.write(`HTTP/1.1 200 OK
          Date: ${new Date()};
          Content-Type: text/html; charset=utf-8
          Content-Length: ${helium.length}
          Connection: keep-alive\n\n`);
        client.write(helium);
      }
    }

    //'error 404' if nothing is found
    for (var i = 0; i < wordArr.length; i++){
      if (wordArr[i] === "GET" && wordArr[i + 1] === undefined){
        // process.stdout.write(data);
        client.write(`HTTP/1.1 200 OK
          Date: ${new Date()};
          Content-Type: text/html; charset=utf-8
          Content-Length: ${error404.length}
          Connection: keep-alive\n\n`);
        client.write(error404);
      }
    }

    //ends the request
    client.end();
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
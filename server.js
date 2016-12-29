const net = require('net');
const index = require('./HTML-files/index');
const hydrogen = require('./HTML-files/hydrogen');
const helium = require('./HTML-files/helium');
const error404 = require('./HTML-files/404');


let server = net.createServer((client) => {
  //recieves client from data
  client.on('data', (data) =>{
    var wordArr = data.toString().split(' ');


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
        client.end();
        return client.end();

      //finds 'hydrogen'
      } else if(wordArr[i] === "GET" && wordArr[i + 1] === "/index/hydrogen.html"){
        client.write(`HTTP/1.1 200 OK
          Date: ${new Date()};
          Content-Type: text/html; charset=utf-8
          Content-Length: ${hydrogen.length}
          Connection: keep-alive\n\n`);
        client.write(hydrogen);
        return client.end();

        //finds 'helium'
      } else if(wordArr[i] === "GET" && wordArr[i + 1] === "/index/helium.html") {
        client.write(`HTTP/1.1 200 OK
          Date: ${new Date()};
          Content-Type: text/html; charset=utf-8
          Content-Length: ${helium.length}
          Connection: keep-alive\n\n`);
        client.write(helium);
        return client.end();
      } else {
        //returns
        client.write(`HTTP/1.1 200 OK
          Date: ${new Date()};
          Content-Type: text/html; charset=utf-8
          Content-Length: ${error404.length}
          Connection: keep-alive\n\n`);
        client.write(error404);
        return client.end();
      }
    }

  });

  client.on('end', () => {
    console.log('client has been disconnected');
  });

  //client error
  client.on('error', (err) => {
    throw err;
  });
})


//server error
server.on('error', (err) => {
  throw err;
})


// grab a random port.
server.listen(8080,() => {
  console.log('opened server on', server.address());
});
const net = require('net');
const index = require('./HTML-files/index');
const hydrogen = require('./HTML-files/hydrogen');
const helium = require('./HTML-files/helium');
const error404 = require('./HTML-files/404');
const css = require('./HTML-files/css/style')

const PORT = 8080;
const EVENT_DATA = 'data';
const EVENT_ERROR = 'error';

let date = new Date();

let server = net.createServer((client) => {
  //recieves client from data
  client.on( EVENT_DATA, (clientRequestData) =>{
    let wordArr = clientRequestData.toString().split(' ');
    console.log(wordArr);


    //finds '/' and 'index.html'
    if (wordArr[0] === "GET" && wordArr[1] === '/' || wordArr[1] === "/index.html"){
      client.write(`HTTP/1.1 200 OK
        Date: ${date};
        Content-Type: text/html; charset=utf-8
        Content-Length: ${index.length}
        Connection: keep-alive\n\n`);
      client.write(index);


    //finds 'hydrogen'
    } else if(wordArr[0] === "GET" && wordArr[1] === "/hydrogen.html"){
      client.write(`HTTP/1.1 200 OK
        Date: ${date};
        Content-Type: text/html; charset=utf-8
        Content-Length: ${hydrogen.length}
        Connection: keep-alive\n\n`);
      client.write(hydrogen);


      //finds 'helium'
    } else if(wordArr[0] === "GET" && wordArr[1] === "/helium.html") {
      client.write(`HTTP/1.1 200 OK
        Date: ${date};
        Content-Type: text/html; charset=utf-8
        Content-Length: ${helium.length}
        Connection: keep-alive\n\n`);
      client.write(helium);

      //finds 'css'
    } else if(wordArr[0] === "GET" && wordArr[1] === "/css/styles.css"){
      client.write(`HTTP/1.1 200 OK
        Date: ${date};
        Content-Type: text/css; charset=utf-8
        Content-Length: ${css.length}
        Connection: keep-alive\n\n`);
      client.write(css);

      //throws 404 if path not found
    } else {
      console.log(wordArr[0], wordArr[1]);
      //returns error
      client.write(`HTTP/1.1 301
        Date: ${date};
        Content-Type: text/html; charset=utf-8
        Content-Length: ${error404.length}
        Connection: keep-alive\n\n`);
      client.write(error404);

    }

    client.end();
  });

  //client error
  client.on( EVENT_ERROR, (err) => {
    throw err;
  });
})


//server error
server.on( EVENT_ERROR, (err) => {
  throw err;
})


// grab a random port.
server.listen(PORT,() => {
  console.log('opened server on', server.address());
});
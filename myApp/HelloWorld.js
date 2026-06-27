// App simples em http 

// const http = require('http');

// const server = http.createServer(function (request, response) {
//     response.writeHead(200, {'Content-Type': 'html/text'});
//     response.write('<html><body><h1>Olá Mundo!</h1></body></html>');
//     response.end();
// });

// server.listen(3000);

// console.log("Olá Mundo")

// App em Express JS

const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/help', function(req, res) {
    res.send('Aqui não há nada para ver');
})

app.get('/user/:id', (req, res, next) => {
  if (req.params.id !== '0') {
    return next('route');
  }
  res.send(`User ${req.params.id}`);
});

app.get('/user/:id', (req, res) => {
  res.send('Special handler for user ID 0');
});


app.listen(port)
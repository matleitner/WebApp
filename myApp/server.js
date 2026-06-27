const express = require('express');
const path = require('path');
const livro = require('./routes/livro');
const regexp = require('./routes/regexp');
const validation = require('./routes/validation');

// Server creation
const app = express();
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server Started! http://localhost:'+ port);


// Mustache template
const mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());
app.set('view engine', 'html');


// Root 
app.get('/', function (req, res) {
    app.set('views', __dirname + "/views");
    res.render('home.html', {
        name: 'João',
        surname: 'Sinaré'
    });
})

// External Route
app.use('/livro', livro);
app.use('/regexp', regexp)
app.use('/validation', validation)
// Test with json 
app.get('/participants', (req, res) => {
    res.send([{nomePoprio: "Martim", age: 13}, {nomePoprio: "Leitner", age: 10}])
})

app.get('/help', function(req, res) {
    res.send('Aqui não há nada para ver');
})

// example from express documentation
app.get('/user/:id', (req, res, next) => {
  if (req.params.id === '0') {
    return next('route');
  }
  res.send(`User ${req.params.id}`);
});

app.get('/user/:id', (req, res) => {
  res.send('Special handler for user ID 0');
});

app.get('/joaquim', (req, res) => {    
    res.send(`
        <h1>All Done!</h1>
        <p>Your download will begin in a moment...</p>
        <script>
            // Automatically triggers the download route in the background
            window.location.href = '/joaquim/success';
        </script>
    `);
});

app.get('/joaquim/success', function(req, res) {
    const filePath = __dirname + '/files_to_download/joaquimpinheiro.jpg';
    res.download(filePath, 'joaquimpinheiro.jpg'); 
})

// Ficheiros estáticos

app.use('/public', express.static(path.join(__dirname,'..', 'user')))

app.get('/public/index', function (req, res) {
    res.sendFile(path.join(__dirname,'..', 'user/index.html'), { dotfiles: 'allow' })
})






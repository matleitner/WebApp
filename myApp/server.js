const express = require('express');
const path = require('path');
const livro = require('./routes/livro');
const regexp = require('./routes/regexp');
const validation = require('./routes/validation');
const email = require('./routes/email')
// Server creation
const app = express();
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server Started! http://localhost:'+ port);
app.use(express.urlencoded({ extended: true }));

// Login (Passport) 
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// passport.use(new LocalStrategy(
//     function ( username, password, done) {
//         User.findOne({username: username }, function (err, user) {
//             if(err) {
//                 return done(err);
//             } if (!user) {    
//                 return done(null, false, {message : 'Username Incorrecto.'});
//             } if( !user.validPassword(password)){
//                 return done(null, false, {message: 'Password errada.'});
//             }
//                 return done(null, false);    
//             }
//         )}
//     ));


// app.use(passport.initialize());
// app.use(passport.session());

// app.post('/login', passport.authenticate('local', { 
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))



// Erros
app.use(function (err, req, res, next){
    console.log(err.stack);
    res.status(500).send("Ocorreu um erro no servidor!");
})

// Exceções 
app.get('/search', function ( req, res) {
    setImmediate(function () {
        //http://localhost:8080/search?params={"nome":"joao"}
        const jsonStr = req.query.params; 
        try {
            const jsonOnj = JSON.parse(jsonStr);
            res.send('Success');
        } catch (e) {
            res.status(400).send('JSON inválido')
        }
    });
});

// Sessions

const session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true} descomentado funciona com https 
}));

app.get('/session', function (req, res, next) {
    const sessData = req.session;
    sessData.someAttribute = "FCA";
    console.log(req.session.someAttribute)
    res.send(`Hey There! Session is set! Now Go to 
        <a href="/outra/session">click me</a> to retrieve the session.`)
});

app.get('/outra/session', function( req, res, next) {
    const someAttribute = req.session.someAttribute;
    console.log(req.session.someAttribute)
    res.send(`A variável de sessão anteriormente criada foi : ${someAttribute}`);
})

// Cookie
require('dotenv').config({quiet: true});  // .ENV file
const cookieParser = require('cookie-parser')
const cookieSecret = process.env.COOKIE_SECRET;
// check if it worked console.log(cookieSecret)
app.use(cookieParser(cookieSecret));
// app.use(function (req, res, next){
    //     const cookie = req.cookies.cookieName;
//     if(cookie === undefined){
//         let randomNumber = Math.random().toString();
//         randomNumber = randomNumber.substring(2, randomNumber.length);
//         res.cookie('cookieName', randomNumber, {
    //             maxAge: 36000000,
    //             httpOnly: true,
    //         });
    //         console.log("Cookie Created!");
    //     } else {
        //         console.log("Cookie Already Exists...");
        //     }
        //     next()
        // })

app.get('/cookie', (req, res) => {
    console.log('Cookies: ', req.cookies)
    let options = {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,
        signed: true,
    };
    res.cookie('username', 'leitnerzinPVP', options);
    res.clearCookie('cookieName');
    const username = req.signedCookies.username
    console.log(req.signedCookies);
    res.json({user: username, message: 'Cookie created!'});
});

app.get('/get-user-cookie', (req, res) => {
    const username = req.signedCookies.username

    if(!username) {
        return res.json({error: 'Not Authenticated'})
    }

    res.json({user: username, message: "Welcome back!"})
})

app.get('/logout-cookie', (req, res) => {
    res.clearCookie('username', { signed: true, httpOnly: true})
    res.json({message: 'Logout'});
});

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
app.use('/regexp', regexp);
app.use('/validation', validation);
app.use('/', email);
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






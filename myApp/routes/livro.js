const express = require('express');
const router = express.Router();
router.use (function timeLog (req,res,next) {
    console.log('Time : ', Date.now());
    next();

})
router.get('/', function(req, res) {
    res.send('Página do Livro');
});

router.get('/about', function (req, res) {
    res.send('Sobre o Livro');
});

module.exports = router


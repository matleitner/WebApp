const express = require('express');
const router = express.Router();

// now the new Sintax of ab?cd is a{b}cd as b being optional
router.get('/a{b}cd', function(req, res) {
    res.send("ab?cd")
})

// the path was ab+cd but now to /abbbbb...cd to work is like this: 
router.get(/^\/ab+cd$/, function (req,res) {
    res.send("ab+cd")
})
// all that is like /ab(CanBeAnything)cd will work
router.get('/ab*cd', function (req, res) {
    res.send("ab*cd")
})

module.exports = router
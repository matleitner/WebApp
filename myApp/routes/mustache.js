const express = require('express');
const router = express.Router();
const mustacheExpress = require('mustache-express');
router.engine('html', mustacheExpress());
router.set('view engine', 'html');






module.exports = router
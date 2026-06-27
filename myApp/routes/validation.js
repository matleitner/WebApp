const express = require('express')
const router = express.Router()

router.get('/api/users', function (req, res) {
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;
    if(user_id == undefined && token == undefined && geo == undefined){
        res.send("No one here")
    }else {
        res.send(user_id + ' ' + token + ' ' + geo);
    }
})

// Validação
const bodyParser =  require('body-parser');
const validator  = require('express-validator')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:false
}));
router.use(validator())

router.post('/api/users', function (req, res) {
    req.checkBody("leader-email", "Insira um email válido.").isEmail();
    req.checkBody("leader_mobile", "Insira um nº telemóvel válido").isMobilePhone("pt-PT")
    req.checkBody("page_color", "Cor  no formato Hex").isHexColor()
    req.checkBody("team_twitter", "Insira uma conta de Twitter válida").optional().matches("https://twitter.com/*")
    req.checkBody("rand_number", "O número tem que ser par.").isNumeric().isDivisibleBy(2)

    req.sanitizeBody('name', 'Nome Inválidio.').escape()
    const errors = req.validationErrors();
    if(errors){
        res.send(errors);
        return;
    } else {

    }
    
    const user_id = req.body.id;
    const token = req.body.token;
    const geo = req.body.geo;

    res.send('Hi there ' + user_id + ' ' + token + ' ' + geo + ' ' + req.body.name);
})

module.exports = router
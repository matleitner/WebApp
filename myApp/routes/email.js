const express = require('express');
const path = require('path');
const router = express.Router();
// Email
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');


router.get('/email', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../', 'user', 'form.html'));
} )

router.post('/email', function (req, res) {
    sendEmail(req, res)
})

function sendEmail(req, res) {
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDEREMAIL,
            pass: process.env.EMAILPASSWORD,
        }
    }));
    transporter.verify(function (error, success) {
        if(error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our message');
        }
    let text = `Olá, o meu nome é <br><br> <strong>${req.body.name}</strong>`;
    const mailOptions = {
        from: process.env.SENDEREMAIL,
        to: req.body.emailDest,
        subject: req.body.subject,
        html : text,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if(error) {
            console.log(error);
            res.json({'msg': 'error'});
        }else {
            console.log('Message sent: ' + info.response);
            res.json({'msg': info.response})
        }
    });

    }) 
}

module.exports = router;


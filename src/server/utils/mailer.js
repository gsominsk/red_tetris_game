let nodemailer = require('nodemailer');

module.exports.send = function (email, mailOptions) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secureConnection: false,
        auth: {
            user: 'matcha.unitschool@gmail.com',
            pass: '19983562ujif'
        }
    });

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
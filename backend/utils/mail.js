// Importations
const nodeMailer = require('nodemailer');

// Exported functions
module.exports = {
    sendMail: function(recipient, mSubject, mailContent) {
        let transporter = nodeMailer.createTransport({
            host: "smtp-mail.outlook.com",
            service: "hotmail",
            secureConnection: false,
            port: 587,
            tls: {
                ciphers:'SSLv3'
            },
            auth: {
                user: "visuumfr@hotmail.com",
                pass: "@2CntMsgs"
            }
        });
    
        let mailOptions = {
            from: '"Visuum" <visuumfr@hotmail.com>', 
            to: recipient,
            subject: mSubject,
            text: "Hello!",
            html: mailContent
        };
            
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
            console.log("Message sent", info.response);
        })
    }
}
const http = require('http');
const nodemailer = require('nodemailer');
const port = 8080;
const fs = require('fs');

let getParam = function(paramName) {
    let param = process.argv.filter(function(param){
        return param.split("=")[0] == paramName;
    })[0];

    if (param)
        return param.split('=')[1];
    else
        return null;
}

const PRIVATE_KEY = getParam("PRIVATE_KEY");

let privateKey, transporter;
let dkim =  null;

if (PRIVATE_KEY) {
    fs.readFile(PRIVATE_KEY, 'utf8', function(err, data) {
        privateKey = data;
        if (err) {
            privateKey = null;
        }
        if (privateKey) {
            dkim = {
                domainName: "BritonWesterhaus.com",
                keySelector: "dkim",
                privateKey: privateKey
            };         
        }
        
        transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail',
            dkim: dkim
        });

        transporter.sendMail({
            from: 'contact-form@britonwesterhaus.com',
            to: 'Briton.Westerhaus@gmail.com',
            subject: "Spam Testing",
            text: "I am trying to test if this is sent to spam",
            headers: {
                "Reply-To": '"Briton Westerhaus"<studmuffino@gmail.com>'
            }
        }, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
        });
    });
}
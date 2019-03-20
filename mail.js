const http = require('http');
const nodemailer = require('nodemailer');
const port = 8080;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});
transporter.sendMail({
    from: 'me@BritonWesterhaus.com',
    to: 'Briton.Westerhaus@gmail.com',
    subject: 'Message',
    text: 'I hope this message gets delivered!'
}, (err, info) => {
    console.log(info.envelope);
    console.log(info.messageId);
});

http.createServer((req, res) => {
    console.log("Request received!");
	if (req.method === 'POST') {
        let message = '';
        let subject = '';
        req.on('data', chunk => {
            chunk = chunk.toString().split('=');
            if (chunk[0] == "name")
                subject = "Message from " + chunk[1];
            if (chunk[0] == "message")
                message = chunk[1]; 
		});
		req.on('end', () => {
            transporter.sendMail({
                from: 'me@BritonWesterhaus.com',
                to: 'Briton.Westerhaus@gmail.com',
                subject: subject,
                text: message
            }, (err, info) => {
                console.log(info.envelope);
                console.log(info.messageId);
            });
		});
	}
}).listen(port, () => {
	console.log('listening on: http://localhost:%s', port);
});
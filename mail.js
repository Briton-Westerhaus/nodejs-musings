const http = require('http');
const nodemailer = require('nodemailer');
const port = 8080;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});

http.createServer((req, res) => {
    console.log("Request received!");
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
        console.log("Options received!");
		res.writeHead(200);
		res.end();
    } else if (req.method === 'POST') {
        console.log("Post received!");
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
	} else{
        console.log(req.method + " received")
    }
}).listen(port, () => {
	console.log('listening on: http://localhost:%s', port);
});
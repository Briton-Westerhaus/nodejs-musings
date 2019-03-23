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

	if (req.method === 'OPTIONS') {
        console.log("Options received!");
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		res.writeHead(200);
		res.end();
    } else if (req.method === 'POST') {
        console.log("Post received!");
        let postData;
        req.on('data', chunk => {
            postData = JSON.parse(chunk.toString());
		});
		req.on('end', () => {
            transporter.sendMail({
                from: 'me@BritonWesterhaus.com',
                to: 'Briton.Westerhaus@gmail.com',
                subject: postData.subject,
                text: postData.message
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
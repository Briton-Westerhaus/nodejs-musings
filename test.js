const http = require('http');
const net = require('net');
const mysql = require('mysql');
const events = require('events');
const port = 8080;
const emitter = new events.EventEmitter();
let name = "";

let con = mysql.createConnection({
	host: "britonwesterhaus.com",
	user: "root",
	password: "***********", //This isn't a valid pasword!
	database: "britonwesterhaus"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	con.query("INSERT INTO contact(name, email_address, phone_number, message, captcha, ip_address) VALUES('Briton Westerhaus', 'Briton.Westerhaus@gmail.com', '814-777-1736', 'test', true, '192.168.1.1')", function (err, result) {
		if (err) throw err;
		console.log("Result: " + result);
	});
}); 

//emitter.on('enter', function(name, socket) {
//	console.log("Hello, " + name + "!");
//	socket.write("Hello, " + name + "!");
//});

//net.createServer(socket => {
//	if (name == "")
//		socket.write("What is your name?")
//	socket.on('data', data => {
//		dataStr = data.toString();
//		if (dataStr == "\r" || dataStr == "\n" || dataStr == "\r\n") {
//			emitter.emit('enter', name, socket);
//			socket.destroy();
//		} else
//			name += dataStr;
//	})
//}).listen(port);


/*
http.createServer((req, res) => {
	if (req.method === 'POST') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString(); // convert Buffer to string
		});
		req.on('end', () => {
			console.log(body);
			res.end('ok');
		});
	}
}).listen(port, () => {
	console.log('listening on: http://localhost:%s', port);
});*/
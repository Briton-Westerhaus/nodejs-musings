const http = require('http');
const net = require('net');
const port = 8080;
let name = "";

net.createServer(socket => {
	if (name == "")
		socket.write("What is your name?")
	socket.on('data', data => {
		dataStr = data.toString();
		if (dataStr == "\r" || dataStr == "\n" || dataStr == "\r\n") {
			socket.write("Hello, " + name + "!");
			socket.destroy();
		} else
			name += dataStr;
	})
}).listen(port);

// http.createServer((req, res) => {
// 	res.end('Testing chained callbacks - editing through scp.');
// }).listen(port, () => {
// 	console.log('listening on: http://localhost:%s', port);
// });
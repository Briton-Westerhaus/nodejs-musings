const http = require('http');
const net = require('net');
const events = require('events');
const port = 8080;
const emitter = new events.EventEmitter();
let name = "";

emitter.on('enter', function(name, socket) {
	console.log("Hello, " + name + "!");
	socket.write("Hello, " + name + "!");
});

net.createServer(socket => {
	if (name == "")
		socket.write("What is your name?")
	socket.on('data', data => {
		dataStr = data.toString();
		if (dataStr == "\r" || dataStr == "\n" || dataStr == "\r\n") {
			emitter.emit('enter', name, socket);
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
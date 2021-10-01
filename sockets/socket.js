const { io } = require('../index');


//Mensajes de Sockets
io.on('connection', client => {//client==dispositivo que se connecta al server
	console.log('Cliente connectado');

	client.on('disconnect', () => {
		console.log('Cliente desconectado');
	});

	//comunicacion del socket
	/*client.on('mensaje', (payload) => {
		console.log('Mensaje', payload);
		//io es el servidor, por lo que esto lo envio a todo los clientes connectados
		io.emit('mensaje', { admin: "Nuevo mensaje" });
	});*/
});
const { comprobarJWT } = require('../helpers/jws');
const { io } = require('../index');
const {usuarioConectado,usuarioDesconectado, grabarMensaje}=require('../controllers/socket');


//Mensajes de Sockets
io.on('connection', client => {//client==dispositivo que se connecta al server
	console.log('Cliente connectado');

	const [valido,uid]=comprobarJWT(client.handshake.headers['x-token']);

	//vericamos la autentificacion
	if(!valido) {return client.disconnect();}

	//cliente autenticado
	usuarioConectado(uid);

	//ingresar al usuario e una sala
	//sala global (donde estan todos los clientes) por defecto
	//usar client.id para enviar un mensaje privado y unirlo a una sala privada para cada chat
	client.join(uid);

	//escuchar el mensaje personal (mensaje-personal)
	client.on('mensaje-personal',async(payload)=>{
		//Grabar mensaje
		await grabarMensaje(payload);

		io.to(payload.para).emit('mensaje-personal',payload);
	});

	client.on('disconnect', () => {
		console.log('Cliente desconectado');
		usuarioDesconectado(uid);
	});

});
const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config
const {dbConnection}=require('./database/config');
dbConnection();

//App de Express
const app = express();

//Lectura y parse del body
app.use(express.json());

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


//Mis Rutas
app.use('/api/login',require('./routes/auth'));
app.use('/api/usuarios',require('./routes/usuario'));
app.use('/api/mensajes',require('./routes/mensajes'));



server.listen(process.env.PORT, (err) => {

	if (err) throw new Error(err);

	console.log('Servidor corriendo en el puerto', process.env.PORT);

});
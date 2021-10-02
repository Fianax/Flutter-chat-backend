/**
 * path: /api/mensajes
 */

 const {Router}=require('express');
const { obtenerChat } = require('../controllers/mensajes');
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router=Router();
 
 //:de ==> los mensajes del usuario, es decir, cargar los mensaje del usuario con ese id==:de
 router.get('/:de',validarJWT,obtenerChat);
 
 
 
 
 module.exports=router;
const { response } = require("express");
const bcrypt=require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jws");


const crearUsuario = async(req,res=response)=>{

    const {email,password}=req.body;

    try {

        const existeEmail=await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            });
        }

        const usuario=new Usuario(req.body);

        //encriptar contraseña
        const salt=bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);


        await usuario.save();

        //generar mi jwt(json web tokens)
        const token=await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

//para el login
const login=async(req,res=response)=>{

    const{email,password}=req.body;

    try {

        const usuarioDB=await Usuario.findOne({email});
        if(usuarioDB){
            const validPassword=bcrypt.compareSync(password,usuarioDB.password);
            if(!validPassword){
                return res.status(400).json({
                    ok:false,
                    msg:'La contraseña no es valida'
                });
            }

            //generar el jwt porque todo has salido bien
            const token=await generarJWT(usuarioDB.id);
            
            res.json({
                ok:true,
                usuarioDB,
                token
            });

        }else{
            return res.status(404).json({
                ok:false,
                msg:'El correo no existe'
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}


const renewToken=async(req,res=response)=>{

    const uid=req.uid;

    const token=await generarJWT(uid);

    const usuario=await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario,
        token
    });
}



module.exports={
    crearUsuario,
    login,
    renewToken
}
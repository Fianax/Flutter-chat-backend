const jwt=require('jsonwebtoken');

const validarJWT=async(req,res,next)=>{

    //leer token
    const token=req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }

    try {
        
        const {uid}=jwt.verify(token,process.env.JWT_KEY);

        req.uid=uid;//para poder tener el uid del usuraio si la validacion fue correcta


        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }
    
}



module.exports={
    validarJWT
}
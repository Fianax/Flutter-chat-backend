const {Schema,model}=require('mongoose');


const MensajeSchema=Schema({

    de:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    },
    para:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true,
    },
    mensaje:{
        type:String,
        require:true
    }
    
},{
    timestamps:true
});
//con esto sacamos los datos del usuario de mongoose y lo renombramos para que visualmente queden mejor (tapar password, quitar datos que no queremos que vean)
MensajeSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    return object;
});


module.exports=model('Mensaje',MensajeSchema);
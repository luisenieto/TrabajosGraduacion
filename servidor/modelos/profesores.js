const mongoose = require('mongoose');

const esquemaProfesor = mongoose.Schema({
    nombres:{
        type:String,
        required:true,
        trim:true
    },
    apellidos:{
        type:String,
        required:true,
        trim:true
    },
    dni:{
        type:Number,
        required:true,
        unique:'Ya existe un profesor con ese DNI'
    },
    idCargo:{
        type:Number,
        required:true,
        enum: {
            values:[1, 2, 3, 4, 5, 6],
            mensaje: 'Cargo incorrecto'
        }
    }
});

const Profesor = mongoose.model('Profesore', esquemaProfesor);
//El primer parámetro del método model es el nombre de la colección
//Cualquiera sea el nombre que se especifique, mongoose lo pasa a minúsculas y lo pone en plural
//(le agrega una "s" solamente). Si se especificaba "Profesor" como nombre de la colección
//la misma iba a quedar como "profesors"

module.exports = Profesor;
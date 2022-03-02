const mongoose = require('mongoose');

const esquenaAlumno = mongoose.Schema({
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
        unique:'Ya existe un alumno con ese DNI'
    },
    cx:{
        type:String
    }
});

const Alumno = mongoose.model('Alumno', esquenaAlumno);

module.exports = Alumno;
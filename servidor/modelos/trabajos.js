const mongoose = require('mongoose');
const Profesor = require('./profesores');

const esquemaTrabajo = mongoose.Schema({
    titulo : {
        type : String,
        trim : true,
        required : 'Se debe proporcionar un título al trabajo',
        unique : 'Ya existe un trabajo con ese título',
    },
    duracion : {
        type : Number,
        required : 'Se debe proporcionar una duración al trabajo'
    },
    areas : {
        type : String,
        required : 'Se debe proporcionar un área al trabajo'
    },
    fechaPresentacion : {
        type : Date,
        required : 'Se debe proporcionar una fecha de presentación del trabajo',
        default : Date.now
    },
    fechaAprobacion : {
        type : Date,
        required : 'Se debe proporcionar una fecha de aprobación del trabajo'
    },
    fechaFinalizacion : {
        type : Date,
        default : null
    },
    tutores : [
        {
            dni : {
                type : Number,
                required : 'Se debe proporcionar el DNI del tutor'
            },
            apellidos : {
                type : String,
                required : 'Se debe proporcionar el apellido del tutor'
            },
            nombres : {
                type : String,
                required : 'Se debe proporcionar el nombre del tutor'
            },
            desde : {
                type : Date,
                required : 'Se debe proporcionar desde cuando es tutor del trabajo'
            },
            hasta : {
                type : Date
            },
            razon : {
                type : String
            }
        }
    ],
    cotutores : [
        {
            dni : {
                type : Number,
                required : 'Se debe proporcionar el DNI del cotutor'
            },
            apellidos : {
                type : String,
                required : 'Se debe proporcionar el apellido del cotutor'
            },
            nombres : {
                type : String,
                required : 'Se debe proporcionar el nombre del cotutor'
            },            
            desde : {
                type : Date,
                required : 'Se debe proporcionar desde cuando es cotutor del trabajo'
            },
            hasta : {
                type : Date
            },
            razon : {
                type : String
            }
        }
    ],
    jurado : [
        {
            dni : {
                type : Number,
                required : 'Se debe proporcionar el DNI del jurado'
            },
            apellidos : {
                type : String,
                required : 'Se debe proporcionar el apellido del jurado'
            },
            nombres : {
                type : String,
                required : 'Se debe proporcionar el nombre del jurado'
            },            
            desde : {
                type : Date,
                required : 'Se debe proporcionar desde cuando es jurado del trabajo'
            },
            hasta : {
                type : Date
            },
            razon : {
                type : String
            }            
        }
    ],
    alumnos : [
        {
            dni : {
                type : Number,
                required : 'Se debe proporcionar el DNI del alumno'
            },
            apellidos : {
                type : String,
                required : 'Se debe proporcionar el apellido del alumno'
            },
            nombres : {
                type : String,
                required : 'Se debe proporcionar el nombre del alumno'
            }, 
            cx : {
                type : String
            },           
            desde : {
                type : Date,
                required : 'Se debe proporcionar desde cuando es alumno del trabajo'
            },
            hasta : {
                type : Date
            },
            razon : {
                type : String
            }            
        }
    ]
});

const Trabajo = mongoose.model('Trabajo', esquemaTrabajo);

module.exports = Trabajo;
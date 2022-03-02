const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const configuracion = require('../config/configuracion').get(process.env.NODE_ENV);
const SALT = 10;

const esquemaUsuario = mongoose.Schema({
    nombre : {
        type : String,
        trim : true,
        required : 'Se debe proporcionar un nombre de usuario'
    },
    correo : {
        type : String,
        trim : true,
        unique : 'Ya existe un usuario con ese correo',
        match : [/.+\@.+\..+/, 'Ingrese una cuenta de correo válida'],
        required : 'Se debe proporcionar un correo'
    },
    creado : {
        type : Date,
        default : Date.now
    },
    modificado : Date,
    clave_encriptada : {
        type : String,
        required : 'Se debe proporcionar una clave'
    },
    salt : String,
    token : String
});

//la clave que proporciona el usuario, por cuestiones de seguridad, no se guarda 
//en el documento, sino que se trata como un campo virtual

esquemaUsuario.virtual('clave')
    .set(function(clave) {
        this._clave = clave;
        this.salt = this.crearSalt();
        this.clave_encriptada = this.encriptarClave(clave);
    })
    .get(function() {
        return this._clave;
    });
//Para afuera, la clave oculta se llama "clave". Internamente se guarda en .clave (no aparece)

//Cuando se recibe la clave al crear/modificar un usuario,
//se encripta y se guarda (encriptada) en clave_encriptada junto con el valor de salt
//Los algoritmos de hash generan el mismo hash para la misma entrada.
//Para que 2 usuarios no terminen con el mismo valor de hash en caso que ingresen la misma clave
//se usa un valor de salt único antes de encriptar la clave
//No se usan funciones flecha (=>) porque evitan el enlace a this

esquemaUsuario.methods = {
    autenticar : function(textoPlano) {
        return this.encriptarClave(textoPlano) === this.clave_encriptada;
    },
    encriptarClave : function(clave) {
        if(!clave)
            return ''
        return bcryptjs.hashSync(clave, this.salt);
    },
    crearSalt : function() {
        return bcryptjs.genSaltSync(SALT);
    },
    generarToken : function(callback) {
        const usuario = this;
        const token = jwt.sign(usuario._id.toHexString(), configuracion.SECRET);
        usuario.token = token;
        usuario.save((error, documento) => {
            callback(error, documento)
        });
    },
    borrarToken : function(callback) {
        const usuario = this;
        usuario.token = undefined;
        usuario.save((error, documento) => {
            callback(error, documento);
        });
    }
}
//crearSalt(): genera un valor de salt, usando la constante SALT, que se guarda en salt y se referencia desde this.salt
//encriptarClave(): encripta la clave usando el valor de salt y la guarda en clave_encriptada
//autenticar(): compara si el valor guardado en clave_encriptada es el mismo que se obtiene al encriptar la clave en texto plano
//generarToken(): genera un token para el usuario y lo guarda como un campo más del usuario. 
//Cuando lo guarda, llama a la función de callback con la cual se llama al método
//borrarToken(): borra el token del usuario (le asigna undefined en realidad) y actualiza este cambio
//Cuando actualiza la modificación, llama a la función de callback con la cual se llama al método

esquemaUsuario.statics = {
    buscarPorToken : function(token, callback) {
        const usuario = this;
        jwt.verify(token, configuracion.SECRET, (error, idUsuario) => {
            if(error) {
                callback(error, null);
            }
            usuario.findOne({"_id" : idUsuario, "token" : token}, function(error, usuarioEncontrado) {
                callback(error, usuarioEncontrado);
            });            
        });
    }
}
//buscarPorToken(): busca si existe un usuario con el token especificado
//Primero verifica que el token sea válido mediante el método verify()
//Si el token fuera inválido, se llama a la función de callback pasándole el error
//Si el token es válido, idUsuario contiene el valor de _id
//Luego se busca el usuario por los atributos _id y token, y se llama a la función de callback
//pasándole el error (si hubiera) y el usuario que se encuentra

esquemaUsuario.path('clave_encriptada').validate(function(v) {
    if(this._clave && this._clave.length < 6)
        this.invalidate('clave', 'La clave debe tener al menos 6 caracteres');
    if(this.isNew && !this._clave)
        this.invalidate('clave', 'Se debe proporcionar una clave');
}, null);
//permite especificar ciertas características para la clave:
//no puede tener menos de 6 caracteres, y se debe proporcionar una

const Usuario = mongoose.model('Usuario', esquemaUsuario);

module.exports = Usuario;
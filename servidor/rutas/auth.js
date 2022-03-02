const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/usuarios');

//ruta para que un usuario se loguee
//primro se busca si existe un usuario con el correo especificado
//luego se comprueba que la clave ingresada coincida con la del correo especificado
//luego se le genera un token al usuario
//cuando se le genera un token se crea una cookie llamada auth cuyo valor es el token generado
//también se envía como respuesta los atributos estaAutenticado, usuarioId, correo y token
router.post('/auth/login', (request, response) => {
    Usuario.findOne({'correo':request.body.correo}, (error, usuario) => {
        if(!usuario)
            return response.json({
                estaAutenticado : false,
                mensaje : 'No se encontró el usuario'
            });           
        if(!usuario.autenticar(request.body.clave))
            return response.json({
                estaAutenticado : false,
                mensaje : 'La clave especificada no coincide con la del correo especificado'
            });
        usuario.generarToken((error, documento) => {
            if(error)
                return response.status(400).send(error);
            response.cookie('auth', documento.token).json({
                estaAutenticado : true,
                usuarioId : documento._id,
                correo : documento.correo,
                token : documento.token
            });
        });               
    });
});

//ruta para que un usuario se desloguee
//primero se busca si existe un usuario con el token especificado
//si se encuentra el usuario se le borra el token, se borra la cookie y se envía la respuesta
router.get('/auth/logout', (request, response) => {
    const token =  request.cookies.auth;
    Usuario.buscarPorToken(token, (error, usuario) => {
        if(error)
            return error;
        if(!usuario)
            response.json({error : true});
        usuario.borrarToken((error, documento) => {
            if (error)
                return error;
            response.clearCookie('auth');
            return response.status(200).json({
                'mensaje' : 'Sesión cerrada'
            });    
        });
    });
});

module.exports = router;
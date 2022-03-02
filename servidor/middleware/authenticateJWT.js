const Usuario = require('../modelos/usuarios');

//comprueba que el usuario sea válido y esté logueado
//primero busca si el token está guardado en la cookie
//luego busca si existe un usuario con el token especificado
//si existe un usuario con el token especificado, se lo devuelve en la respuesta y se sigue
const authenticateJWT = (request, response, next) => {
    const token = request.cookies.auth;
    if(token) {
        Usuario.buscarPorToken(token, (error, usuario) => {
            if(error)
                throw error;
            if(!usuario)
                return response.json({error : true});
            request.usuario = usuario; 
            next();
        });
    }
    else
        response.json({'mensaje' : 'Necesita estar autenticado'});
}

module.exports = authenticateJWT;
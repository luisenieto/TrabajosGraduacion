const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/usuarios');
const authenticateJWT = require('../middleware/authenticateJWT');

/*
    Todavía no se están usando estas rutas
*/



//ruta para listar todos los usuarios 
//muestra el id, nombre de usuario y correo
//los lista ordenados alfabéticamente por el nombre de usuario
router.get('/usuarios/listar', (request, response) => {
    Usuario.find().select('_id nombre correo').sort({nombre:'asc'}).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        response.status(200).send(documento);
    });
});

//ruta para borrar un usuario
//para poder borrar un usuario se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.delete('/usuarios/borrar', authenticateJWT, (request, response) => {
    //http://localhost:3001/api/usuarios/borrar?id=615f24395a137070e292dc59
    let id = request.query.id;
    Usuario.findByIdAndRemove(id, (error, documento) => {
        if (error)
            return response.status(400).send(error);
        response.json(true);
    });
});

//ruta para crear un usuario
//para poder crear un usuario se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.post('/usuarios/crear', authenticateJWT, (request, response) => {
    const usuario = new Usuario(request.body);
    usuario.save((error, documento) => {
        if (error)
            return response.status(400).send(error);
        response.status(200).send({
            usuarioId:documento._id
        });
    });
});
//si se puede crear el usuario, usuarioId tiene el id del usuario nuevo

//ruta para modificar un usuario
//para poder modificar un usuario se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.post('/usuarios/modificar', authenticateJWT, (request, response) => {
    //request.body._id: por qué parámetro se busca
    //request.body: modifica todo lo que esté en el body (1 clave, 2 claves, etc)
    //{new:true}: después de modificar se quiere el documento modificado (hay otras opciones)
    let usuario = request.body;
    usuario.modificado = Date.now();
    Usuario.findByIdAndUpdate(request.body._id, usuario, {new:true}, (error, documento) => {
        if (error)
            return response.status(400).send(error);
        documento.clave_encriptada = undefined; //antes de mostrar el documento modificado, se limpia información sensible
        documento.salt = undefined;
        response.json({
            documento
        });
    });
});
//si se puede modificar el usuario, documento tiene los datos nuevos, y si no se puede vale null

module.exports = router;
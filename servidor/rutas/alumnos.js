const express = require('express');
const router = express.Router();
const Alumno = require('../modelos/alumnos');
const authenticateJWT = require('../middleware/authenticateJWT');

//ruta para listar todos los alumnos (los lista ordenados alfabéticamente por apellidos)
router.get('/alumnos/listar', (request, response) => {
    //http://localhost:3001/api/alumnos/listar    
    Alumno.find().sort({apellidos:'asc'}).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        response.status(200).send(documento);
    });
});
//Cuando el servidor recibe la dirección http://localhost:3001/api/alumnos/listar 
//ejecuta una función a la cual se le pasa el pedido y la respuesta del servidor
//Si se produce un error, a la respuesta se le asigna el estado 400 (error) y se envía el error
//Si no se produce un error y se pueden recuperar todos los alumnos, 
//a la respuesta se le asigna el estado 200 (OK) y se envía el documento con todos los alumnos


//ruta para mostrar un determinado alumno
router.get('/alumnos', (request, response) => {
    //http://localhost:3001/api/alumnos?id=615f24395a137070e292dc5a
    let _id = request.query.id;
    Alumno.findById(_id).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        response.status(200).send(documento);
    });
});

//ruta para borrar un alumno
//para poder borrar un alumno se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.delete('/alumnos/borrar', authenticateJWT, (request, response) => {
    //http://localhost:3001/api/alumnos/borrar?id=615f24395a137070e292dc59
    let id = request.query.id;

    Alumno.findByIdAndRemove(id, (error, documento) => {
        if (error)
            return response.status(400).send(error);
        return response.json(documento);
    });
});

//ruta para crear un alumno
//para poder crear un alumno se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.post('/alumnos/crear', authenticateJWT, (request, response) => {
    const alumno = new Alumno(request.body);
    alumno.save((error, documento) => {
        if (error)
            return response.status(400).send(error);
        return response.status(200).json(documento);
    });
});

//ruta para modificar un alumno
//para poder modificar un alumno se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.post('/alumnos/modificar', authenticateJWT, (request, response) => {
    //request.body._id: por qué parámetro se busca
    //request.body: modifica todo lo que esté en el body (1 clave, 2 claves, etc)
    //{new:true}: después de modificar se quiere el registro modificado (hay otras opciones)
    Alumno.findByIdAndUpdate(request.body._id, request.body, {new:true}, (error, documento) => {
        if (error)
            return response.status(400).send(error);
        return response.status(200).json(documento);
    });
});
//si se puede modificar el alumno, documento tiene los datos nuevos, y si no se puede vale null

module.exports = router;
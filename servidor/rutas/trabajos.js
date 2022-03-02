const express = require('express');
const router = express.Router();
const Trabajo = require('../modelos/trabajos');
const authenticateJWT = require('../middleware/authenticateJWT');
const Profesor = require('../modelos/profesores');

//ruta para listar todos los trabajos (los lista ordenados por fecha de aprobación en orden cronológico inverso)
router.get('/trabajos/listar', (request, response) => {
    Trabajo.find().sort({fechaAprobacion:'desc'}).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        response.status(200).send(documento);
    });
});

//ruta para mostrar un determinado trabajo
router.get('/trabajos', (request, response) => {
    //http://localhost:3001/api/trabajos?id=61a566fcdd054f01d126dc78
    let _id = request.query.id;
    Trabajo.findById(_id).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        response.status(200).send(documento);
    });
});

//ruta para listar todos los trabajos de un alumno
router.get('/trabajos/listarporalumno', (request, response) => {
    //http://localhost:3001/api/trabajos/listarporalumno?dni=37312195
    let dni = request.query.dni;
    Trabajo.find({'alumnos.dni' : dni}).sort({fechaAprobacion:'desc'}).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        response.status(200).send(documento);
    });
});

//ruta para listar todos los trabajos de un profesor
//el profesor especificado puede haber participado como tutor, cotutor o jurado
//los lista ordenados por fecha de aprobación en orden cronológico inverso
router.get('/trabajos/listarporprofesor', (request, response) => {
    //http://localhost:3001/api/trabajos/listarporprofesor?dni=23518045
    let dni = request.query.dni;
    Trabajo.find({$or : [{'tutores.dni' : dni}, {'cotutores.dni' : dni}, {'jurado.dni' : dni}]}).sort({fechaAprobacion:'desc'}).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        response.status(200).send(documento);
    });
});

//ruta para borrar un trabajo
router.delete('/trabajos/borrar', authenticateJWT, (request, response) => {
    //http://localhost:3001/api/trabajos/borrar?id=615f24395a137070e292dc59
    let id = request.query.id;
    Trabajo.findByIdAndRemove(id, (error, documento) => {
        if (error)
            return response.status(400).send(error);
        return response.json(documento);
    });
});

//ruta para crear un trabajo
//para poder borrar un trabajo se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.post('/trabajos/crear', authenticateJWT, (request, response) => {
    const trabajo = new Trabajo(request.body);
    
    trabajo.save((error, documento) => {
        if (error)
            return response.status(400).send(error);
        return response.status(200).json(documento);
    });
});

//ruta para modificar un trabajo
//para poder modificar un trabajo se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.post('/trabajos/modificar', authenticateJWT, (request, response) => {
    //request.body._id: por qué parámetro se busca
    //request.body: modifica todo lo que esté en el body (1 clave, 2 claves, etc)
    //{new:true}: después de modificar se quiere el documento modificado (hay otras opciones)    
    Trabajo.findByIdAndUpdate(request.body._id, request.body, {new:true}, (error, documento) => {
        if (error)
            return response.status(400).send(error);
        return response.status(200).json(documento);
    });
});

module.exports = router;
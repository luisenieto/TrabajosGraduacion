const express = require('express');
const router = express.Router();
const Profesor = require('../modelos/profesores');
const authenticateJWT = require('../middleware/authenticateJWT');
const cargos = require ('../modelos/cargos');

//ruta para listar todos los profesores (los muestra con el nombre del cargo, ordenados alfabéticamente por apellidos)
router.get('/profesores/listar', (request, response) => {
    //http://localhost:3001/api/profesores/listar   
    let profesoresConCargos = [];
    Profesor.find().sort({apellidos:'asc'}).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        for (let i in documento) {
            let profesorConCargo = {};
            for (let j in cargos) {
                if (documento[i].idCargo === cargos[j].idCargo) {
                    profesorConCargo._id = documento[i]._id;
                    profesorConCargo.dni = documento[i].dni;
                    profesorConCargo.apellidos = documento[i].apellidos;
                    profesorConCargo.nombres = documento[i].nombres;
                    profesorConCargo.idCargo = documento[i].idCargo;
                    profesorConCargo.nombreCargo = cargos[j].nombreCargo;
                    profesoresConCargos.push(profesorConCargo);
                }
            }
        }
        response.status(200).send(profesoresConCargos);
    });
});

//ruta para mostrar un determinado profesor
router.get('/profesores', (request, response) => {
    //http://localhost:3001/api/profesores?id=615f37cd0cc4926c13867f2b
    let _id = request.query.id;
    let profesorConCargo = {};
    Profesor.findById(_id).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        for (let i in cargos) {
            if (documento.idCargo === cargos[i].idCargo) {   
                profesorConCargo._id = documento._id;
                profesorConCargo.dni = documento.dni;
                profesorConCargo.apellidos = documento.apellidos;
                profesorConCargo.nombres = documento.nombres;
                profesorConCargo.idCargo = documento.idCargo;
                profesorConCargo.nombreCargo = cargos[i].nombreCargo;
            }
        }
        return response.status(200).json(profesorConCargo);
    });
});

//ruta para listar el profesor con del dni correspondiente
router.get('/profesores/listarpordni', (request, response) => {
    //http://localhost:3001/api/profesores/listarpordni?dni=23518045
    let dni = request.query.dni;
    Profesor.find({'dni' : dni}).exec((error, documento) => {
        if(error)
            return response.status(400).send(error);
        response.status(200).send(documento);
    });
});

//ruta para borrar un profesor
//para poder borrar un profesor se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.delete('/profesores/borrar', authenticateJWT, (request, response) => {
    //http://localhost:3001/api/profesores/borrar?id=615f24395a137070e292dc59
    let id = request.query.id;

    Profesor.findByIdAndRemove(id, (error, documento) => {
        if (error)
            return response.status(400).send(error);
        response.json(true);
    });
});

//ruta para crear un profesor
//para poder crear un profesor se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.post('/profesores/crear', authenticateJWT, (request, response) => {
    const profesor = new Profesor(request.body);
    profesor.save((error, documento) => {
        if (error)
            return response.status(400).send(error);
        return response.status(200).json(documento);
    });
});

//ruta para modificar un profesor
//para poder modificar un profesor se debe estar autenticado, lo cual es comprobado por el middleware authenticateJWT
router.post('/profesores/modificar', authenticateJWT, (request, response) => {
    //request.body._id: por qué parámetro se busca
    //request.body: modifica todo lo que esté en el body (1 clave, 2 claves, etc)
    //{new:true}: después de modificar se quiere el registro modificado (hay otras opciones)
    Profesor.findByIdAndUpdate(request.body._id, request.body, {new:true}, (error, documento) => {
        if (error)
            return response.status(400).send(error);
        return response.status(200).json(documento);
    });
});

module.exports = router;
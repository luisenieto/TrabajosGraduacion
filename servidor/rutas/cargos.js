const express = require('express');
const router = express.Router();
const cargos = require('../modelos/cargos');

//Como sólo hay 5 cargos fijos, directamente se envía en la respuesta el vector con los mismos
router.get('/cargos/listar', (request, response) => {
    response.send(cargos);
});

module.exports = router;
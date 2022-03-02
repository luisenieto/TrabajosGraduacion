const express = require('express');
const router = express.Router();
const areas = require('../modelos/areas');

//Como sólo hay 3 áreas fijas, directamente se envía en la respuesta el vector con las mismas
router.get('/areas/listar', (request, response) => {
    response.send(areas);
});

module.exports = router;
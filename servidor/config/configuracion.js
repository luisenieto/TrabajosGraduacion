/*
    Opciones de configuración para los ambientes de producción y desarrollo
*/

const configuracion = {
    production : {
        SECRET : process.env.SECRET,
        BD : process.env.MONGODB_URI,
        PUERTO : process.env.PORT
    },
    default : {
        SECRET : 'superSecretPassword123',
        BD : 'mongodb+srv://luisenieto:Gasparin1973@trabajosgraduacion.gapmp.mongodb.net/trabajosGraduacion?retryWrites=true&w=majority',
        //BD : 'mongodb://localhost:27017/trabajosGraduacion',
        PUERTO : 3001
    }
}

exports.get = function get(ambiente) {
    return configuracion[ambiente] || configuracion.default;
}
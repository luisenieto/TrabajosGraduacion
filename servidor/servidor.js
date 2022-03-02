const configuracion = require('./config/configuracion').get(process.env.NODE_ENV);
const app = require('./express');
const mongoose = require('./mongoose');
const rutasAreas = require('./rutas/areas');
const rutasCargos = require('./rutas/cargos');
const rutasAlumnos = require('./rutas/alumnos');
const rutasProfesores = require('./rutas/profesores');
const rutasUsuarios = require('./rutas/usuarios');
const rutasTrabajos = require('./rutas/trabajos');
const rutasAutenticacion = require('./rutas/auth');

/* mongoose.connect(configuracion.BD, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
*/    
mongoose.connect(configuracion.BD, {
        useNewUrlParser: true 
    })    
.then(() => console.info("Conectado a MongoDB"))
.catch(error => console.log(error));

app.use('/api', rutasAreas);
app.use('/api', rutasCargos);
app.use('/api', rutasAlumnos);
app.use('/api', rutasProfesores);
app.use('/api', rutasUsuarios);
app.use('/api', rutasTrabajos);
app.use('/api', rutasAutenticacion);

if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (request, response) => {
        //response.sendFile(path.resolve(__dirname, '../cliente', 'build', 'index.html'));
        response.sendFile(path.join(__dirname, '../cliente', 'build', 'index.html'));
    });
}   

//const PUERTO = process.env.PORT || 3001;
app.listen(configuracion.PUERTO, (error) => {
    if(error)
        console.log(error);
    console.info(`Servidor corriendo en puerto: ${configuracion.PUERTO}`);
});


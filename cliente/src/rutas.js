import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './home/home';
import MenuApp from './menu/menuApp';
import Acceso from './auth/acceso';
import Alumnos from './alumnos/alumnos';
import Profesores from './profesores/profesores';
import Trabajos from './trabajos/trabajos';
import ModificarTrabajo from './trabajos/modificarTrabajo/modificarTrabajo';
import NuevoTrabajo from './trabajos/nuevoTrabajo/nuevoTrabajo';
import Validar from './auth/validar';
import ModificarAlumno from './alumnos/modificarAlumno/modificarAlumno';
import NuevoAlumno from './alumnos/nuevoAlumno/nuevoAlumno';
import ModificarProfesor from './profesores/modificarProfesor/modificarProfesor';
import NuevoProfesor from './profesores/nuevoProfesor/nuevoProfesor';

const Rutas = () => {
    return(
        <div>
            <MenuApp/>
            <Switch>
                <Route path="/" exact component = {Home}/>
                <Route path="/acceso" exact component = {Acceso}/>
                <Route path="/alumnos" exact component = {Alumnos}/>
                <Route path="/profesores" exact component = {Profesores}/>
                <Route path="/trabajos" exact component = {Trabajos}/>
                <Route path="/trabajos/:id" exact component = {(props) => Validar(ModificarTrabajo, props)}/>
                <Route path="/trabajo/nuevo" exact component = {() => Validar(NuevoTrabajo)}/>
                <Route path="/alumnos/:id" exact component = {(props) => Validar(ModificarAlumno, props)}/>
                <Route path="/alumno/nuevo" exact component = {() => Validar(NuevoAlumno)}/>
                <Route path="/profesores/:id" exact component = {(props) => Validar(ModificarProfesor, props)}/>
                <Route path="/profesor/nuevo" exact component = {() => Validar(NuevoProfesor)}/>
            </Switch>
        </div>
    );    
}

export default Rutas;
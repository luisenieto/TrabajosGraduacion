import React from 'react';
import { Redirect } from 'react-router-dom';
import { estaAutenticado } from './auth';

//Valida que para acceder al componente especificado el usuario esté logueado
//si no lo está, redirige al formulario de login
const Validar = (Component, props) => {
    if (estaAutenticado())
        return (<Component {...props}/>)
    else
        return (<Redirect to = '/acceso' />)
}

export default Validar;
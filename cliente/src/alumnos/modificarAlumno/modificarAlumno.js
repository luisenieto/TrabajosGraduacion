import React, {useContext, useEffect, useState} from 'react';
import { ProviderContext } from '../../provider';
import useStyles from '../useStyles';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { constantesAlumnos, constantesTrabajos } from '../../config/constantes';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Alerta from '../alerta';
import Popup from './popup';
import { esCaracterValido, permitidosParaApeYNom, permitidosParaDNIYCX } from '../validaciones';

//Componente que se encarga de mostrar el formulario para la modificación de alumnos
const ModificarAlumno = (props) => {
    const {alumno, setearAlumno} = useContext(ProviderContext);

    const [openPopup, setearOpenPopup] = useState({
        mostrar : false,
        texto : ''
    });
    //controla la visibilidad del popup (para confirmar si se guarda la modificación)

    const [estadoAlerta, setEstadoAlerta] = useState({
        gravedad : 'error',
        titulo : '',
        texto : '',
        mostrar : false
    });
    //controla la visibilidad de la alerta, su tipo y contenido (para los mensajes de error/éxito)

    const history = useHistory();
    const clases = useStyles(); 

    useEffect(() => {
        const _id = props.match.params.id;
        const ruta = `/api/alumnos?id=${_id}`;
        axios.get(ruta).then(response => {
            setearAlumno(response.data);
        });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    const botonCancelar = () => history.push('/alumnos/');

    const botonAceptar = () => {        
        setearOpenPopup({
            mostrar : true,
            texto : `${constantesAlumnos.MENSAJE_CONFIRMAR_MODIFICACION}`
        })
    }

    const apellidoYNombreOnKeyDown = (evento) => {
        var charCode = (evento.which) ? evento.which : evento.keyCode;
        if (!esCaracterValido(charCode, permitidosParaApeYNom))
            evento.preventDefault();
    }
    //Verifica que no se puedan ingresar otros caracteres que no sean los definidos como válidos

    const dniYCXOnKeyDown = (evento) => {
        var charCode = (evento.which) ? evento.which : evento.keyCode;
        if (!esCaracterValido(charCode, permitidosParaDNIYCX))
            evento.preventDefault();
    }
    //Verifica que no se puedan ingresar otros caracteres que no sean los definidos como válidos


    return (
        <>
            {
                alumno ?
                    <Paper className = {clases.pageContent}>
                        <form>
                            <Grid container spacing = {1}>
                                <Alerta 
                                    estadoAlerta = {estadoAlerta}
                                    setEstadoAlerta = {setEstadoAlerta}
                                />
                                <Grid item lg = {6} sm = {12} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'Apellidos'
                                        value = {alumno.apellidos}
                                        className = {clases.campoApellidos}
                                        inputProps = {{
                                            onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearAlumno({...alumno, 'apellidos' : evento.target.value})}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {12} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'Nombres'
                                        value = {alumno.nombres}
                                        className = {clases.campoNombres}
                                        inputProps = {{
                                            onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearAlumno({...alumno, 'nombres' : evento.target.value})}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField
                                        InputProps = {{disabled: true}}
                                        variant = 'outlined'
                                        label = 'DNI'
                                        value = {alumno.dni}
                                        className = {clases.campoDNI}
                                        inputProps = {{
                                            onKeyDown : (evento) => {dniYCXOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearAlumno({...alumno, 'dni' : evento.target.value})}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'CX'
                                        value = {alumno.cx}
                                        className = {clases.campoCX}
                                        inputProps = {{
                                            onKeyDown : (evento) => {dniYCXOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearAlumno({...alumno, 'cx' : evento.target.value})}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {6}>
                                    <Button variant="contained" className = {clases.botonAceptar} onClick = {() => botonAceptar()}
                                    >
                                        {constantesAlumnos.ACEPTAR}                    
                                    </Button>
                                </Grid>            
                                <Grid item lg = {6} sm = {6} xs = {6}>
                                    <Button variant="contained" className = {clases.botonCancelar} onClick = {() => botonCancelar()}
                                    >
                                        {constantesAlumnos.CANCELAR}
                                    </Button>
                                </Grid> 
                                <Popup 
                                    titulo = {constantesTrabajos.TITULO_APLICACION}
                                    openPopup = {openPopup}
                                    setearOpenPopup = {setearOpenPopup}
                                    setEstadoAlerta = {setEstadoAlerta}
                                />                                                                                                             
                            </Grid>
                        </form>
                    </Paper>
                :
                    null
            }
        </>
    )
}

export default ModificarAlumno;
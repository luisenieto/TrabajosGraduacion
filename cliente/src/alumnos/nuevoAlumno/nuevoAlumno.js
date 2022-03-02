import React, {useContext, useEffect, useState} from 'react';
import { ProviderContext } from '../../provider';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import useStyles from '../useStyles';
import { useHistory } from "react-router-dom";
import { validarAlumnoParaCreacion, esCaracterValido, permitidosParaApeYNom, permitidosParaDNIYCX } from '../validaciones';
import { constantesAlumnos } from '../../config/constantes';
import Alerta from '../alerta';
import axios from 'axios';

//Componente que se encarga de mostrar el formulario para la creación, y de la creación de alumnos
const NuevoAlumno = () => {
    const {alumno, setearAlumno, alumnos, setearAlumnos} = useContext(ProviderContext);

    const [estadoAlerta, setEstadoAlerta] = useState({
        gravedad : 'error',
        titulo : '',
        texto : '',
        mostrar : false
    });
    //controla la visibilidad de la alerta, su tipo y contenido (para los mensajes de error/éxito)

    const clases = useStyles(); 
    const history = useHistory();

    useEffect(() => {
        setearAlumno({
            apellidos : '',
            nombres : '',
            dni : '',
            cx : ''
        })
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    const botonCancelar = () => history.push('/alumnos/');

    const botonAceptar = () => {   
        let resultado;
        if ((resultado = validarAlumnoParaCreacion(alumno, alumnos)) !== constantesAlumnos.OK) {
            setEstadoAlerta({
                gravedad : 'error',
                titulo : 'Error',
                texto : resultado,
                mostrar : true
            });
            return;                
        }  
        const ruta = '/api/alumnos/crear';
        axios.post(ruta, alumno).then(response => {
            if (response.status === 200) {
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : `${constantesAlumnos.NUEVO_ALUMNO}`,
                    texto : `${constantesAlumnos.MENSAJE_NUEVO_ALUMNO} ${response.data.apellidos}, ${response.data.nombres}"`,
                    mostrar : true
                });
                const alumnosUpdate = [...alumnos];
                alumnosUpdate.push(response.data);
                setearAlumnos(alumnosUpdate); 
            }
        });            
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
                            </Grid>
                        </form>
                    </Paper>
                :
                    null
            }
        </>
    )
}

export default NuevoAlumno;
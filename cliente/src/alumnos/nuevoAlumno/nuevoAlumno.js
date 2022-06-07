import React, {useContext, useState} from 'react';
import { ProviderContext } from '../../provider';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import useStyles from '../useStyles';
import { useHistory } from "react-router-dom";
import { validarAlumnoParaCreacion, apellidoYNombreOnKeyDown, dniYCXOnKeyDown, apellidoYNombreOnPaste, dniYCXOnPaste} from '../validaciones';
import { constantesAlumnos } from '../../config/constantes';
import Alerta from '../alerta';
import axios from 'axios';

//Componente que se encarga de mostrar el formulario para la creación, y de la creación de alumnos
const NuevoAlumno = () => {
    const {alumnos, alumno, setearAlumnos, setearAlumno, setAlumnosFiltrados, estadoAlerta, setEstadoAlerta} = useContext(ProviderContext);
    
    const [unAlumno, setearUnAlumno] = useState(alumno);

    //const [botonesInhabilitados, setearBotonesInhabilitados] = useState(false);
    //controla la habilitación de los botones Aceptar/Cancelar mientras esté visible la alerta

    const clases = useStyles(); 
    const history = useHistory();

    const botonCancelar = () => history.push('/alumnos/');

    const botonAceptar = () => {           
        let resultado;
        if ((resultado = validarAlumnoParaCreacion(unAlumno, alumnos)) !== constantesAlumnos.OK) { 
            setearAlumno(unAlumno);
            setEstadoAlerta({
                gravedad : 'error',
                titulo : 'Error',
                texto : resultado,
                mostrar : true,
                botonesInhabilitados : true
            });
            return;                
        }  
        const ruta = '/api/alumnos/crear';        
        axios.post(ruta, unAlumno).then(response => {
            if (response.status === 200) {                      
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : `${constantesAlumnos.NUEVO_ALUMNO}`,
                    texto : `${constantesAlumnos.MENSAJE_NUEVO_ALUMNO} ${response.data.apellidos}, ${response.data.nombres}`,
                    mostrar : true,
                    botonesInhabilitados : true
                });
                let alumnosUpdate = [...alumnos];
                alumnosUpdate.push(response.data);
                //se ordenan los alumnos por apellido. Si hay 2 con el mismo por nombre
                alumnosUpdate = alumnosUpdate.sort((a, b) => {
                    if (a.apellidos < b.apellidos)
                        return -1;
                    if (a.apellidos > b.apellidos)
                        return 1
                    else {
                        if (a.nombres < b.nombres) 
                            return -1;
                        if (a.nombres > b.nombres)
                            return 1
                        else
                            return 0;
                    }
                    
                });
                setearAlumno(unAlumno);
                setearAlumnos(alumnosUpdate); 
                setAlumnosFiltrados(alumnosUpdate);
            }
        });            
    }

    return (
        <>
            {
                unAlumno ?
                    <Paper className = {clases.pageContent}>
                        <form>
                            <Grid container spacing = {1}>                                
                                <Grid item lg = {6} sm = {12} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'Apellidos'
                                        value = {unAlumno.apellidos}
                                        className = {clases.campoApellidos}
                                        inputProps = {
                                            {
                                                onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)},
                                                disabled : estadoAlerta.botonesInhabilitados ? true : false
                                            }
                                        }
                                        onChange = {evento => setearUnAlumno({...unAlumno, 'apellidos' : evento.target.value})}
                                        onPaste = {evento => apellidoYNombreOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {12} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'Nombres'
                                        value = {unAlumno.nombres}
                                        className = {clases.campoNombres}
                                        inputProps = {
                                            {
                                                onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)},
                                                disabled : estadoAlerta.botonesInhabilitados ? true : false
                                            }                                        
                                        }
                                        onChange = {evento => setearUnAlumno({...unAlumno, 'nombres' : evento.target.value}) }
                                        onPaste = {evento => apellidoYNombreOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField                                        
                                        variant = 'outlined'
                                        label = 'DNI'
                                        value = {unAlumno.dni}
                                        className = {clases.campoDNI}
                                        inputProps = {{
                                            onKeyDown : (evento) => {dniYCXOnKeyDown(evento)},
                                            disabled : estadoAlerta.botonesInhabilitados ? true : false
                                        }}
                                        onChange = {evento => setearUnAlumno({...unAlumno, 'dni' : evento.target.value})}
                                        onPaste = {evento => dniYCXOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'CX'
                                        value = {unAlumno.cx}
                                        className = {clases.campoCX}
                                        inputProps = {
                                            {
                                                onKeyDown : (evento) => {dniYCXOnKeyDown(evento)},
                                                disabled : estadoAlerta.botonesInhabilitados ? true : false
                                            }
                                        }
                                        onChange = {evento => setearUnAlumno({...unAlumno, 'cx' : evento.target.value})}
                                        onPaste = {evento => dniYCXOnPaste(evento)}
                                    />
                                </Grid>
                                <Alerta />
                                <Grid item lg = {6} sm = {6} xs = {6}>
                                    <Button variant="contained" 
                                        className = {clases.botonAceptar} 
                                        onClick = {() => botonAceptar()}
                                        disabled = {estadoAlerta.botonesInhabilitados}
                                    >
                                        {constantesAlumnos.ACEPTAR}                    
                                    </Button>
                                </Grid>            
                                <Grid item lg = {6} sm = {6} xs = {6}>
                                    <Button variant="contained" 
                                        className = {clases.botonCancelar} 
                                        onClick = {() => botonCancelar()}
                                        disabled = {estadoAlerta.botonesInhabilitados}
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
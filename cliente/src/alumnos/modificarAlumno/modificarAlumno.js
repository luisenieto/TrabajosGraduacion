import React, {useContext, useState} from 'react';
import { ProviderContext } from '../../provider';
import useStyles from '../useStyles';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { constantesAlumnos, constantesTrabajos } from '../../config/constantes';
import { useHistory } from "react-router-dom";
import Alerta from '../alerta';
import Popup from './popup';
import { apellidoYNombreOnKeyDown, dniYCXOnKeyDown, apellidoYNombreOnPaste, dniYCXOnPaste } from '../validaciones';

//Componente que se encarga de mostrar el formulario para la modificación de alumnos
const ModificarAlumno = (props) => {
    const {alumno, estadoAlerta} = useContext(ProviderContext);
    const [unAlumno, setearUnAlumno] = useState(alumno);

    const [openPopup, setearOpenPopup] = useState({
        mostrar : false,
        texto : ''
    });
    //controla la visibilidad del popup (para confirmar si se guarda la modificación)

    const history = useHistory();
    const clases = useStyles(); 

    const botonCancelar = () => history.push('/alumnos/');

    const botonAceptar = () => {    
        setearOpenPopup({
            mostrar : true,
            texto : `${constantesAlumnos.MENSAJE_CONFIRMAR_MODIFICACION}`
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
                                        onChange = {evento => setearUnAlumno({...unAlumno, 'nombres' : evento.target.value})}
                                        onPaste = {evento => apellidoYNombreOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField
                                        inputProps = {{disabled: true}}
                                        variant = 'outlined'
                                        label = 'DNI'
                                        value = {unAlumno.dni}
                                        className = {clases.campoDNI}
                                        // inputProps = {{
                                        //         onKeyDown : (evento) => {dniYCXOnKeyDown(evento)}
                                        // }}
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
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <Button variant="contained" 
                                        className = {clases.botonAceptar} 
                                        onClick = {() => botonAceptar()}
                                        disabled = {estadoAlerta.botonesInhabilitados}
                                    >
                                        {constantesAlumnos.ACEPTAR}                    
                                    </Button>
                                </Grid>            
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <Button variant="contained" 
                                        className = {clases.botonCancelar} 
                                        onClick = {() => botonCancelar()}
                                        disabled = {estadoAlerta.botonesInhabilitados}
                                    >
                                        {constantesAlumnos.CANCELAR}
                                    </Button>
                                </Grid> 
                                <Popup 
                                    titulo = {constantesTrabajos.TITULO_APLICACION} 
                                    openPopup = {openPopup}
                                    setearOpenPopup = {setearOpenPopup}
                                    alumno = {unAlumno}
                                    // setEstadoAlerta = {setEstadoAlerta}
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
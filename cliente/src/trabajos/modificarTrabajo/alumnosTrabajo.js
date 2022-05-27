import React, {useContext, Fragment} from 'react';
import { Grid } from '@mui/material';
import { ProviderContext } from '../../provider';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Divider } from '@mui/material';
import { Chip } from '@mui/material';
import useStyles from '../useStyles';
import moment from 'moment';
import { constantesTrabajos } from '../../config/constantes';
import {CgPlayListAdd} from 'react-icons/cg';
import {GoTrashcan} from 'react-icons/go';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import {GoStop} from 'react-icons/go'
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';

//Componente que se encarga de mostrar los campos para los alumnos del trabajo en el formulario
const Alumnos = ({trabajo, setearTrabajo}) => {
    const {fechaAprobacion, fechaFinalizacion} = trabajo;
    const alumnosTrabajo = trabajo.alumnos;
    //alumnosTrabajo: alumnos del trabajo [{apellidos: 'xx', nombres : 'xx', dni: xx, desde : 'xx', hasta : 'xx', razon : 'xx'}]
    const {alumnos} = useContext(ProviderContext);
    //alumnos: listado de todos los alumnos (para armar la lista con todos los alumnos para el Autocomplete)
   
    const clases = useStyles();

    //formatea la fecha en el formato DD/MM/YYYY
    const formatearFecha = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

    const autoCompleteOnChange = (valor, posicion) => {
        const alumnosTrabajoUpdate = [...alumnosTrabajo];

        const posComa = valor.indexOf(',');
        const posParentesisApertura = valor.indexOf('(');        

        alumnosTrabajoUpdate[posicion].apellidos = valor.substring(0, posComa).trim();
        alumnosTrabajoUpdate[posicion].nombres = valor.substring(posComa + 2, posParentesisApertura - 1).trim();
        alumnosTrabajoUpdate[posicion].dni = parseInt(valor.substring(posParentesisApertura + 1, valor.length - 1).trim());

        setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});
    }
    //cada vez que se modifica un alumno

    const botonQuitarAlumno = (posicion) => {
        const alumnosTrabajoUpdate = [...alumnosTrabajo];
        alumnosTrabajoUpdate.splice(posicion, 1);
        setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});
    }
    //quita un alumno del trabajo

    const botonAgregarAlumno = () => {
        const alumnosTrabajoUpdate = [...alumnosTrabajo];

        const nuevoAlumno = {
            apellidos : null,
            nombres : null,
            dni : null,
            desde : fechaAprobacion,
            hasta : null,
            razon : null,
            abierto : false, 
            seEstaModificando : false,
            razonOriginal : ''
        }
        alumnosTrabajoUpdate.push(nuevoAlumno);
            
        setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});
    };
    //agrega un alumno al trabajo

    const mostrarVentanaDialogo = (seEstaModificando, posicion) => {
        const alumnosTrabajoUpdate = [...alumnosTrabajo];
        
        alumnosTrabajoUpdate[posicion].abierto = true;
        alumnosTrabajoUpdate[posicion].seEstaModificando = seEstaModificando;
        alumnosTrabajoUpdate[posicion].razonOriginal = alumnosTrabajoUpdate[posicion].razon;
        setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});
    }

    const botonAceptarClic = (posicion) => {
        const alumnosTrabajoUpdate = [...alumnosTrabajo];

        if (alumnosTrabajoUpdate[posicion].razon.trim() !== '')
            alumnosTrabajoUpdate[posicion].hasta = new Date()
        else {
            alumnosTrabajoUpdate[posicion].hasta = null;
            alumnosTrabajoUpdate[posicion].razon = null;
        }
        alumnosTrabajoUpdate[posicion].abierto = false;        
            
        setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});
    };
    //cuando se selecciona el botón Aceptar cuando se está finalizando un alumno

    const botonCancelarClic = (posicion) => {
        const alumnosTrabajoUpdate = [...alumnosTrabajo];

        alumnosTrabajoUpdate[posicion].abierto = false;
        alumnosTrabajoUpdate[posicion].razon = alumnosTrabajoUpdate[posicion].razonOriginal;
        setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});
    };
    //cuando se selecciona el botón Cancelar cuando se está finalizando un alumno

    const txtOnChange = (evento, posicion) => {
        const alumnosTrabajoUpdate = [...alumnosTrabajo];

        alumnosTrabajoUpdate[posicion].razon = evento.target.value;
        setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});     
    }
    //cuando se está escribiendo la razón por la que se finaliza un alumno

    const defaultProps = {
        options: alumnos.map((alumno) => `${alumno.apellidos}, ${alumno.nombres} (${alumno.dni})`),
    };

    return (
        <>
            <Grid item xs = {12}>
                <Divider>
                    <Chip label = {constantesTrabajos.ALUMNOS} />                                    
                </Divider>
            </Grid>
            {
                alumnosTrabajo.map((alumno, i) => (
                    <Fragment key = {i}>                        
                        <Grid item lg = {3} sm = {12} xs = {12}>
                            <Autocomplete 
                                {...defaultProps}
                                disabled = {fechaFinalizacion ? true : false}
                                isOptionEqualToValue = {(option, value) => option.value === value.value}
                                // disablePortal
                                disableClearable
                                // id = "combo-box-alumnos"
                                //sx = {{width : 350}}
                                renderInput = {(params) => <TextField {...params} label = {constantesTrabajos.ALUMNO} />} 
                                value = {alumno.apellidos ?
                                        `${alumno.apellidos}, ${alumno.nombres} (${alumno.dni})`
                                    :
                                        null
                                }
                                onChange = {(evento, valor) => autoCompleteOnChange(valor, i)}
                                className = {clases.autoComplete}
                            />
                        </Grid>                                                    
                        <Grid item lg = {2} sm = {6} xs = {6}>
                            <TextField
                                disabled = {fechaFinalizacion ? true : false}
                                InputProps = {{
                                    readOnly: true
                                }}
                                variant = 'outlined'
                                label = {constantesTrabajos.DESDE}
                                value = {alumno.desde ? 
                                    formatearFecha(alumno.desde)
                                :
                                    ''
                                }                                        
                                className = {clases.campoDesdeHasta}
                            />
                        </Grid>
                        <Grid item lg = {2} sm = {6} xs = {6}>
                            <TextField
                                disabled = {fechaFinalizacion ? true : false}
                                InputProps = {{
                                    readOnly: true
                                }}
                                variant = 'outlined'
                                label = {constantesTrabajos.HASTA}
                                value = {alumno.hasta !== null ?
                                    formatearFecha(alumno.hasta)
                                :
                                    ''}
                                className = {clases.campoDesdeHasta}
                            />
                        </Grid>
                        <Grid item lg = {2} sm = {9} xs = {9}>
                            <TextField
                                disabled = {fechaFinalizacion ? true : false}
                                InputProps = {{
                                    readOnly: true
                                }}
                                variant = 'outlined'
                                label = {constantesTrabajos.RAZON}
                                value = {alumno.razon ? alumno.razon : ''}
                                className = {clases.campoRazon}
                            />
                        </Grid>
                        <Grid item lg = {1} sm = {1} xs = {1}>
                            <Tooltip title = {constantesTrabajos.AGREGAR_ALUMNO} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => botonAgregarAlumno()}
                                        className = {clases.botoncitos}
                                        disabled = {fechaFinalizacion ? true : false}
                                    >
                                        <CgPlayListAdd />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Grid>
                        <Grid item lg = {1} sm = {1} xs = {1}>
                            <Tooltip title = {constantesTrabajos.QUITAR_ALUMNO} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => botonQuitarAlumno(i)}
                                        className = {clases.botoncitos}
                                        disabled = {(fechaFinalizacion || alumnosTrabajo.length === 1) ? true : false}
                                    >
                                        <GoTrashcan />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Grid>
                        <Grid item lg = {1} sm = {1} xs = {1}>
                            <Tooltip title = {constantesTrabajos.FINALIZAR_ALUMNO} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => mostrarVentanaDialogo(true, i)}
                                        className = {clases.botoncitos}
                                        disabled = {fechaFinalizacion ? true : false} 
                                    >
                                        <GoStop />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Grid>                                                                
                        <Dialog open = {alumno.abierto ? alumno.abierto : false} >
                            <DialogTitle>{constantesTrabajos.FINALIZAR_ALUMNO}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {constantesTrabajos.FINALIZAR_ALUMNO_RAZON}
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin = "dense"
                                    id = "razon"
                                    label = {constantesTrabajos.RAZON}
                                    fullWidth
                                    value = {alumno.razon ? alumno.razon : ''}
                                    onChange = {evento => txtOnChange(evento, i)}
                                    variant = "standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick = {() => botonAceptarClic(i)}>Aceptar</Button>
                                <Button onClick = {() => botonCancelarClic(i)}>Cancelar</Button>
                            </DialogActions>
                        </Dialog>                                                    
                    </Fragment>
                ))
            }
        </>
    )
}

export default Alumnos;
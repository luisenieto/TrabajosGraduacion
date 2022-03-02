import React, {useContext, Fragment} from 'react';
import { Grid } from '@mui/material';
import { ProviderContext } from '../../provider';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Divider } from '@mui/material';
import { Chip } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useStyles from '../useStyles';
import moment from 'moment';
import {constantesTrabajos} from '../../config/constantes';
import {CgPlayListAdd} from 'react-icons/cg';
import {GoTrashcan} from 'react-icons/go';
import {RiEditLine} from 'react-icons/ri';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';

//Componente que se encarga de mostrar el campo para el tutor del trabajo en el formulario
const Tutores = () => {
    const {trabajo, setearTrabajo} = useContext(ProviderContext);
    const {tutores, fechaAprobacion, fechaFinalizacion} = trabajo;
    //tutores: tutores del trabajo [{apellidos: 'xx', nombres : 'xx', dni: xx, desde : 'xx', hasta : 'xx', razon : 'xx'}]
    const {profesores} = useContext(ProviderContext);
    //profesores: listado de todos los profesores (para armar la lista con todos los profesores para el Autocomplete)    
      
    const clases = useStyles();

    //formatea la fecha con el formato DD/MM/YYYY
    const formatearFecha = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

    const autoCompleteOnChange = (valor, posicion) => {
        const tutoresUpdate = [...tutores];

        const posComa = valor.indexOf(',');
        const posParentesisApertura = valor.indexOf('(');        

        tutoresUpdate[posicion].apellidos = valor.substring(0, posComa).trim();
        tutoresUpdate[posicion].nombres = valor.substring(posComa + 2, posParentesisApertura - 1).trim();
        tutoresUpdate[posicion].dni = parseInt(valor.substring(posParentesisApertura + 1, valor.length - 1).trim());

        setearTrabajo({...trabajo, tutores : tutoresUpdate});
    }
    //cada vez que se modifica el tutor

    const mostrarVentanaDialogo = (seEstaModificando, posicion) => {
        const tutoresUpdate = [...tutores];
        
        tutoresUpdate[posicion].abierto = true;
        tutoresUpdate[posicion].seEstaModificando = seEstaModificando;
        tutoresUpdate[posicion].razonOriginal = tutoresUpdate[posicion].razon;
        setearTrabajo({...trabajo, tutores : tutoresUpdate});
    }
    //cuando se agrega un tutor

    const botonQuitarTutorOnClic = (posicion) => {
        const tutoresUpdate = [...tutores];

        tutoresUpdate.splice(posicion, 1);
        setearTrabajo({...trabajo, tutores : tutoresUpdate});
    }
    //cuando se quita un tutor

    const botonCancelarClic = (posicion) => {
        const tutoresUpdate = [...tutores];

        tutoresUpdate[posicion].abierto = false;
        tutoresUpdate[posicion].razon = tutoresUpdate[posicion].razonOriginal;
        setearTrabajo({...trabajo, tutores : tutoresUpdate});
    };
    //cuando se selecciona el botón Cancelar al agregar un tutor

    const botonAceptarClic = (posicion) => {
        const tutoresUpdate = [...tutores];

        if(tutoresUpdate[posicion].seEstaModificando) { //modificación de la razón
            if (tutoresUpdate[posicion].razon === '') {
                tutoresUpdate[posicion].hasta = null;
                tutoresUpdate[posicion].razon = null;
            }
        }
        else { //se está agregando otro tutor
            tutoresUpdate[posicion].hasta = new Date();
            const nuevoTutor = {
                apellidos : null,
                nombres : null,
                dni : null,
                desde : tutoresUpdate[posicion].hasta,
                hasta : null,
                razon : null,
                abierto : false, 
                seEstaModificando : false,
                razonOriginal : ''
            }
            tutoresUpdate.push(nuevoTutor);
        }
        tutoresUpdate[posicion].abierto = false;
            
        setearTrabajo({...trabajo, tutores : tutoresUpdate});
    };
    //cuando se selecciona el botón Aceptar al agregar un tutor

    const txtOnChange = (evento, posicion) => {
        const tutoresUpdate = [...tutores];

        tutoresUpdate[posicion].razon = evento.target.value;
        setearTrabajo({...trabajo, tutores : tutoresUpdate});       
    }    
    //cuando se está escribiendo la razón

    const defaultProps = {
        options: profesores.map((profesor) => `${profesor.apellidos}, ${profesor.nombres} (${profesor.dni})`),
    };

    return (
        <>
            <Grid item xs = {12}>
                <Divider>
                    <Chip label = {constantesTrabajos.TUTORES} />                                    
                </Divider>
            </Grid>
            {
                tutores.map((tutor, i) => (
                    <Fragment key = {i}>                        
                        <Grid item lg = {3} sm = {12} xs = {12}>
                            <Autocomplete 
                                {...defaultProps}
                                disabled = {fechaFinalizacion ? true : false}
                                isOptionEqualToValue = {(option, value) => option.value === value.value}
                                // disablePortal
                                disableClearable
                                // id = "combo-box-tutores"
                                //sx = {{width : 350}}
                                renderInput = {(params) => <TextField {...params} label = {constantesTrabajos.TUTOR} />} 
                                value = {tutor.apellidos ?
                                        `${tutor.apellidos}, ${tutor.nombres} (${tutor.dni})`
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
                                value = {tutor.desde !== null ? 
                                    formatearFecha(tutor.desde)
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
                                value = {tutor.hasta !== null ?
                                    formatearFecha(tutor.hasta)
                                :
                                    ''
                                }
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
                                value = {tutor.razon ? tutor.razon : ''}
                                className = {clases.campoRazon}
                            />
                        </Grid>
                        <Grid item lg = {1} sm = {1} xs = {1}>
                            <Tooltip title = {constantesTrabajos.CAMBIAR_TUTOR} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => mostrarVentanaDialogo(false, i)}
                                        className = {clases.botoncitos}
                                        disabled = {(fechaFinalizacion || tutor.razon !== null) ? true : false}
                                    >
                                        <CgPlayListAdd />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Dialog open = {tutor.abierto ? tutor.abierto : false} onClose = {() => botonCancelarClic()}>
                                <DialogTitle>{constantesTrabajos.CAMBIAR_TUTOR}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {constantesTrabajos.CAMBIAR_TUTOR_RAZON}
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin = "dense"
                                        id = "razon"
                                        label = {constantesTrabajos.RAZON}
                                        fullWidth
                                        value = {tutor.razon ? tutor.razon : ''}
                                        onChange = {evento => txtOnChange(evento, i)}
                                        variant = "standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick = {() => botonAceptarClic(i)}>Aceptar</Button>
                                    <Button onClick = {() => botonCancelarClic(i)}>Cancelar</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        <Grid item lg = {1} sm = {1} xs = {1}>
                            <Tooltip title = {constantesTrabajos.QUITAR_TUTOR} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => botonQuitarTutorOnClic(i)}
                                        className = {clases.botoncitos}
                                        disabled = {(fechaFinalizacion || tutor.desde === fechaAprobacion)  ? true : false}
                                    >
                                        <GoTrashcan />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Grid>

                        <Grid item lg = {1} sm = {1} xs = {1}>
                            <Tooltip title = {constantesTrabajos.MODIFICAR_RAZON} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => mostrarVentanaDialogo(true, i)}
                                        className = {clases.botoncitos}
                                        disabled = {(fechaFinalizacion || tutor.razon === null)  ? true : false}
                                    >
                                        <RiEditLine />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Grid>                                
                    </Fragment>
                ))
            }
        </>
    )
}

export default Tutores;
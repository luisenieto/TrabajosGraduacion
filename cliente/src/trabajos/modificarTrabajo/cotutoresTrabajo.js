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
import { constantesTrabajos } from '../../config/constantes';
import {CgPlayListAdd} from 'react-icons/cg';
import {GoTrashcan} from 'react-icons/go';
import {RiEditLine} from 'react-icons/ri';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';

//Componente que se encarga de mostrar el campo para el cotutor del trabajo en el formulario
const Cotutores = () => {
    const {trabajo, setearTrabajo} = useContext(ProviderContext);
    const {cotutores, fechaAprobacion, fechaFinalizacion} = trabajo;
    //cotutores: cotutores del trabajo [{apellidos: 'xx', nombres : 'xx', dni: xx, desde : 'xx', hasta : 'xx', razon : 'xx'}]
    const {profesores} = useContext(ProviderContext);
    //profesores: listado de todos los profesores (para armar la lista con todos los profesores para el Autocomplete)
       
    const clases = useStyles();

    //formatea la fecha con el formato DD/MM/YYYY
    const formatearFecha = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

    const autoCompleteOnChange = (valor, posicion) => {
        const cotutoresUpdate = [...cotutores];

        const posComa = valor.indexOf(',');
        const posParentesisApertura = valor.indexOf('(');        

        cotutoresUpdate[posicion].apellidos = valor.substring(0, posComa).trim();
        cotutoresUpdate[posicion].nombres = valor.substring(posComa + 2, posParentesisApertura - 1).trim();
        cotutoresUpdate[posicion].dni = parseInt(valor.substring(posParentesisApertura + 1, valor.length - 1).trim());

        setearTrabajo({...trabajo, cotutores : cotutoresUpdate});
    }
    //cada vez que se modifica el cotutor

    const mostrarVentanaDialogo = (seEstaModificando, posicion) => {
        const cotutoresUpdate = [...cotutores];
        
        cotutoresUpdate[posicion].abierto = true;
        cotutoresUpdate[posicion].seEstaModificando = seEstaModificando;
        cotutoresUpdate[posicion].razonOriginal = cotutoresUpdate[posicion].razon;
        setearTrabajo({...trabajo, cotutores : cotutoresUpdate});
    }
    //cuando se agrega un cotutor

    const botonQuitarCotutorOnClic = (posicion) => {
        const cotutoresUpdate = [...cotutores];

        cotutoresUpdate.splice(posicion, 1);
        setearTrabajo({...trabajo, cotutores : cotutoresUpdate});
    }
    //cuando se quita un cotutor

    const botonCancelarClic = (posicion) => {
        const cotutoresUpdate = [...cotutores];

        cotutoresUpdate[posicion].abierto = false;
        cotutoresUpdate[posicion].razon = cotutoresUpdate[posicion].razonOriginal;
        setearTrabajo({...trabajo, cotutores : cotutoresUpdate});
    };
    //cuando se selecciona el botón Cancelar al agregar un cotutor

    const botonAceptarClic = (posicion) => {
        const cotutoresUpdate = [...cotutores];

        if(cotutoresUpdate[posicion].seEstaModificando) { //modificación de la razón
            if (cotutoresUpdate[posicion].razon === '') {
                cotutoresUpdate[posicion].hasta = null;
                cotutoresUpdate[posicion].razon = null;
            }
        }
        else { //se está agregando otro cotutor
            cotutoresUpdate[posicion].hasta = new Date();
            const nuevoCotutor = {
                apellidos : null,
                nombres : null,
                dni : null,
                desde : cotutoresUpdate[posicion].hasta,
                hasta : null,
                razon : null,
                abierto : false, 
                seEstaModificando : false,
                razonOriginal : ''
            }
            cotutoresUpdate.push(nuevoCotutor);
        }
        cotutoresUpdate[posicion].abierto = false;
            
        setearTrabajo({...trabajo, cotutores : cotutoresUpdate});
    };
    //cuando se selecciona el botón Aceptar al agregar un cotutor

    const txtOnChange = (evento, posicion) => {
        const cotutoresUpdate = [...cotutores];

        cotutoresUpdate[posicion].razon = evento.target.value;
        setearTrabajo({...trabajo, cotutores : cotutoresUpdate});       
    }    
    //cuando se está escribiendo la razón

    const defaultProps = {
        options: profesores.map((profesor) => `${profesor.apellidos}, ${profesor.nombres} (${profesor.dni})`),
    };

    return (
        <>
            {
                cotutores.length > 0 ?
                    <Grid item xs = {12}>
                        <Divider>
                            <Chip label = {constantesTrabajos.COTUTORES} />                                    
                        </Divider>
                    </Grid>
                :
                    null
            }
            {
                cotutores.map((cotutor, i) => (
                    <Fragment key = {i}>                        
                        <Grid item lg = {3} sm = {12} xs = {12}>
                            <Autocomplete 
                                {...defaultProps}
                                disabled = {fechaFinalizacion ? true : false}
                                isOptionEqualToValue = {(option, value) => option.value === value.value}
                                // disablePortal
                                disableClearable
                                // id = "combo-box-cotutores"
                                //sx = {{width : 350}}
                                renderInput = {(params) => <TextField {...params} label = {constantesTrabajos.COTUTOR} />} 
                                value = {cotutor.apellidos ?
                                        `${cotutor.apellidos}, ${cotutor.nombres} (${cotutor.dni})`
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
                                value = {cotutor.desde ? 
                                    formatearFecha(cotutor.desde)
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
                                value = {cotutor.hasta !== null ?
                                    formatearFecha(cotutor.hasta)
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
                                value = {cotutor.razon ? cotutor.razon : ''}
                                className = {clases.campoRazon}
                            />
                        </Grid>
                        <Grid item lg = {1} sm = {1} xs = {1}>
                            <Tooltip title = {constantesTrabajos.CAMBIAR_COTUTOR} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => mostrarVentanaDialogo(false, i)}
                                        className = {clases.botoncitos}
                                        disabled = {(fechaFinalizacion || cotutor.razon !== null) ? true : false}
                                    >
                                        <CgPlayListAdd />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Dialog open = {cotutor.abierto ? cotutor.abierto : false} onClose = {() => botonCancelarClic()}>
                                <DialogTitle>{constantesTrabajos.CAMBIAR_COTUTOR}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {constantesTrabajos.CAMBIAR_COTUTOR_RAZON}
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin = "dense"
                                        id = "razon"
                                        label = {constantesTrabajos.RAZON}
                                        fullWidth
                                        value = {cotutor.razon ? cotutor.razon : ''}
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
                            <Tooltip title = {constantesTrabajos.QUITAR_COTUTOR} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => botonQuitarCotutorOnClic(i)}
                                        className = {clases.botoncitos}
                                        disabled = {(fechaFinalizacion || cotutor.desde === fechaAprobacion) ? true : false}
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
                                        disabled = {(fechaFinalizacion || cotutor.razon === null) ? true : false}
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

export default Cotutores;
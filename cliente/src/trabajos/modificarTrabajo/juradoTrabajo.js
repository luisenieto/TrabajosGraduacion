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

//Componente que se encarga de mostrar los campos para el jurado del trabajo en el formulario
const Jurado = ({trabajo, setearTrabajo}) => {
    const {jurado, fechaAprobacion, fechaFinalizacion} = trabajo;
    //jurado: jurado del trabajo [{apellidos: 'xx', nombres : 'xx', dni: xx, desde : 'xx', hasta : 'xx', razon : 'xx'}]
    const {profesores} = useContext(ProviderContext);
    //profesores: listado de todos los profesores (para armar la lista con todos los profesores para el Autocomplete)
      
    const clases = useStyles();

    //formatea la fecha con el formato DD/MM/YYYY
    const formatearFecha = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

    const autoCompleteOnChange = (valor, posicion) => {
        const juradoUpdate = [...jurado];

        const posComa = valor.indexOf(',');
        const posParentesisApertura = valor.indexOf('(');        

        juradoUpdate[posicion].apellidos = valor.substring(0, posComa).trim();
        juradoUpdate[posicion].nombres = valor.substring(posComa + 2, posParentesisApertura - 1).trim();
        juradoUpdate[posicion].dni = parseInt(valor.substring(posParentesisApertura + 1, valor.length - 1).trim());

        setearTrabajo({...trabajo, jurado : juradoUpdate});
    }
    //cada vez que se modifica un miembro del jurado

    const mostrarVentanaDialogo = (seEstaModificando, posicion) => {
        const juradoUpdate = [...jurado];
        
        juradoUpdate[posicion].abierto = true;
        juradoUpdate[posicion].seEstaModificando = seEstaModificando;
        juradoUpdate[posicion].razonOriginal = juradoUpdate[posicion].razon;
        setearTrabajo({...trabajo, jurado : juradoUpdate});
    }
    //cuando se agrega un miembro al jurado

    const botonQuitarJuradoOnClic = (posicion) => {
        const juradoUpdate = [...jurado];

        juradoUpdate.splice(posicion, 1);
        setearTrabajo({...trabajo, jurado : juradoUpdate});
    }
    //cuando se quita un miembro del jurado

    const botonCancelarClic = (posicion) => {
        const juradoUpdate = [...jurado];

        juradoUpdate[posicion].abierto = false;
        juradoUpdate[posicion].razon = juradoUpdate[posicion].razonOriginal;
        setearTrabajo({...trabajo, jurado : juradoUpdate});
    };
    //cuando se selecciona el botón Cancelar cuando se agrega un miembro al jurado

    const botonAceptarClic = (posicion) => {
        const juradoUpdate = [...jurado];

        if(juradoUpdate[posicion].seEstaModificando) { //modificación de la razón
            if (juradoUpdate[posicion].razon === '') {
                juradoUpdate[posicion].hasta = null;
                juradoUpdate[posicion].razon = null;
            }
        }
        else { //se está agregando otro tutor
            juradoUpdate[posicion].hasta = new Date();
            const nuevoJurado = {
                apellidos : null,
                nombres : null,
                dni : null,
                desde : juradoUpdate[posicion].hasta,
                hasta : null,
                razon : null,
                abierto : false, 
                seEstaModificando : false,
                razonOriginal : ''
            }
            juradoUpdate.push(nuevoJurado);
        }
        juradoUpdate[posicion].abierto = false;
            
        setearTrabajo({...trabajo, jurado : juradoUpdate});
    };
    //cuando se selecciona el botón Aceptar cuando se agrega un miembro al jurado

    const txtOnChange = (evento, posicion) => {
        const juradoUpdate = [...jurado];

        juradoUpdate[posicion].razon = evento.target.value;
        setearTrabajo({...trabajo, jurado : juradoUpdate});     
    }   
    //cuando se está escribiendo la razón 

    const defaultProps = {
        options: profesores.map((profesor) => `${profesor.apellidos}, ${profesor.nombres} (${profesor.dni})`),
    };

    return (
        <>
            <Grid item xs = {12}>
                <Divider>
                    <Chip label = {constantesTrabajos.JURADO} />                                    
                </Divider>
            </Grid>
            {
                jurado.map((jurado, i) => (
                    <Fragment key = {i}>                        
                        <Grid item lg = {3} sm = {12} xs = {12}>
                            <Autocomplete 
                                {...defaultProps}
                                disabled = {fechaFinalizacion ? true : false}
                                isOptionEqualToValue = {(option, value) => option.value === value.value}
                                // disablePortal
                                disableClearable
                                // id = "combo-box-jurado"
                                //sx = {{width : 350}}
                                renderInput = {(params) => <TextField {...params} label = {constantesTrabajos.JURADO} />} 
                                value = {jurado.apellidos ?
                                        `${jurado.apellidos}, ${jurado.nombres} (${jurado.dni})`
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
                                value = {jurado.desde ?
                                    formatearFecha(jurado.desde)
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
                                value = {jurado.hasta !== null ?
                                    formatearFecha(jurado.hasta)
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
                                value = {jurado.razon ? jurado.razon : ''}
                                className = {clases.campoRazon}
                            />
                        </Grid>
                        <Grid item lg = {1} sm = {1} xs = {1}>
                            <Tooltip title = {constantesTrabajos.CAMBIAR_JURADO} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => mostrarVentanaDialogo(false, i)}
                                        className = {clases.botoncitos}
                                        disabled = {(fechaFinalizacion || jurado.razon !== null) ? true : false}
                                    >
                                        <CgPlayListAdd />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Dialog open = {jurado.abierto ? jurado.abierto : false} onClose = {() => botonCancelarClic()}>
                                <DialogTitle>{constantesTrabajos.CAMBIAR_JURADO}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {constantesTrabajos.CAMBIAR_JURADO_RAZON}
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin = "dense"
                                        id = "razon"
                                        label = {constantesTrabajos.RAZON}
                                        fullWidth
                                        value = {jurado.razon ? jurado.razon : ''}
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
                            <Tooltip title = {constantesTrabajos.QUITAR_JURADO} placement = 'top'>
                                <span>
                                    <IconButton
                                        size = 'small'
                                        onClick = {() => botonQuitarJuradoOnClic(i)}
                                        className = {clases.botoncitos}
                                        disabled = {(fechaFinalizacion || jurado.desde === fechaAprobacion) ? true : false}
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
                                        disabled = {(fechaFinalizacion || jurado.razon === null) ? true : false}
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

export default Jurado;
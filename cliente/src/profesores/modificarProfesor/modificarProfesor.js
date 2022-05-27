import React, {useContext, useState} from 'react';
import { ProviderContext } from '../../provider';
import useStyles from '../useStyles';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { constantesProfesores, constantesTrabajos} from '../../config/constantes';
import { useHistory } from "react-router-dom";
import Alerta from '../alerta';
import Popup from './popup';
import { apellidoYNombreOnKeyDown, dniOnKeyDown, apellidoYNombreOnPaste, dniOnPaste } from '../validaciones';
import { Autocomplete } from '@mui/material';

//Componente que se encarga de mostrar el formulario para la modificación de profesores
const ModificarProfesor = (props) => {
    const {profesor, estadoAlerta, cargos} = useContext(ProviderContext);
    const [unProfesor, setearUnProfesor] = useState(profesor);

    const [openPopup, setearOpenPopup] = useState({
        mostrar : false,
        texto : ''
    });
    //controla la visibilidad del popup (para confirmar si se guarda la modificación)

    const history = useHistory();
    const clases = useStyles(); 

    const botonCancelar = () => history.push('/profesores/');

    const botonAceptar = () => {        
        setearOpenPopup({
            mostrar : true,
            texto : `${constantesProfesores.MENSAJE_CONFIRMAR_MODIFICACION}`
        })
    }

    const autoCompleteOnChange = (valor) => {   
        for(let i in cargos) {
            if (valor === cargos[i].nombreCargo)
                setearUnProfesor({...unProfesor, 
                    idCargo : cargos[i].idCargo,
                    nombreCargo : cargos[i].nombreCargo
                });
        }        
    }
    //Cada vez que se cambia el cargo en el combo, se actualizan los datos del profesor

    const defaultProps = {
        options: cargos.map((cargo) => `${cargo.nombreCargo}`),
    };

    return (
        <>
            {
                unProfesor && cargos ?
                    <Paper className = {clases.pageContent}>
                        <form>
                        <Grid container spacing = {1}>
                                <Alerta />
                                <Grid item lg = {6} sm = {12} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'Apellidos'
                                        value = {unProfesor.apellidos}
                                        className = {clases.campoApellidos}
                                        inputProps = {{
                                            onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearUnProfesor({...unProfesor, 'apellidos' : evento.target.value})}
                                        onPaste = {evento => apellidoYNombreOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {12} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'Nombres'
                                        value = {unProfesor.nombres}
                                        className = {clases.campoNombres}
                                        inputProps = {{
                                            onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearUnProfesor({...unProfesor, 'nombres' : evento.target.value})}
                                        onPaste = {evento => apellidoYNombreOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField  
                                        InputProps = {{disabled: true}}                                      
                                        variant = 'outlined'
                                        label = 'DNI'
                                        value = {unProfesor.dni}
                                        className = {clases.campoDNI}
                                        inputProps = {{
                                            onKeyDown : (evento) => {dniOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearUnProfesor({...unProfesor, 'dni' : evento.target.value})}
                                        onPaste = {evento => dniOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <Autocomplete 
                                         {...defaultProps}
                                         isOptionEqualToValue = {(option, value) => option.value === value.value}
                                         // disablePortal
                                         disableClearable
                                         // id = "combo-box-tutores"
                                         //sx = {{width : 350}}
                                         renderInput = {(params) => <TextField {...params} label = {constantesProfesores.CARGO} />} 
                                         value = {unProfesor ? unProfesor.nombreCargo : null}
                                         onChange = {(evento, valor) => autoCompleteOnChange(valor)}
                                         className = {clases.autoComplete}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {6}>
                                    <Button 
                                        variant="contained" 
                                        className = {clases.botonAceptar} 
                                        onClick = {() => botonAceptar()}
                                        disabled = {estadoAlerta.botonesInhabilitados}
                                    >
                                        {constantesProfesores.ACEPTAR}                    
                                    </Button>
                                </Grid>            
                                <Grid item lg = {6} sm = {6} xs = {6}>
                                    <Button 
                                        variant="contained" 
                                        className = {clases.botonCancelar} 
                                        onClick = {() => botonCancelar()}
                                        disabled = {estadoAlerta.botonesInhabilitados}
                                    >
                                        {constantesProfesores.CANCELAR}
                                    </Button>
                                </Grid> 
                                <Popup 
                                    titulo = {constantesTrabajos.TITULO_APLICACION}
                                    openPopup = {openPopup}
                                    setearOpenPopup = {setearOpenPopup}
                                    profesor = {unProfesor}
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

export default ModificarProfesor;

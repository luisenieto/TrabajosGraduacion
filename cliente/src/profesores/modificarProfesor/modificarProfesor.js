import React, {useContext, useEffect, useState} from 'react';
import { ProviderContext } from '../../provider';
import useStyles from '../useStyles';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { constantesProfesores, constantesTrabajos} from '../../config/constantes';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Alerta from '../alerta';
import Popup from './popup';
import { esCaracterValido, permitidosParaApeYNom, permitidosParaDNI } from '../validaciones';
import { Autocomplete } from '@mui/material';

//Componente que se encarga de mostrar el formulario para la modificación de profesores
const ModificarProfesor = (props) => {
    const {profesor, setearProfesor} = useContext(ProviderContext);

    const [openPopup, setearOpenPopup] = useState({
        mostrar : false,
        texto : ''
    });
    //controla la visibilidad del popup (para confirmar si se guarda la modificación)

    const [cargos, setCargos] = useState([]);

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
        let ruta = `/api/profesores?id=${_id}`;
        axios.get(ruta).then(response => {
            setearProfesor(response.data);
        });
        ruta = '/api/cargos/listar';
        axios.get(ruta).then(response => setCargos(response.data));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    const botonCancelar = () => history.push('/profesores/');

    const botonAceptar = () => {        
        setearOpenPopup({
            mostrar : true,
            texto : `${constantesProfesores.MENSAJE_CONFIRMAR_MODIFICACION}`
        })
    }

    const apellidoYNombreOnKeyDown = (evento) => {
        var charCode = (evento.which) ? evento.which : evento.keyCode;
        if (!esCaracterValido(charCode, permitidosParaApeYNom))
            evento.preventDefault();
    }
    //Verifica que no se puedan ingresar otros caracteres que no sean los definidos como válidos

    const dniOnKeyDown = (evento) => {
        var charCode = (evento.which) ? evento.which : evento.keyCode;
        if (!esCaracterValido(charCode, permitidosParaDNI))
            evento.preventDefault();
    }
    //Verifica que no se puedan ingresar otros caracteres que no sean los definidos como válidos

    const autoCompleteOnChange = (valor) => {   
        for(let i in cargos) {
            if (valor === cargos[i].nombreCargo)
                setearProfesor({...profesor, 
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
                profesor && cargos ?
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
                                        value = {profesor.apellidos}
                                        className = {clases.campoApellidos}
                                        inputProps = {{
                                            onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearProfesor({...profesor, 'apellidos' : evento.target.value})}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {12} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'Nombres'
                                        value = {profesor.nombres}
                                        className = {clases.campoNombres}
                                        inputProps = {{
                                            onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearProfesor({...profesor, 'nombres' : evento.target.value})}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField  
                                        InputProps = {{disabled: true}}                                      
                                        variant = 'outlined'
                                        label = 'DNI'
                                        value = {profesor.dni}
                                        className = {clases.campoDNI}
                                        inputProps = {{
                                            onKeyDown : (evento) => {dniOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearProfesor({...profesor, 'dni' : evento.target.value})}
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
                                         value = {profesor ? profesor.nombreCargo : null}
                                         onChange = {(evento, valor) => autoCompleteOnChange(valor)}
                                         className = {clases.autoComplete}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {6}>
                                    <Button variant="contained" className = {clases.botonAceptar} onClick = {() => botonAceptar()}
                                    >
                                        {constantesProfesores.ACEPTAR}                    
                                    </Button>
                                </Grid>            
                                <Grid item lg = {6} sm = {6} xs = {6}>
                                    <Button variant="contained" className = {clases.botonCancelar} onClick = {() => botonCancelar()}
                                    >
                                        {constantesProfesores.CANCELAR}
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

export default ModificarProfesor;

import React, {useContext, useState} from 'react';
import { ProviderContext } from '../../provider';
import useStyles from '../useStyles';
import { useHistory } from "react-router-dom";
import { apellidoYNombreOnKeyDown, dniOnKeyDown, apellidoYNombreOnPaste, dniOnPaste } from '../validaciones';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { constantesProfesores } from '../../config/constantes';
import axios from 'axios';
import { Autocomplete } from '@mui/material';
import { validarProfesorParaCreacion } from '../validaciones';
import Alerta from '../alerta';

//Componente que se encarga de mostrar el formulario para la creación, y de la creación de profesores
const NuevoProfesor = () => {
    const {profesores, profesor, setearProfesores, setearProfesor, cargos, estadoAlerta, setEstadoAlerta} = useContext(ProviderContext);
    const [unProfesor, setearUnProfesor] = useState(profesor);

    const clases = useStyles(); 
    const history = useHistory();

    const botonCancelar = () => history.push('/profesores/');

    const botonAceptar = () => {   
        let resultado;
        if ((resultado = validarProfesorParaCreacion(unProfesor, profesores)) !== constantesProfesores.OK) {
            setearProfesor(unProfesor);
            setEstadoAlerta({
                gravedad : 'error',
                titulo : 'Error',
                texto : resultado,
                mostrar : true,
                botonesInhabilitados : true
            });
            return;                
        }  
        const ruta = '/api/profesores/crear';   
        axios.post(ruta, unProfesor).then(response => {
            if (response.status === 200) {
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : `${constantesProfesores.NUEVO_PROFESOR}`,
                    texto : `${constantesProfesores.MENSAJE_NUEVO_PROFESOR} ${response.data.apellidos}, ${response.data.nombres}`,
                    mostrar : true,
                    botonesInhabilitados : true
                });
                let profesoresUpdate = [...profesores];
                profesoresUpdate.push(response.data);
                //se ordenan los profesores por apellido. Si hay 2 con el mismo por nombre
                profesoresUpdate = profesoresUpdate.sort((a, b) => {
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
                setearProfesor(unProfesor);
                setearProfesores(profesoresUpdate); 
            }
        });            
    }

    const defaultProps = {
        options: cargos.map((cargo) => `${cargo.nombreCargo}`),
    };

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

    return (
        <>            
            {
                unProfesor && cargos ?
                    <Paper className = {clases.pageContent}>
                        <form>
                            <Grid container spacing = {1}>                                
                                <Grid item lg = {6} sm = {12} xs = {12}>
                                    <TextField
                                        variant = 'outlined'
                                        label = 'Apellidos'
                                        value = {unProfesor.apellidos}
                                        className = {clases.campoApellidos}
                                        inputProps = {
                                            {
                                                onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)},
                                                disabled : estadoAlerta.botonesInhabilitados ? true : false
                                            }
                                        }
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
                                        inputProps = {
                                            {
                                                onKeyDown : (evento) => {apellidoYNombreOnKeyDown(evento)},
                                                disabled : estadoAlerta.botonesInhabilitados ? true : false
                                            }
                                        }
                                        onChange = {evento => setearUnProfesor({...unProfesor, 'nombres' : evento.target.value})}
                                        onPaste = {evento => apellidoYNombreOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField                                        
                                        variant = 'outlined'
                                        label = 'DNI'
                                        value = {unProfesor.dni}
                                        className = {clases.campoDNI}
                                        inputProps = {
                                            {
                                                onKeyDown : (evento) => {dniOnKeyDown(evento)},
                                                disabled : estadoAlerta.botonesInhabilitados ? true : false
                                            }
                                        }
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
                                         disabled = {estadoAlerta.botonesInhabilitados ? true : false}
                                         renderInput = {(params) => <TextField {...params} label = {constantesProfesores.CARGO} />} 
                                         value = {cargos[profesor.idCargo - 1] ? cargos[profesor.idCargo - 1].nombreCargo : null}
                                         onChange = {(evento, valor) => autoCompleteOnChange(valor)}
                                         className = {clases.autoComplete}
                                    />
                                </Grid>
                                <Alerta />
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
                            </Grid>
                        </form>
                    </Paper>
                :
                    null
            }
        </>
    )
}

export default NuevoProfesor;
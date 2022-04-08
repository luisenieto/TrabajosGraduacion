import React, {useContext, useEffect, useState} from 'react';
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
    const {profesor, setearProfesor, profesores, setearProfesores} = useContext(ProviderContext);
    const [cargos, setCargos] = useState([]);

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
        setearProfesor({
            apellidos : '',
            nombres : '',
            dni : '',
            idCargo : 1
        })
        const ruta = '/api/cargos/listar';
        axios.get(ruta).then(response => setCargos(response.data));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    const botonCancelar = () => history.push('/profesores/');

    const botonAceptar = () => {   
        let resultado;
        if ((resultado = validarProfesorParaCreacion(profesor, profesores)) !== constantesProfesores.OK) {
            setEstadoAlerta({
                gravedad : 'error',
                titulo : 'Error',
                texto : resultado,
                mostrar : true
            });
            return;                
        }  

        const ruta = '/api/profesores/crear';   
        axios.post(ruta, profesor).then(response => {
            if (response.status === 200) {
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : `${constantesProfesores.NUEVO_PROFESOR}`,
                    texto : `${constantesProfesores.MENSAJE_NUEVO_PROFESOR} ${response.data.apellidos}, ${response.data.nombres}`,
                    mostrar : true
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
                setearProfesor({...profesor, 
                    idCargo : cargos[i].idCargo,
                    nombreCargo : cargos[i].nombreCargo
                });
        }        
    }
    //Cada vez que se cambia el cargo en el combo, se actualizan los datos del profesor

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
                                        onPaste = {evento => apellidoYNombreOnPaste(evento)}
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
                                        onPaste = {evento => apellidoYNombreOnPaste(evento)}
                                    />
                                </Grid>
                                <Grid item lg = {6} sm = {6} xs = {12}>
                                    <TextField                                        
                                        variant = 'outlined'
                                        label = 'DNI'
                                        value = {profesor.dni}
                                        className = {clases.campoDNI}
                                        inputProps = {{
                                            onKeyDown : (evento) => {dniOnKeyDown(evento)}
                                        }}
                                        onChange = {evento => setearProfesor({...profesor, 'dni' : evento.target.value})}
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
                                         value = {cargos[profesor.idCargo - 1] ? cargos[profesor.idCargo - 1].nombreCargo : null}
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
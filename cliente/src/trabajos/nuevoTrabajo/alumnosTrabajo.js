import React, {useContext, Fragment} from 'react';
import { Grid } from '@mui/material';
import { ProviderContext } from '../../provider';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Divider } from '@mui/material';
import { Chip } from '@mui/material';
import useStyles from '../useStyles';
import { constantesTrabajos } from '../../config/constantes';

//Componente que se encarga de mostrar los campos para los alumnos del trabajo en el formulario
const Alumnos = () => {
    const {trabajo, setearTrabajo} = useContext(ProviderContext);
    const alumnosTrabajo = trabajo.alumnos;
    
    //alumnosTrabajo: alumnos del trabajo [{apellidos: 'xx', nombres : 'xx', dni: xx, desde : 'xx', hasta : 'xx', razon : 'xx'}]
    const {alumnos} = useContext(ProviderContext);
    //alumnos: listado de todos los alumnos (para armar la lista con todos los alumnos para el Autocomplete)
    const clases = useStyles();

    const autoCompleteOnChange = (valor, posicion) => {
        if (valor) {
            const alumnosTrabajoUpdate = [...alumnosTrabajo];

            const posComa = valor.indexOf(',');
            const posParentesisApertura = valor.indexOf('(');        

            alumnosTrabajoUpdate[posicion].apellidos = valor.substring(0, posComa).trim();
            alumnosTrabajoUpdate[posicion].nombres = valor.substring(posComa + 2, posParentesisApertura - 1).trim();
            alumnosTrabajoUpdate[posicion].dni = parseInt(valor.substring(posParentesisApertura + 1, valor.length - 1).trim());

            setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});
        }
        else {
            const alumnosTrabajoUpdate = [...alumnosTrabajo];

            alumnosTrabajoUpdate[posicion].apellidos = null;
            alumnosTrabajoUpdate[posicion].nombres = null;
            alumnosTrabajoUpdate[posicion].dni = null;

            setearTrabajo({...trabajo, alumnos : alumnosTrabajoUpdate});
        }
    }
    //cada vez que se modifica un alumno

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
                        <Grid item lg = {4} sm = {4} xs = {12}>
                            <Autocomplete 
                                {...defaultProps}
                                isOptionEqualToValue = {(option, value) => option.value === value.value}
                                // disablePortal
                                clearOnEscape
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
                    </Fragment>
                ))
            }
        </>
    )
}

export default Alumnos;
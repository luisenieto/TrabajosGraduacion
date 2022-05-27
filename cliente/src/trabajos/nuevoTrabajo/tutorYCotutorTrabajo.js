import React, {useContext} from 'react';
import { Grid } from '@mui/material';
import { ProviderContext } from '../../provider';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Divider } from '@mui/material';
import { Chip } from '@mui/material';
import useStyles from '../useStyles';
import {constantesTrabajos} from '../../config/constantes';

//Componente que se encarga de mostrar los campos para el tutor y cotutor del trabajo en el formulario
const TutorYCotutor = ({trabajo, setearTrabajo}) => {    
    const {tutores, cotutores} = trabajo;
    //tutores: tutores del trabajo [{apellidos: 'xx', nombres : 'xx', dni: xx, desde : 'xx', hasta : 'xx', razon : 'xx'}]
    const {profesores} = useContext(ProviderContext);
    //profesores: listado de todos los profesores (para armar la lista con todos los profesores para el Autocomplete)    
           
    const clases = useStyles();

    const autoCompleteOnChange = (valor, quien) => {
        if (valor) {
            const posComa = valor.indexOf(',');
            const posParentesisApertura = valor.indexOf('(');        
        
            if (quien === 'tutor') {
                const tutoresUpdate = [...tutores];

                tutoresUpdate[0].apellidos = valor.substring(0, posComa).trim();
                tutoresUpdate[0].nombres = valor.substring(posComa + 2, posParentesisApertura - 1).trim();
                tutoresUpdate[0].dni = parseInt(valor.substring(posParentesisApertura + 1, valor.length - 1).trim());

                setearTrabajo({...trabajo, tutores : tutoresUpdate});
            }
            else {
                const cotutoresUpdate = [...cotutores];

                cotutoresUpdate[0].apellidos = valor.substring(0, posComa).trim();
                cotutoresUpdate[0].nombres = valor.substring(posComa + 2, posParentesisApertura - 1).trim();
                cotutoresUpdate[0].dni = parseInt(valor.substring(posParentesisApertura + 1, valor.length - 1).trim());
                setearTrabajo({...trabajo, cotutores : cotutoresUpdate});
            }
        }
        else { //si valor === null es porque se borró el cotutor
            const cotutoresUpdate = [...cotutores];

            cotutoresUpdate[0].apellidos = null;
            cotutoresUpdate[0].nombres = null;
            cotutoresUpdate[0].dni = null;
            setearTrabajo({...trabajo, cotutores : cotutoresUpdate});

        }
    }
    //cada vez que se modifica un tutor/cotutor
    
    const defaultProps = {
        options: profesores.map((profesor) => `${profesor.apellidos}, ${profesor.nombres} (${profesor.dni})`),
    };
    
    return (
        <>
            <Grid item xs = {12}>
                <Divider>
                    <Chip label = {constantesTrabajos.TUTOR_COTUTOR} />                                    
                </Divider>
            </Grid> 
            <Grid item lg = {4} sm = {4} xs = {12}>
                <Autocomplete 
                    {...defaultProps}
                    isOptionEqualToValue = {(option, value) => option.value === value.value}
                    // disablePortal
                    disableClearable
                    // id = "combo-box-tutores"
                    //sx = {{width : 350}}
                    renderInput = {(params) => <TextField {...params} label = {constantesTrabajos.TUTOR} />} 
                    value = {tutores[0].apellidos ?
                            `${tutores[0].apellidos}, ${tutores[0].nombres} (${tutores[0].dni})`
                        :
                            null
                    }
                    onChange = {(evento, valor) => autoCompleteOnChange(valor, 'tutor')}
                    className = {clases.autoComplete}
                />
            </Grid>
            <Grid item lg = {4} sm = {4}  xs = {12}>
            </Grid>
            <Grid item lg = {4} sm = {4}  xs = {12}>
                <Autocomplete 
                    {...defaultProps}
                    isOptionEqualToValue = {(option, value) => option.value === value.value}
                    clearOnEscape                        
                    // id = "combo-box-tutores"
                    //sx = {{width : 350}}
                    renderInput = {(params) => <TextField {...params} label = {constantesTrabajos.COTUTOR} />} 
                    value = {cotutores[0] && cotutores[0].apellidos ?
                            `${cotutores[0].apellidos}, ${cotutores[0].nombres} (${cotutores[0].dni})`
                        :
                            null
                    }
                    onChange = {(evento, valor) => autoCompleteOnChange(valor, 'cotutor')}
                    className = {clases.autoComplete}
                />                
            </Grid>                                                                
        </>
    )
}

export default TutorYCotutor;
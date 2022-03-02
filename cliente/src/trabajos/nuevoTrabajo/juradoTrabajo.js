import React, {useContext, Fragment} from 'react';
import { Grid } from '@mui/material';
import { ProviderContext } from '../../provider';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Divider } from '@mui/material';
import { Chip } from '@mui/material';
import useStyles from '../useStyles';
import { constantesTrabajos } from '../../config/constantes';

//Componente que se encarga de mostrar los campos para el jurado del trabajo en el formulario
const Jurado = () => {
    const {trabajo, setearTrabajo} = useContext(ProviderContext);
    const {jurado} = trabajo;
    //jurado: jurado del trabajo [{apellidos: 'xx', nombres : 'xx', dni: xx, desde : 'xx', hasta : 'xx', razon : 'xx'}]
    const {profesores} = useContext(ProviderContext);
    //profesores: listado de todos los profesores (para armar la lista con todos los profesores para el Autocomplete)
       
    const clases = useStyles();

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
                        <Grid item lg = {4} sm = {4} xs = {12}>
                            <Autocomplete 
                                {...defaultProps}
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
                    </Fragment>
                ))
            }
        </>
    )
}

export default Jurado;
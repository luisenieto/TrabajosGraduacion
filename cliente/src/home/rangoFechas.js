import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { ProviderContext } from '../provider';
import { TextField } from '@mui/material';
import useStyles from './useStyles';
import Tema from '../tema';
import { constantesTrabajos } from '../config/constantes';

const RangoFechas = () => {
    const classes = useStyles(Tema);
    const { desdeAnio, setearDesdeAnio, hastaAnio, setearHastaAnio } = useContext(ProviderContext);

    //genera, para el AutoComplete, un vector con números consecutivos, comenzando en desde y terminando en hasta
    //AutoComplete no soporta números, por lo que se los convierte a cadena
    const rango = (desde, hasta) => {
        return Array(hasta - desde + 1).fill().map((_, idx) => (desde + idx).toString());
    }

    const autoCompleteOnChange = (valor, quien) => {
        if (quien === 'Desde') {
            if (parseInt(valor) <= hastaAnio) //para evitar que desde > hasta
                setearDesdeAnio(parseInt(valor));
        }
        else { //hasta
            if (parseInt(valor) >= desdeAnio) //para evitar que hasta < desde
                setearHastaAnio(parseInt(valor));                
        }
    }

    const defaultProps = {
        options: rango(constantesTrabajos.ANIO_PRIMER_TRABAJO, new Date().getFullYear())
    };

    return (
        <>
            <Grid item lg = {4} sm = {4} xs = {4}>
                <Autocomplete 
                    {...defaultProps}
                    isOptionEqualToValue = {(option, value) => option.value === value.value}
                    // disablePortal
                    disableClearable
                    id = "combo-box-desde"
                    renderInput = {(params) => <TextField {...params} label = { constantesTrabajos.DESDE } />} 
                    value = { desdeAnio.toString() }
                    onChange = {(evento, valor) => autoCompleteOnChange(valor, constantesTrabajos.DESDE)}
                    className = {classes.autoComplete}
                />
            </Grid>
            <Grid item lg = {4} sm = {4}  xs = {4}>
            </Grid>
            <Grid item lg = {4} sm = {4} xs = {4}>
                <Autocomplete 
                    {...defaultProps}
                    isOptionEqualToValue = {(option, value) => option.value === value.value}
                    // disablePortal
                    disableClearable
                    id = "combo-box-hasta"
                    renderInput = {(params) => <TextField {...params} label = {constantesTrabajos.HASTA} />} 
                    value = { hastaAnio.toString() }
                    onChange = {(evento, valor) => autoCompleteOnChange(valor, constantesTrabajos.HASTA)}
                    className = {classes.autoComplete}
                />
            </Grid>
        </>
    )
}

export default RangoFechas;
import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { ProviderContext } from '../provider';
import { TextField } from '@mui/material';
import useStyles from './useStyles';
import Tema from '../tema';
import { constantesTrabajos } from '../config/constantes';

//Componente que muestra los 2 autocomplete para elegir el rango de fechas para mostrar el gráfico de totales de trabajos
const RangoFechas = () => {
    const classes = useStyles(Tema);
    const { desdeAnio, setearDesdeAnio, hastaAnio, setearHastaAnio } = useContext(ProviderContext);

    useEffect(() => {
        //el código a continuación se ejecuta cuando se desmonta el componente
        //permite resetear los valores para desde y hasta
        return () => {
            setearDesdeAnio(constantesTrabajos.ANIO_PRIMER_TRABAJO);
            setearHastaAnio(new Date().getFullYear());
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps 
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío        


    //genera, para el AutoComplete, un vector con números consecutivos, comenzando en desde y terminando en hasta
    //AutoComplete no soporta números, por lo que se los convierte a cadena
    const rango = (desde, hasta) => {
        return Array(hasta - desde + 1).fill().map((_, idx) => (desde + idx).toString());
    }

    const autoCompleteOnChange = (valor, quien) => {
        quien === constantesTrabajos.DESDE ? 
            setearDesdeAnio(parseInt(valor))
        :
            setearHastaAnio(parseInt(valor));
    }

    const defaultPropsDesde = {
        options: rango(constantesTrabajos.ANIO_PRIMER_TRABAJO, new Date().getFullYear())
    };
    //valores para mostrar en la lista 'Desde'

    const defaultPropsHasta = {
        options: rango(desdeAnio, new Date().getFullYear())
    };
    //valores para mostrar en la lista 'Hasta'
    //arranca a partir del valor seleccionado en la lista 'Desde'
    //para evitar que el año hasta sea menor que el desde

    return (
        <>
            <Grid item lg = {4} sm = {4} xs = {4}>
                <Autocomplete 
                    {...defaultPropsDesde}
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
                    {...defaultPropsHasta}
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
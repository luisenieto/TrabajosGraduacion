import React, {useState, useContext} from 'react';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import useStyles from '../useStyles';
import { constantesTrabajos } from '../../config/constantes';
import { ProviderContext } from '../../provider';

//Componente que se encarga de mostrar los campos para la duración, áreas y fechas del trabajo en el formulario
const DuracionAreasYFechas = ({trabajo, setearTrabajo}) => {     
    const {estadoAlerta} = useContext(ProviderContext);       
    //const {trabajo, setearTrabajo} = useContext(ProviderContext);
    const {duracion, areas, fechaPresentacion, fechaAprobacion} = trabajo;

    const [valorFechaPresentacion, setearValorFechaPresentacion] = useState(fechaPresentacion ? fechaPresentacion : null);
    //maneja el datepicker fechaPresentacion

    const [valorFechaAprobacion, setearValorFechaAprobacion] = useState(fechaAprobacion ? fechaAprobacion : null);
    //maneja el datepicker fechaAprobacion

    let arrayIdAreas = [...Array(3)];
    //se crea un vector de 3 elementos
    areas !== null && areas.includes('1') ? arrayIdAreas[0] = '1' : arrayIdAreas[0] = '0';
    //si una de las áreas del trabajo es la 1 (Hardware), el primer elemento del vector es '1', si no '0'
    areas !== null && areas.includes('2') ? arrayIdAreas[1] = '2' : arrayIdAreas[1] = '0';
    //si una de las áreas del trabajo es la 2 (Redes), el segundo elemento del vector es '2', si no '0'
    areas !== null && areas.includes('3') ? arrayIdAreas[2] = '3' : arrayIdAreas[2] = '0';
    //si una de las áreas del trabajo es la 3 (Software), el tercer elemento del vector es '3', si no '0'


    const clases = useStyles();    

    const tieneEstaArea = (numeroArea) => (
        arrayIdAreas[numeroArea - 1] === numeroArea.toString() ? true : false
    )
    //devuelve true si arrayIdAreas contiene el número de área especificado

    const checkBoxChange = (seleccionada, numeroArea) => {        
        arrayIdAreas[numeroArea - 1] = seleccionada ? numeroArea.toString() : '0';
        let areasCadena = null;
        if (arrayIdAreas[0] === '1')
            areasCadena = arrayIdAreas[0];
        if (arrayIdAreas[1] === '2')
            areasCadena = areasCadena === null ? areasCadena = arrayIdAreas[1] : areasCadena + ',' + arrayIdAreas[1];
        if (arrayIdAreas[2] === '3')
            areasCadena = areasCadena === null ? areasCadena = arrayIdAreas[2] : areasCadena + ',' + arrayIdAreas[2];
        setearTrabajo({...trabajo, 'areas' : areasCadena});
    }
    //Cada vez que se selecciona/deselecciona un área, la cadena areasCadena queda con las áreas seleccionadas, separadas por comas
    //por ejemplo, si se seleccionan las áreas Hardware (1) y Redes (2), quedaría como [1,2]
    //si luego se deselecciona Redes y se selecciona Software (3), quedaría como [1,3]

    const fechaPresentacionChange = (valor) => {
        try {
            //valor es una cadena de la forma: Fri Feb 01 0002 00:00:00 GMT-0420 (hora estándar de Argentina)
            const fecha = valor.toISOString();
            //fecha es una cadena de la forma: 0002-02-01T04:20:52.000Z
            const anio = parseInt(fecha.substring(0, 4));
            setearValorFechaPresentacion(valor);
            if (anio >= 1000) //anio de 4 dígitos
                setearTrabajo({...trabajo, fechaPresentacion : fecha})            
                //sólo cuando la fecha tiene 4 dígitos para el año se la guarda
        }
        catch(error) {
            setearValorFechaPresentacion(valor);
        }                        
    }
    //como la fecha también se puede escribir, una fecha como 01/02/2 es válida, pero sería 01/02/0002
    //se quiere tomar como válida una fecha que al escribirla se especifiquen los 4 dígitos del año

    const fechaAprobacionChange = (valor) => {
        try {
            const fecha = valor.toISOString();
            const anio = parseInt(fecha.substring(0, 4));
            setearValorFechaAprobacion(valor);
            if (anio >= 1000) //anio de 4 dígitos
                setearTrabajo({...trabajo, fechaAprobacion : fecha})            
        }
        catch(error) {
            setearValorFechaAprobacion(valor);
        }                        
    }
    //ídem anterior pero para la fecha de aprobación

    return (
        <>
            <Grid item lg = {1} sm = {2} xs = {12} >
                <TextField
                    variant = 'outlined'
                    label = {constantesTrabajos.DURACION}
                    type = 'Number'
                    InputLabelProps = {{
                        shrink: true
                    }}
                    InputProps = {estadoAlerta.botonesInhabilitados ? {disabled: true} : {disabled: false}}
                    value = {duracion}
                    onChange = {evento => setearTrabajo({...trabajo, duracion: evento.target.value})}
                    className = {clases.campoDuracion}
                />
            </Grid>
            <Grid item lg = {2} sm = {2} xs = {4}>
                <FormControlLabel
                    control = {<Checkbox disabled = {estadoAlerta.botonesInhabilitados ? true : false}/>}
                    label = {constantesTrabajos.HARDWARE}
                    className = {clases.checkBox}
                    checked = {tieneEstaArea(1)}
                    onChange = {evento => checkBoxChange(evento.target.checked, 1)}
                />
            </Grid>
            <Grid item lg = {2} sm = {2} xs = {4}>
                <FormControlLabel
                    control = {<Checkbox disabled = {estadoAlerta.botonesInhabilitados ? true : false}/>}
                    label = {constantesTrabajos.REDES}
                    className = {clases.checkBox}
                    checked = {tieneEstaArea(2)}
                    onChange = {evento => checkBoxChange(evento.target.checked, 2)}
                />
            </Grid>
            <Grid item lg = {2} sm = {2} xs = {4}>
                <FormControlLabel
                    control = {<Checkbox disabled = {estadoAlerta.botonesInhabilitados ? true : false}/>}
                    label = {constantesTrabajos.SOFTWARE}
                    className = {clases.checkBox}
                    checked = {tieneEstaArea(3)}
                    onChange = {evento => checkBoxChange(evento.target.checked, 3)}
                />
            </Grid>
            <Grid item lg = {2} sm = {2} xs = {6}>
                <LocalizationProvider dateAdapter = {DateAdapter} locale = {esLocale}>
                    <DatePicker
                        disabled = {estadoAlerta.botonesInhabilitados ? true : false}                   
                        label = {constantesTrabajos.PRESENTACION}
                        value = {valorFechaPresentacion}
                        className = {clases.datePicker}
                        onChange = {valor => fechaPresentacionChange(valor)}
                        renderInput={(params) => <TextField {...params} />}                         
                    />
                </LocalizationProvider>
            </Grid>            
            <Grid item lg = {2} sm = {2} xs = {6}>
                <LocalizationProvider dateAdapter = {DateAdapter} locale = {esLocale}>
                    <DatePicker
                        disabled = {estadoAlerta.botonesInhabilitados ? true : false}                   
                        label = {constantesTrabajos.APROBACION}
                        value = {valorFechaAprobacion}
                        className = {clases.datePicker}
                        onChange = {valor => fechaAprobacionChange(valor)}
                        renderInput={(params) => <TextField {...params} />}                        
                    />
                </LocalizationProvider>
            </Grid>
        </>
    )
}

export default DuracionAreasYFechas;
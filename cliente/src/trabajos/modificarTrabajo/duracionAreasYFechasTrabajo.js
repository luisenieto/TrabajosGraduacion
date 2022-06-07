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
    const {duracion, areas, fechaPresentacion, fechaAprobacion, fechaFinalizacion} = trabajo;
    const [valorFechaFinalizacion, setearValorFechaFinalizacion] = useState(fechaFinalizacion ? fechaFinalizacion : null);
    //maneja el datepicker fechaFinalizacion

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

    const modificarFechaFinalizacion = (valor) => {
        if (valor) { //hay un valor para la fecha de finalización, pero no necesariamente una fecha completa
            try { //si hay un valor, hay que ver si el mismo representa una fecha completa
                const fecha = valor.toISOString();
                const anio = parseInt(fecha.substring(0, 4));
                setearValorFechaFinalizacion(fecha);
                if (anio >= 1000) //sólo cuando el año tiene 4 dígitos se asigna el valor
                    asignarFechaFinalizacion(fecha)
                else {
                    quitarFechaFinalizacion();
                    setearValorFechaFinalizacion('');
                }                
            }   
            catch(error) { //valor no representa una fecha completa
                quitarFechaFinalizacion();
                setearValorFechaFinalizacion('');
            }
        }
        else  //no hay un valor para la fecha de finalización
            quitarFechaFinalizacion();
    }

    const asignarFechaFinalizacion = (fecha) => {
        const trabajoUpdate = {...trabajo};
        for (let i in trabajoUpdate.tutores) {
            if (trabajoUpdate.tutores[i].razon === null) {
                trabajoUpdate.tutores[i].hasta = fecha;
                trabajoUpdate.tutores[i].razon = constantesTrabajos.FINALIZACION;
            }
        }
        for (let i in trabajoUpdate.cotutores) {
            if (trabajoUpdate.cotutores[i].razon === null) {
                trabajoUpdate.cotutores[i].hasta = fecha;
                trabajoUpdate.cotutores[i].razon = constantesTrabajos.FINALIZACION;
            }
        }
        for (let i in trabajoUpdate.jurado) {
            if (trabajoUpdate.jurado[i].razon === null) {
                trabajoUpdate.jurado[i].hasta = fecha;
                trabajoUpdate.jurado[i].razon = constantesTrabajos.FINALIZACION;
            }
        }
        for (let i in trabajoUpdate.alumnos) {
            if (trabajoUpdate.alumnos[i].razon === null) {
                trabajoUpdate.alumnos[i].hasta = fecha;
                trabajoUpdate.alumnos[i].razon = constantesTrabajos.FINALIZACION;
            }
        }
        setearTrabajo({...trabajoUpdate, fechaFinalizacion : fecha});                    

    }

    const quitarFechaFinalizacion = () => {
        const trabajoUpdate = {...trabajo};
        for (let i in trabajoUpdate.tutores) {
            if (trabajoUpdate.tutores[i].razon === constantesTrabajos.FINALIZACION) {
                trabajoUpdate.tutores[i].hasta = null;
                trabajoUpdate.tutores[i].razon = null;
            }
        }
        for (let i in trabajoUpdate.cotutores) {
            if (trabajoUpdate.cotutores[i].razon === constantesTrabajos.FINALIZACION) {
                trabajoUpdate.cotutores[i].hasta = null;
                trabajoUpdate.cotutores[i].razon = null;
            }
        }
        for (let i in trabajoUpdate.jurado) {
            if (trabajoUpdate.jurado[i].razon === constantesTrabajos.FINALIZACION) {
                trabajoUpdate.jurado[i].hasta = null;
                trabajoUpdate.jurado[i].razon = null;
            }
        }
        for (let i in trabajoUpdate.alumnos) {
            if (trabajoUpdate.alumnos[i].razon === constantesTrabajos.FINALIZACION) {
                trabajoUpdate.alumnos[i].hasta = null;
                trabajoUpdate.alumnos[i].razon = null;
            }
        }
        setearTrabajo({...trabajoUpdate, fechaFinalizacion : ''});
    }

    return (
        <>            
            <Grid item lg = {1} sm = {2} xs = {12}>
                <TextField
                    InputProps = {fechaFinalizacion || estadoAlerta.botonesInhabilitados ? {disabled: true} : {disabled: false}}
                    variant = 'outlined'
                    label = {constantesTrabajos.DURACION}
                    type = 'Number'
                    InputLabelProps = {{
                        shrink: true
                    }}
                    value = {duracion}
                    onChange = {evento => setearTrabajo({...trabajo, duracion: evento.target.value})}
                    className = {clases.campoDuracion}
                />
            </Grid>
            <Grid item lg = {2} sm = {3} xs = {4}>
                <FormControlLabel
                    control = {<Checkbox disabled = {fechaFinalizacion || estadoAlerta.botonesInhabilitados ? true : false}/>}
                    label = {constantesTrabajos.HARDWARE}
                    className = {clases.checkBox}
                    checked = {tieneEstaArea(1)}
                    onChange = {evento => checkBoxChange(evento.target.checked, 1)}
                />
            </Grid>
            <Grid item lg = {1} sm = {3} xs = {4}>
                <FormControlLabel
                    control = {<Checkbox disabled = {fechaFinalizacion || estadoAlerta.botonesInhabilitados ? true : false}/>}
                    label = {constantesTrabajos.REDES}
                    className = {clases.checkBox}
                    checked = {tieneEstaArea(2)}
                    onChange = {evento => checkBoxChange(evento.target.checked, 2)}
                />
            </Grid>
            <Grid item lg = {2} sm = {3} xs = {4}>
                <FormControlLabel
                    control = {<Checkbox disabled = {fechaFinalizacion || estadoAlerta.botonesInhabilitados ? true : false}/>}
                    label = {constantesTrabajos.SOFTWARE}
                    className = {clases.checkBox}
                    checked = {tieneEstaArea(3)}
                    onChange = {evento => checkBoxChange(evento.target.checked, 3)}
                />
            </Grid> 
            <Grid item lg = {2} xs = {4}>
                <LocalizationProvider dateAdapter = {DateAdapter} locale = {esLocale}>
                    <DatePicker
                        disabled = {true}
                        label = {constantesTrabajos.PRESENTACION}
                        value = {fechaPresentacion ? fechaPresentacion : null}
                        onChange = {() => {}}
                        // onChange = {valor => 
                        //     valor ?
                        //         setearTrabajo({...trabajo, fechaPresentacion : valor.toISOString()})
                        //     :
                        //         setearTrabajo({...trabajo, fechaPresentacion : valor})
                        //     } 
                            //toISOString(): convierte a formato UTC
                        renderInput={(params) => <TextField {...params} />}
                        //className = {clases.datePicker}                        
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item lg = {2} xs = {4}>
                <LocalizationProvider dateAdapter = {DateAdapter} locale = {esLocale}>
                    <DatePicker
                        disabled = {true}
                        label = {constantesTrabajos.APROBACION}
                        value = {fechaAprobacion ? fechaAprobacion : null}
                        onChange = {() => {}}
                        // onChange = {valor => 
                        //     valor ? 
                        //         setearTrabajo({...trabajo, fechaAprobacion : valor.toISOString()})
                        //     :
                        //         setearTrabajo({...trabajo, fechaAprobacion : valor})
                        // } 
                        //toISOString(): convierte a formato UTC
                        renderInput={(params) => <TextField {...params} />}
                        //className = {clases.datePicker}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item lg = {2} xs = {4}>
                <LocalizationProvider dateAdapter = {DateAdapter} locale = {esLocale}>
                    <DatePicker         
                        disabled = {fechaFinalizacion || estadoAlerta.botonesInhabilitados ? true : false}                   
                        label = {constantesTrabajos.FINALIZACION}
                        //value = {fechaFinalizacion ? fechaFinalizacion : null}  
                        value = {valorFechaFinalizacion}
                        onChange = {valor => modificarFechaFinalizacion(valor)}
                        renderInput={(params) => <TextField {...params} />}
                        //className = {clases.datePicker}
                    />
                </LocalizationProvider>
            </Grid> 
        </>
    )
}

export default DuracionAreasYFechas;
import React, {useState, useContext} from 'react';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { constantesAlumnos, constantesTrabajos } from '../config/constantes';
import useStyles from './useStyles';
import axios from 'axios';
import { ProviderContext } from '../provider';

const FiltrarPorTrabajos = () => {
    const {alumnos, setAlumnosFiltrados} = useContext(ProviderContext);

    const opcionesParaFiltrar = [constantesAlumnos.FILTRAR_POR_TODOS, 
                                 constantesAlumnos.FILTRAR_POR_SIN_FINALIZAR,
                                 constantesAlumnos.FILTRAR_POR_FINALIZADOS
                                ];
    //vector con los valores de las opciones para filtrar los alumnos
    
    const [opcionFiltradoAlumnos, setearOpcionFiltradoAlumnos] = useState(opcionesParaFiltrar[0]);
    //por defecto, se muestran todos los alumnos

    const autoCompleteOnChange = valor => {
        let alumnosFiltradosUpdate = [];
        let ruta;
        switch(valor) {
            case constantesAlumnos.FILTRAR_POR_TODOS :
                setAlumnosFiltrados(alumnos);
                break;
            case constantesAlumnos.FILTRAR_POR_SIN_FINALIZAR :
                ruta = '/api/trabajos/listarsinfinalizar';
                axios.get(ruta).then(response => {                      
                    for(let i in response.data) {
                        const alumnos = response.data[i].alumnos;                        
                        for(let j in alumnos) {
                            if (alumnos[j].razon === null)
                                alumnosFiltradosUpdate.push(obtenerAlumno(alumnos[j].dni));
                        }
                    }
                    setAlumnosFiltrados(alumnosFiltradosUpdate);
                });           
                break;
            default :
                ruta = '/api/trabajos/listarfinalizados';
                axios.get(ruta).then(response => {   
                    for(let i in response.data) {
                        const alumnos = response.data[i].alumnos;
                        for(let j in alumnos) {
                            if (alumnos[j].razon === constantesTrabajos.FINALIZACION)
                                alumnosFiltradosUpdate.push(obtenerAlumno(alumnos[j].dni));
                        }
                    }
                    setAlumnosFiltrados(alumnosFiltradosUpdate);
                });      
                break;
        }
        setearOpcionFiltradoAlumnos(valor);
    }

    //devuelve el alumno con el dni especificado
    const obtenerAlumno = (dni) => {
        return alumnos.find(alumno => alumno.dni === dni);
    }

    const clases = useStyles(); 

    return (
        <Autocomplete 
            options = {opcionesParaFiltrar}
            isOptionEqualToValue = {(option, value) => option.value === value.value}
            disableClearable
            id = "combo-box-filtrar"
            renderInput = {(params) => <TextField {...params} label = { constantesAlumnos.FILTRAR_POR } />} 
            value = {opcionFiltradoAlumnos}
            onChange = {(evento, valor) => autoCompleteOnChange(valor)}
            className = {clases.autoCompleteFiltrar}
        />
    )
}

export default FiltrarPorTrabajos;

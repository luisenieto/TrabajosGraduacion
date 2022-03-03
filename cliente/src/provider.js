import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { constantesTrabajos } from './config/constantes';

export const ProviderContext = createContext();

const Provider = ({children}) => {
    const [trabajos, setearTrabajos] = useState([]);
    //todos los trabajos

    const [profesores, setearProfesores] = useState([]);
    //todos los profesores

    const [alumnos, setearAlumnos] = useState([]);
    //todos los alumnos

    const [trabajo, setearTrabajo] = useState(null);
    //un trabajo en particular

    const [alumno, setearAlumno] = useState(null);
    //un alumno en particular

    const [profesor, setearProfesor] = useState(null);
    //un profesor en particular

    const [areas, setearAreas] = useState([]);
    //todas las áreas

    const [totalesTrabajos, setearTotalesTrabajos] = useState([]);
    //array con los totales de trabajos discriminados por áreas 
    
    const [desdeAnio, setearDesdeAnio] = useState(constantesTrabajos.ANIO_PRIMER_TRABAJO); //2013
    //año a partir del cual hacer los cálculos de los totales (el trabajo más viejo es del 2013)

    const [hastaAnio, setearHastaAnio] = useState(new Date().getFullYear());
    //año hasta el cual hacer los cálculos de los totales (año actual)

    const [cantidadTrabajosParaGrafico, setearCantidadTrabajosParaGrafico] = useState(0);
    //tiene la cantidad total de trabajos que muestra el gráfico
    //se actualiza cada vez que se ejecuta el efecto que calcula los totales
    //no uso trabajos.length porque el gráfico puede estar filtrando trabajos por un rango menor de fechas

    useEffect(() => {
        if (profesores.length === 0) 
             obtenerProfesores();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío        

    const obtenerProfesores = () => {
        const ruta = '/api/profesores/listar';
        axios.get(ruta).then(response => {           
            setearProfesores(response.data);
        });
    }     
    
    useEffect(() => {
        if (alumnos.length === 0) 
             obtenerAlumnos();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío        

    const obtenerAlumnos = () => {
        const ruta = '/api/alumnos/listar';
        axios.get(ruta).then(response => {           
            setearAlumnos(response.data);
        });
    }
    
    useEffect(() => {
        if (trabajos.length === 0) 
             obtenerTrabajos();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    //Obtiene todos los trabajos para el rango de fechas dado por desdeAnio y hastaAnio
    const obtenerTrabajos = () => {
        //const ruta = '/api/trabajos/listar';
        const ruta = '/api/trabajos/listarrango?desde=' + desdeAnio.toString() + '&hasta=' + hastaAnio.toString();
        axios.get(ruta).then(response => {  
            setearTrabajos(response.data);
        });
    } 
    
    
    useEffect(() => {
        if (areas.length === 0) 
             obtenerAreas();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    //Obtiene todas las áreas
    const obtenerAreas = () => {
        const ruta = '/api/areas/listar';
        axios.get(ruta).then(response => {  
            setearAreas(response.data);
        });
    } 

    useEffect(() => {
        if (trabajos.length > 0)
            obtenerTotales();
    }, [trabajos, desdeAnio, hastaAnio]); //eslint-disable-line react-hooks/exhaustive-deps 
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    
    
    //obtiene los tales de trabajos, discriminados por áreas, entre el rango de fechas dado por desdeAnio y hastaAnio
    const obtenerTotales = () => {
        let datosTrabajosUpdate = [];

        let cantidadHardware = 0;
        let cantidadRedes = 0;
        let cantidadSoftware = 0;
        let cantidadHardwareRedes = 0;
        let cantidadHardwareSoftware = 0;
        let cantidadRedesSoftware = 0;
        let cantidadHardwareRedesSoftware = 0;
        let cantTrabajosParaGrafico = 0;

        for(let i in trabajos) {            
            if (parseInt(trabajos[i].fechaAprobacion.substring(0, 4)) >= desdeAnio && parseInt(trabajos[i].fechaAprobacion.substring(0, 4)) <= hastaAnio) {
                cantTrabajosParaGrafico++;
                switch(trabajos[i].areas) {                             
                    case '1' : cantidadHardware++;
                        break;
                    case '2' : cantidadRedes++;
                        break;
                    case '3' : cantidadSoftware++;
                        break;  
                    case '1,2' : cantidadHardwareRedes++;
                        break; 
                    case '1,3' : cantidadHardwareSoftware++;
                        break;
                    case '2,3' : cantidadRedesSoftware++;
                        break;
                    default: cantidadHardwareRedesSoftware++;
                        break;
                }
            }
        }

        datosTrabajosUpdate.push({
            "id" : "HW",
            "label" : "H",
            "value" : cantidadHardware
        });
    
        datosTrabajosUpdate.push({
            "id" : "Redes",
            "label" : "R",
            "value" : cantidadRedes
        });
    
        datosTrabajosUpdate.push({
            "id" : "SW",
            "label" : "S",
            "value" : cantidadSoftware
        });
    
        datosTrabajosUpdate.push({
            "id" : "HW y Redes",
            "label" : "H+R",
            "value" : cantidadHardwareRedes
        });
    
        datosTrabajosUpdate.push({
            "id" : "HW y SW",
            "label" : "H+S",
            "value" : cantidadHardwareSoftware
        });
    
        datosTrabajosUpdate.push({
            "id" : "Redes y SW",
            "label" : "R+S",
            "value" : cantidadRedesSoftware
        });
    
        datosTrabajosUpdate.push({
            "id" : "HW, Redes y SW",
            "label" : "H+R+S",
            "value" : cantidadHardwareRedesSoftware
        });

        setearTotalesTrabajos(datosTrabajosUpdate);
        setearCantidadTrabajosParaGrafico(cantTrabajosParaGrafico);
    }

    return (
        <ProviderContext.Provider value = {{
            trabajos,
            setearTrabajos, 
            profesores, 
            setearProfesores,
            alumnos,
            setearAlumnos,
            trabajo,
            setearTrabajo,
            alumno, 
            setearAlumno,
            profesor, 
            setearProfesor,
            areas, 
            setearAreas,
            totalesTrabajos, 
            desdeAnio, 
            setearDesdeAnio,
            hastaAnio, 
            setearHastaAnio,
            cantidadTrabajosParaGrafico
        }}>
            {children}
        </ProviderContext.Provider>
    );
}

export default Provider;

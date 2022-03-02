import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

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

    const [usuarios, setearUsuarios] = useState([]);
    useEffect(() => {
        if (usuarios.length === 0) 
            obtenerUuarios();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío        
    const obtenerUuarios = () => {
        const ruta = '/api/usuarios/listar';
        axios.get(ruta).then(response => {           
            setearUsuarios(response.data);
        });
    }

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

    //Obtiene todos los trabajos 
    const obtenerTrabajos = () => {
        const ruta = '/api/trabajos/listar';
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
    }, [trabajos]); //eslint-disable-line react-hooks/exhaustive-deps 
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    
    
    //obtiene los tales de trabajos discriminados por áreas
    const obtenerTotales = () => {
        let datosTrabajosUpdate = [];

        let cantidadHardware = 0;
        let cantidadRedes = 0;
        let cantidadSoftware = 0;
        let cantidadHardwareRedes = 0;
        let cantidadHardwareSoftware = 0;
        let cantidadRedesSoftware = 0;
        let cantidadHardwareRedesSoftware = 0;

        for(let i in trabajos) {
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
            setearTotalesTrabajos,
            usuarios
        }}>
            {children}
        </ProviderContext.Provider>
    );
}

export default Provider;

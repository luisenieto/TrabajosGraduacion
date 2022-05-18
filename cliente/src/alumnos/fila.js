import React, {useState, Fragment, useContext} from 'react';
import axios from 'axios';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { IconButton } from '@mui/material';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Collapse } from '@mui/material';
import { Box } from '@mui/material';
import TrabajosDelAlumno from './trabajosDelAlumno';
import {RiEditLine} from 'react-icons/ri';
import {GoTrashcan} from 'react-icons/go';
import { RiFileExcel2Line } from 'react-icons/ri';
import { useHistory } from "react-router-dom";
import { estaAutenticado } from '../auth/auth';
import { ProviderContext } from '../provider';
import moment from 'moment';
import ReactExport from "react-export-excel";

//Componente que muestra una fila del cuerpo de la tabla
const Fila = ({unAlumno, setearOpenPopup}) => {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

    const {setearAlumno} = useContext(ProviderContext);
    const [abierto, setAbierto] = useState(false);  
    //maneja el botón flecha arriba/flecha abajo para mostrar los trabajos de un alumno 

    const [trabajosDelAlumno, setearTrabajosDelAlumno] = useState({
        'trabajosDelAlumno' : [],
        'datosExcel' : []
    });
    //tiene todos los trabajos de un alumno en particular (clave trabajosDelAlumno)
    //y los datos para exportar a Excel (clave datosExcel)

    const {_id} = unAlumno;
    const history = useHistory();

    //formatea la fecha en el formato DD/MM/YYYY
    const formatearFecha = (fecha) => {
        return fecha !== null 
        ? 
            moment(fecha).format('DD/MM/YYYY') 
        : 
            '-';
    }

    //Permite ordenar alfabéticamente en orden ascendente o descendente
    function comparador(a, b) {
        if (a['apellidos'] < b['apellidos'])
            return -1;
        if (a['apellidos'] > b['apellidos'])
            return 1;
        return 0;
    }
    

    //obtiene todos los trabajos de un alumno determinado
    //también genera el vector con los datos para exportar los trabajos
    const obtenerTrabajosDelAlumno = () => {
        let datosExcel = [{
            'columns' : [],
            'data' : [[]]
        }];

        if (!abierto) {
            const ruta = `/api/trabajos/listarporalumno?dni=${unAlumno.dni}`;
            axios.get(ruta).then(response => {   
                
                //arma el vector con los datos para exportar a Excel                  
                for(let i in response.data) {
                    datosExcel.push(
                        {
                            'columns' : ['Título'],
                            'data' : [
                                [response.data[i].titulo]
                            ]
                        }
                    );                    
                    datosExcel.push(
                        {
                            'columns' : ['Presentación', 'Aprobación', 'Finalización'],
                            'data' : [
                                [formatearFecha(response.data[i].fechaPresentacion), formatearFecha(response.data[i].fechaAprobacion), formatearFecha(response.data[i].fechaFinalizacion)]
                            ]
                        }
                    );
                    datosExcel.push(
                        {
                            'columns' : ['Tutores'],
                            'data' : [
                                []
                            ]
                        }
                    );
                    let tutores = [];
                    response.data[i].tutores.sort((a, b) => comparador(a, b));
                    for(let j in response.data[i].tutores) {
                        let elementoVectorTutores = [];
                        elementoVectorTutores.push(`${response.data[i].tutores[j].apellidos}, ${response.data[i].tutores[j].nombres}`)
                        elementoVectorTutores.push(formatearFecha(response.data[i].tutores[j].desde));
                        elementoVectorTutores.push(formatearFecha(response.data[i].tutores[j].hasta));
                        elementoVectorTutores.push(response.data[i].tutores[j].razon !== null ? response.data[i].tutores[j].razon : '-');
                        tutores.push(elementoVectorTutores);
                    }
                    datosExcel.push(
                        {
                            ySteps : -1,
                            'columns' : ['Apellido y nombre', 'Desde', 'Hasta', 'Razón'],
                            'data' : tutores
                        }
                    );                    
                    let cotutores = [];
                    response.data[i].cotutores.sort((a, b) => comparador(a, b));
                    for(let j in response.data[i].cotutores) {
                        let elementoVectorCotutores = [];
                        elementoVectorCotutores.push(`${response.data[i].cotutores[j].apellidos}, ${response.data[i].cotutores[j].nombres}`)
                        elementoVectorCotutores.push(formatearFecha(response.data[i].cotutores[j].desde));
                        elementoVectorCotutores.push(formatearFecha(response.data[i].cotutores[j].hasta));
                        elementoVectorCotutores.push(response.data[i].cotutores[j].razon !== null ? response.data[i].cotutores[j].razon : '-');
                        cotutores.push(elementoVectorCotutores);
                    }
                    if (cotutores.length > 0) { //tiene cotutores
                        datosExcel.push(
                            {
                                'columns' : ['Cotutores'],
                                'data' : [
                                    []
                                ]
                            }
                        );
                        datosExcel.push(
                            {
                                ySteps : -1,
                                'columns' : ['Apellido y nombre', 'Desde', 'Hasta', 'Razón'],
                                'data' : cotutores
                            }
                        );
                    }
                    datosExcel.push(
                        {
                            'columns' : ['Jurado'],
                            'data' : [
                                []
                            ]
                        }
                    );
                    let jurado = [];
                    response.data[i].jurado.sort((a, b) => comparador(a, b));
                    for(let j in response.data[i].jurado) {
                        let elementoVectorJurado = [];
                        elementoVectorJurado.push(`${response.data[i].jurado[j].apellidos}, ${response.data[i].jurado[j].nombres}`)
                        elementoVectorJurado.push(formatearFecha(response.data[i].jurado[j].desde));
                        elementoVectorJurado.push(formatearFecha(response.data[i].jurado[j].hasta));
                        elementoVectorJurado.push(response.data[i].jurado[j].razon !== null ? response.data[i].jurado[j].razon : '-');
                        jurado.push(elementoVectorJurado);
                    }
                    datosExcel.push(
                        {
                            ySteps : -1,
                            'columns' : ['Apellido y nombre', 'Desde', 'Hasta', 'Razón'],
                            'data' : jurado
                        }
                    );
                    datosExcel.push(
                        {
                            'columns' : ['Alumnos'],
                            'data' : [
                                []
                            ]
                        }
                    );
                    let alumnos = [];
                    response.data[i].alumnos.sort((a, b) => comparador(a, b));
                    for(let j in response.data[i].alumnos) {
                        let elementoVectorAlumnos = [];
                        elementoVectorAlumnos.push(`${response.data[i].alumnos[j].apellidos}, ${response.data[i].alumnos[j].nombres}`);
                        elementoVectorAlumnos.push(`${response.data[i].alumnos[j].dni}`);
                        elementoVectorAlumnos.push(formatearFecha(response.data[i].alumnos[j].desde));
                        elementoVectorAlumnos.push(formatearFecha(response.data[i].alumnos[j].hasta));
                        elementoVectorAlumnos.push(response.data[i].alumnos[j].razon !== null ? response.data[i].alumnos[j].razon : '-');
                        alumnos.push(elementoVectorAlumnos);
                    }
                    datosExcel.push(
                        {
                            ySteps : -1,
                            'columns' : ['Apellido y nombre', 'DNI', 'Desde', 'Hasta', 'Razón'],
                            'data' : alumnos
                        }
                    );

                    //para dejar un espacio entre trabajo y trabajo
                    datosExcel.push(
                        {
                            ySteps : 1,
                            'columns' : [''],
                            'data' : [['']]
                        }
                    ); 
                }

                setearTrabajosDelAlumno({
                    'trabajosDelAlumno' : response.data,
                    'datosExcel' : datosExcel
                });

                //setearTrabajosDelAlumno(response.data);
            });
        }
        setAbierto(!abierto);            
    }

    //redirige a la ruta del tipo http://localhost:3001/api/alumnos?id=615f24395a137070e292dc5a
    //que permite mostrar un determinado alumno
    const botonEditarClic = (_id) => {
        history.push(`/alumnos/${_id}`);       
    }

    //permite borrar un alumno
    const botonBorrarClic = () => {
        if (!estaAutenticado()) {
            history.push('/acceso'); 
        }
        else {
            setearAlumno(unAlumno);
            setearOpenPopup(true);
        }
    }

    return (
        <Fragment>
            <TableRow
                hover                            
                sx = {{'&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell sx = {{maxWidth : 5}}>
                    <IconButton
                        aria-label = "expand row"
                        size = "small"
                        onClick = {() => obtenerTrabajosDelAlumno()}
                    >
                        {abierto ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell sx = {{maxWidth : 5}}>                        
                    <IconButton
                        size = 'small'
                        onClick = {() => botonEditarClic(_id)}
                    >
                        <RiEditLine />
                    </IconButton>                        
                </TableCell>  
                <TableCell sx = {{maxWidth : 5}}>
                    <IconButton
                        size = 'small'
                        onClick = {() => botonBorrarClic()}
                    >
                        <GoTrashcan />
                    </IconButton>
                </TableCell>   
                <TableCell sx = {{maxWidth : 5}}>
                    <ExcelFile filename = {`Estadisticas-${unAlumno.apellidos}-${unAlumno.nombres}`} element = {
                        <IconButton 
                            aria-label = "exportar a Excel"
                            size = "small"                        
                            disabled = {(abierto && trabajosDelAlumno.trabajosDelAlumno.length > 0) ? false : true}
                        >
                            <RiFileExcel2Line />
                        </IconButton>
                    }>
                        <ExcelSheet dataSet = {trabajosDelAlumno.datosExcel} name = 'Detalle' />
                    </ExcelFile>
                </TableCell>                
                <TableCell align = 'left' sx = {{maxWidth : 60}}>{unAlumno.apellidos}</TableCell>
                <TableCell align = 'left' sx = {{maxWidth : 60}}>{unAlumno.nombres}</TableCell>
                <TableCell align = 'center' sx = {{maxWidth : 30}}>{unAlumno.dni}</TableCell>
                <TableCell align = 'center' sx = {{maxWidth : 30}}>{unAlumno.cx}</TableCell>                                           
            </TableRow>
            <TableRow>
                <TableCell style = {{ paddingBottom: 0, paddingTop: 0 }} colSpan = {8}>
                    <Collapse in = {abierto} timeout = "auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <TrabajosDelAlumno 
                                alumno = {unAlumno}
                                trabajosDelAlumno = {trabajosDelAlumno.trabajosDelAlumno}
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>            
        </Fragment>
    )
} 


export default Fila;
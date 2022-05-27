import React, {useState, Fragment, useContext} from 'react';
import axios from 'axios';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { IconButton } from '@mui/material';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Collapse } from '@mui/material';
import { Box } from '@mui/material';
import TrabajosDelProfesor from './trabajosDelProfesor';
import {RiEditLine} from 'react-icons/ri';
import {GoTrashcan} from 'react-icons/go';
import { RiFileExcel2Line } from 'react-icons/ri';
import { useHistory } from "react-router-dom";
import { estaAutenticado } from '../auth/auth';
import { ProviderContext } from '../provider';
import moment from 'moment';
import ReactExport from "react-export-excel";

//Componente que muestra una fila del cuerpo de la tabla
const Fila = ({unProfesor, setearOpenPopup}) => {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

    const {setearProfesor} = useContext(ProviderContext);
    const [abierto, setAbierto] = useState(false);       
    //maneja el botón flecha arriba/flecha abajo para mostrar los trabajos de un profesor 

    const [trabajosDelProfesor, setearTrabajosDelProfesor] = useState({
        'trabajosDelProfesor' : [],
        'datosExcel' : []
    });
    //tiene todos los trabajos de un profesor en particular (clave trabajosDelProfesor)
    //y los datos para exportar a Excel (clave datosExcel)

    const history = useHistory();
    const {_id} = unProfesor;
    
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

    //obtiene todos los trabajos de un profesor determinado
    //también genera el vector con los datos para exportar los trabajos
    const obtenerTrabajosDelProfesor = () => {
        let datosExcel = [];
        if (!abierto) {
            const ruta = `/api/trabajos/listarporprofesor?dni=${unProfesor.dni}`;
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

                setearTrabajosDelProfesor({
                    'trabajosDelProfesor' : response.data,
                    'datosExcel' : datosExcel
                });
            });                
        }
        setAbierto(!abierto);            
    }

    //redirige a la ruta del tipo http://localhost:3001/api/profesores?id=615f24395a137070e292dc5a
    //que permite mostrar un determinado profesor
    const botonEditarClic = (_id) => {
        setearProfesor(unProfesor);
        history.push(`/profesores/${_id}`);       
    }

    //permite borrar un profesor
    const botonBorrarClic = () => {
        if (!estaAutenticado()) {
            history.push('/acceso'); 
        }
        else {                      
            setearProfesor(unProfesor);
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
                        onClick = {() => obtenerTrabajosDelProfesor()}
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
                    <ExcelFile filename = {`Estadisticas-${unProfesor.apellidos}-${unProfesor.nombres}`} element = {
                        <IconButton 
                            aria-label = "exportar a Excel"
                            size = "small"                        
                            disabled = {abierto ? false : true}
                        >
                            <RiFileExcel2Line />
                        </IconButton>
                    }>
                        <ExcelSheet dataSet = {trabajosDelProfesor.datosExcel} name = 'Detalle' />
                    </ExcelFile>
                </TableCell>
                <TableCell align = 'left' sx = {{maxWidth : 60}}>{unProfesor.apellidos}</TableCell>
                <TableCell align = 'left' sx = {{maxWidth : 60}}>{unProfesor.nombres}</TableCell>
                <TableCell align = 'center' sx = {{maxWidth : 30}}>{unProfesor.dni}</TableCell>
                <TableCell align = 'center' sx = {{maxWidth : 30}}>{unProfesor.nombreCargo}</TableCell>
            </TableRow> 
            <TableRow>
                <TableCell style = {{ paddingBottom: 0, paddingTop: 0 }} colSpan = {8}>
                    <Collapse in = {abierto} timeout = "auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <TrabajosDelProfesor 
                                profesor = {unProfesor}
                                trabajosDelProfesor = {trabajosDelProfesor.trabajosDelProfesor}
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
} 

export default Fila;
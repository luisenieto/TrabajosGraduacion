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
import { useHistory } from "react-router-dom";
import { estaAutenticado } from '../auth/auth';
import { ProviderContext } from '../provider';

//Componente que muestra una fila del cuerpo de la tabla
const Fila = ({alumno, setearOpenPopup}) => {
    const {setearAlumno} = useContext(ProviderContext);
    const [abierto, setAbierto] = useState(false);  
    //maneja el botón flecha arriba/flecha abajo para mostrar los trabajos de un alumno 

    const [trabajosDelAlumno, setearTrabajosDelAlumno] = useState([]);
    //tiene todos los trabajos de un alumno en particular

    const {_id} = alumno;
    const history = useHistory();

    //obtiene todos los trabajos de un alumno determinado
    const obtenerTrabajosDelAlumno = () => {
        if (!abierto) {
            const ruta = `/api/trabajos/listarporalumno?dni=${alumno.dni}`;
            axios.get(ruta).then(response => {                     
                setearTrabajosDelAlumno(response.data);
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
            setearAlumno(alumno);
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
                <TableCell>                        
                    <IconButton
                        size = 'small'
                        onClick = {() => botonEditarClic(_id)}
                    >
                        <RiEditLine />
                    </IconButton>                        
                </TableCell>  
                <TableCell>
                    <IconButton
                        size = 'small'
                        onClick = {() => botonBorrarClic()}
                    >
                        <GoTrashcan />
                    </IconButton>
                </TableCell>   
                <TableCell align = 'left'>{alumno.apellidos}</TableCell>
                <TableCell align = 'left'>{alumno.nombres}</TableCell>
                <TableCell align = 'center'>{alumno.dni}</TableCell>
                <TableCell align = 'center'>{alumno.cx}</TableCell>                                           
            </TableRow>
            <TableRow>
                <TableCell style = {{ paddingBottom: 0, paddingTop: 0 }} colSpan = {7}>
                    <Collapse in = {abierto} timeout = "auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <TrabajosDelAlumno 
                                alumno = {alumno}
                                trabajosDelAlumno = {trabajosDelAlumno}
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>            
        </Fragment>
    )
} 


export default Fila;
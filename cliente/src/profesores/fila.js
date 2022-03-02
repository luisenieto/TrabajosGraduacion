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
import { useHistory } from "react-router-dom";
import { estaAutenticado } from '../auth/auth';
import { ProviderContext } from '../provider';

//Componente que muestra una fila del cuerpo de la tabla
const Fila = ({profesor, setearOpenPopup}) => {
    const {setearProfesor} = useContext(ProviderContext);
    const [abierto, setAbierto] = useState(false);       
    //maneja el botón flecha arriba/flecha abajo para mostrar los trabajos de un profesor 

    const [trabajosDelProfesor, setearTrabajosDelProfesor] = useState([]);
    //tiene todos los trabajos de un profesor en particular

    const history = useHistory();
    const {_id} = profesor;

    //obtiene todos los trabajos de un profesor determinado
    const obtenerTrabajosDelProfesor = () => {
        if (!abierto) {
            const ruta = `/api/trabajos/listarporprofesor?dni=${profesor.dni}`;
            axios.get(ruta).then(response => {                     
                setearTrabajosDelProfesor(response.data);
            });                
        }
        setAbierto(!abierto);            
    }

    //redirige a la ruta del tipo http://localhost:3001/api/profesores?id=615f24395a137070e292dc5a
    //que permite mostrar un determinado profesor
    const botonEditarClic = (_id) => {
        history.push(`/profesores/${_id}`);       
    }

    //permite borrar un profesor
    const botonBorrarClic = () => {
        if (!estaAutenticado()) {
            history.push('/acceso'); 
        }
        else {            
            setearProfesor(profesor);
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
                <TableCell align = 'left'>{profesor.apellidos}</TableCell>
                <TableCell align = 'left'>{profesor.nombres}</TableCell>
                <TableCell align = 'center'>{profesor.dni}</TableCell>
                <TableCell align = 'center'>{profesor.nombreCargo}</TableCell>
            </TableRow> 
            <TableRow>
                <TableCell style = {{ paddingBottom: 0, paddingTop: 0 }} colSpan = {5}>
                    <Collapse in = {abierto} timeout = "auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <TrabajosDelProfesor 
                                profesor = {profesor}
                                trabajosDelProfesor = {trabajosDelProfesor}
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
} 

export default Fila;
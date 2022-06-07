import React, {useState, Fragment, useContext} from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { IconButton } from '@mui/material';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {RiEditLine} from 'react-icons/ri';
import {GoTrashcan} from 'react-icons/go';
import MostrarAreas from './mostrarAreas';
import { Box } from '@mui/material';
import { Collapse } from '@mui/material';
import DatosProfesores from './datosProfesores';
import DatosAlumnos from './datosAlumnos';
import moment from 'moment';
import {constantesTrabajos} from '../config/constantes';
import { useHistory } from "react-router-dom";
import { ProviderContext } from '../provider';
import { estaAutenticado } from '../auth/auth';

//Componente que muestra una fila del cuerpo de la tabla
const Fila = ({trabajo, setearOpenPopup}) => {
    const {setearTrabajo} = useContext(ProviderContext);
    const [abierto, setAbierto] = useState(false);
    //maneja el botón flecha arriba/flecha abajo para mostrar el detalle de un trabajo
    const {_id, titulo, fechaPresentacion, fechaAprobacion, fechaFinalizacion, areas} = trabajo;        
    const history = useHistory();

    //formatea la fecha en el formato DD/MM/YYYY
    const formatearFecha = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

    //redirige a la ruta del tipo http://localhost:3001/api/trabajos?id=615f24395a137070e292dc5a
    //que permite mostrar un determinado trabajo
    const botonEditarClic = (_id) => {
        setearTrabajo(trabajo);
        history.push(`/trabajos/${_id}`);       
    }

    //permite borrar un trabajo
    const botonBorrarClic = () => {
        if (!estaAutenticado()) {
            history.push('/acceso'); 
        }
        else {
            setearTrabajo(trabajo);
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
                        onClick = {() => setAbierto(!abierto)}
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
                <TableCell align = 'left' sx = {{maxWidth : 200}}>{titulo}</TableCell>
                <TableCell align = 'center' sx = {{maxWidth : 60}}>
                    <MostrarAreas areasDelTrabajo = {areas} />
                </TableCell>
                <TableCell align = 'left' sx = {{maxWidth : 80}}>{formatearFecha(fechaPresentacion)}</TableCell>
                <TableCell align = 'left' sx = {{maxWidth : 80}}>{formatearFecha(fechaAprobacion)}</TableCell>
                <TableCell align = 'left' sx = {{maxWidth : 70}}>{fechaFinalizacion ? formatearFecha(fechaFinalizacion) : '-'}</TableCell>
            </TableRow> 
            <TableRow>
                <TableCell style = {{ paddingBottom: 0, paddingTop: 0 }} colSpan = {8}>
                    <Collapse in = {abierto} timeout = "auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <DatosProfesores 
                                profesores = {trabajo.tutores}
                                titulo = {constantesTrabajos.TUTORES}
                            />
                            {
                                trabajo.cotutores.length > 0 ?
                                    <DatosProfesores 
                                        profesores = {trabajo.cotutores}
                                        titulo = {constantesTrabajos.COTUTORES}
                                    />
                                :
                                    null
                            }
                            <DatosProfesores 
                                profesores = {trabajo.jurado}
                                titulo = {constantesTrabajos.JURADO}
                            />
                            <DatosAlumnos 
                                alumnos = {trabajo.alumnos}
                                titulo = {constantesTrabajos.ALUMNOS}
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default Fila;
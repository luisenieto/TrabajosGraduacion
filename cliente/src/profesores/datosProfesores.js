import React, {Fragment} from 'react';
import { Typography } from '@mui/material';
import {TableContainer} from '@mui/material';
import { Table } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material'; 
import { TableRow } from '@mui/material';
import { TableBody } from '@mui/material';
import moment from 'moment';

//Componente que permite mostrar los datos de los profesores que participan en un trabajo
const DatosProfesores = ({profesores, titulo}) => {
    
    const Titulo = () => (
        <Typography variant="subtitle2" gutterBottom component="div">
            {titulo}
        </Typography>
    )

    const Cabecera = () => (
        <TableHead>
            <TableRow>
                <TableCell>Apellido y nombre</TableCell>
                <TableCell align = 'center'>Desde</TableCell>
                <TableCell align = 'center'>Hasta</TableCell>
                <TableCell>Razón</TableCell>
            </TableRow>
        </TableHead>
    )

    //formatea la fecha en el formato DD/MM/YYYY
    const formatearFecha = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

     //Permite ordenar alfabéticamente en orden ascendente o descendente
    function comparador(a, b) {
        if (a['apellidos'] < b['apellidos'])
          return -1;
        if (a['apellidos'] > b['apellidos'])
          return 1;
        return 0;
    }

    const Cuerpo = ({profesores}) => (
        <TableBody>
            {
                profesores.sort((a, b) => comparador(a, b)).map((profesor, i) => (
                    <TableRow key = {i}>
                        <TableCell>{`${profesor.apellidos}, ${profesor.nombres}`}</TableCell>
                        <TableCell align = 'center'>{profesor.desde ? formatearFecha(profesor.desde) : '-'}</TableCell>
                        <TableCell align = 'center'>{profesor.hasta ? formatearFecha(profesor.hasta) : '-'}</TableCell>
                        <TableCell>{profesor.razon}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>                
    )

    return (
        <Fragment>
            <Titulo />
            <TableContainer>
                <Table>
                    <Cabecera />
                    <Cuerpo 
                        profesores = {profesores}
                    />
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default DatosProfesores;
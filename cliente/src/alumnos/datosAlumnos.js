import React, {Fragment} from 'react';
import { Typography } from '@mui/material';
import {TableContainer} from '@mui/material';
import { Table } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material'; 
import { TableRow } from '@mui/material';
import { TableBody } from '@mui/material';
import moment from 'moment';

//Componente que permite mostrar los datos de los alumnos que participan en un trabajo
const DatosAlumnos = ({alumno, alumnos, titulo}) => {
    
    const Titulo = () => (
        <Typography variant="subtitle2" gutterBottom component="div">
            {titulo}
        </Typography>
    )

    const Cabecera = () => (
        <TableHead>
            <TableRow>
                <TableCell>Apellido y nombre</TableCell>
                <TableCell align = 'center'>DNI</TableCell>
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

    const Cuerpo = ({alumno, alumnos}) => (
        <TableBody>
            {
                alumnos.sort((a, b) => comparador(a, b)).map((alum, i) => {
                    if (alumno.dni !== alum.dni) {
                        return (
                            <TableRow key = {i}>
                                <TableCell>{`${alum.apellidos}, ${alum.nombres}`}</TableCell>
                                <TableCell align = 'center'>{alum.dni}</TableCell>
                                <TableCell align = 'center'>{alum.desde ? formatearFecha(alum.desde) : '-'}</TableCell>
                                <TableCell align = 'center'>{alum.hasta ? formatearFecha(alum.hasta) : '-'}</TableCell>
                                <TableCell>{alum.razon}</TableCell>
                            </TableRow>
                        )
                    }
                    else
                        return null;
                })
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
                        alumno = {alumno}
                        alumnos = {alumnos}
                    />
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default DatosAlumnos;
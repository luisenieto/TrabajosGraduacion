import React, {Fragment} from 'react';
import { Typography } from '@mui/material';
import {TableContainer} from '@mui/material';
import { Table } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material'; 
import { TableRow } from '@mui/material';
import { TableBody } from '@mui/material';
import moment from 'moment';
import {constantesTrabajos} from '../config/constantes';

//Componente que permite mostrar los datos de los alumnos que participan en un trabajo
const DatosAlumnos = ({alumnos, titulo}) => {
    
    const Titulo = () => (
        <Typography variant="subtitle2" gutterBottom component="div">
            {titulo}
        </Typography>
    )

    const Cabecera = () => (
        <TableHead>
            <TableRow>
                <TableCell>{constantesTrabajos.APEYNOM}</TableCell>
                <TableCell align = 'center'>{constantesTrabajos.DNI}</TableCell>
                <TableCell align = 'center'>{constantesTrabajos.DESDE}</TableCell>
                <TableCell align = 'center'>{constantesTrabajos.HASTA}</TableCell>
                <TableCell>{constantesTrabajos.RAZON}</TableCell>
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

    const Cuerpo = ({alumnos}) => (
        <TableBody>
            {
                alumnos.sort((a, b) => comparador(a, b)).map((alumno, i) => (
                    <TableRow key = {i}>
                        <TableCell>{`${alumno.apellidos}, ${alumno.nombres}`}</TableCell>
                        <TableCell align = 'center'>{alumno.dni}</TableCell>
                        <TableCell align = 'center'>{alumno.desde ? formatearFecha(alumno.desde) : '-'}</TableCell>
                        <TableCell align = 'center'>{alumno.hasta ? formatearFecha(alumno.hasta) : '-'}</TableCell>
                        <TableCell>{alumno.razon}</TableCell>
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
                        alumnos = {alumnos}
                    />
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default DatosAlumnos;
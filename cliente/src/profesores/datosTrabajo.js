import React, {Fragment} from 'react';
import { Typography } from '@mui/material';
import {TableContainer} from '@mui/material';
import { Table } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material'; 
import { TableRow } from '@mui/material';
import { TableBody } from '@mui/material';
import moment from 'moment';

//Componente que permite mostrar el título y fechas de los trabajos de un alumno en particular
const DatosTrabajo = ({titulo, presentacion, aprobacion, finalizacion}) => {

    const TituloTrabajo = ({titulo}) => (
        <Typography variant="subtitle2" gutterBottom component="div">
            {titulo}
        </Typography>
    )

    const CabeceraTrabajo = () => (
        <TableHead>
            <TableRow>
                <TableCell align = 'center'>Presentacion</TableCell>
                <TableCell align = 'center'>Aprobación</TableCell>
                <TableCell align = 'center'>Finalización</TableCell>
            </TableRow>
        </TableHead>
    )

    //formatea la fecha en el formato DD/MM/YYYY
    const formatearFecha = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

    const CuerpoTrabajo = ({presentacion, aprobacion, finalizacion}) => (
        <TableBody>
            <TableRow>
                <TableCell align = 'center'>{formatearFecha(presentacion)}</TableCell>
                <TableCell align = 'center'>{formatearFecha(aprobacion)}</TableCell>
                <TableCell align = 'center'>{finalizacion ? formatearFecha(finalizacion) : '-'}</TableCell>
            </TableRow>
        </TableBody>                
    )

    return (
        <Fragment>
            <TituloTrabajo titulo = {titulo} />
            <TableContainer>
                <Table>
                    <CabeceraTrabajo />
                    <CuerpoTrabajo 
                        presentacion = {presentacion}
                        aprobacion = {aprobacion}
                        finalizacion = {finalizacion}
                    />
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default DatosTrabajo;
import React from 'react';
import { TableHead } from '@mui/material'; 
import { TableRow } from '@mui/material';
import { styled } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableSortLabel } from '@mui/material';
import { Box } from '@mui/material';
import { constantesAlumnos } from '../config/constantes';
import { tableCellClasses } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

//Componente que muestra la cabecera de la tabla donde se listan todos los alumnos
const CabeceraTabla = ({orden, alQuererOrdenar}) => {
    
    //configura el criterio de ordenamiento en asc o desc para ordenar los alumnos
    const createSortHandler = (evento, propiedad) => {
        alQuererOrdenar(evento, propiedad);
    }

    const CeldaConEstilo = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));    

    return (
        <TableHead>
            <TableRow>
                <CeldaConEstilo sx = {{maxWidth : 5}} />
                <CeldaConEstilo sx = {{maxWidth : 5}} />
                <CeldaConEstilo sx = {{maxWidth : 5}} />
                <CeldaConEstilo sx = {{maxWidth : 5}} />
                <CeldaConEstilo sortDirection = {orden} sx = {{maxWidth : 60}}>
                    <TableSortLabel 
                        sx = {{
                            '&.MuiTableSortLabel-root': {
                                color: 'white',
                            },
                            '&.MuiTableSortLabel-root:hover': {
                                color: 'white',
                            },
                            '&.Mui-active': {
                                color: 'white',
                            },
                            '& .MuiTableSortLabel-icon': {
                                color: 'white !important',
                            },
                        }}
                        active = {true} 
                        direction = {orden} 
                        onClick = {(evento) => createSortHandler(evento, 'apellidos')}
                    >
                        {constantesAlumnos.APELLIDOS}
                        <Box component = "span" sx = {visuallyHidden}>
                            {
                                orden === 'desc' ? 
                                    'ordenado descendentemente' 
                                : 
                                    'ordenado ascendentemente'
                            }
                        </Box>                            
                    </TableSortLabel>
                </CeldaConEstilo>
                <CeldaConEstilo sx = {{maxWidth : 60}}>{constantesAlumnos.NOMBRES}</CeldaConEstilo>                    
                <CeldaConEstilo sx = {{maxWidth : 30}}align = 'center'>{constantesAlumnos.DNI}</CeldaConEstilo>                    
                <CeldaConEstilo sx = {{maxWidth : 30}}align = 'center'>{constantesAlumnos.CX}</CeldaConEstilo>                    
            </TableRow>
        </TableHead>
    )
}

export default CabeceraTabla;
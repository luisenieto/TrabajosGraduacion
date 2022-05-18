import React from 'react';
import { styled } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material'; 
import { TableRow } from '@mui/material';
import { TableSortLabel } from '@mui/material';
import { Box } from '@mui/material';
import {constantesTrabajos} from '../config/constantes';
import { visuallyHidden } from '@mui/utils';
import { tableCellClasses } from '@mui/material';

//Componente que muestra la cabecera de la tabla donde se listan todos los trabajos
const CabeceraTabla = ({orden, alQuererOrdenar}) => {
    
    //configura el criterio de ordenamiento en asc o desc para ordenar los trabajos
    const createSortHandler = (evento, propiedad) => {
        alQuererOrdenar(evento, propiedad);
    }

    const CeldaConEstilo = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
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
                <CeldaConEstilo sortDirection = {orden} sx = {{maxWidth : 200}}>
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
                        active = {false} 
                        direction = {orden} 
                        onClick = {(evento) => createSortHandler(evento, 'titulo')}
                    >
                        {constantesTrabajos.TITULO}                            
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
                <CeldaConEstilo sx = {{maxWidth : 20}} align = 'center'>{constantesTrabajos.AREAS} </CeldaConEstilo>
                <CeldaConEstilo sx = {{maxWidth : 20}} align = 'center'>{constantesTrabajos.PRESENTACION} </CeldaConEstilo>                    
                <CeldaConEstilo sortDirection = {orden} sx = {{maxWidth : 20}} align = 'center'>
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
                        onClick = {(evento) => createSortHandler(evento, 'fechaAprobacion')}
                    >
                        {constantesTrabajos.APROBACION}                             
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
                <CeldaConEstilo sortDirection = {orden} sx = {{maxWidth : 20}} align = 'center'>
                    <TableSortLabel active = {false} direction = {orden} onClick = {(evento) => createSortHandler(evento, 'fechaFinalizacion')}>
                        {constantesTrabajos.FINALIZACION}                             
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
            </TableRow>
        </TableHead>
    )
    
}

export default CabeceraTabla;
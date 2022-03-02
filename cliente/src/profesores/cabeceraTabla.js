import React from 'react';
import { TableHead } from '@mui/material'; 
import { TableRow } from '@mui/material';
import { styled } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableSortLabel } from '@mui/material';
import { Box } from '@mui/material';
import { constantesProfesores } from '../config/constantes';
import { tableCellClasses } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

//Componente que muestra la cabecera de la tabla donde se listan todos los profesores
const CabeceraTabla = (props) => {
    const {orden, alQuererOrdenar} = props;        
    
    //configura el criterio de ordenamiento en asc o desc para ordenar los profesores
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
                <CeldaConEstilo sortDirection = {orden}>                    
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
                        {constantesProfesores.APELLIDOS}                            
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
                <CeldaConEstilo>{constantesProfesores.NOMBRES}</CeldaConEstilo>                    
                <CeldaConEstilo align = 'center'>{constantesProfesores.DNI}</CeldaConEstilo>                    
                <CeldaConEstilo align = 'center'>
                    <TableSortLabel active = {false} direction = {orden} onClick = {(evento) => createSortHandler(evento, 'idCargo')}
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
                    >                        
                        {constantesProfesores.CARGO}                            
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
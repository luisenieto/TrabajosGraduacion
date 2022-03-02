import React, {useState} from 'react';
import {TableContainer} from '@mui/material';
import {Paper} from '@mui/material';
import { Table } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import CabeceraTabla from './cabeceraTabla';
import CuerpoTabla from './cuerpoTabla';
import PaginacionTabla from './paginacionTabla';
import useStyles from './useStyles';
import Popup from './popup';
import { constantesAlumnos, constantesTrabajos } from '../config/constantes';
import Alerta from './alerta';

//Componente que muestra todo el listado de alumnos
const Alumnos = (props) => {
    const ordenarPor = 'apellidos';
    //sólo se pueden ordenar los alumnos por apellido

    const [orden, setearOrden] = useState('asc');
    //por defecto, los alumnos se ordenan alfabéticamente

    const [filasPorPagina, setearFilasPorPagina] = useState(10);
    //por defecto se muestran 10 alumnos por página

    const [pagina, setearPagina] = useState(0);
    //para saber en qué página se está (empieza en la 0)

    const [openPopup, setearOpenPopup] = useState(false);
    //controla la visibilidad del popup (pregunta si se confirma el borrado del alumno)

    const [estadoAlerta, setEstadoAlerta] = useState({
        gravedad : 'error',
        titulo : '',
        texto : '',
        mostrar : false
    });
    //controla la visibilidad de la alerta, su tipo y contenido (para los mensajes de error/éxito)

    const clases = useStyles(); 
    
    //configura el criterio de ordenamiento en asc o desc para ordenar los alumnos
    const tratarOrdenamiento = (evento, propiedad) => {
        const esAscendente = ordenarPor === propiedad && orden === 'asc';
        setearOrden(esAscendente ? 'desc' : 'asc');
    }

    return (
        <Box sx = {{marginTop : 3, width : '100%'}}>
            <Paper sx = {{width : '100%', marginBottom : 2}} elevation = {3}>
                <Grid container spacing = {1}>
                    <Alerta 
                        estadoAlerta = {estadoAlerta}
                        setEstadoAlerta = {setEstadoAlerta}
                    />
                    <Grid item xs = {12}>
                        <TableContainer sx = {{ maxHeight: 440 }}>
                            <Table stickyHeader sx = {{minWidth : 750}} aria-labelledby = 'tableTitle' size = 'medium'>
                                <CabeceraTabla 
                                    orden = {orden}
                                    alQuererOrdenar = {(evento, propiedad) => tratarOrdenamiento(evento, propiedad)}
                                >
                                </CabeceraTabla>
                                <CuerpoTabla
                                    ordenarPor = {ordenarPor}
                                    orden = {orden}
                                    pagina = {pagina}
                                    filasPorPagina = {filasPorPagina}                       
                                    setearOpenPopup = {setearOpenPopup}
                                />
                            </Table>
                        </TableContainer>
                        <PaginacionTabla 
                            filasPorPagina = {filasPorPagina}
                            setearFilasPorPagina = {setearFilasPorPagina}
                            pagina = {pagina}
                            setearPagina = {setearPagina}
                        />
                        <Popup 
                            titulo = {constantesTrabajos.TITULO_APLICACION}
                            texto = {constantesAlumnos.MENSAJE_CONFIRMAR_BORRADO}
                            openPopup = {openPopup}
                            setearOpenPopup = {setearOpenPopup}
                            setEstadoAlerta = {setEstadoAlerta}
                        />
                    </Grid>
                    <Grid item xs = {12}>
                        <Button 
                            variant = 'contained' 
                            className = {clases.botonFinal} 
                            onClick = {() => props.history.push('/alumno/nuevo')}
                        >
                            Nuevo Alumno
                        </Button>
                    </Grid>                
                </Grid>
            </Paper>
        </Box>
    )
}

export default Alumnos;
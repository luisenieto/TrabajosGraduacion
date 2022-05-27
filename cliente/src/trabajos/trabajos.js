import React, {useState, useContext, useEffect} from 'react';
import {TableContainer} from '@mui/material';
import {Paper} from '@mui/material';
import { Table } from '@mui/material';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import CabeceraTabla from './cabeceraTabla';
import CuerpoTabla from './cuerpoTabla';
import PaginacionTabla from './paginacionTabla';
import { ProviderContext } from '../provider';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import useStyles from './useStyles';
import Popup from './popup';
import { constantesTrabajos } from '../config/constantes';
import { Chip } from '@mui/material';
import { Stack } from '@mui/material';
import { BsSearch } from 'react-icons/bs';
import { InputAdornment } from '@mui/material';
import FiltrarPorTrabajos from './filtrarPorTrabajos';

//Componente que muestra todo el listado de trabajos
const Trabajos = (props) => {   
    const { cantidadTrabajosPorEstado, setFuncionFiltradoTrabajos, setearTrabajo } = useContext(ProviderContext);

    const [ordenarPor, setearOrdenarPor] = useState('fechaAprobacion');
    //Se pueden ordenar los trabajos por título o fecha de aprobación

    const [orden, setearOrden] = useState('desc');
    //por defecto, los trabajos se ordenan por título alfabéticamente en orden inverso

    const [filasPorPagina, setearFilasPorPagina] = useState(10);
    //por defecto se muestran 10 trabajos por página

    const [pagina, setearPagina] = useState(0);
    //para saber en qué página se está (empieza en la 0)

    const [openPopup, setearOpenPopup] = useState(false);
    //controla la visibilidad del popup (pregunta si se confirma el borrado del trabajo)

    const clases = useStyles(); 
    
    //configura el criterio de ordenamiento en asc o desc para ordenar los trabajos
    const tratarOrdenamiento = (evento, propiedad) => {
        const esAscendente = ordenarPor === propiedad && orden === 'asc';
        setearOrden(esAscendente ? 'desc' : 'asc');
        setearOrdenarPor(propiedad);
    }

    useEffect(() => {
        //el código a continuación se ejecuta cuando se desmonta el componente
        //permite volver a mostrar todos los trabajos
        return () => {
            setFuncionFiltradoTrabajos({
                funcion : items => {                  
                    return items;
                }
            });
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps 
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío        


    const buscarOnChange = evento => {
        let valor = evento.target.value;
        setFuncionFiltradoTrabajos({
            funcion : items => {
                if (valor === '')
                    return items;
                else
                    return items.filter(x => x.titulo.toLowerCase().includes(valor.toLowerCase()));
            }
        });
    }

    return (
        <Box sx = {{marginTop : 3, width : '100%'}}>                                
            <Paper sx = {{width : '100%', marginBottom : 2}} elevation = {3}>
                <Grid container spacing = {1}>
                    <Grid item lg = {6} sm = {12} xs = {12}>
                        <TextField 
                            id = "buscar-por-titulo"
                            label = "Buscar por título"
                            name = "buscar-por-titulo"
                            autoFocus
                            InputProps = {{
                                startAdornment : (
                                    <InputAdornment position="start">
                                        <BsSearch />
                                    </InputAdornment>
                                )
                            }}
                            className = {clases.campoBuscar}
                            onChange = {evento => buscarOnChange(evento)}
                        />
                    </Grid> 
                    <Grid item lg = {6} sm = {12} xs = {12}>
                        <FiltrarPorTrabajos />
                    </Grid>                   
                    <Grid item xs = {12}>
                        <TableContainer sx = {{ maxHeight: 400 }}>
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
                            texto = {constantesTrabajos.MENSAJE_CONFIRMAR_BORRADO}
                            openPopup = {openPopup}
                            setearOpenPopup = {setearOpenPopup}
                        />
                    </Grid>
                    <Grid item xs = {12}>
                        <Button 
                            variant = 'contained' 
                            className = {clases.botonFinal}
                            onClick = {() => {
                                setearTrabajo({
                                    titulo : '',
                                    duracion : '',
                                    areas : '',
                                    fechaPresentacion : '',
                                    fechaAprobacion : '',
                                    fechaFinalizacion : '',
                                    tutores : [{
                                        apellidos : null,
                                        nombres : null,
                                        dni : null,
                                        desde : null,
                                        hasta : null,
                                        razon : null
                                    }],
                                    cotutores : [{
                                        apellidos : null,
                                        nombres : null,
                                        dni : null,
                                        desde : null,
                                        hasta : null,
                                        razon : null
                                    }],
                                    jurado : [{
                                        apellidos : null,
                                        nombres : null,
                                        dni : null,
                                        desde : null,
                                        hasta : null,
                                        razon : null
                                    },
                                    {
                                        apellidos : null,
                                        nombres : null,
                                        dni : null,
                                        desde : null,
                                        hasta : null,
                                        razon : null
                                    },
                                    {
                                        apellidos : null,
                                        nombres : null,
                                        dni : null,
                                        desde : null,
                                        hasta : null,
                                        razon : null
                                    }],
                                    alumnos : [{
                                        apellidos : null,
                                        nombres : null,
                                        dni : null,
                                        desde : null,
                                        hasta : null,
                                        razon : null
                                    },
                                    {
                                        apellidos : null,
                                        nombres : null,
                                        dni : null,
                                        desde : null,
                                        hasta : null,
                                        razon : null
                                    },
                                    {
                                        apellidos : null,
                                        nombres : null,
                                        dni : null,
                                        desde : null,
                                        hasta : null,
                                        razon : null
                                    }]
                                });
                                props.history.push('/trabajo/nuevo');
                            }}
                        >
                            Nuevo Trabajo
                        </Button>
                    </Grid>
                    <Grid item xs = {12}>
                        <Stack alignItems = 'center'>
                        <Chip label = {`Total: ${cantidadTrabajosPorEstado.cantidadTrabajos}    -   Finalizados: ${cantidadTrabajosPorEstado.cantidadFinalizados}   -   Cancelados: ${cantidadTrabajosPorEstado.cantidadCancelados} -   Sin terminar: ${cantidadTrabajosPorEstado.cantidadSinTerminar}`} variant="outlined" />
                        </Stack>
                    </Grid>
                    <Grid item xs = {12}>
                    </Grid>                 
                </Grid>                                                        
            </Paper>            
        </Box>
    )
}

export default Trabajos;
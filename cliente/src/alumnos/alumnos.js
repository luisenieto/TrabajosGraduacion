import React, {useState, useContext, useEffect} from 'react';
import {TableContainer} from '@mui/material';
import {Paper} from '@mui/material';
import { Table } from '@mui/material';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import CabeceraTabla from './cabeceraTabla';
import CuerpoTabla from './cuerpoTabla';
import PaginacionTabla from './paginacionTabla';
import useStyles from './useStyles';
import Popup from './popup';
import { constantesAlumnos, constantesTrabajos } from '../config/constantes';
import Alerta from './alerta';
import { ProviderContext } from '../provider';
import { BsSearch } from 'react-icons/bs';
import { InputAdornment } from '@mui/material';
import FiltrarPorTrabajos from './filtrarPorTrabajos';

//Componente que muestra todo el listado de alumnos
const Alumnos = (props) => {
    const {setFuncionFiltradoAlumnos, setearAlumno} = useContext(ProviderContext);

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

    useEffect(() => {
        //el código a continuación se ejecuta cuando se desmonta el componente
        //permite volver a mostrar todos los alumnos
        return () => {
            setFuncionFiltradoAlumnos({
                funcion : items => {                  
                    return items;
                }
            });
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps 
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío        

    const clases = useStyles(); 
    
    //configura el criterio de ordenamiento en asc o desc para ordenar los alumnos
    const tratarOrdenamiento = (evento, propiedad) => {
        const esAscendente = ordenarPor === propiedad && orden === 'asc';
        setearOrden(esAscendente ? 'desc' : 'asc');
    }

    //setFuncionFiltradoAlumnos() guarda un objeto que tiene la definición de una función
    //esta función recibe un conjunto de valores (items)
    //Si lo que hay en el campo de búsqueda está vacío devuelve todos los ítems
    //y si no, devuelve los ítems que contengan lo que está en el campo de texto
    //Entonces, si ítems vale el vector con todos los alumnos
    //la función lo devolverá entero si no hay nada en el campo de búsqueda
    //u otro vector donde todos los alumnos tengan un apellido que contenga lo que hay en el campo de búsqueda
    //CuerpoTabla es quien manda el vector de alumnos
    const buscarOnChange = evento => {
        let valor = evento.target.value;
        setFuncionFiltradoAlumnos({
            funcion : items => {
                if (valor === '')
                    return items;
                else
                    return items.filter(x => x.apellidos.toLowerCase().includes(valor.toLowerCase()));
            }
        });
    }
         
    return (
        <Box sx = {{marginTop : 3, width : '100%'}}>
            <Paper sx = {{width : '100%', marginBottom : 2}} elevation = {3}>
                <Grid container spacing = {1}>
                    <Alerta /> 
                    <Grid item lg = {6} sm = {12} xs = {12}> 
                        <TextField 
                            id = "buscar-por-apellido"
                            label = "Buscar por apellido"
                            name = "buscar-por-apellido"
                            autoFocus
                            InputProps = {{
                                startAdornment : (
                                    <InputAdornment position="start">
                                        <BsSearch />
                                    </InputAdornment>
                                )
                            }}
                            className = {clases.campoBuscar}
                            onChange = {evento => buscarOnChange(evento)}/>
                    </Grid>
                    <Grid item lg = {6} sm = {12} xs = {12}>
                        <FiltrarPorTrabajos />
                    </Grid>
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
                        />
                    </Grid>
                    <Grid item xs = {12}>
                        <Button 
                            variant = 'contained' 
                            className = {clases.botonFinal} 
                            onClick = { () => {
                                setearAlumno({
                                    apellidos : '',
                                    nombres : '',
                                    dni : '',
                                    cx : ''
                                });
                                props.history.push('/alumno/nuevo');
                            }}
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
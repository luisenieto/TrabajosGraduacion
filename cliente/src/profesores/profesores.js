import React, {useState, useContext, useEffect} from 'react';
import {TableContainer} from '@mui/material';
import {Paper} from '@mui/material';
import { Table } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import CabeceraTabla from './cabeceraTabla';
import PaginacionTabla from './paginacionTabla';
import CuerpoTabla from './cuerpoTabla';
import useStyles from './useStyles';
import { constantesTrabajos, constantesProfesores } from '../config/constantes';
import Popup from './popup';
import Alerta from './alerta';
import { ProviderContext } from '../provider';
import { BsSearch } from 'react-icons/bs';
import { InputAdornment } from '@mui/material';

//Componente que muestra todo el listado de profesores
const Profesores = (props) => {
    const {setFuncionFiltradoProfesores, setearProfesor} = useContext(ProviderContext);

    const [ordenarPor, setearOrdenarPor] = useState('apellidos');
    //los profesores se pueden ordenar por apellido o cargo

    const [orden, setearOrden] = useState('asc');
    //por defecto, los alumnos se ordenan alfabéticamente

    const [filasPorPagina, setearFilasPorPagina] = useState(10);
     //por defecto se muestran 10 profesores por página

    const [pagina, setearPagina] = useState(0);
    //para saber en qué página se está (empieza en la 0)

    const [openPopup, setearOpenPopup] = useState(false); 
    //controla la visibilidad del popup (pregunta si se confirma el borrado del profesor)
  
    useEffect(() => {
        //el código a continuación se ejecuta cuando se desmonta el componente
        //permite volver a mostrar todos los profesores
        return () => {
            setFuncionFiltradoProfesores({
                funcion : items => {                  
                    return items;
                }
            });
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps 
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío        
    
    
    //configura el criterio de ordenamiento en asc o desc para ordenar los profesores
    const tratarOrdenamiento = (evento, propiedad) => {
        const esAscendente = ordenarPor === propiedad && orden === 'asc';
        setearOrden(esAscendente ? 'desc' : 'asc');
        setearOrdenarPor(propiedad);
    }    

    const buscarOnChange = evento => {
        let valor = evento.target.value;
        setFuncionFiltradoProfesores({
            funcion : items => {
                if (valor === '')
                    return items;
                else
                    return items.filter(x => x.apellidos.toLowerCase().includes(valor.toLowerCase()));
            }
        });
    }

    const clases = useStyles(); 

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
                    <Grid item xs = {12}>
                        <TableContainer sx = {{ maxHeight: 400 }}>
                            <Table stickyHeader sx = {{minWidth : 750}} aria-label = 'tableTitle' size = 'medium'>
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
                            texto = {constantesProfesores.MENSAJE_CONFIRMAR_BORRADO}
                            openPopup = {openPopup}
                            setearOpenPopup = {setearOpenPopup}
                        />
                    </Grid>
                    <Grid item xs = {6}>
                        <Button 
                            variant = 'contained' 
                            className = {clases.botonNuevo} 
                            onClick = {() => {
                                setearProfesor({
                                    apellidos : '',
                                    nombres : '',
                                    dni : '',
                                    idCargo : 1,
                                    nombreCargo : 'Titular'
                                });
                                props.history.push('/profesor/nuevo');
                            }}
                        >
                            Nuevo Profesor
                        </Button>
                    </Grid>
                    <Grid item xs = {6}>
                        <Button 
                            variant = 'contained' 
                            className = {clases.botonEstadisticas} 
                            onClick = {() => props.history.push('/profesor/estadisticas')}
                        >
                            Estadísticas
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Profesores;
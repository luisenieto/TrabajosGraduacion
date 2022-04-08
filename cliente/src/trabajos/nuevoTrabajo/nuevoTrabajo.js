import React, {useContext, useState, useEffect} from 'react';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { ProviderContext } from '../../provider';
import useStyles from '../useStyles';
import TituloTrabajo from '../nuevoTrabajo/tituloTrabajo';
import DuracionAreasYFechas from '../nuevoTrabajo/duracionAreasYFechasTrabajo';
import TutorYCotutor from './tutorYCotutorTrabajo';
import Jurado from '../nuevoTrabajo/juradoTrabajo';
import Alumnos from '../nuevoTrabajo/alumnosTrabajo';
import Botones from './botones';
import Alerta from '../alerta';

//Componente que se encarga de mostrar el formulario para la creación, y de la creación de trabajos
//Usa los componentes TituloTrabajo, DuracionAreasYFechas, TutorYCotutor, Jurado, Alumnos, Botones y Alerta
const NuevoTrabajo = () => {
    const clases = useStyles();    
    const {trabajo, setearTrabajo} = useContext(ProviderContext);
    const [estadoAlerta, setEstadoAlerta] = useState({
        gravedad : 'error',
        titulo : '',
        texto : '',
        mostrar : false
    });
    //controla la visibilidad de la alerta, su tipo y contenido (para los mensajes de error/éxito)

    useEffect(() => {
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

        //el código a continuación se ejecuta cuando se desmonta el componente
        //permite resetear los valores para un trabajo
        return () => {
            setearTrabajo(null);
        }
        
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    return (
        <>
            {
                trabajo ?
                    <Paper className = {clases.pageContent}>
                        <form>
                            <Grid container spacing = {1}>
                                <Alerta 
                                    estadoAlerta = {estadoAlerta}
                                    setEstadoAlerta = {setEstadoAlerta}
                                />
                                <TituloTrabajo />
                                <DuracionAreasYFechas />                                
                                <TutorYCotutor />
                                <Jurado />
                                <Alumnos />
                                <Botones                                     
                                    setEstadoAlerta = {setEstadoAlerta}
                                />                                
                            </Grid>
                        </form>
                    </Paper>
                :
                null
            }                
        </>
        )
}

export default NuevoTrabajo;
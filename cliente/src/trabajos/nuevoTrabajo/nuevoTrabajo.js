import React, {useContext, useState} from 'react';
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
    const {trabajo} = useContext(ProviderContext);

    const [unTrabajo, setearUnTrabajo] = useState(trabajo);

    //useEffect(() => {
        //el código a continuación se ejecuta cuando se desmonta el componente
        //permite resetear los valores para un trabajo
        // return () => {
        //     setearTrabajo(null);
        // }
        
    //}, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    const clases = useStyles();   

    return (
        <>
            {
                unTrabajo ?
                    <Paper className = {clases.pageContent}>
                        <form>
                            <Grid container spacing = {1}>
                                <Alerta />
                                <TituloTrabajo 
                                    trabajo = {unTrabajo}
                                    setearTrabajo = {setearUnTrabajo}
                                />
                                <DuracionAreasYFechas 
                                    trabajo = {unTrabajo}
                                    setearTrabajo = {setearUnTrabajo}
                                />                                
                                <TutorYCotutor 
                                    trabajo = {unTrabajo}
                                    setearTrabajo = {setearUnTrabajo}
                                />
                                <Jurado 
                                    trabajo = {unTrabajo}
                                    setearTrabajo = {setearUnTrabajo}
                                />
                                <Alumnos 
                                    trabajo = {unTrabajo}
                                    setearTrabajo = {setearUnTrabajo}
                                />
                                <Botones 
                                    trabajo = {unTrabajo}                                    
                                    //setEstadoAlerta = {setEstadoAlerta}
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
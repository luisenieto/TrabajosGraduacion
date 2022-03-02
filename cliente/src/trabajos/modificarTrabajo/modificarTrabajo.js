import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { ProviderContext } from '../../provider';
import TituloTrabajo from './tituloTrabajo';
import DuracionAreasYFechas from './duracionAreasYFechasTrabajo';
import Tutores from './tutoresTrabajo';
import Cotutores from './cotutoresTrabajo';
import Jurado from './juradoTrabajo';
import Alumnos from './alumnosTrabajo';
import Botones from './botones';
import useStyles from '../useStyles';
import Popup from './popup';
import { constantesTrabajos } from '../../config/constantes';
import Alerta from '../alerta';

//Componente que se encarga de mostrar el formulario para la modificación, y de la modificación de trabajos
//Usa los componentes TituloTrabajo, DuracionAreasYFechas, 
const ModificarTrabajo = (props) => {
    const {trabajo, setearTrabajo} = useContext(ProviderContext);

    const [openPopup, setearOpenPopup] = useState({
        mostrar : false,
        texto : ''
    });
    //controla la visibilidad del popup 
    
    const [estadoAlerta, setEstadoAlerta] = useState({
        gravedad : 'error',
        titulo : '',
        texto : '',
        mostrar : false
    });
    //controla la visibilidad de la alerta, su tipo y contenido (para los mensajes de error/éxito)
    
    useEffect(() => {
        const _id = props.match.params.id;
        const ruta = `/api/trabajos?id=${_id}`;
        axios.get(ruta).then(response => { 

            const trabajoUpdate = response.data;
            
            const tutoresUpdate = trabajoUpdate.tutores.map(tutor => ({
                ...tutor,
                abierto : false, 
                seEstaModificando : false,
                razonOriginal : ''
            }));
                        
            const cotutoresUpdate = trabajoUpdate.cotutores.map(cotutor => ({
                ...cotutor,
                abierto : false, 
                seEstaModificando : false,
                razonOriginal : ''
            }));
            
            const juradoUpdate = trabajoUpdate.jurado.map(j => ({
                ...j,
                abierto : false, 
                seEstaModificando : false,
                razonOriginal : ''
            }));

            const alumnosUpdate = trabajoUpdate.alumnos.map(alumno => ({
                ...alumno,
                abierto : false, 
                seEstaModificando : false,
                razonOriginal : ''
            }));
            //a cada elemento se le agregan las claves:
            // 'abierto': controla la ventana de diálogo
            // 'seEstaModificando' : para distinguir si se está agregando un tutor/cotutor/jurado o modificando la razón
            // 'razonOriginal' : para cuando se esté modificando la razón y se cancele el proceso

            setearTrabajo({
                ...trabajoUpdate, 
                tutores : tutoresUpdate, 
                cotutores : cotutoresUpdate, 
                jurado : juradoUpdate,
                alumnos : alumnosUpdate
            });
            
            //setearTrabajo(response.data);
        });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps    
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío    

    const clases = useStyles();    

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
                                <Tutores />
                                <Cotutores />
                                <Jurado />
                                <Alumnos />
                                <Botones 
                                    setearOpenPopup = {setearOpenPopup}
                                />
                                <Popup 
                                    titulo = {constantesTrabajos.TITULO_APLICACION}
                                    openPopup = {openPopup}
                                    setearOpenPopup = {setearOpenPopup}
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

export default ModificarTrabajo;
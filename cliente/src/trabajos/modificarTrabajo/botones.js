import React, {useContext} from 'react';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import { constantesTrabajos } from '../../config/constantes';
import { useHistory } from "react-router-dom";
import useStyles from '../useStyles';
import { ProviderContext } from '../../provider';

//Componente que se encarga de mostrar los botones Aceptar, Baja y Cancelar en el formulario para la modificación de un trabajo
const Botones = ({trabajo, setearOpenPopup}) => {  
    const {estadoAlerta} = useContext(ProviderContext);  
    let history;
    const clases = useStyles();

    const botonCancelar = () => history.push('/trabajos/');
    //Cuando se selecciona el botón Cancelar

    const botonAceptar = () => {
        trabajo.fechaFinalizacion ?
            setearOpenPopup({
                mostrar : true,
                texto : `${constantesTrabajos.MENSAJE_CONFIRMAR_FINALIZACION}`
            })
        :
            setearOpenPopup({
                mostrar : true,
                texto : `${constantesTrabajos.MENSAJE_CONFIRMAR_MODIFICACION}`
            })
    }
    //Cuando se selecciona el botón Aceptar

    const botonBaja = () => {
        setearOpenPopup({
            mostrar : true,
            texto : `${constantesTrabajos.MENSAJE_CONFIRMAR_BAJA}`
        })
    }
    //Cuando se selecciona el botón Baja

    history = useHistory();

    return (
        <>
            <Grid item xs = {12}>
                <Divider />                                                       
            </Grid>
            <Grid item xs = {4}>
                <Button 
                    variant="contained" 
                    className = {clases.botonAceptar} 
                    onClick = {() => botonAceptar()}
                    disabled = {trabajo.fechaFinalizacion || estadoAlerta.botonesInhabilitados}
                >
                    {constantesTrabajos.ACEPTAR}                    
                </Button>
            </Grid>            
            <Grid item xs = {4}>
                <Button 
                    variant="contained" 
                    className = {clases.botonCancelar} 
                    onClick = {() => botonBaja()}
                    disabled = {trabajo.fechaFinalizacion || estadoAlerta.botonesInhabilitados}
                >
                    {constantesTrabajos.DAR_DE_BAJA}
                </Button>
            </Grid>
            <Grid item xs = {4}>
                <Button 
                    variant="contained" 
                    className = {clases.botonFinal} 
                    onClick = {() => botonCancelar()}
                    disabled = {estadoAlerta.botonesInhabilitados}
                >
                    {constantesTrabajos.CANCELAR}
                </Button>
            </Grid>
        </>
    )
}

export default Botones;
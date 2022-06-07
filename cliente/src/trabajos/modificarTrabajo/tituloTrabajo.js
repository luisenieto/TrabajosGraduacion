import React, {useContext} from 'react';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import useStyles from '../useStyles';
import { ProviderContext } from '../../provider';

//Componente que se encarga de mostrar el campo para el título del trabajo en el formulario
const TituloTrabajo = ({trabajo, setearTrabajo}) => {    
    const {estadoAlerta} = useContext(ProviderContext);  
    const clases = useStyles();
    
    return (
        <Grid item lg = {12} sm = {12} xs = {12}>
            <TextField
                InputProps = {trabajo.fechaFinalizacion || estadoAlerta.botonesInhabilitados ? {disabled: true} : {disabled: false}}
                variant = 'outlined'
                label = 'Título'
                value = {trabajo.titulo}
                className = {clases.campoTitulo}
                onChange = {evento => setearTrabajo({...trabajo, 'titulo' : evento.target.value})}
            />
        </Grid>
    )
}

export default TituloTrabajo;
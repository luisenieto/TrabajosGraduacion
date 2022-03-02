import React from 'react';
import { Collapse } from '@mui/material';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';
import { Grid } from '@mui/material';
import { useHistory } from "react-router-dom";

//Componente que muestra los mensajes de éxito/error
const Alerta = ({estadoAlerta, setEstadoAlerta}) => {
    let history = useHistory();
    return (
        <Grid item xs = {12}>
            <Collapse in = {estadoAlerta.mostrar}>
                <Alert 
                    severity = {estadoAlerta.gravedad}
                    onClose = {() => {
                        if (estadoAlerta.gravedad === 'success') 
                            history.push('/trabajos/')
                        else
                            setEstadoAlerta({
                                gravedad : 'error',
                                titulo : '',
                                texto : '',
                                mostrar : false
                            })
                    }}
                >
                    <AlertTitle>{estadoAlerta.titulo}</AlertTitle>
                    {estadoAlerta.texto}
                </Alert>
            </Collapse>
        </Grid>
    )
}

export default Alerta;
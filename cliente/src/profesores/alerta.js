import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import { Collapse } from '@mui/material';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';
import { Grid } from '@mui/material';
import { ProviderContext } from '../provider';

//Componente que muestra los mensajes de éxito/error
const Alerta = () => {
    const {estadoAlerta, setEstadoAlerta} = useContext(ProviderContext);
    let history = useHistory();

    return (
        <Grid item lg = {12}>
            <Collapse in = {estadoAlerta.mostrar}>
                <Alert 
                    severity = {estadoAlerta.gravedad}
                    onClose = {() => {
                        if (estadoAlerta.gravedad === 'success') 
                            history.push('/profesores/')
                        //else
                        setEstadoAlerta({
                            gravedad : 'error',
                            titulo : '',
                            texto : '',
                            mostrar : false,
                            botonesInhabilitados : false
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
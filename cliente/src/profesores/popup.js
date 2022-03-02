import React, {useContext} from 'react';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import { ProviderContext } from '../provider';
import { sePuedeBorrarElProfesor } from './validaciones';
import { constantesProfesores, constantesTrabajos } from '../config/constantes';

//Componente que se encarga de preguntar si se quiere borrar un profesor
//en caso que se pueda, lo borra
//si no se puede borrar el profesor muestra un mensaje
const Popup = ({titulo, texto, openPopup, setearOpenPopup, setEstadoAlerta}) => {
    const {profesor, profesores, setearProfesores, trabajos} = useContext(ProviderContext);

    const botonAceptarClic = () => {
        const ruta = '/api/profesores/borrar?id=';        
        if (!sePuedeBorrarElProfesor(profesor.dni, trabajos)) {
            setEstadoAlerta({
                gravedad : 'error',
                titulo : `${constantesTrabajos.TITULO_APLICACION}`,
                texto : `${constantesProfesores.ERROR_BORRAR}`,
                mostrar : true
            })
        }
        else {          
            axios.delete(`${ruta}${profesor._id}`).then(response => {
                if (response.data) {
                    const index = profesores.findIndex(p => p._id === response.data._id);
                    const profesoresUpdate = [...profesores];
                    profesoresUpdate.splice(index, 1);                
                    setearProfesores(profesoresUpdate);
                }
            });
        }        
        setearOpenPopup(false);
    }

    
    return (
        <Dialog open = {openPopup} onClose = {() => setearOpenPopup(false)}>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {profesor ?
                        `${texto} ${profesor.apellidos}, ${profesor.nombres}?`
                    :
                        `${texto} ?`
                    }
                </DialogContentText>
                <DialogActions>
                    <Button onClick = {() => botonAceptarClic()}>Aceptar</Button>
                    <Button onClick = {() => setearOpenPopup(false)}>Cancelar</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default Popup;
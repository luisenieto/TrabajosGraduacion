import React, {useContext} from 'react';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import { ProviderContext } from '../provider';
import { sePuedeBorrarElAlumno } from './validaciones';
import { constantesAlumnos, constantesTrabajos } from '../config/constantes';

//Componente que se encarga de preguntar si se quiere borrar un alumno
//en caso que se pueda, lo borra
//si no se puede borrar el alumno muestra un mensaje
const Popup = ({titulo, texto, openPopup, setearOpenPopup, setEstadoAlerta}) => {
    const {alumno, alumnos, setearAlumnos, trabajos} = useContext(ProviderContext);

    const botonAceptarClic = () => {
        const ruta = '/api/alumnos/borrar?id=';
        if (!sePuedeBorrarElAlumno(alumno.dni, trabajos)) {
            setEstadoAlerta({
                gravedad : 'error',
                titulo : `${constantesTrabajos.TITULO_APLICACION}`,
                texto : `${constantesAlumnos.ERROR_BORRAR}`,
                mostrar : true
            })
        }
        else {
            axios.delete(`${ruta}${alumno._id}`).then(response => {
                if (response.data) {
                    const index = alumnos.findIndex(a => a._id === response.data._id);
                    const alumnosUpdate = [...alumnos];
                    alumnosUpdate.splice(index, 1);                
                    setearAlumnos(alumnosUpdate);
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
                    {alumno ?
                        `${texto} ${alumno.apellidos}, ${alumno.nombres}?`
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
import React, {useContext} from 'react';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import { ProviderContext } from '../provider';
import axios from 'axios';

//Componente que se encarga de preguntar si se quiere borrar un trabajo
//en caso que se pueda, lo borra
//si no se puede borrar el trabajo muestra un mensaje
const Popup = ({titulo, texto, openPopup, setearOpenPopup}) => {
    const {trabajo, trabajos, setearTrabajos} = useContext(ProviderContext);

    const botonAceptarClic = () => {
        const ruta = '/api/trabajos/borrar?id=';
        axios.delete(`${ruta}${trabajo._id}`).then(response => {
            if (response.data) {
                const index = trabajos.findIndex(t => t._id === response.data._id);
                const trabajosUpdate = [...trabajos];
                trabajosUpdate.splice(index, 1);                
                setearTrabajos(trabajosUpdate);
            }
        });
        setearOpenPopup(false);
    }

    return (
        <Dialog open = {openPopup} onClose = {() => setearOpenPopup(false)}>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {trabajo ?
                        `${texto} ${trabajo.titulo}?`
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
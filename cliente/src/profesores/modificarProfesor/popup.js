import React, {useContext} from 'react';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import { ProviderContext } from '../../provider';
import {validarProfesorParaModificacion} from '../validaciones';
import axios from 'axios';
import { constantesProfesores } from '../../config/constantes';

//Componente que permite la modificación de profesores
const Popup = ({titulo, openPopup, setearOpenPopup, profesor}) => {
    const {profesores, setearProfesores, setearProfesor, setEstadoAlerta} = useContext(ProviderContext);

    const botonAceptarClic = () => {
        setearOpenPopup({
            mostrar : false,
            texto : ''
        });
        
        let resultado;
        if ((resultado = validarProfesorParaModificacion(profesor, profesores)) !== constantesProfesores.OK) {
            setEstadoAlerta({
                gravedad : 'error',
                titulo : 'Error',
                texto : resultado,
                mostrar : true,
                botonesInhabilitados : true
            });
            return;  
        } 
        const ruta = '/api/profesores/modificar';
        axios.post(ruta, profesor).then(response => {
            if (response.status === 200) {
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : titulo,
                    texto : `${constantesProfesores.MENSAJE_MODIFICACION}`,
                    mostrar : true,
                    botonesInhabilitados : true
                });
                let profesoresUpdate = [...profesores];
                for(let i in profesoresUpdate) {
                    if (profesoresUpdate[i]._id === response.data._id) {
                        profesoresUpdate[i] = profesor;
                        break;
                    }
                }
                //se ordenan los profesores por apellido. Si hay 2 con el mismo por nombre
                profesoresUpdate = profesoresUpdate.sort((a, b) => {
                    if (a.apellidos < b.apellidos)
                        return -1;
                    if (a.apellidos > b.apellidos)
                        return 1
                    else {
                        if (a.nombres < b.nombres) 
                            return -1;
                        if (a.nombres > b.nombres)
                            return 1
                        else
                            return 0;
                    }
                    
                });
                setearProfesor(profesor);
                setearProfesores(profesoresUpdate); 
            }
        });
    }

    return (
        <Dialog open = {openPopup.mostrar} >
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {openPopup.texto}                    
                </DialogContentText>
                <DialogActions>
                    <Button onClick = {() => botonAceptarClic()}>Aceptar</Button>
                    <Button 
                        onClick = {() => setearOpenPopup({
                            mostrar : false,
                            texto : ''
                        })}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default Popup;
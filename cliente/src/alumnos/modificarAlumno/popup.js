import React, {useContext} from 'react';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import { ProviderContext } from '../../provider';
import {validarAlumnoParaModificacion} from '../validaciones';
import axios from 'axios';
import { constantesAlumnos } from '../../config/constantes';

//Componente que permite la modificación de alumnos
const Popup = ({titulo, openPopup, setearOpenPopup, setEstadoAlerta}) => {
    const {alumno, alumnos, setearAlumnos, setAlumnosFiltrados} = useContext(ProviderContext);

    const botonAceptarClic = () => {
        setearOpenPopup({
            mostrar : false,
            texto : ''
        });
        
        let resultado;
        if ((resultado = validarAlumnoParaModificacion(alumno, alumnos)) !== constantesAlumnos.OK) {
            setEstadoAlerta({
                gravedad : 'error',
                titulo : 'Error',
                texto : resultado,
                mostrar : true
            });
            return;  
        } 
        const ruta = '/api/alumnos/modificar';
        axios.post(ruta, alumno).then(response => {
            if (response.status === 200) {
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : titulo,
                    texto : `${constantesAlumnos.MENSAJE_MODIFICACION}`,
                    mostrar : true
                });
                let alumnosUpdate = [...alumnos];
                for(let i in alumnosUpdate) {
                    if (alumnosUpdate[i]._id === response.data._id) {
                        alumnosUpdate[i] = response.data;
                        break;
                    }
                }
                //se ordenan los alumnos por apellido. Si hay 2 con el mismo por nombre
                alumnosUpdate = alumnosUpdate.sort((a, b) => {
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
                setearAlumnos(alumnosUpdate); 
                setAlumnosFiltrados(alumnosUpdate);
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
import React, {useContext} from 'react';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import { ProviderContext } from '../../provider';
import { constantesTrabajos } from '../../config/constantes';
import { validarTrabajoParaModificacion} from '../validaciones';
import axios from 'axios';

//Componente que muestra el popup que confirma la finalización/modificación de un trabajo
//También se encarga de la tarea
const Popup = ({titulo, openPopup, setearOpenPopup, trabajo}) => {
    const {trabajos, setearTrabajos, setearTrabajo, setEstadoAlerta } = useContext(ProviderContext);

    const botonAceptarClic = () => {
        setearOpenPopup({
            mostrar : false,
            texto : ''
        });
        
        switch(openPopup.texto) {
            case constantesTrabajos.MENSAJE_CONFIRMAR_FINALIZACION:
                modificarTrabajo(constantesTrabajos.FINALIZACION_TRABAJO, constantesTrabajos.MENSAJE_FINALIZACION);
                break;
            case constantesTrabajos.MENSAJE_CONFIRMAR_MODIFICACION:
                modificarTrabajo(constantesTrabajos.MODIFICACION_TRABAJO, constantesTrabajos.MENSAJE_MODIFICACION);
                break;
            default:
                bajaTrabajo(constantesTrabajos.BAJA_TRABAJO, constantesTrabajos.MENSAJE_BAJA);
                break;
            
        }
    }

    const modificarTrabajo = (titulo, texto) => {
        let resultado;
        if ((resultado = validarTrabajoParaModificacion(trabajo, trabajos)) !== constantesTrabajos.OK) {
            setEstadoAlerta({
                gravedad : 'error',
                titulo : 'Error',
                texto : resultado,
                mostrar : true,
                botonesInhabilitados : true
            });
            return;  
        } 
        const ruta = '/api/trabajos/modificar';
        axios.post(ruta, trabajo).then(response => {
            if (response.status === 200) {
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : titulo,
                    texto : `${texto}${response.data.titulo}`,
                    mostrar : true,
                    botonesInhabilitados : true
                });
                const trabajosUpdate = [...trabajos];
                for(let i in trabajosUpdate) {
                    if (trabajosUpdate[i]._id === response.data._id)
                        trabajosUpdate[i] = response.data;
                }
                //se ordenan los trabajos por fecha de aprobación en orden descendente
                trabajosUpdate.sort((a, b) => {
                    if (a.fechaAprobacion < b.fechaAprobacion)
                        return -1;
                    if (a.fechaAprobacion > b.fechaAprobacion)
                        return 1
                    else    
                        return 0;
                });
                setearTrabajo(trabajo);
                setearTrabajos(trabajosUpdate); 
            }
        });
    }

    const bajaTrabajo = (titulo, texto) => {
        const trabajoUpdate = {...trabajo};
        trabajoUpdate.fechaFinalizacion = new Date().toISOString();
        //toISOString(): convierte a formato UTC

        for (let i in trabajoUpdate.tutores) {
            if (trabajoUpdate.tutores[i].razon === null) {
                trabajoUpdate.tutores[i].hasta = trabajoUpdate.fechaFinalizacion;                
                trabajoUpdate.tutores[i].razon = constantesTrabajos.DADO_DE_BAJA;
            }
        }
        for (let i in trabajoUpdate.cotutores) {
            if (trabajoUpdate.cotutores[i].razon === null) {
                trabajoUpdate.cotutores[i].hasta = trabajoUpdate.fechaFinalizacion; 
                trabajoUpdate.cotutores[i].razon = constantesTrabajos.DADO_DE_BAJA;
            }
        }
        for (let i in trabajoUpdate.jurado) {
            if (trabajoUpdate.jurado[i].razon === null) {
                trabajoUpdate.jurado[i].hasta = trabajoUpdate.fechaFinalizacion; 
                trabajoUpdate.jurado[i].razon = constantesTrabajos.DADO_DE_BAJA;
            }
        }
        for (let i in trabajoUpdate.alumnos) {
            if (trabajoUpdate.alumnos[i].razon === null) {
                trabajoUpdate.alumnos[i].hasta = trabajoUpdate.fechaFinalizacion; 
                trabajoUpdate.alumnos[i].razon = constantesTrabajos.DADO_DE_BAJA;
            }
        }
        const ruta = '/api/trabajos/modificar';
        axios.post(ruta, trabajoUpdate).then(response => {
            if (response.status === 200) {
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : titulo,
                    texto : `${texto}${response.data.titulo}`,
                    mostrar : true,
                    botonesInhabilitados : true
                });
                const trabajosUpdate = [...trabajos];
                for(let i in trabajosUpdate) {
                    if (trabajosUpdate[i]._id === response.data._id)
                        trabajosUpdate[i] = response.data;
                }
                setearTrabajo(trabajoUpdate);
                setearTrabajos(trabajosUpdate); 
            }
        });
    }

    return (
        <Dialog open = {openPopup.mostrar} >
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {trabajo ?
                        `${openPopup.texto} ${trabajo.titulo}?`
                    :
                        `${openPopup.texto}?`
                    }
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
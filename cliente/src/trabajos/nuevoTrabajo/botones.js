import React, {useContext} from 'react';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import { constantesTrabajos } from '../../config/constantes';
import { ProviderContext } from '../../provider';
import { useHistory } from "react-router-dom";
import useStyles from '../useStyles';
import axios from 'axios';
import { validarTrabajoParaCreacion } from '../validaciones';

//Componente que se encarga de mostrar los botones Aceptar y Cancelar en el formulario para la creación de un trabajo
//También se encarga de la creación del trabajo
const Botones = ({setEstadoAlerta}) => {
    const {trabajo, trabajos, setearTrabajos} = useContext(ProviderContext);
    let history;
    const clases = useStyles();

    const botonCancelar = () => history.push('/trabajos/');

    history = useHistory();

    const botonAceptar = () => {
        let resultado;
        if ((resultado = validarTrabajoParaCreacion(trabajo, trabajos)) !== constantesTrabajos.OK) {
            setEstadoAlerta({
                gravedad : 'error',
                titulo : 'Error',
                texto : resultado,
                mostrar : true
            });
            return;                
        }

        let trabajoUpdate = {...trabajo}; 
        trabajoUpdate.tutores[0].desde = trabajo.fechaAprobacion;
        if (trabajoUpdate.cotutores[0].dni === null)
            trabajoUpdate.cotutores.length = 0
        else
            trabajoUpdate.cotutores[0].desde = trabajo.fechaAprobacion;
        trabajoUpdate.jurado[0].desde = trabajo.fechaAprobacion;
        trabajoUpdate.jurado[1].desde = trabajo.fechaAprobacion;
        trabajoUpdate.jurado[2].desde = trabajo.fechaAprobacion;
        let alumno1 = trabajo.alumnos[0];      
        let alumno2 = trabajo.alumnos[1];
        let alumno3 = trabajo.alumnos[2];
        trabajoUpdate.alumnos.length = 0
        if (alumno1.dni !== null) {
            alumno1.desde = trabajo.fechaAprobacion;
            trabajoUpdate.alumnos.push(alumno1);
        }
        
        if (alumno2.dni !== null) {
            alumno2.desde = trabajo.fechaAprobacion;
            trabajoUpdate.alumnos.push(alumno2);
        }
        
        if (alumno3.dni !== null) {
            alumno3.desde = trabajo.fechaAprobacion;
            trabajoUpdate.alumnos.push(alumno3);
        }

        const ruta = '/api/trabajos/crear';
        axios.post(ruta, trabajoUpdate).then(response => {
            if (response.status === 200) {
                setEstadoAlerta({
                    gravedad : 'success',
                    titulo : 'Nuevo trabajo',
                    texto : `Se creó el trabajo "${response.data.titulo}"`,
                    mostrar : true
                });
                const trabajosUpdate = [...trabajos];
                trabajosUpdate.push(response.data);
                //se ordenan los trabajos por fecha de aprobación en orden descendente
                trabajosUpdate.sort((a, b) => {
                    if (a.fechaAprobacion < b.fechaAprobacion)
                        return -1;
                    if (a.fechaAprobacion > b.fechaAprobacion)
                        return 1
                    else    
                        return 0;
                });
                setearTrabajos(trabajosUpdate); 
            }
        });        
    }

    return (
        <>
            <Grid item xs = {12}>
                <Divider />                                                       
            </Grid>
            <Grid item xs = {6}>
                <Button variant="contained" className = {clases.botonAceptar} onClick = {() => botonAceptar()}
                >
                    {constantesTrabajos.ACEPTAR}
                </Button>
            </Grid>
            <Grid item xs = {6}>
                <Button variant="contained" className = {clases.botonCancelar} onClick = {() => botonCancelar()}
                >
                    {constantesTrabajos.CANCELAR}
                </Button>
            </Grid>
        </>
    )
}

export default Botones;
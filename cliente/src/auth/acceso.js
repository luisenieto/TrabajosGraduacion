import React, {useEffect} from 'react';
import axios from 'axios';
import {autenticar} from './auth';
import {useState} from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import {FaLock} from 'react-icons/fa';
import useStyles from './useStyles';

//Componente que muestra el formulario para loguearse
const Acceso = (props) => {
    const [estadoUsuario, setearUsuario] = useState({
        correo : '',
        clave : '',
        error : '',
        redirigir : false
    });

    useEffect(() => {
        const {redirigir} = estadoUsuario;
        if (redirigir) {
            const {from} = props.location.state || {
                from : {
                    pathname : '/'
                }
            } 
            props.history.push(from);            
        }            
    }, [estadoUsuario.redirigir]); //eslint-disable-line react-hooks/exhaustive-deps

    const txtOnChange = (evento, clave) => {
        setearUsuario({...estadoUsuario, [clave] : evento.target.value}); 
    }    

    const btnClic = () => {        
        const correo = estadoUsuario.correo || undefined;
        const clave = estadoUsuario.clave || undefined;

        const ruta = '/api/auth/login';

        axios.post(ruta, {correo, clave})
        .then(response => {
            //si al usuario se le puede generar un token (está autenticado)
            //response.data vale
            //{estaAutenticado : true,
            //usuarioId : _id del usuario,
            //correo : correo del usuario,
            //token : token del usuario
            //}
            if (response.data.estaAutenticado) { //sí está autenticado
                const token = response.data.token;
                autenticar(token, () => {
                    setearUsuario({...estadoUsuario, error : '', redirigir : true});
                }); //guarda el token en localStorage
            }
            else { //no autenticado
                setearUsuario({...estadoUsuario, error : response.data.mensaje});
                //mensaje puede valer: "No se encontró el usuario" o "La clave especificada no coincide con la del correo especificado"
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const clases = useStyles();


    function Copyright(props) {
        return (
          <Typography variant = "body2" color = "text.secondary" align = "center" {...props}>
            {'Copyright © '}
            <Link color = "inherit" to = '/'>
                Trabajos de Graduación - Ingeniería en Computación - FACET - UNT 
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>
        );
    }

    const alPresionarTecla = (evento) => {
        var charCode = (evento.which) ? evento.which : evento.keyCode;   
        if (charCode === 13) //enter
            btnClic();
    }
    //Permite llamar al método btnClic cuando se presiona Enter

    return (       
        <Paper className = {clases.pageContent}>            
            <Box className = {clases.box_externo}>
                <Avatar className = {clases.avatar}>
                    <FaLock color = '#3f4771'/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Acceder
                </Typography>
                <Box component = 'form' className = {clases.box_interno}>
                    <TextField
                        margin = "normal"                         
                        required
                        fullWidth
                        id = "correo"
                        label = "Correo"
                        name = "correo"
                        autoComplete = "correo"
                        autoFocus
                        inputProps = {{
                            onKeyDown : (evento) => {alPresionarTecla(evento)}
                        }}
                        onChange = {evento => txtOnChange(evento, 'correo')}
                    />
                    <TextField
                        margin = "normal"                            
                        required
                        fullWidth
                        name = "clave"
                        label = "Clave"
                        type = "password"
                        id = "clave"
                        autoComplete = "current-password"
                        inputProps = {{
                            onKeyDown : (evento) => {alPresionarTecla(evento)}
                        }}
                        onChange = {evento => txtOnChange(evento, 'clave')}
                    />   
                    {                        
                        estadoUsuario.error 
                            ?
                                <Alert severity = 'error'>
                                    {estadoUsuario.error}
                                </Alert>
                            :
                                null
                    }
                    <Button className = {clases.boton}                        
                        fullWidth
                        variant = "contained"
                        onClick = {() => btnClic()}
                    >
                        Acceder
                    </Button>                    
                </Box>                    
            </Box>
            <Copyright sx = {{ marginTop: 8, marginBottom: 4 }} />            
        </Paper>       
    )
}

export default Acceso;
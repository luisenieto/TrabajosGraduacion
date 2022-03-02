import React, {useState} from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import {BiHome} from 'react-icons/bi';
import {estaAutenticado, borrarToken} from '../auth/auth';
import {IoMenu} from 'react-icons/io5';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Typography } from '@mui/material';
import { ListItemIcon } from '@mui/material';

//Componente que muestra el menú de navegación teniendo en cuenta el tamaño de la pantalla
//Si es una pantalla grande, muestra la barra con los nombres de los menúes
//Si es una pantalla chica, muestra un botón de menú
const MenuApp = withRouter(({history}) => {
    const paginas = ['Alumnos', 'Profesores', 'Trabajos'];
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleCloseNavMenu = (pagina) => {  
        setAnchorElNav(null);        
        if ((typeof pagina) === 'string')
            history.push(`/${pagina}`);
    };

    const handleHome = () => {        
        setAnchorElNav(null);        
        history.push('/');
    };

    const handleAutenticar = () => {        
        setAnchorElNav(null);        
        history.push('/acceso');
    };

    const handleCerrar = () => {        
        setAnchorElNav(null);  
        borrarToken(() => history.push('/'))      
    };

    const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);

    return (
        <AppBar position = 'static'>
            <Container maxWidth = 'xl'>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none', lg: 'none' } }}>
                        <IconButton
                            size="large"
                            // aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick = {handleOpenNavMenu}
                            color="inherit"
                        >
                            <IoMenu />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl = {anchorElNav}
                            anchorOrigin = {{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin = {{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open = {Boolean(anchorElNav)}
                            onClose = {handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon onClick = {() => handleHome()}>                                    
                                    <BiHome />                                    
                                </ListItemIcon>
                            </MenuItem>
                            {
                                paginas.map((pagina) => (
                                    <MenuItem key = {pagina} onClick = {() => handleCloseNavMenu(pagina)}>
                                        <Typography textAlign="center">{pagina}</Typography>
                                    </MenuItem>
                                ))
                            }
                            {                
                                !estaAutenticado() ?
                                    <MenuItem onClick = {() => handleAutenticar()}>
                                        <Typography textAlign = 'center'>Acceder</Typography>
                                    </MenuItem>
                                :
                                    <MenuItem onClick = {() => handleCerrar()}>
                                        <Typography textAlign = 'center'>Cerrar</Typography>
                                    </MenuItem>
                            }                                                   
                        </Menu>
                    </Box>      
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', lg: 'flex' } }}>
                        <Link to='/'>
                            <IconButton style = {estaActivo(history, "/")}>
                                <BiHome />
                            </IconButton>
                        </Link>
                        {
                            paginas.map((pagina) => {
                                const destino = `/${pagina}`;
                                return (
                                    <Link key = {pagina} to = {destino}>
                                        <Button style = {estaActivo(history, `/${pagina}`)}>
                                            {pagina}
                                        </Button>
                                    </Link> 
                                )
                            })
                        }
                        {
                            !estaAutenticado() ?
                                <Link to='/acceso'>
                                    <Button style = {estaActivo(history, "/acceso")}>
                                        Acceder
                                    </Button>
                                </Link>
                            :
                                <Button color='inherit'
                                    onClick = {() => borrarToken(() => history.push('/'))}
                                >
                                    Cerrar
                                </Button>
                        }
                    </Box>              
                </Toolbar>
            </Container>
        </AppBar>
    )

    //             {/* <Link to='/api/usuarios/crear'>
    //                 <Button style = {estaActivo(history, "/api/usuarios/crear")}>
    //                     Registrarse
    //                 </Button>
    //             </Link>                                                             */}
})

//Resalta con el color #ff4081 la página activa
//Por ejemplo, para el caso de alumnos, se resalta cuando la ruta sea:
// /alumnos, /alumnos/:id o /alumno/nuevo
const estaActivo = (history, ruta) => {  
    if (ruta === '/') {
        return history.location.pathname === ruta ? {color : '#ff4081'} : {color : '#ffffff'}
    }
    else {
        return history.location.pathname.toLowerCase().includes(ruta.toLowerCase().substring(0, 5)) ? {color : '#ff4081'} : {color : '#ffffff'}   
    }
    //if (history.location.pathname.includes(ruta.substring(0, 5)))
    //if (history.location.pathname === ruta)
    //    return {color : '#ff4081'}
    //else
    //    return {color : '#ffffff'}

}

export default MenuApp;
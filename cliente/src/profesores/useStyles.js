import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(tema => ({
    pageContent : {
        margin : tema.spacing(1),
        padding : tema.spacing(1)
    }, 
    campoBuscar : {
        marginLeft: tema.spacing(1)
    },
    campoApellidos : {
        marginTop: tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    campoNombres : {
        marginTop: tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    campoDNI : {
        marginTop: tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    autoComplete : {
        marginTop: tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    botonAceptar : {
        marginTop: tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    botonCancelar : {
        marginTop : tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    botonFinal : {
        margin : tema.spacing(1),
        width : '99%'
    }      
}));

export default useStyles;
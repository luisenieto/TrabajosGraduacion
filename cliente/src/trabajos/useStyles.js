import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(tema => ({
    pageContent : {
        margin : tema.spacing(1),
        padding : tema.spacing(1)
    }, 
    campoTitulo : {
        marginTop: tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    campoDuracion : {
        marginTop: tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    checkBox : {
        marginTop : tema.spacing(2),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    datePicker : {
        marginTop : tema.spacing(2),
        marginRight : tema.spacing(1),
        width : '100%'        
    },  
    campoDesdeHasta : {
        marginTop : tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'  
    },
    autoComplete : {
        marginTop: tema.spacing(1),
        
    },    
    campoRazon : {        
        marginTop : tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    botonAceptar : {
        marginTop : tema.spacing(1),
        marginRight: tema.spacing(1),
        width : '100%'
    },
    botoncitos : {
        marginTop : tema.spacing(3),
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
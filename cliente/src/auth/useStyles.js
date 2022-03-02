import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(tema => ({
    pageContent : {
        margin : tema.spacing(1),
        padding : tema.spacing(1)
    }, 
    box_externo : {
        marginTop : 8,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    avatar : {
        margin : 1,
        bgcolor : '#000000'
    },
    box_interno : {
        marginTop : 1
    },
    boton : {
        marginTop: 15, 
        marginBottom: 20
    },
    campoTexto : {
        margin : 'normal'
    },
    copyright : {
        marginTop: 8, 
        marginBottom: 4
    },
    error : {

    }
}));

export default useStyles;
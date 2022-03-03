import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(tema => ({
    pageContent : {

        padding : tema.spacing(1)
    },
    autoComplete : {
        marginTop: tema.spacing(1),
        
    },
    card : {
        
        margin : 'auto',
        marginTop : tema.spacing(2)
    },
    title : {
        padding : `${tema.spacing(3)}px ${tema.spacing(2.5)}px ${tema.spacing(2)}px`,
        color : tema.palette.openTitle,
        textAlign : 'center'
    },
    media : {
        minHeight : 400
    }
}));

export default useStyles;
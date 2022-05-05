import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(tema => ({
    pageContent : {
        margin : tema.spacing(1),
        padding : tema.spacing(1)
    },
    botonExcel : {
        marginTop : tema.spacing(2)
    }      
}));

export default useStyles;
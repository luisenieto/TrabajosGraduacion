import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(tema => ({
    pageContent : {
        margin : tema.spacing(1),
        padding : tema.spacing(1)
    }      
}));

export default useStyles;
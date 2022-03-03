import React from 'react';
//import { Card } from '@mui/material';
// import { CardContent } from '@mui/material';
// import { CardMedia } from '@mui/material';
//import { Typography } from '@mui/material';
// import ingComp from '../images/ingcomp.jpeg';
import Tema from '../tema';
import GraficoTrabajos from './graficoTrabajos';
import RangoFechas from './rangoFechas';
import useStyles from './useStyles';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';

const Home = () => {    
    const classes = useStyles(Tema);
    
    return (
        <Paper className = {classes.pageContent}>
            
            <Grid container spacing = {1}>
                {/* <Grid item lg = {12} sm = {12} xs = {12} >
                    <Typography variant="h6" className={classes.title}>
                        Resumen de trabajos               
                    </Typography>
                </Grid> */}
                <RangoFechas />                
                <Grid item lg = {12} sm = {12} xs = {12} >
                    <GraficoTrabajos />
                </Grid>
            </Grid>
            
        </Paper>
    )


    
    // return (
    //     
    //         <Typography variant="h6" className={classes.title}>
    //             Home
    //         </Typography>
    //         <CardMedia className={classes.media} image={ingComp} title="Trabajos de Graduación" />
    //         <CardContent>
    //             <Typography variant="body2" component="p">
    //                 Bienvenidos
    //             </Typography>
    //         </CardContent>
    //     </Card>
    // )
}

export default Home;
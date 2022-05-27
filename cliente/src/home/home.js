import React from 'react';
import Tema from '../tema';
import GraficoTrabajos from './graficoTrabajos';
import RangoFechas from './rangoFechas';
import useStyles from './useStyles';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { constantesTrabajos } from '../config/constantes';

const Home = () => {    
    const classes = useStyles(Tema);
    
    return (
        <Paper className = {classes.pageContent}>            
            <Grid container spacing = {1}>
                <Grid item lg = {12} sm = {12} xs = {12} >
                    <Typography variant="h4" gutterBottom className = {classes.title}>
                        {constantesTrabajos.TITULO_HOME1}
                    </Typography>
                    <Typography variant="h5" gutterBottom className = {classes.title}>
                        {constantesTrabajos.TITULO_HOME2}
                    </Typography>                    
                </Grid>
                <RangoFechas />                
                <Grid item lg = {12} sm = {12} xs = {12} >
                    <GraficoTrabajos />
                </Grid>
            </Grid>            
        </Paper>
    )
}

export default Home;
import React from 'react';
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
                <RangoFechas />                
                <Grid item lg = {12} sm = {12} xs = {12} >
                    <GraficoTrabajos />
                </Grid>
            </Grid>            
        </Paper>
    )
}

export default Home;
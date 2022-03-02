import React from 'react';
import { Card } from '@mui/material';
// import { CardContent } from '@mui/material';
// import { CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
// import ingComp from '../images/ingcomp.jpeg';
import Tema from '../tema';
import GraficoTrabajos from './graficoTrabajos';
import useStyles from './useStyles';

const Home = () => {    
    const classes = useStyles(Tema);

    //console.log(areas);
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Resumen de trabajos
                
            </Typography>
            <div style = {{height: 500}}>            
                <GraficoTrabajos />
            </div>
        </Card>
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
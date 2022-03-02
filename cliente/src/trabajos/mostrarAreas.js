import React, {useContext} from 'react';
import { Chip } from '@mui/material';
import { Stack } from '@mui/material';
import { ProviderContext } from '../provider';

//Componente que se encarga de mostrar las iniciales de las áreas de cada trabajo
const MostrarAreas = ({areasDelTrabajo}) => {
    const {areas} = useContext(ProviderContext);
    
    const arrayIdAreas = areasDelTrabajo.split(',');
    let arrayNombreAreas = [];
    for(let i in arrayIdAreas) {
        for(let j in areas) { 
            if (arrayIdAreas[i] === areas[j].idArea.toString()) { 
                arrayNombreAreas.push(areas[j].nombreArea.substring(0, 1)); 
                break;
            }
        }
    }
    //arrayNombreAreas queda con las iniciales de las áreas del trabajo
    //Por ejemplo, si el trabajo tiene las áreas 1 (Hardware) y 2 (Redes)
    //Quedaría como [H,R]

    return (
        <>
            {
                areas.length !== 0 ?
                    <Stack direction = 'row' spacing = {1}>
                    {
                        arrayNombreAreas.map((nombreArea, i) => (
                            <Chip label = {nombreArea} key = {i} size = 'small' />
                        ))
                    }
                    </Stack>
                :
                    null
            }
        </>
    )
}

export default MostrarAreas;
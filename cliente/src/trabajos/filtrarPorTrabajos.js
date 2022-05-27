import React, {useState, useContext} from 'react';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { constantesTrabajos } from '../config/constantes';
import useStyles from './useStyles';
import axios from 'axios';
import { ProviderContext } from '../provider';

const FiltrarPorTrabajos = () => {
    const {trabajos, setTrabajosFiltrados} = useContext(ProviderContext);

    const opcionesParaFiltrar = [constantesTrabajos.FILTRAR_POR_TODOS, 
                                constantesTrabajos.FILTRAR_POR_CANCELADOS,
                                constantesTrabajos.FILTRAR_POR_SIN_FINALIZAR,
                                constantesTrabajos.FILTRAR_POR_FINALIZADOS
                            ];
    //vector con los valores de las opciones para filtrar los alumnos

    const [opcionFiltradoTrabajos, setearOpcionFiltradoTrabajos] = useState(opcionesParaFiltrar[0]);
    //por defecto, se muestran todos los trabajos

    const autoCompleteOnChange = valor => {
        let ruta;
        switch(valor) {
            case constantesTrabajos.FILTRAR_POR_TODOS:
                setTrabajosFiltrados(trabajos);
                break;
            case constantesTrabajos.FILTRAR_POR_CANCELADOS:
                ruta = '/api/trabajos/listarbaja';
                axios.get(ruta).then(response => setTrabajosFiltrados(response.data));
                break;
            case constantesTrabajos.FILTRAR_POR_SIN_FINALIZAR:
                ruta = '/api/trabajos/listarsinfinalizar';
                axios.get(ruta).then(response => setTrabajosFiltrados(response.data));
                break;
            default: //finalizados
                ruta = '/api/trabajos/listarfinalizados';
                axios.get(ruta).then(response => setTrabajosFiltrados(response.data));
                break;
        }
        setearOpcionFiltradoTrabajos(valor);
    }

    const clases = useStyles();

    return (
        <Autocomplete 
            options = {opcionesParaFiltrar}
            isOptionEqualToValue = {(option, value) => option.value === value.value}
            disableClearable
            id = "combo-box-filtrar"
            renderInput = {(params) => <TextField {...params} label = { constantesTrabajos.FILTRAR_POR } />} 
            value = {opcionFiltradoTrabajos}
            onChange = {(evento, valor) => autoCompleteOnChange(valor)}
            className = {clases.autoCompleteFiltrar}
        />
    )
}

export default FiltrarPorTrabajos;
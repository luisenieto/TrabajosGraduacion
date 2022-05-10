import React, {useContext} from 'react';
import { TableBody } from '@mui/material';
import Fila from './fila';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { ProviderContext } from '../provider';

//Componente que muestra el cuerpo de la tabla donde se listan todos los profesores
//Cada fila del cuerpo de la tabla se muestra mediante el componente Fila
const CuerpoTabla = ({ordenarPor, orden, pagina, filasPorPagina, setearOpenPopup}) => {
    const {profesores, funcionFiltradoProfesores} = useContext(ProviderContext);

    //Permite ordenar en orden ascendente o descendente
    function comparadorDescendente(a, b, ordenarPor) {
        if (b[ordenarPor] < a[ordenarPor])
          return -1;
        if (b[ordenarPor] > a[ordenarPor])
          return 1;
        return 0;
    }

    //Obtiene el comparador de la función anterior
    function obtenerComparador(orden, ordenarPor) {
        return orden === 'desc'
            ? 
                (a, b) => comparadorDescendente(a, b, ordenarPor)
            :
          
                (a, b) => -comparadorDescendente(a, b, ordenarPor);
    }

    // Para evitar que la última página haga un salto cuando haya filas vacías
    const filasVacias = pagina > 0 
        ? 
            Math.max(0, (1 + pagina) * filasPorPagina - profesores.length) 
        : 
            0;

    return (
        <TableBody>
            {
                funcionFiltradoProfesores.funcion(profesores).slice().sort(obtenerComparador(orden, ordenarPor))
                .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
                .map((profesor, i) => (
                    <Fila 
                        unProfesor = {profesor} 
                        setearOpenPopup = {setearOpenPopup}
                        key = {i} />    
                ))
            }
            {
                filasVacias > 0 && (
                    <TableRow
                        style={{
                            height: 53 * filasVacias
                        }}
                    >
                        <TableCell colSpan = {8} />
                    </TableRow>
                )
            }
        </TableBody>
    )
}

export default CuerpoTabla;
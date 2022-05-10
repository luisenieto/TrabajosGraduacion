import React, {useContext} from 'react';
import { TableBody } from '@mui/material';
import Fila from './fila';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { ProviderContext } from '../provider';

//Componente que muestra el cuerpo de la tabla donde se listan todos los alumnos
//Cada fila del cuerpo de la tabla se muestra mediante el componente Fila
const CuerpoTabla = ({ordenarPor, orden, pagina, filasPorPagina, setearOpenPopup}) => {
    const {alumnos, funcionFiltradoAlumnos} = useContext(ProviderContext);

    //Permite ordenar alfabéticamente en orden ascendente o descendente
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
            Math.max(0, (1 + pagina) * filasPorPagina - alumnos.length) 
        : 
            0;

    return (
        <TableBody>
            {
                funcionFiltradoAlumnos.funcion(alumnos).slice().sort(obtenerComparador(orden, ordenarPor))
                .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
                .map((alumno, i) => (
                    <Fila 
                        alumno = {alumno} 
                        setearOpenPopup = {setearOpenPopup}
                        key = {i} 
                    />
                ))
            }
            {
                filasVacias > 0 && (
                    <TableRow
                        style={{
                            height: 53 * filasVacias
                        }}
                    >
                        <TableCell colSpan = {7} />
                    </TableRow>
                )
            }
        </TableBody>
    )
} 

export default CuerpoTabla;
import React, {useContext} from 'react';
import { TablePagination } from '@mui/material';
import { ProviderContext } from '../provider';

//Componente que permite desplazarse página a página para ver todos los profesores
const PaginacionTabla = ({filasPorPagina, setearFilasPorPagina, pagina, setearPagina}) => {
    const {profesores} = useContext(ProviderContext);

    const handleChangePage = (evento, nuevaPagina) => {
        setearPagina(nuevaPagina);
    }

    const handleChangeRowsPerPage = (evento) => {
        setearFilasPorPagina(parseInt(evento.target.value, 10));
        setearPagina(0);
    }

    return (
        <TablePagination
            rowsPerPageOptions = {[5, 10, 25]}
            component = "div"
            count = {profesores.length}
            rowsPerPage = {filasPorPagina}
            page = {pagina}
            labelRowsPerPage = 'Filas por página'
            labelDisplayedRows = {function defaultLabelDisplayedRows({ from, to, count }) { 
                return `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`; 
            }}
            showFirstButton = {true}
            showLastButton = {true}
            onPageChange = {handleChangePage}
            onRowsPerPageChange = {handleChangeRowsPerPage}
        />
    )
}   

export default PaginacionTabla;
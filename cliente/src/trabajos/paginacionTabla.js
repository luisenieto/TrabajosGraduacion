import React, {useContext} from 'react';
import { ProviderContext } from '../provider';
import { TablePagination } from '@mui/material';

//Componente que permite desplazarse página a página para ver todos los trabajos
const PaginacionTabla = ({filasPorPagina, setearFilasPorPagina, pagina, setearPagina}) => {
    const {trabajos} = useContext(ProviderContext);

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
            count = {trabajos.length}
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
        >
        </TablePagination>
    )
}

export default PaginacionTabla;
import React from 'react';
import ReactExport from "react-export-excel";

//componente que se encarga de la exportar a Excel las estadísticas de profesores
const ExportacionExcel = ({datosVectorExcel}) => {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    return (
        <ExcelFile filename = 'Estadisticas' hideElement = {true}>
            <ExcelSheet data = {datosVectorExcel} name = 'Detalle' >
                <ExcelColumn label = "Año" value = "anio" />
                <ExcelColumn label = "Apellido y nombre" value = "profesor" />
                <ExcelColumn label = "Total" value = "total" />
            </ExcelSheet>
        </ExcelFile>
    )
}

export default ExportacionExcel;
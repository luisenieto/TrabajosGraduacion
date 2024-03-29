import React, {useContext, useState, useEffect} from 'react';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import useStyles from '../useStyles';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { IconButton } from '@mui/material';
import { RiFileExcel2Line } from 'react-icons/ri';
import { constantesTrabajos } from '../../config/constantes';
import { ProviderContext } from '../../provider';
import GraficoEstadisticas from './graficoEstadisticas';
import ReactExport from "react-export-excel";

const Estadisticas = () => {
    const clases = useStyles(); 
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const [arrayOpciones, setArrayOpciones] = useState([true, true, true]);
    //vector para saber si está seleccionada la opción para calcular
    //la cantidad de trabajos como tutor, como cotutor y/o como jurado
    //el primer true de arrayOpciones significa que de forma predeterminada se quiere calcular las estadísticas para el rol de tutor
    //el segundo true de arrayOpciones significa que de forma predeterminada se quiere calcular las estadísticas para el rol de cotutor
    //el tercer true de arrayOpciones significa que de forma predeterminada se quiere calcular las estadísticas para el rol de jurado

    const { desdeAnio, setearDesdeAnio, hastaAnio, setearHastaAnio, profesores, trabajos } = useContext(ProviderContext);

    useEffect(() => {
        //el código a continuación se ejecuta cuando se desmonta el componente
        //permite resetear los valores para desde y hasta
        return () => {
            setearDesdeAnio(constantesTrabajos.ANIO_PRIMER_TRABAJO);
            setearHastaAnio(new Date().getFullYear());
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps 
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío  

    const [datosParaGrafico, setDatosParaGrafico] = useState([]);
    //vector con los datos de cada profesor para el rango de fechas seleccionado
    //Para poder mostrar un gráfico por año, este vector debe tener la siguiente estructura:
    //[
    //    {
    //        estadisticas : [
    //            {
    //                anio : 2020,
    //                'Apellido1, Nombre1' : 3,
    //                'Apellido1, Nombre1Color' : '#30117830',
    //                'Apellido2, Nombre2' : 2,
    //                'Apellido2, Nombre2Color' : '#27365680',
    //                'Apellido3, Nombre3' : 1,
    //                'Apellido3, Nombre3Color' : '#235180'
    //            },
    //        ],
    //        claves : ['Apellido1, Nombre1', 'Apellido2, Nombre2', 'Apellido3, Nombre3']
    //    },
    //    {
    //        estadisticas : [
    //            {
    //                anio : 2019,
    //                'Apellido3, Nombre3' : 3,
    //                'Apellido3, Nombre3Color' : '#235180',
    //                'Apellido1, Nombre1' : 2,
    //                'Apellido1, Nombre1Color' : '#30117830',
    //                'Apellido4, Nombre4' : 1,
    //                'Apellido4, Nombre4Color' : '#518023',
    //            }
    //        ],
    //        claves : ['Apellido3, Nombre3', 'Apellido1, Nombre1', 'Apellido4, Nombre4']
    //    }        
    //]
    //el orden de los valores de los vectores "claves" determina que el gráfico muestre los profesores
    //ordenados según un criterio
    //en este ejemplo, los profesores se muestran ordenados según la cantidad total de trabajos, en orden descendente

    //genera, para el AutoComplete, un vector con números consecutivos, comenzando en desde y terminando en hasta
    //AutoComplete no soporta números, por lo que se los convierte a cadena
    const rango = (desde, hasta) => {
        return Array(hasta - desde + 1).fill().map((_, idx) => (desde + idx).toString());
    }

    //const [profesoresOrdenados, setProfesoresOrdenados] = useState([]);
    //este vector sirve para tener ordenados, para cada año, los profesores según la cantidad de trabajos en forma descendente
    //de este vector también se obtienen los datos para hacer la exportación a Excel
    //Un elemento de este vector tendría la siguiente forma:
    //anio : 2020
    //profesores : [["Ape2, Nom2" : 8], ["Ape1, Nom1" : 6], ["Ape3, Nom3" : 2]]
    //Cada elemento de profesores es un vector con 1 solo elemento
    //Cada uno de estos elementos está ordenado descendentemente según la cantidad total de trabajos en los que participó en ese año el profesor

    //const [datosVectorExcel, setDatosVectorExcel] = useState([]);
    //vector con los datos para exportar a Excel

    const [datosEstadisticas, setDatosEstadisticas] = useState({
        profesoresOrdenados : [],
        datosExcel : []
    });
    //datosEstadisticas tiene 2 claves: profesoresOrdenados y datosExcel
    //profesoresOrdenados sirve para tener ordenados, para cada año, los profesores según la cantidad de trabajos en forma descendente
    //de este vector también se obtienen los datos para hacer la exportación a Excel
    //Un elemento de este vector tendría la siguiente forma:
    //anio : 2020
    //profesores : [["Ape2, Nom2" : 8], ["Ape1, Nom1" : 6], ["Ape3, Nom3" : 2]]
    //Cada elemento de profesores es un vector con 1 solo elemento
    //Cada uno de estos elementos está ordenado descendentemente según la cantidad total de trabajos en los que participó en ese año el profesor
    
    //datosExcel es un vector con los datos para exportar a Excel

    const defaultPropsDesde = {
        options: rango(constantesTrabajos.ANIO_PRIMER_TRABAJO, new Date().getFullYear())
    };
    //valores para mostrar en la lista 'Desde'

    const defaultPropsHasta = {
        options: rango(desdeAnio, new Date().getFullYear())
    };
    //valores para mostrar en la lista 'Hasta'
    //arranca a partir del valor seleccionado en la lista 'Desde'
    //para evitar que el año hasta sea menor que el desde


    //cada vez que se modifica una opción de los checkboxes, se actualiza el vector de opciones
    const checkBoxChange = (seleccionada, opcion) => {
        let opcionTutor = arrayOpciones[0];
        let opcionCotutor = arrayOpciones[1];
        let opcionJurado = arrayOpciones[2];
        switch (opcion) {
            case 1:
                setArrayOpciones([seleccionada, opcionCotutor, opcionJurado]);
                break;
            case 2:
                setArrayOpciones([opcionTutor, seleccionada, opcionJurado]);
                break;
            default:
                setArrayOpciones([opcionTutor, opcionCotutor, seleccionada]);
                break;                
        }
    }    

    //Calcula las estadísticas de todos los profesores entre un rango de fechas
    const calcularEstadisticas = () => {
        let profesoresConTotales = profesores.map(profesor => ({
            ...profesor,
            totalesParciales : Array(hastaAnio - desdeAnio + 1).fill()
                .map((_, idx) => (
                    {
                        anio : desdeAnio + idx,
                        comoTutor : 0,
                        comoCotutor : 0,
                        comoJurado : 0,
                        total : 0
                    }
                )),
            total : 0                        
        }));
        //a cada profesor se le agrega una clave llamada 'totalesParciales' cuyo valor es un vector cuya cantidad de elementos depende del rango de años seleccionado
        //por ejemplo, si el rango de años va desde 2018 al 2022 a cada profesor se le agrega
        //la clave 'totalesParciales' la cual tendrá por valor un vector de 5 elementos
        //cada uno de estos elementos es un objeto
        //la primera clave de estos objetos es el valor del año: 2018, 2019, ..., 2022 siguiendo el ejemplo
        //luego vienen los totales parciales por cada año en los roles de tutor, cotutor y jurado
        //finalmente viene el total por cada año (esto permite sacar los totales discriminando por año)
        //finalmente, la clave total tiene la suma de los totales de todos los años 
        //(permite descartar profesores que en el rango especificado no participaron en trabajos)

        const trabajosParaElRango = trabajos.filter(trabajo => 
            new Date(trabajo.fechaAprobacion).getFullYear() >= desdeAnio && new Date(trabajo.fechaAprobacion).getFullYear() <= hastaAnio);
        //trabajosParaElRango tiene la lista de trabajos filtrada para un rango de fechas            
    
        //calcula las estadísticas de (parciales) de un profesor para un determinado año
        const calcularEstadisticasParcialesDelProfesor = (anio, dni, rol) => {  
            for(let i in profesoresConTotales) {
                const profesor = profesoresConTotales[i];
                if (profesor.dni === dni) { //se encuentra el profesor que se está buscando
                    const totalesParciales = profesor.totalesParciales;
                    for(let j in totalesParciales) {  //se recorren los totales parciales de cada profesor buscando el año especificado
                        const totalParcial = totalesParciales[j];
                        if (totalParcial.anio === anio) { //se encuentra el total parcial del año especificado
                            switch (rol) {
                                case constantesTrabajos.TUTOR:
                                    totalParcial.comoTutor += 1;
                                    break;
                                case constantesTrabajos.COTUTOR:
                                    totalParcial.comoCotutor += 1;
                                    break;
                                default:
                                    totalParcial.comoJurado += 1;
                                    break;
                            }
                            break; // if (totalParcial.anio === anio)
                        }
                    }
                    break; // if (profesor.dni === dni)
                }                
            }
        }

        //A cada profesor le suma los totales como tutor, cotutor y jurado (según estén seleccionadas las opciones)
        //para saber la cantidad de trabajos en los que participó en el año
        //Esto lo hace por cada año comprendido en el rango
        //También obtiene un total de todos los años 
        //(permite descartar aquellos profesores que en el rango de años no participaron en ningún trabajo)
        //Devuelve el listado de profesores con los totales, descartando aquellos que no participaron en ningún trabajo dentro del rango de años
        const calcularEstadisticasTotales = () => {
            for(let i in profesoresConTotales) {
                const profesor = profesoresConTotales[i];
                const totalesParciales = profesor.totalesParciales;
                for(let j in totalesParciales) {
                    const totalParcial = totalesParciales[j];
                    if (arrayOpciones[0]) //se tiene en cuenta el rol tutor
                        totalParcial.total += totalParcial.comoTutor;
                    if (arrayOpciones[1]) //se tiene en cuenta el rol cotutor
                        totalParcial.total += totalParcial.comoCotutor;                    
                    if (arrayOpciones[2]) //se tiene en cuenta el rol jurado
                        totalParcial.total += totalParcial.comoJurado;                    
                    
                    profesor.total += totalParcial.total;                    
                }
            }

            profesoresConTotales = profesoresConTotales.filter(profesor => profesor.total > 0);
            //se descartan los profesores que en el rango especificado no hubieran participado como tutor, cotutor o jurado

            prepararDatosParaGrafico();
        } //calcularEstadisticasTotales

        //Genera el vector con los datos de cada profesor para el rango de fechas seleccionado
        //para que pueda ser presentado en el gráfico
        const prepararDatosParaGrafico = () => {
            const datosParaGraficoUpdate = Array(hastaAnio - desdeAnio + 1).fill()
                .map((_, idx) => (
                    {
                        estadisticas : [{
                            anio : hastaAnio - idx
                        }],
                        claves : []
                    }
                ));
                //está ordenado por año descendentemente

            const profesoresOrdenadosUpdate = Array(hastaAnio - desdeAnio + 1).fill()
                .map((_, idx) => (
                    {
                        anio : hastaAnio - idx,
                        profesores : [],
                        // keys : []
                    }
                ));
            //este vector sirve para tener ordenados, para cada año, los profesores según la cantidad de trabajos en forma descendente
            //es un espacio temporal de almacenamiento
            //Un elemento de este vector tendría la siguiente forma:
            //anio : 2020
            //profesores : [["Ape2, Nom2" : 8], ["Ape1, Nom1" : 6], ["Ape3, Nom3" : 2]]
            //Cada elemento del vector de profesores es un vector con 1 solo elemento
            //Cada uno de estos elementos está ordenado descendentemente según la cantidad total de trabajos en los que participó en ese año el profesor

            for(let i in profesoresConTotales) {
                const profesor = profesoresConTotales[i];
                const totalesParciales = profesor.totalesParciales;
                const color = `#${profesor.dni.toString().substring(0, 6)}`; //los primeros 6 caracteres del dni representan el color
                for(let j in totalesParciales) {
                    const totalParcial = totalesParciales[j];
                    if (totalParcial.total > 0) { //sólo se tiene en cuenta un año con trabajos
                        for(let k in datosParaGraficoUpdate) {
                            const datosDeUnAnio = datosParaGraficoUpdate[k];
                            if (datosDeUnAnio.estadisticas[0].anio === totalParcial.anio) {  
                                const claveProfesor = `${profesor.apellidos}, ${profesor.nombres}`;                              
                                const claveColor = `${claveProfesor}Color`;
                                profesoresOrdenadosUpdate[k].profesores.push([claveProfesor, totalParcial.total]);
                                datosParaGraficoUpdate[k].estadisticas[0][claveColor] = color;
                                break;
                            }
                        }
                    }
                }
            }            

            //se ordenan los profesores
            for(let i in profesoresOrdenadosUpdate) {
                profesoresOrdenadosUpdate[i].profesores = profesoresOrdenadosUpdate[i].profesores.sort((a, b) => { 
                    //b[1] es el segundo elemento, es decir la cantidad total de trabajos
                    //b[0] es el primer elemento, es decir, apellido y nombre del profesor
                    //primero se ordena de forma descendente según la cantidad total de trabajos
                    //si hay 2 profesores con la misma cantidad se ordena según apellido y nombre de forma alfabética
                    if (b[1] < a[1])
                        return -1;
                    if (b[1] > a[1])
                        return 1
                    else {
                        if (a[0] < b[0])
                            return -1;
                        if (a[0] > b[0])
                            return 1
                        else
                            return 0;
                    }
                });
            }

            const datosExcelUpdate = [];
            //los elementos de este vector tienen esta forma:
            //{
            //  anio : 2022,
            //  profesor : 'Nieto, Luis',
            //  total : 5                
            //},
            //{
            //  anio : 2022, 
            //  profesor : 'Gustavo Juárez',
            //  total : 4            
            //}            
            //...

            for(let i in profesoresOrdenadosUpdate) {
                const anio = profesoresOrdenadosUpdate[i].anio;            
                const profesoresDelAnio = profesoresOrdenadosUpdate[i].profesores;
    
                for(let j in profesoresDelAnio) {
                    const nombre = profesoresDelAnio[j][0];
                    const total = profesoresDelAnio[j][1];
                    datosExcelUpdate.push({
                        'anio' : anio,
                        'profesor' : nombre,
                        'total' : total
                    });
                }
                datosExcelUpdate.push({
                    'anio' : '',
                    'profesor' : '',
                    'total' : ''
                }); //para dejar una fila en blanco en el Excel
            }

            //setProfesoresOrdenados(profesoresOrdenadosUpdate);
            setDatosEstadisticas({
                profesoresOrdenados : profesoresOrdenadosUpdate,
                datosExcel : datosExcelUpdate
            })

            //se termina de formar el elemento del vector para el gráfico
            //el vector de claves queda ordenado para que se muestren los profesores en orden descendente según la cantidad total de trabajos
            for (let i in profesoresOrdenadosUpdate) {
                const profes = profesoresOrdenadosUpdate[i].profesores;
                for(let j in profes) {                    
                    const clave = profes[j][0];
                    const valor = profes[j][1];
                    datosParaGraficoUpdate[i].estadisticas[0][clave] = valor;
                    datosParaGraficoUpdate[i].claves.push(clave);
                }
            }
            
            setDatosParaGrafico(datosParaGraficoUpdate);
        } //generarDatosEstadisticas


        //se calculan las estadísticas parciales de cada profesor para los trabajos comprendidos en el rango
        for(let i in trabajosParaElRango) {
            //const anio = new Date(trabajosParaElRango[i].fechaAprobacion).getFullYear();            
            let tutores = trabajosParaElRango[i].tutores;
            for(let j in tutores) {
                const tutor = tutores[j];
                const anio = new Date(tutor.desde).getFullYear();
                //un trabajo puede haber empezado en el 2013, pero un tutor se suma después (2014, 2015, ...)
                if ((anio >= desdeAnio) && (anio <= hastaAnio))
                    calcularEstadisticasParcialesDelProfesor(anio, tutores[j].dni, constantesTrabajos.TUTOR);
            }
            
            let cotutores = trabajosParaElRango[i].cotutores;
            for(let j in cotutores) {
                const cotutor = cotutores[j];
                const anio = new Date(cotutor.desde).getFullYear();
                //un trabajo puede haber empezado en el 2013, pero un cotutor se suma después (2014, 2015, ...)
                if ((anio >= desdeAnio) && (anio <= hastaAnio))
                    calcularEstadisticasParcialesDelProfesor(anio, cotutores[j].dni, constantesTrabajos.COTUTOR);
            }

            let jurado = trabajosParaElRango[i].jurado;
            for(let j in jurado) {
                const profesorDelJurado = jurado[j];
                const anio = new Date(profesorDelJurado.desde).getFullYear();
                //un trabajo puede haber empezado en el 2013, pero un miembro del jurado se suma después (2014, 2015, ...)
                if ((anio >= desdeAnio) && (anio <= hastaAnio))
                    calcularEstadisticasParcialesDelProfesor(anio, jurado[j].dni, constantesTrabajos.JURADO);
            }
        }

        calcularEstadisticasTotales();        
    } //calcularEstadisticas

    const autoCompleteOnChange = (valor, quien) => {
        quien === constantesTrabajos.DESDE ? 
            setearDesdeAnio(parseInt(valor))
        :
            setearHastaAnio(parseInt(valor));                
    }

    return (
        <>
            <Paper className = {clases.pageContent}>
                <Grid container spacing = {1}>
                    <Grid item lg = {4} sm = {4} xs = {4}>
                        <FormControlLabel
                            control = {<Checkbox />}
                            label = {constantesTrabajos.TUTOR}
                            // className = {clases.checkBox}
                            checked = {arrayOpciones[0]}
                            onChange = {evento => checkBoxChange(evento.target.checked, 1)}
                        />
                    </Grid>
                    <Grid item lg = {4} sm = {4} xs = {4}>
                        <FormControlLabel
                            control = {<Checkbox />}
                            label = {constantesTrabajos.COTUTOR}
                            // className = {clases.checkBox}
                            checked = {arrayOpciones[1]}
                            onChange = {evento => checkBoxChange(evento.target.checked, 2)}
                        />
                    </Grid>
                    <Grid item lg = {4} sm = {4} xs = {4}>
                        <FormControlLabel
                            control = {<Checkbox />}
                            label = {constantesTrabajos.JURADO}
                            // className = {clases.checkBox}
                            checked = {arrayOpciones[2]}
                            onChange = {evento => checkBoxChange(evento.target.checked, 3)}
                        />
                    </Grid>
                    <Grid item lg = {4} sm = {4} xs = {4}>
                        <Autocomplete 
                            {...defaultPropsDesde}
                            isOptionEqualToValue = {(option, value) => option.value === value.value}
                            // disablePortal
                            disableClearable
                            id = "combo-box-desde"
                            renderInput = {(params) => <TextField {...params} label = { constantesTrabajos.DESDE } />} 
                            value = { desdeAnio.toString() }
                            onChange = {(evento, valor) => autoCompleteOnChange(valor, constantesTrabajos.DESDE)}
                            // className = {classes.autoComplete}
                        />
                    </Grid>
                    <Grid item lg = {4} sm = {4} xs = {4}>
                        <Autocomplete 
                            {...defaultPropsHasta}
                            isOptionEqualToValue = {(option, value) => option.value === value.value}
                            // disablePortal
                            disableClearable
                            id = "combo-box-hasta"
                            renderInput = {(params) => <TextField {...params} label = { constantesTrabajos.HASTA } />} 
                            value = { hastaAnio.toString() }
                            onChange = {(evento, valor) => autoCompleteOnChange(valor, constantesTrabajos.HASTA)}
                            // className = {classes.autoComplete}
                        />
                    </Grid>
                    <Grid item lg = {3} sm = {3} xs = {3}>
                        <Button 
                            variant = 'contained' 
                            className = {clases.botonEstadisticas} 
                            onClick = {() => calcularEstadisticas()}
                        >
                            Calcular
                        </Button>
                    </Grid>
                    <Grid item lg = {1} sm = {1} xs = {1}>
                        <ExcelFile filename = 'Estadisticas' element = {
                            <IconButton 
                                aria-label = "exportar a Excel"
                                size = "medium"                        
                                className = {clases.botonExcel}
                                //onClick = {() => exportarExcel()}
                                disabled = {datosEstadisticas.profesoresOrdenados.length === 0 ? true : false}
                            >
                                <RiFileExcel2Line />
                            </IconButton>
                        }>
                            <ExcelSheet data = {datosEstadisticas.datosExcel} name = 'Detalle' >
                                <ExcelColumn label = "Año" value = "anio" />
                                <ExcelColumn label = "Apellido y nombre" value = "profesor" />
                                <ExcelColumn label = "Total" value = "total" />
                            </ExcelSheet>
                        </ExcelFile>                    
                    </Grid>
                    {
                        datosParaGrafico.map((dato, i) => (
                            dato.claves.length > 0 
                                ?
                                    <Grid item lg = {12} sm = {12} xs = {12} key = {i}>
                                        <div style = {{height: 600}}>
                                            <GraficoEstadisticas                                             
                                                datos = {dato.estadisticas} 
                                                claves = {dato.claves}
                                            />
                                        </div>
                                    </Grid>
                                :
                                    null
                        ))
                    }                
                </Grid>
            </Paper>
        </>
    )
}

export default Estadisticas;

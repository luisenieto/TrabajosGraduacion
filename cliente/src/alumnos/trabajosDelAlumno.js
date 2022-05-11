import React, {Fragment} from 'react';
import DatosTrabajo from './datosTrabajo';
import DatosProfesores from './datosProfesores';
import DatosAlumnos from './datosAlumnos';

//Componente que permite mostrar todos los trabajos de un alumno en particular
//emplea a su vez 3 componentes: DatosTrabajo, DatosProfesores y DatosAlumnos
const TrabajosDelAlumno = ({alumno, trabajosDelAlumno}) => { 

    return (
        <Fragment>
            {
                trabajosDelAlumno.length > 0 ?
                    trabajosDelAlumno.map((trabajo, i) => (
                        <Fragment key = {i} >
                            <DatosTrabajo                                         
                                titulo = {trabajo.titulo}
                                presentacion = {trabajo.fechaPresentacion}
                                aprobacion = {trabajo.fechaAprobacion}
                                finalizacion = {trabajo.fechaFinalizacion}
                            />
                            <DatosProfesores 
                                profesores = {trabajo.tutores}
                                titulo = 'Tutores'
                            />   
                            {
                                trabajo.cotutores.length > 0 ?
                                    <DatosProfesores 
                                        profesores = {trabajo.cotutores}
                                        titulo = 'Cotutores'
                                    />
                                :
                                    null
                            }
                            <DatosProfesores 
                                profesores = {trabajo.jurado}
                                titulo = 'Jurado'
                            />  
                            {
                                trabajo.alumnos.length > 1 ?
                                    <DatosAlumnos 
                                        alumno = {alumno}
                                        alumnos = {trabajo.alumnos}
                                        titulo = 'Alumnos'
                                    />
                                :
                                    null
                            }                      
                        </Fragment>
                    ))
                :
                    null
            }
        </Fragment>
    )
} 

export default TrabajosDelAlumno;

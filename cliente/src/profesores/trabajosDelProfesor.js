import React, {Fragment} from 'react';
import DatosTrabajo from './datosTrabajo';
import DatosProfesores from './datosProfesores';
import DatosAlumnos from './datosAlumnos';

//Componente que permite mostrar todos los trabajos de un profesor en particular
//emplea a su vez 3 componentes: DatosTrabajo, DatosProfesores y DatosAlumnos
const TrabajosDelProfesor = ({profesor, trabajosDelProfesor}) => { 

    return (
        <Fragment>
            {
                trabajosDelProfesor.length > 0 ?
                    trabajosDelProfesor.map((trabajo, i) => (
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
                            <DatosAlumnos 
                                alumnos = {trabajo.alumnos}
                                titulo = 'Alumnos'
                            />
                        </Fragment>
                    ))
                :
                    null
            }
        </Fragment>
    )
} //TrabajosDelProfesor

export default TrabajosDelProfesor;

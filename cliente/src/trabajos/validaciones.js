import { constantesTrabajos } from "../config/constantes";

const validarTrabajoParaCreacion = (trabajo, trabajos) => {
    let resultado;
    if ((resultado = validarTitulo(null, trabajo.titulo, trabajos)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarDuracion(trabajo.duracion)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarAreas(trabajo.areas)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarFechas(trabajo.fechaPresentacion, trabajo.fechaAprobacion, null)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarTutorYCotutor(trabajo.tutores[0], trabajo.cotutores[0])) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarJuradoParaCreacion(trabajo.jurado, trabajo.tutores, trabajo.cotutores, trabajo.fechaFinalizacion)) !== constantesTrabajos.OK)
        return resultado;      
    if ((resultado = validarAlumnosParaCreacion(trabajo.alumnos, trabajos)) !== constantesTrabajos.OK)
        return resultado;
    return constantesTrabajos.OK
}
//valida el trabajo para su creación

const validarTrabajoParaModificacion = (trabajo, trabajos) => {
    let resultado;
    if ((resultado = validarTitulo(trabajo._id, trabajo.titulo, trabajos)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarDuracion(trabajo.duracion)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarAreas(trabajo.areas)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarFechas(trabajo.fechaPresentacion, trabajo.fechaAprobacion, trabajo.fechaFinalizacion)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarTutores(trabajo.tutores, trabajo.fechaFinalizacion)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarCotutores(trabajo.cotutores, trabajo.fechaFinalizacion)) !== constantesTrabajos.OK)
        return resultado;
    if ((resultado = validarJuradoParaModificacion(trabajo.jurado, trabajo.tutores, trabajo.cotutores, trabajo.fechaFinalizacion)) !== constantesTrabajos.OK)
        return resultado;      
    if ((resultado = validarAlumnosParaModificacion(trabajo._id, trabajo.alumnos, trabajos, trabajo.fechaFinalizacion)) !== constantesTrabajos.OK)
        return resultado;
    return constantesTrabajos.OK
}
//valida el trabajo para su modificación


const validarTitulo = (id, titulo, trabajos) => {
    if ((titulo === null) || (titulo.trim() === ''))
        return constantesTrabajos.TITULO_INVALIDO;
    if (id === null) { //alta de trabajo
        if (trabajos.some(trabajo => 
            trabajo.titulo.toLowerCase() === titulo.trim().toLowerCase()
        ))
            return constantesTrabajos.TITULO_REPETIDO

    }
    else { //modificación del trabajo
        if (trabajos.some(trabajo => 
            (trabajo.titulo.toLowerCase() === titulo.trim().toLowerCase()) &&
            (trabajo._id !== id)
        ))
            return constantesTrabajos.TITULO_REPETIDO
    }
    return constantesTrabajos.OK
}
//valida el título del trabajo: que no sea null o vacío, y que otro trabajo no tenga el mismo título
//el parámetro id se usa cuando se está modificando el trabajo
//si se está haciendo un alta, id vale null

const validarDuracion = (duracion) => {
    return duracion <= 0 ? constantesTrabajos.DURACION_INVALIDA : constantesTrabajos.OK
}
//valida que la duración del trabajo sea un número positivo

const validarAreas = (areas) => {
    return ((areas === null) || (areas === '')) ? constantesTrabajos.AREAS_INVALIDAS : constantesTrabajos.OK
}
//valida que el trabajo tenga al menos un área

const validarFechas = (fechaPresentacion, fechaAprobacion, fechaFinalizacion) => {
    if (fechaPresentacion === null || fechaPresentacion === '')
        return constantesTrabajos.FECHA_PRESENTACION_INVALIDA;
    if (fechaAprobacion === null || fechaAprobacion === '')
        return constantesTrabajos.FECHA_APROBACION_INVALIDA;
    if (fechaAprobacion.substring(0, 10) < fechaPresentacion.substring(0, 10))
        return constantesTrabajos.FECHA_APROBACION_ANTERIOR_FINALIZACION;
    //substring(0, 10): extrae sólo la fecha, para no tener en cuenta la hora        
    if ((fechaFinalizacion !== null && fechaFinalizacion.substring(0, 10) <= fechaAprobacion.substring(0, 10)))    
        return constantesTrabajos.FECHA_FINALIZACION_ANTERIOR_APROBACION
    else
        return constantesTrabajos.OK
}
//valida que las fechas del trabajo sean válidas
//un trabajo debe tener una fecha de presentación y una de aprobación
//la fecha de aprobación debe ser igual o posterior a la de presentación
//cuando se crea un trabajo, la fecha de finalización es nula
//cuando se modifica un trabajo, se le puede asignar una fecha de finalización
//si tiene fecha de finalización, la misma debe ser posterior a la de aprobación

const validarTutores = (tutores, fechaFinalizacion) => {
    for(let i in tutores) {
        if (tutores[i].apellidos === null)
            return constantesTrabajos.TUTOR_INVALIDO;
    }
    if (fechaFinalizacion) { //finalización del trabajo
        let cantidadTutoresConRazon = 0;
        for(let i in tutores) {
            if (tutores[i].razon === constantesTrabajos.FINALIZACION)
                cantidadTutoresConRazon++;
        }
        if (cantidadTutoresConRazon > 1)
            return constantesTrabajos.TUTOR_ACTIVO2;    
    }
    else { //modificación del trabajo
        let cantidadTutoresSinRazon = 0;
        for(let i in tutores) {
            if (tutores[i].razon === null)
                cantidadTutoresSinRazon++;
        }
        if (cantidadTutoresSinRazon > 1)
            return constantesTrabajos.TUTOR_ACTIVO;    
    }
    return constantesTrabajos.OK;
}
//valida que los tutores del trabajo sean válidos
//un trabajo no puede tener un tutor nulo
//se la utiliza en la modificación de un trabajo

const validarCotutores = (cotutores, fechaFinalizacion) => {
    for(let i in cotutores) {
        if (cotutores[i].apellidos === null)
            return constantesTrabajos.COTUTOR_INVALIDO2;
    }
    if (fechaFinalizacion) { //finalización del trabajo
        let cantidadCotutoresConRazon = 0;
        for(let i in cotutores) {
            if (cotutores[i].razon === constantesTrabajos.FINALIZACION)
                cantidadCotutoresConRazon++;
        }
        if (cantidadCotutoresConRazon > 1)
            return constantesTrabajos.COTUTOR_ACTIVO2;    
    }
    else { //modificación del trabajo
        let cantidadCotutoresSinRazon = 0;
        for(let i in cotutores) {
            if (cotutores[i].razon === null)
                cantidadCotutoresSinRazon++;
        }
        if (cantidadCotutoresSinRazon > 1)
            return constantesTrabajos.COTUTOR_ACTIVO;    
    }

    return constantesTrabajos.OK;
}  
//valida que los cotutores del trabajo sean válidos
//un trabajo no puede tener un cotutor nulo
//se la utiliza en la modificación de un trabajo

const validarTutorYCotutor = (tutor, cotutor) => {
    if (tutor.apellidos === null)
        return constantesTrabajos.TUTOR_INVALIDO;
    if ((cotutor.dni !== null) && (tutor.dni === cotutor.dni))
        return constantesTrabajos.COTUTOR_INVALIDO
    else
        return constantesTrabajos.OK;
}
//valida que el tutor del trabajo sea válido
//un trabajo no puede tener un cotutor nulo
//si el trabajo tiene cotutor, el mismo no puede ser nulo ni igual al tutor
//se la utiliza en la creación de un trabajo


const validarJuradoParaCreacion = (jurado, tutores, cotutores, fechaFinalizacion) => {
    for(let i in jurado) {
        if (jurado[i].apellidos === null)
            return constantesTrabajos.JURADO_INVALIDO;
    }
    for(let i = 0; i < jurado.length - 1; i++) {
        for(let j = i + 1; j < jurado.length; j++) {
            if (jurado[i].dni === jurado[j].dni) 
                return constantesTrabajos.JURADO_DUPLICADO;
        }
    }
    for(let i in jurado) {
        if (jurado[i].dni === tutores[0].dni)
            return constantesTrabajos.TUTOR_ES_JURADO;
    }
    for(let i in jurado) {
        for(let j in cotutores) {
            if (jurado[i].dni === cotutores[j].dni)
                return constantesTrabajos.COTUTOR_ES_JURADO;
        }
    }
    return constantesTrabajos.OK;
}
//valida que el jurado sea válido
//ningún miembro del jurado puede ser nulo
//todos los miembros del jurado deben ser profesores diferentes
//ningún miembro del jurado puede ser tutor
//ningún miembro del jurado puede ser cotutor

const validarJuradoParaModificacion = (jurado, tutores, cotutores, fechaFinalizacion) => {
    for(let i in jurado) {
        if (jurado[i].apellidos === null)
            return constantesTrabajos.JURADO_INVALIDO;
    }
    for(let i = 0; i < jurado.length - 1; i++) {
        for(let j = i + 1; j < jurado.length; j++) {
            if (jurado[i].dni === jurado[j].dni) 
                return constantesTrabajos.JURADO_DUPLICADO;
        }
    }
    for(let i in jurado) {
        for(let j in tutores) {
            if (jurado[i].dni === tutores[j].dni)
                return constantesTrabajos.TUTOR_ES_JURADO;
        }
    }
    for(let i in jurado) {
        for(let j in cotutores) {
            if (jurado[i].dni === cotutores[j].dni)
                return constantesTrabajos.COTUTOR_ES_JURADO;
        }
    }

    if (fechaFinalizacion) {
        let cantidadJuradoConRazon = 0;
        for(let i in jurado) {
            if (jurado[i].razon === constantesTrabajos.FINALIZACION)
                cantidadJuradoConRazon++;
        }
        //console.log(cantidadJuradoSinRazon)
        if (cantidadJuradoConRazon !== 3)
            return constantesTrabajos.JURADO_ACTIVO;
    }
    else {
        let cantidadJuradoSinRazon = 0;
        for(let i in jurado) {
            if (jurado[i].razon === null)
                cantidadJuradoSinRazon++;
        }
        //console.log(cantidadJuradoSinRazon)
        if (cantidadJuradoSinRazon > 3)
            return constantesTrabajos.JURADO_ACTIVO2;

    }
    return constantesTrabajos.OK;
}
//valida que el jurado sea válido
//ningún miembro del jurado puede ser nulo
//todos los miembros del jurado deben ser profesores diferentes
//ningún miembro del jurado puede ser tutor
//ningún miembro del jurado puede ser cotutor

const validarAlumnosParaCreacion = (alumnos, trabajos) => {
    let resultado;
    if ((alumnos[0].dni === null) && (alumnos[1].dni === null) && (alumnos[2].dni === null))
        return constantesTrabajos.ALUMNOS_INCOMPLETO;
    if ((alumnos[0].dni !== null) && (alumnos[1].dni !== null) && (alumnos[0].dni === alumnos[1].dni))
        return constantesTrabajos.ALUMNOS_DUPLICADOS;
    if ((alumnos[0].dni !== null) && (alumnos[2].dni !== null) && (alumnos[0].dni === alumnos[2].dni))
        return constantesTrabajos.ALUMNOS_DUPLICADOS;            
    if ((alumnos[1].dni !== null) && (alumnos[2].dni !== null) && (alumnos[1].dni === alumnos[2].dni))
        return constantesTrabajos.ALUMNOS_DUPLICADOS;   
    if ((alumnos[0].dni !== null) && ((resultado = alumnoEnOtroTrabajo(null, alumnos[0], trabajos)) !== constantesTrabajos.OK))
        return resultado;
    if ((alumnos[1].dni !== null) && ((resultado = alumnoEnOtroTrabajo(null, alumnos[1], trabajos)) !== constantesTrabajos.OK))
        return resultado;
    if ((alumnos[2].dni !== null) && ((resultado = alumnoEnOtroTrabajo(null, alumnos[2], trabajos)) !== constantesTrabajos.OK))
        return resultado;            
    return constantesTrabajos.OK;
}
//valida que los alumnos del trabajo sean válidos
//un trabajo no puede tener 0 alumnos
//ningún alumno puede ser nulo
//todos los alumnos del trabajo deben ser distintos
//ningún alumno puede estar en otro trabajo, al menos que el mismo esté dado de baja
//cuando se crea un alumno, id vale null

const validarAlumnosParaModificacion = (id, alumnos, trabajos, fechaFinalizacion) => {
    let resultado;
    
    for(let i in alumnos) {
        if (alumnos[i].apellidos === null)
            return constantesTrabajos.ALUMNO_INVALIDO;
    }            
    for(let i = 0; i < alumnos.length - 1; i++) {        
        for(let j = i + 1; j < alumnos.length; j++) {
            if (alumnos[i].dni === alumnos[j].dni) 
                return constantesTrabajos.ALUMNOS_DUPLICADOS;
        }
    }
    for(let i in alumnos) {
        if ((resultado = alumnoEnOtroTrabajo(id, alumnos[i], trabajos)) !== constantesTrabajos.OK)
            return resultado;
    }
    if (fechaFinalizacion) { //finalización trabajo
        let cantidadAlumnosConRazon = 0;
        for(let i in alumnos) {
            if (alumnos[i].razon === constantesTrabajos.FINALIZACION)
                cantidadAlumnosConRazon++;
        }
        if (cantidadAlumnosConRazon === 0)
            return constantesTrabajos.ALUMNO_ACTIVO;    
    }
    else { //modificación trabajo
        let cantidadAlumnosConRazon = 0;
        for(let i in alumnos) {
            if (alumnos[i].razon !== null)
                cantidadAlumnosConRazon++;
        }
        if (cantidadAlumnosConRazon === alumnos.length)
            return constantesTrabajos.ALUMNO_ACTIVO;    

    }
    return constantesTrabajos.OK;
}
//valida que los alumnos del trabajo sean válidos
//un trabajo no puede tener 0 alumnos
//ningún alumno puede ser nulo
//todos los alumnos del trabajo deben ser distintos
//ningún alumno puede estar en otro trabajo, al menos que el mismo esté dado de baja
//cuando se crea un alumno, id vale null

const alumnoEnOtroTrabajo = (id, alumno, trabajos) => {
    if (id === null) { //alta de trabajo
        for(let i in trabajos) {
            const alumnos = trabajos[i].alumnos; 
            for (let j in alumnos) {
                if ((alumno.dni === alumnos[j].dni) && 
                    ((alumnos[j].razon === null) || 
                    (alumnos[j].razon === constantesTrabajos.FINALIZACION))) 
                    return constantesTrabajos.ALUMNO_EN_OTRO_TRABAJO
            }
        }
    }
    else { //modificación del trabajo
        for(let i in trabajos) {
            const alumnos = trabajos[i].alumnos; 
            for (let j in alumnos) {
                if ((trabajos[i]._id !== id) && 
                    ((alumno.dni === alumnos[j].dni) && 
                        ((alumnos[j].razon === null) || (alumnos[j].razon === constantesTrabajos.FINALIZACION)))) 
                    return constantesTrabajos.ALUMNO_EN_OTRO_TRABAJO
            }
        }
    }    
    return constantesTrabajos.OK;
}
//valida que el alumno no esté en otro trabajo
//si está en otro trabajo, el mismo sólo puede estar dado de baja


export {validarTrabajoParaCreacion, validarTrabajoParaModificacion}
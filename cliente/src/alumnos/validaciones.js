import { constantesAlumnos } from "../config/constantes";

const permitidosParaApeYNom = [8, 9, 16, 17, 20, 35, 36, 46, 65, 
    66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 
    76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 
    86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 
    96, 97, 98, 99, 100, 101, 102, 103, 104, 
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 
    115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 
    125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 
    135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 
    145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 
    155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 
    165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 
    175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 
    185, 186, 187, 188, 189, 190, 191, 192];
//caracteres permitidos para el apellido y nombre    
//8: backspace, 9: tab, 16: shift, 17: Ctrl, 20: caps, 35: end, 36: home, 46: del
//65: A, 66: B, 192: Z

const permitidosParaDNIYCX = [8, 9, 16, 17, 20, 35, 36, 46, 
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 
    96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
//caracteres permitidos para el dni y cx    
//8: backspace, 9: tab, 16: shift, 17: Ctrl, 20: caps, 35: end, 36: home, 46: del
//48: 0, 49: 1, 57: 9
//96: 0 (teclado numérico), 97: 1 (teclado numérico), 105: 9 (teclado numérico)

const esCaracterValido = (caracter, vector) => {
    for(let i = 0; i < vector.length; i++) {
        if (caracter === vector[i])
            return true;
    }
    return false;
}
//determina si un determinado caracter es válido o no según el vector donde se haga la comparación

const sePuedeBorrarElAlumno = (dni, trabajos) => {
    for(let i in trabajos) {
        const trabajo = trabajos[i];
        for(let j in trabajo.alumnos) {
            const alumno = trabajo.alumnos[j];
            if (alumno.dni === dni)
                return false;
        }
    }
    return true;
}
//devuelve true si el alumno se puede borrar, false en caso contrario
//un alumno no se puede borrar si figura en algún trabajo

const validarAlumnoParaCreacion = (alumno, alumnos) => {
    let resultado;
    if ((resultado = validarApellidos(alumno.apellidos, alumnos)) !== constantesAlumnos.OK)
        return resultado;
    if ((resultado = validarNombres(alumno.nombres, alumnos)) !== constantesAlumnos.OK)
        return resultado;
    if ((resultado = validarDNI(alumno.dni, alumnos)) !== constantesAlumnos.OK)
        return resultado;
    if ((resultado = validarCX(null, alumno.cx, alumnos)) !== constantesAlumnos.OK)
        return resultado;
    return constantesAlumnos.OK
}
//valida el alumno para su creación

const validarAlumnoParaModificacion = (alumno, alumnos) => {
    let resultado;
    if ((resultado = validarApellidos(alumno.apellidos, alumnos)) !== constantesAlumnos.OK)
        return resultado;
    if ((resultado = validarNombres(alumno.nombres, alumnos)) !== constantesAlumnos.OK)
        return resultado;
    if ((resultado = validarCX(alumno._id, alumno.cx, alumnos)) !== constantesAlumnos.OK)
        return resultado;
    return constantesAlumnos.OK
}
//valida el alumno para su modificación

const validarApellidos = (apellidos) => {
    if ((apellidos === null) || (apellidos.trim() === ''))
        return constantesAlumnos.APELLIDOS_INVALIDO;
    return constantesAlumnos.OK
}
//valida el apellido del alumno: que no sea null o vacío

const validarNombres = (nombres) => {
    if ((nombres === null) || (nombres.trim() === ''))
        return constantesAlumnos.NOMBRES_INVALIDO;
    return constantesAlumnos.OK
}
//valida el nombre del alumno: que no sea null o vacío

const validarDNI = (dni, alumnos) => {
    if ((dni === null) || (dni === ''))
        return constantesAlumnos.DNI_INVALIDO;
    if (alumnos.some(alumno => 
            alumno.dni === parseInt(dni)
    ))
        return constantesAlumnos.DNI_REPETIDO
    return constantesAlumnos.OK
}
//valida el DNI del alumno: que no sea null, y que otro alumno no tenga el mismo DNI
//Se puede dar el caso que alguien que fue alumno luego sea profesor,
//por eso sólo se valida que no haya otro alumno con el mismo DNI

const validarCX = (id, cx, alumnos) => {
    if (id === null) { //alta de alumno
        if (alumnos.some(alumno => 
            (cx !== '') && (alumno.cx.toLowerCase() === cx.trim().toLowerCase())
        ))
            return constantesAlumnos.CX_REPETIDO

    }
    else { //modificación del alumno
        if (alumnos.some(alumno => 
            (cx !== '') && (alumno.cx.toLowerCase() === cx.trim().toLowerCase()) &&
            (alumno._id !== id)
        ))
            return constantesAlumnos.CX_REPETIDO
    }
    return constantesAlumnos.OK
}
//valida el cx del alumno: puede ser nulo, y si no lo es, ningún otro alumno puede tener el mismo
//el parámetro id se usa cuando se está modificando el alummo
//si se está haciendo un alta, id vale null

export {validarAlumnoParaCreacion, 
    validarAlumnoParaModificacion, 
    permitidosParaApeYNom, 
    permitidosParaDNIYCX, 
    esCaracterValido,
    sePuedeBorrarElAlumno
}
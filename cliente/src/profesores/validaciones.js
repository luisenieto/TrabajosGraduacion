import { constantesProfesores } from "../config/constantes";

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

const permitidosParaDNI = [8, 9, 16, 17, 20, 35, 36, 46, 
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 
    96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
//caracteres permitidos para el dni    
//8: backspace, 9: tab, 16: shift, 17: Ctrl, 20: caps, 35: end, 36: home, 46: del
//48: 0, 49: 1, 57: 9
//96: 0 (teclado numérico), 97: 1 (teclado numérico), 105: 9 (teclado numérico)

const esCaracterValido = (ctrlDown, charCode, vector) => {
    if (ctrlDown) { //se presionó Ctrl
        if ((charCode === 67) || (charCode === 86) || (charCode === 88))
            return true
        else
            return false;
    }
    else { //no se presionó Ctrl
        for(let i = 0; i < vector.length; i++) {
            if (charCode === vector[i])
                return true;
        }
    }
    return false;
}
//determina si un determinado caracter es válido o no según el vector donde se haga la comparación

const apellidoYNombreOnKeyDown = (evento) => {
    var charCode = (evento.which) ? evento.which : evento.keyCode; 
    const ctrlDown = evento.ctrlKey || evento.metaKey; //soporte para Mac    
    if (!esCaracterValido(ctrlDown, charCode, permitidosParaApeYNom))
        evento.preventDefault();
}
//Verifica que no se puedan ingresar otros caracteres que no sean los definidos como válidos

const dniOnKeyDown = (evento) => {
    var charCode = (evento.which) ? evento.which : evento.keyCode;
    const ctrlDown = evento.ctrlKey || evento.metaKey; //soporte para Mac    
    if (!esCaracterValido(ctrlDown, charCode, permitidosParaDNI))
        evento.preventDefault();
}
//Verifica que no se puedan ingresar otros caracteres que no sean los definidos como válidos

const regexApeYNom = /^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/; 

const apellidoYNombreOnPaste = (evento) => {
    const textoCopiado = evento.clipboardData.getData('text');
    if(!regexApeYNom.test(textoCopiado))
        evento.preventDefault();
}
//evita que en los campos apellido o nombres se pueda pegar texto inválido

const regexDni = /^\d+$/; 

const dniOnPaste = (evento) => {
    const textoCopiado = evento.clipboardData.getData('text');
    if(!regexDni.test(textoCopiado))
        evento.preventDefault();
}
//evita que en el campo dni se pueda pegar texto inválido

const sePuedeBorrarElProfesor = (dni, trabajos) => {
    for(let i in trabajos) {
        const trabajo = trabajos[i];
        for(let j in trabajo.tutores) {
            const profesor = trabajo.tutores[j];
            if (profesor.dni === dni)
                return false;
        }
        for(let j in trabajo.cotutores) {
            const profesor = trabajo.cotutores[j];
            if (profesor.dni === dni)
                return false;
        }        
        for(let j in trabajo.jurado) {
            const profesor = trabajo.jurado[j];
            if (profesor.dni === dni)
                return false;
        }        
    }
    return true;
}
//devuelve true si el profesor se puede borrar, false en caso contrario
//un profesor no se puede borrar si figura en algún trabajo (no importa el rol)

const validarProfesorParaCreacion = (profesor, profesores) => {
    let resultado;
    if ((resultado = validarApellidos(profesor.apellidos, profesores)) !== constantesProfesores.OK)
        return resultado;
    if ((resultado = validarNombres(profesor.nombres, profesores)) !== constantesProfesores.OK)
        return resultado;
    if ((resultado = validarDNI(profesor.dni, profesores)) !== constantesProfesores.OK)
        return resultado;
    return constantesProfesores.OK
}
//valida el profesor para su creación

const validarProfesorParaModificacion = (profesor, profesores) => {
    let resultado;
    if ((resultado = validarApellidos(profesor.apellidos, profesores)) !== constantesProfesores.OK)
        return resultado;
    if ((resultado = validarNombres(profesor.nombres, profesores)) !== constantesProfesores.OK)
        return resultado;
    return constantesProfesores.OK
}
//valida el profesor para su modificación

const validarApellidos = (apellidos) => {    
    if ((apellidos === null) || (apellidos.trim() === ''))
        return constantesProfesores.APELLIDOS_INVALIDO;
    return constantesProfesores.OK
}
//valida el apellido del profesor: que no sea null o vacío

const validarNombres = (nombres) => {
    if ((nombres === null) || (nombres.trim() === ''))
        return constantesProfesores.NOMBRES_INVALIDO;
    return constantesProfesores.OK
}
//valida el nombres del profesor: que no sea null o vacío

const validarDNI = (dni, profesores) => {
    if ((dni === null) || (dni === ''))
        return constantesProfesores.DNI_INVALIDO;
    if (profesores.some(profesor => 
            profesor.dni === parseInt(dni)
    ))
        return constantesProfesores.DNI_REPETIDO
    return constantesProfesores.OK
}
//valida el DNI del profesor: que no sea null, y que otro profesor no tenga el mismo DNI
//Se puede dar el caso que alguien que fue alumno luego sea profesor,
//por eso sólo se valida que no haya otro profesor con el mismo DNI


export {validarProfesorParaCreacion, 
    validarProfesorParaModificacion, 
    permitidosParaApeYNom, 
    permitidosParaDNI, 
    esCaracterValido,
    sePuedeBorrarElProfesor,
    apellidoYNombreOnKeyDown,
    dniOnKeyDown,
    apellidoYNombreOnPaste,
    dniOnPaste
}
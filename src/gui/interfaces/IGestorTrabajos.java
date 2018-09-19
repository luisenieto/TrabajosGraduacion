/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import gui.areas.modelos.Area;
import gui.personas.modelos.Alumno;
import gui.personas.modelos.Profesor;
import gui.seminarios.modelos.NotaAprobacion;
import gui.seminarios.modelos.Seminario;
import gui.trabajos.modelos.AlumnoEnTrabajo;
import gui.trabajos.modelos.RolEnTrabajo;
import gui.trabajos.modelos.Trabajo;
import java.time.LocalDate;
import java.util.List;

public interface IGestorTrabajos {
    //Constantes para las operaciones de E/S
    public static final String LECTURA_ERROR = "Error al leer los trabajos";
    public static final String LECTURA_OK = "Se pudieron leer los trabajos";
    public static final String ARCHIVO_INEXISTENTE = "No existe el archivo";
    public static final String ESCRITURA_ERROR = "Error al guardar los trabajos";
    public static final String ESCRITURA_OK = "Se pudieron guardar los trabajos";    

    //Constantes para el ABM de trabajos    
    public static final String EXITO = "Trabajo creado/modificado/borrado con éxito";
    public static final String ERROR_TITULO_DURACION = "El título y/o duración del trabajo son incorrectos,\no ya existe un trabajo con el mismo título";
    public static final String ERROR_AREA = "El área del trabajo no puede ser nula";    
    public static final String ERROR_FECHAS = "Las fechas de presentación/aprobación son incorrectas y/o la fecha de aprobación no es posterior o igual a la de presentación";
    public static final String ERROR_FECHA_EXPOSICION = "La fecha de exposición es incorrecta y/o no es posterior a la de aprobación";    
    public static final String ERROR_TUTOR_COTUTOR = "El trabajo no tiene tutor, o el tutor y cotutor son la misma persona";
    public static final String ERROR_JURADO = "El jurado debe estar compuesto por 3 profesores distintos, y el tutor y cotutor no pueden formar formar parte del mismo";
    public static final String ERROR_ALUMNOS = "El trabajo no tiene alumnos, y/o los alumnos seleccionados son incorrectos o están actualmente en otro trabajo";    
    public static final String TRABAJO_INEXISTENTE = "No existe el trabajo especificado";
    public static final String TRABAJO_REEMPLAZAR_PROFESOR_ERROR = "Los datos para reemplazar el profesor son incorrectos";
    public static final String TRABAJO_REEMPLAZAR_PROFESOR_DUPLICADO = "El profesor que se quiere agregar al trabajo ya participa en el mismo";
    public static final String TRABAJO_REEMPLAZAR_PROFESOR_INEXISTENTE = "El trabajo no tiene un profesor para reemplazar";
    public static final String TRABAJO_FINALIZACION = "Finalización del trabajo";
    public static final String TRABAJO_FINALIZAR_ALUMNO_ERROR = "Los datos para finalizar el alumno son incorrectos";
    public static final String TRABAJO_FINALIZAR_ALUMNO_INEXISTENTE = "El trabajo no tiene un alumno para finalizar";
    public static final String TRABAJO_CON_SEMINARIO = "No se puede borrar el trabajo porque tiene al menos un seminario";    
    
    //Constantes para los seminarios de los trabajos
    public static final String SEMINARIO_INEXISTENTE = "No existe el seminario especificado";
    public static final String SEMINARIO_ERROR = "La fecha y/o nota de aprobación no pueden ser nulas";    
    public static final String SEMINARIO_DUPLICADO = "El trabajo ya tiene un seminario expuesto es esa fecha";    
    public static final String SEMINARIO_ERROR_OBSERVACIONES = "Se deben especificar las observaciones";    
    public static final String SEMINARIO_EXITO = "Trabajo creado/modificado/borrado con éxito";

    
    /**
     * Crea un nuevo trabajo
     * La fecha de aprobación debe ser igual o posterior a la de presentación
     * El tutor y el cotutor (en caso que hubiera) deben ser distintos
     * El jurado debe estar formado por 3 profesores distintos
     * El tutor no puede pertenecer al jurado
     * El cotutor (si hubiera) tampoco puede pertenecer al jurado
     * Por lo menos debe participar un alumno, y el mismo no debe estar actualmente en otro trabajo (con fecha de finalización no nula)
     * Si hay más de un alumno, deben ser distintos y ninguno debe estar en otro trabajo actualmente (con fecha de finalización no nula)
     * @param titulo título del trabajo
     * @param duracion duración del trabajo (en meses)
     * @param fechaPresentacion fecha en que se presenta el trabajo a la comisión académica para tratar su aprobación
     * @param fechaAprobacion fecha en que la comisión académica aprueba la propuesta de trabajo
     * @param area área del trabajo
     * @param profesores lista con los profesores que actúan como tutor, cotutor (si hubiera) y jurado
     * @param aet alumnos que realizan el trabajo
     * @return String  - cadena con el resultado de la operación
    */                                                                    
    public String nuevoTrabajo(String titulo, int duracion, LocalDate fechaPresentacion, LocalDate fechaAprobacion, Area area, List<RolEnTrabajo> profesores, List<AlumnoEnTrabajo> aet);
    
    /**
     * Modifica un trabajo asignándole su fecha de exposición, con lo cual termina el trabajo
     * Cuando termina un trabajo, también termina la participación de todos los profesores (tutor, cotutor y jurado) y alumnos en el mismo
     * @param trabajo trabajo a modificar
     * @param fechaFinalizacion fecha en que los alumnos exponen el trabajo
     * @return String  - cadena con el resultado de la operación
    */                                                                    
    public String modificarTrabajo(Trabajo trabajo, LocalDate fechaFinalizacion);    
    
    /**
     * Borra un trabajo siempre y cuando no tenga seminarios presentados
     * @param trabajo trabajo a borrar
     * @return String  - cadena con el resultado de la operación
     */
    public String borrarTrabajo(Trabajo trabajo);
                     
    /**
     * Busca si existe un trabajo que coincida con el título especificado
     * Si existe un trabajo con el título especificado, lo devuelve
     * Si no hay un trabajo con el título especicado, devuelve null
     * A este método lo usa la clase GestorTrabajos
     * @param titulo título del trabajo a buscar
     * @return Trabajo  - objeto Trabajo cuyo título coincida con el especificado, o null
     */
    public Trabajo dameTrabajo(String titulo);
    
    /**
     * Busca si existe un trabajo con el título especificado (total o parcialmente)
     * Si no se especifica un título, devuelve todos los trabajos
     * Obtiene todos los trabajos creados, ordenados según el criterio especificado
     * Este método es usado por la clase ModeloTablaTrabajos
     * @param titulo título del trabajo
     * @return List<Trabajo>  - lista con los trabajos ordenados según el criterio especificado
     */
    public List<Trabajo> buscarTrabajos(String titulo);

    /**
     * Muestra todos los trabajos
     */
    public void mostrarTrabajos();
    
    /**
     * Busca si hay al menos un trabajo con el área especificada
     * A este método lo usa la clase GestorAreas
     * @param area área a buscar
     * @return boolean  - true si hay al menos un trabajo con el área especificada
     */
    public boolean hayTrabajosConEsteArea(Area area);
    
    /**
     * Busca si hay al menos un trabajo con el profesor especificado
     * A este método lo usa la clase GestorPersonas
     * @param profesor profesor a buscar
     * @return boolean  - true si hay al menos un trabajo con el profesor especificado
     */
    public boolean hayTrabajosConEsteProfesor(Profesor profesor);    
    
    /**
     * Busca si hay al menos un trabajo con el alumno especificado
     * A este método lo usa la clase GestorPersonas
     * @param alumno alumno a buscar
     * @return boolean  - true si hay al menos un trabajo con el alumno especificado
     */
    public boolean hayTrabajosConEsteAlumno(Alumno alumno); 
    
    /**
     * Reemplaza un profesor del trabajo. 
     * Al profesor que se reemplaza se le asigna su fecha de finalización y razón por la que finaliza su tarea
     * El nuevo profesor tiene el mismo rol del profesor que reemplaza, y comienza su tarea en la fecha en que finaliza el profesor que se reemplaza
     * @param trabajo trabajo al cual se reemplazará un profesor
     * @param profesorReemplazado profesor que se reemplaza
     * @param fechaHasta fecha de finalización del profesor que se reemplaza (debe ser posterior a la fecha de inicio)
     * @param razon razón por la que se reemplaza al profesor
     * @param nuevoProfesor nuevo profesor
     * @return String  - cadena con el resultado de la operación
     */
    public String reemplazarProfesor(Trabajo trabajo, Profesor profesorReemplazado, LocalDate fechaHasta, String razon, Profesor nuevoProfesor);
    
    /**
     * Permite que un alumno pueda terminar su participación en el trabajo
     * @param trabajo trabajo al cual se finalizará la participación del alumno
     * @param alumno alumno que finaliza su participación en el trabajo
     * @param fechaHasta fecha de finalización del alumno en el trabajo (debe ser posterior a la fecha de inicio)
     * @param razon razón por la que el alumno finaliza su participación en el trabajo
     * @return String  - cadena con el resultado de la operación
     */
    public String finalizarAlumno(Trabajo trabajo, Alumno alumno, LocalDate fechaHasta, String razon);    
    
    /**
     * Agrega un seminario al trabajo especificado siempre y cuando no haya otro con la misma fecha
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param trabajo trabajo al cual se le agrega un nuevo seminario
     * @param fechaExposicion fecha de exposición del seminario
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */
    public String nuevoSeminario(Trabajo trabajo, LocalDate fechaExposicion, NotaAprobacion notaAprobacion, String observaciones);
    
    /**
     * Modifica un seminario siempre y cuando no haya otro con la misma fecha
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param trabajo trabajo al cual se le modifica un seminario
     * @param seminario seminario a modificar
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */
    public String modificarSeminario(Trabajo trabajo, Seminario seminario, NotaAprobacion notaAprobacion, String observaciones);    
    
    /**
     * Devuelve la posición del último trabajo agregado/modificado
     * Sirve para manejar la tabla tablaTrabajos
     * Si cuando se agrega/modifica un trabajo se cancela la operación, devuelve - 1
     * Cada vez que se agrega/modifica un trabajo, este valor toma la posición del trabajo agregado/modificado en el ArrayList
     * @return int  - posición del último trabajo agregado/modificado
     */
    public int verUltimoTrabajo();
    
    /**
     * Devuelve la posición del último seminario agregado/modificado
     * Sirve para manejar la tabla tablaSeminarios
     * Si cuando se agrega/modifica un seminario se cancela la operación, devuelve - 1
     * Cada vez que se agrega/modifica un seminario, este valor toma la posición del seminario agregado/modificado en el ArrayList
     * @return int  - posición del último seminario agregado/modificado
     */
    public int verUltimoSeminario();
    
    /**
     * Asigna en -1 las variables que controlan el último trabajo y último seminario agregado/modificado
     * Sirve para manejar las tablas tablaSeminario y tablaTrabajos
     */
    public void cancelar();
}

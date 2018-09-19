/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import gui.personas.modelos.Alumno;
import gui.personas.modelos.Cargo;
import gui.personas.modelos.Profesor;
import java.util.List;

public interface IGestorPersonas {
    //Constantes para las operaciones de E/S (profesores)
    public static final String LECTURA_PROFESORES_ERROR = "Error al leer los profesores";
    public static final String LECTURA_PROFESORES_OK = "Se pudieron leer los profesores";
    public static final String ARCHIVO_PROFESORES_INEXISTENTE = "No existe el archivo de profesores";
    public static final String ESCRITURA_PROFESORES_ERROR = "Error al guardar los profesores";
    public static final String ESCRITURA_PROFESORES_OK = "Se pudieron guardar los profesores";    
    
    //Constantes para las operaciones de E/S (alumnos)
    public static final String LECTURA_ALUMNOS_ERROR = "Error al leer los alumnos";
    public static final String LECTURA_ALUMNOS_OK = "Se pudieron leer los alumnos";
    public static final String ARCHIVO_ALUMNOS_INEXISTENTE = "No existe el archivo de alumnos";
    public static final String ESCRITURA_ALUMNOS_ERROR = "Error al guardar los alumnos";
    public static final String ESCRITURA_ALUMNOS_OK = "Se pudieron guardar los alumnos";        

    //Constantes para el ABM de profesores y alumnos    
    public static final String EXITO_PROFESORES = "Profesor creado/modificado/borrado con éxito";
    public static final String ERROR_PROFESORES = "Los apellidos y/o nombres y/o DNI y/o cargo del profesor son incorrectos";
    public static final String PROFESORES_DUPLICADOS = "Ya existe un profesor con ese documento";
    public static final String PROFESOR_INEXISTENTE = "No existe el profesor especificado";
    public static final String TRABAJO_CON_PROFESOR = "No se puede borrar el profesor porque hay trabajo(s) en donde participa(ó)";
    
    public static final String EXITO_ALUMNOS = "Alumno creado/modificado/borrado con éxito";
    public static final String ERROR_ALUMNOS = "Los apellidos y/o nombres y/o DNI y/o CX del alumno no pueden son incorrectos";
    public static final String ALUMNOS_DUPLICADOS = "Ya existe un alumno con ese documento";
    public static final String ALUMNO_INEXISTENTE = "No existe el alumno especificado";   
    public static final String TRABAJO_CON_ALUMNO = "No se puede borrar el alumno porque hay trabajo(s) en donde participa(ó)";
               
    /**
     * Crea un nuevo profesor
     * @param apellidos apellidos del profesor
     * @param nombres nombres del profesor
     * @param dni documento del profesor
     * @param cargo cargo del profesor
     * @return cadena con el resultado de la operación
    */                                                                    
    public String nuevoProfesor(String apellidos, String nombres, int dni, Cargo cargo);
    
    /**
     * Crea un nuevo alumno
     * @param apellidos apellidos del alumno
     * @param nombres nombres del alumno
     * @param dni documento del profesor
     * @param cx cx del alumno
     * @return cadena con el resultado de la operación
    */                                                                    
    public String nuevoAlumno(String apellidos, String nombres, int dni, String cx);
            
    /**
     * Modifica un profesor
     * @param profesor profesor a editar
     * @param apellidos apellidos del profesor
     * @param nombres nombres del profesor
     * @param cargo cargo del profesor
     * @return cadena con el resultado de la operación
    */                                                                    
    public String modificarProfesor(Profesor profesor, String apellidos, String nombres, Cargo cargo);    
    
    /**
     * Modifica un alumno
     * @param alumno alumno a editar
     * @param apellidos apellidos del profesor
     * @param nombres nombres del profesor
     * @param cx cx del alumno
     * @return cadena con el resultado de la operación
    */                                                                    
    public String modificarAlumno(Alumno alumno, String apellidos, String nombres, String cx);        
    
    /**
     * Borra un profesor siempre y cuando no figure como tutor, cotutor y/o jurado de algún trabajo
     * @param profesor profesor a borrar
     * @return String  - cadena con el resultado de la operación
     */
    public String borrarProfesor(Profesor profesor);
    
    /**
     * Borra un alumno siempre y cuando no figure en algún trabajo
     * @param alumno alumno a borrar
     * @return String  - cadena con el resultado de la operación
     */
    public String borrarAlumno(Alumno alumno);    
    
    /**
     * Busca si existe un profesor con el apellido especificado (total o parcialmente)
     * Si no se especifica un apellido, devuelve todos los profesores
     * Este método es usado por las clases ModeloTablaProfesores y ModeloComboProfesores
     * @param apellidos apellidos del profesor a buscar
     * @return List<Profesor>  - lista de profesores, ordenados por apellidos y nombres, cuyos apellidos coincidan con el especificado
    */                                                                            
    public List<Profesor> buscarProfesores(String apellidos);
    
    /**
     * Busca si existe un alumno con el apellido especificado (total o parcialmente)
     * Si no se especifica un apellido, devuelve todos los alumnos
     * Este método es usado por las clases ModeloTablaAlumnos y ModeloListaAlumnos
     * @param apellidos apellidos del alumno a buscar
     * @return List<Alumno>  - lista de alumnos, ordenados por apellidos y nombres, cuyos apellidos coincidan con el especificado
    */                                                                            
    public List<Alumno> buscarAlumnos(String apellidos);    
                 
    /**
     * Busca si existe un profesor cuyo documento coincida con el especificado
     * Si existe un profesor con el documento especificado, lo devuelve
     * Si no hay un profesor con el documento especicado, devuelve null
     * A este método lo usa la clase GestorTrabajos
     * @param documento documento del profesor a buscar
     * @return Profesor  - objeto Profesor cuyo documento coincida con el especificado, o null
     */
    public Profesor dameProfesor(int documento);        
    
    /**
     * Busca si existe un alumno cuyo cx coincida con el especificado
     * Si existe un alumno con el cx especificado, lo devuelve
     * Si no hay un alumno con el cx especicado, devuelve null
     * A este método lo usa la clase GestorTrabajos
     * @param cx cx del alumno a buscar
     * @return Alumno  - objeto Alumno cuyo cx coincida con el especificado, o null
     */
    public Alumno dameAlumno(String cx);            
        
    /**
     * Devuelve el orden que ocupa el profesor en todo el conjunto de profesores
     * Si no existe el profesor especificado, devuelve -1
     * Este método es necesario para poder seleccionar los 3 profesores que integran el jurado en una JList
     * @param profesor profesor al cual se le determina el orden
     * @return int  - orden que ocupa el profesor
     */
    public int ordenProfesor(Profesor profesor);
    
    /**
     * Devuelve el orden que ocupa el alumno en todo el conjunto de alumnos
     * Si no existe el alumno especificado, devuelve -1
     * Este método es necesario para poder seleccionar los alumnos que participan en el trabajo en una JList
     * @param alumno alumno al cual se le determina el orden
     * @return int  - orden que ocupa el alumno
     */
    public int ordenAlumno(Alumno alumno); 
    
    /**
     * Devuelve la posición del último profesor agregado
     * Sirve para manejar la tabla tablaProfesores
     * Si cuando se agrega un profesor se cancela la operación, devuelve - 1
     * Cada vez que se agrega un profesor, este valor toma la posición del profesor agregado en el ArrayList
     * @return int  - posición del último profesor agregado
     */
    public int verUltimoProfesor();
    
    /**
     * Devuelve la posición del último alumno agregado
     * Sirve para manejar la tabla tablaAlumnos
     * Si cuando se agrega un alumno se cancela la operación, devuelve - 1
     * Cada vez que se agrega un alumno, este valor toma la posición del alumno agregado en el ArrayList
     * @return int  - posición del último alumno agregado
     */
    public int verUltimoAlumno();    
    
    /**
     * Asigna en -1 la variable que controla el último profesor agregado/modificado
     * Sirve para manejar la tabla tablaProfesores
     */
    public void cancelarProfesor(); 
    
/**
     * Asigna en -1 la variable que controla el último alumno agregado/modificado
     * Sirve para manejar la tabla tablaAlumnos
     */
    public void cancelarAlumno();     
}

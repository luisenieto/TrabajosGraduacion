/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.modelos;

import gui.areas.modelos.Area;
import gui.areas.modelos.GestorAreas;
import gui.interfaces.IGestorAreas;
import gui.interfaces.IGestorPersonas;
import gui.interfaces.IGestorTrabajos;
import gui.personas.modelos.Alumno;
import gui.personas.modelos.GestorPersonas;
import gui.personas.modelos.Profesor;
import gui.seminarios.modelos.NotaAprobacion;
import gui.seminarios.modelos.Seminario;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GestorTrabajos implements IGestorTrabajos {
    private final String NOMBRE_ARCHIVO = "./Trabajos.txt";
    //nombre del archivo con los trabajos    
    private final char SEPARADOR = ';'; 
    //caracter usado como separador 
    private final String VALORES_NULOS = "-";
    //cadena usada para los valores nulos (fecha de exposición y/o cotutor)
    
    private List<Trabajo> trabajos = new ArrayList<>();    
    private static GestorTrabajos gestor;
    
    private int ultimoTrabajo = - 1;
    //sirve para manejar la tabla tablaTrabajos
    
    private int ultimoSeminario = - 1;
    //sirve para manejar la tabla tablaSeminarios
    
    /**
     * Constructor
    */                                            
    private GestorTrabajos() {   
        this.leerArchivo();        
    }
    
    /**
     * Método estático que permite crear una única instancia de GestorTrabajos
     * @return GestorMaterias
    */                                                            
    public static GestorTrabajos instanciar() {
        if (gestor == null) 
            gestor = new GestorTrabajos();            
        return gestor;
    }     
    
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
    @Override
    public String nuevoTrabajo(String titulo, int duracion, LocalDate fechaPresentacion, LocalDate fechaAprobacion, Area area, List<RolEnTrabajo> profesores, List<AlumnoEnTrabajo> aet) {
        this.ultimoTrabajo = - 1;
        if(this.validarTituloYDuracion(titulo, duracion)) {
            if(this.validarArea(area)) {
                if (this.validarFechas(fechaPresentacion, fechaAprobacion)) {
                    if (this.validarTutorYCotutor(profesores)) {
                        if (this.validarJurado(profesores)) {
                            if (this.validarAlumnos(aet)) {
                                Trabajo trabajo = new Trabajo(titulo, duracion, area, fechaPresentacion, fechaAprobacion, profesores, aet);
                                this.trabajos.add(trabajo);
                                Collections.sort(this.trabajos);                                
                                String resultado = this.escribirArchivo();
                                if (resultado.equals(ESCRITURA_OK)) {
                                    this.ultimoTrabajo = this.trabajos.indexOf(trabajo);
                                    return EXITO;  
                                }
                                else
                                    return ESCRITURA_ERROR;
                            }
                            else
                                return ERROR_ALUMNOS;
                        }
                        else
                            return ERROR_JURADO;
                    }
                    else
                        return ERROR_TUTOR_COTUTOR;
                }
                else
                    return ERROR_FECHAS;
            }
            else
                return ERROR_AREA;
        }
        else
            return ERROR_TITULO_DURACION;
    }   
    
    /**
     * Valida que el título y duración del trabajo estén correctos, y que no haya otro trabajo con el mismo título
     * @param titulo título del trabajo
     * @param duracion duración del trabajo
     * @return boolean  - true si el título y duración del trabajo son correctos, false en caso contrario
     */
    private boolean validarTituloYDuracion(String titulo, int duracion) {
        if((titulo != null) && (!titulo.trim().isEmpty())) { //título correcto
            if (duracion > 0) //duración correcta
                return (this.dameTrabajo(titulo) == null); //si vale null es porque no hay un trabajo con este título
            else //duración incorrecta
                return false;
        }
        else //título incorrecto
            return false;
    }
    
    /**
     * Valida que el área del trabajo sea correcta
     * @param area área del trabajo
     * @return boolean  - true si el área del trabajo es correcta, false en caso contrario
     */
    private boolean validarArea(Area area) {
        return (area != null);
    }    
    
    /**
     * Valida que las fechas de presentación y aprobación del trabajo sean correctas
     * Las 2 fechas deben no ser nulas, y la de aprobación igual o posterior a la de presentación
     * @param fechaPresentacion fecha de presentación del trabajo
     * @param fechaAprobacion fecha de aprobación del trabajo
     * @return boolean  - true si las fechas son correctas, false en caso contrario
     */
    private boolean validarFechas(LocalDate fechaPresentacion, LocalDate fechaAprobacion) {
        if ((fechaPresentacion == null) || (fechaAprobacion == null)) //fecha de presentación y/o aprobación nulas
            return false;
        else 
            //fechas de presentación y aprobación no nulas
            return fechaAprobacion.isAfter(fechaPresentacion) || fechaAprobacion.equals(fechaPresentacion);
    }        
    
    /**
     * Valida el tutor y cotutor (si hay uno) del proyecto
     * @param profesores lista con los profesores que actúan como tutor, cotutor (si hubiera) y jurado
     * @return boolean  - si hay un tutor y no hay un cotutor, devuelve true, o false en caso contrario. Si hay un cotutor, devuelve true si es distinto al cotutor, false en caso contrario
     */
    private boolean validarTutorYCotutor(List<RolEnTrabajo> profesores) {
        Profesor tutor = this.verTutorYCoTutor(profesores, Rol.TUTOR);
        if (tutor != null) { //el trabajo tiene tutor
            Profesor cotutor = this.verTutorYCoTutor(profesores, Rol.COTUTOR);        
            return this.tutorYCotutorSonDistintos(tutor, cotutor);
        }
        else //el trabajo no tiene tutor
            return false;
    }
    
    /**
     * Devuelve el tutor o cotutor del trabajo. Si el trabajo no tiene un tutor o cotutor, devuelve null
     * @param profesores lista de profesores que participan en el trabajo
     * @return Profesor  - profesor tutor o cotutor del trabajo
     */
    private Profesor verTutorYCoTutor(List<RolEnTrabajo> profesores, Rol rol) {
        for(RolEnTrabajo ret : profesores) {
            if (ret.verRol() == rol)
                return ret.verProfesor();
        }
        return null;
    }
    
    /**
     * Determina si el tutor y el cotutor (en caso que hubiera) son la misma persona o no
     * @param tutor tutor del trabajo
     * @param cotutor cotutor del trabajo
     * @return boolean  - resultado de comparar si el tutor y el cotutor son la misma persona o no
     */
    private boolean tutorYCotutorSonDistintos(Profesor tutor, Profesor cotutor) {
        if (tutor != null) { //hay un tutor
            if (cotutor != null) //hay tutor y cotutor
                return !tutor.equals(cotutor);
            else //hay tutor y no hay cotutor
                return true;
        }
        else //no hay un tutor
            return false;
    }

    /**
     * Valida que el jurado del trabajo sea correcto
     * El jurado debe estar formado por 3 profesores distintos
     * El tutor no puede pertenecer al jurado
     * El cotutor (si hubiera) tampoco puede pertenecer al jurado
     * @param profesores lista de profesores que participan en el trabajo
     * @return Profesor  - profesor tutor o cotutor del trabajo
     */    
    private boolean validarJurado(List<RolEnTrabajo> profesores) {
        Profesor tutor = this.verTutorYCoTutor(profesores, Rol.TUTOR);
        Profesor cotutor = this.verTutorYCoTutor(profesores, Rol.COTUTOR);                
        List<Profesor> jurado = this.verJurado(profesores);        
        return (this.juradoCorrecto(jurado)) && (!this.elTutorEsJurado(tutor, jurado)) && (!this.elCoTutorEsJurado(cotutor, jurado));
    }
    
    /**
     * Devuelve la lista de jurado del trabajo
     * @param profesores lista de profesores que participan en el trabajo como jurado
     * @return List<Profesor>  - lista de jurado del trabajo
     */
    private List<Profesor> verJurado(List<RolEnTrabajo> profesores) {
        List<Profesor> jurado = new ArrayList<>();
        for(RolEnTrabajo ret : profesores) {
            if (ret.verRol() == Rol.JURADO)
                jurado.add(ret.verProfesor());
        }
        return jurado;
    }    
    
    /**
     * Determina si el jurado está compuesto por 3 profesores distintos
     * @param jurado jurado del trabajo
     * @return boolean  - true si el jurado está integrado por 3 profesores distintos, false en caso contrario
     */
    private boolean juradoCorrecto(List<Profesor> jurado) {
        if ((jurado != null) && (jurado.size() == 3)) {
            Profesor p1 = jurado.get(0);
            Profesor p2 = jurado.get(1);
            Profesor p3 = jurado.get(2);
            if (!p1.equals(p2) && !p1.equals(p3) && !p2.equals(p3))
                return true;
            else
                return false;
        }
        else
            return false;
    }
    
    /**
     * Determina si el tutor forma parte del jurado
     * @param tutor tutor del trabajo
     * @param jurado jurado del trabajo
     * @return boolean  - true si el tutor forma parte del jurado, false en caso contrario
     */
    private boolean elTutorEsJurado(Profesor tutor, List<Profesor> jurado) {
        if ((tutor != null) && (jurado != null))
            return jurado.contains(tutor);
        else
            return false;
    }
    
    /**
     * Determina si el cotutor forma parte del jurado
     * @param cotutor cotutor del trabajo
     * @param jurado jurado del trabajo
     * @return boolean  - true si el cotutor forma parte del jurado, false en caso contrario
     */
    private boolean elCoTutorEsJurado(Profesor cotutor, List<Profesor> jurado) {
        if (jurado != null)
            return jurado.contains(cotutor);
        else
            return false;
    }    
    
    /**
     * Valida que por lo menos haya un alumno, y que el mismo no esté actualmente en otro trabajo
     * Si hay más de un alumno, deben ser distintos y ninguno debe pertenecer a otro trabajo actualmente (con fecha de finalización no nula)
     * @param aet alumnos seleccionados
     * @return boolean  - true si todos los alumnos son distintos, false en caso contrario o bien que no haya alumnos
     */
    private boolean validarAlumnos(List<AlumnoEnTrabajo> aet) {
        if((aet != null) && (!aet.isEmpty())) { //hay alumnos
            if (this.alumnosDistintos(aet))  //verificación que todos los alumnos sean distintos
                return !this.alumnoEnOtroTrabajo(aet);
            else
                return false;
        }
        else //no hay alumnos
            return false;
    }
    
    /**
     * Comprueba que todos los alumnos sean distintos
     * @param aet alumnos seleccionados
     * @return boolean  - true si todos los alumnos son distintos, false en caso contrario
     */
    private boolean alumnosDistintos(List<AlumnoEnTrabajo> aet) {
        for(int i = 0; i < aet.size() - 1; i++) { 
            Alumno a1 = aet.get(i).verAlumno();
            for(int j = i + 1; j < aet.size(); j++) {
                Alumno a2 = aet.get(j).verAlumno();
                if (a1.equals(a2))
                    return false;
            }
        }
        return true;
    }
    
    /**
     * Determina si los alumnos seleccionados están actualmente en otro trabajo
     * @param aet alumnos seleccionados
     * @return boolean  - true si alguno de los alumnos seleccionados está en otro trabajo actualmente, false en caso contrario
     */
    private boolean alumnoEnOtroTrabajo(List<AlumnoEnTrabajo> aet) {
        for(Trabajo trabajo : this.trabajos) {
            List<AlumnoEnTrabajo> alumnosActuales = trabajo.verAlumnosActuales();
            for(AlumnoEnTrabajo alumnoEnTrabajo : aet) {
                if (alumnosActuales.contains(alumnoEnTrabajo))
                    return true;
            }
        }        
        return false;
    }
    
    /**
     * Muestra los trabajos ordenados con el criterio especificado
     * @param cmp criterio de ordenamiento
     */
    @Override
    public void mostrarTrabajos() {
        for(Trabajo trabajo : this.trabajos)
            trabajo.mostrar();
    }   
    
    /**
     * Busca si existe un trabajo con el título especificado (total o parcialmente)
     * Si no se especifica un título, devuelve todos los trabajos
     * Obtiene todos los trabajos creados, ordenados según el criterio especificado
     * Este método es usado por la clase ModeloTablaTrabajos
     * @param titulo título del trabajo
     * @return List<Trabajo>  - lista con los trabajos ordenados según el criterio especificado
     */
    @Override
    public List<Trabajo> buscarTrabajos(String titulo) {
        List<Trabajo> trabajosBuscados = new ArrayList<>();
        if (titulo != null) {
            for(Trabajo trabajo : this.trabajos) {
                if (trabajo.verTitulo().toLowerCase().contains(titulo.toLowerCase()))
                    trabajosBuscados.add(trabajo);
            }
            return trabajosBuscados;
        }
        else
            return this.trabajos;
    }   
    
    /**
     * Busca si existe un trabajo que coincida con el título especificado
     * Si no hay un trabajo con el título especicado, devuelve null
     * @param titulo título del trabajo a buscar
     * @return Trabajo  - objeto Trabajo cuyo título coincida con el especificado, o null
     */
    @Override
    public Trabajo dameTrabajo(String titulo) {
        for(Trabajo trabajo : this.trabajos)
            if (trabajo.verTitulo().equalsIgnoreCase(titulo))
                return trabajo;
        return null;
    }    
    
    /**
     * Busca si hay al menos un trabajo con el profesor especificado
     * A este método lo usa la clase GestorPersonas
     * @param profesor profesor a buscar
     * @return boolean  - true si hay al menos un trabajo con el profesor especificado
     */
    @Override
    public boolean hayTrabajosConEsteProfesor(Profesor profesor) {
        for(Trabajo trabajo : this.trabajos) {
            for(RolEnTrabajo ret : trabajo.verProfesoresConRoles()) {
                if (ret.verProfesor().equals(profesor))
                    return true;
            }
        }
        return false;
    }   
    
    /**
     * Busca si hay al menos un trabajo con el alumno especificado
     * A este método lo usa la clase GestorPersonas
     * @param alumno alumno a buscar
     * @return boolean  - true si hay al menos un trabajo con el alumno especificado
     */
    @Override
    public boolean hayTrabajosConEsteAlumno(Alumno alumno) {
        for(Trabajo trabajo : this.trabajos) {
            for(AlumnoEnTrabajo aet : trabajo.verAlumnos()) {
                if (aet.verAlumno().equals(alumno))
                    return true;
            }
        }
        return false;
    }   
    
    /**
     * Modifica un trabajo asignándole su fecha de exposición, con lo cual termina el trabajo
     * Cuando termina un trabajo, también termina la participación de todos los profesores (tutor, cotutor y jurado) y alumnos en el mismo
     * @param trabajo trabajo a modificar
     * @param fechaExposicion fecha en que los alumnos exponen el trabajo
     * @return String  - cadena con el resultado de la operación
    */                                                                    
    @Override
    public String modificarTrabajo(Trabajo trabajo, LocalDate fechaExposicion) {
        this.ultimoTrabajo = - 1;
        if (trabajo != null) {
            if ((fechaExposicion != null) && (fechaExposicion.isAfter(trabajo.verFechaAprobacion()))) {
                trabajo.asignarFechaExposicion(fechaExposicion);
                for(RolEnTrabajo rolEnTrabajo : trabajo.verProfesoresConRoles()) {
                    rolEnTrabajo.asignarFechaHasta(fechaExposicion);
                    rolEnTrabajo.asignarRazon(TRABAJO_FINALIZACION);
                }
                for(AlumnoEnTrabajo alumnoEnTrabajo : trabajo.verAlumnosActuales()) {
                    alumnoEnTrabajo.asignarFechaHasta(fechaExposicion);
                    alumnoEnTrabajo.asignarRazon(TRABAJO_FINALIZACION);                    
                }
                String resultado = this.escribirArchivo();
                if (resultado.equals(ESCRITURA_OK)) {
                    this.ultimoTrabajo = this.trabajos.indexOf(trabajo);
                    return EXITO;  
                }
                else
                    return ESCRITURA_ERROR;
            }
            else
                return ERROR_FECHA_EXPOSICION;
        }
        else
            return TRABAJO_INEXISTENTE;
    }    
    
    /**
     * Borra un trabajo siempre y cuando no tenga seminarios presentados
     * @param trabajo trabajo a borrar
     * @return String  - cadena con el resultado de la operación
     */
    @Override
    public String borrarTrabajo(Trabajo trabajo) {
        if (trabajo.tieneSeminarios())
            return TRABAJO_CON_SEMINARIO;
        else {
            this.trabajos.remove(trabajo);
            String resultado = this.escribirArchivo();
            if (resultado.equals(ESCRITURA_OK))
                return EXITO;  
            else
                return ESCRITURA_ERROR;            
        }
    }

    /**
     * Reemplaza un profesor del trabajo. 
     * Al profesor que se reemplaza se le asigna su fecha de finalización y razón por la que finaliza su tarea
     * El nuevo profesor tiene el mismo rol del profesor que reemplaza, y comienza su tarea en la fecha en que finaliza el profesor que se reemplaza
     * El nuevo profesor no puede ocupar 
     * @param trabajo trabajo al cual se reemplazará un profesor
     * @param profesorReemplazado profesor que se reemplaza
     * @param fechaHasta fecha de finalización del profesor que se reemplaza (debe ser posterior a la fecha de inicio)
     * @param razon razón por la que se reemplaza al profesor
     * @param nuevoProfesor nuevo profesor
     * @return String  - cadena con el resultado de la operación
     */
    @Override
    public String reemplazarProfesor(Trabajo trabajo, Profesor profesorReemplazado, LocalDate fechaHasta, String razon, Profesor nuevoProfesor) {
        this.ultimoTrabajo = - 1;
        if (trabajo != null) { //existe el trabajo
            if ((profesorReemplazado != null) && (fechaHasta != null) && (razon != null) && (nuevoProfesor != null)) {
                if (!trabajo.tieneEsteProfesor(nuevoProfesor)) {
                    for(RolEnTrabajo rolEnTrabajo : trabajo.verProfesoresConRoles()) {
                        if (rolEnTrabajo.verProfesor().equals(profesorReemplazado)) {
                            if (fechaHasta.isAfter(rolEnTrabajo.verFechaDesde())) {
                                rolEnTrabajo.asignarFechaHasta(fechaHasta);
                                rolEnTrabajo.asignarRazon(razon);
                                RolEnTrabajo nuevoRolEnTrabajo = new RolEnTrabajo(nuevoProfesor, rolEnTrabajo.verRol(), fechaHasta);
                                trabajo.agregarRolEnTrabajo(nuevoRolEnTrabajo);
                                String resultado = this.escribirArchivo();
                                if (resultado.equals(ESCRITURA_OK)) {
                                    this.ultimoTrabajo = this.trabajos.indexOf(trabajo);
                                    return EXITO;  
                                }
                                else
                                    return ESCRITURA_ERROR;
                            }
                            else
                                return TRABAJO_REEMPLAZAR_PROFESOR_ERROR;
                        }
                    }
                    return TRABAJO_REEMPLAZAR_PROFESOR_INEXISTENTE;                            
                }
                else
                    return TRABAJO_REEMPLAZAR_PROFESOR_DUPLICADO;
            }
            else
                return TRABAJO_REEMPLAZAR_PROFESOR_ERROR;
        }
        else 
            return TRABAJO_INEXISTENTE;
    }

    /**
     * Permite que un alumno pueda terminar su participación en el trabajo
     * @param trabajo trabajo al cual se finalizará la participación del alumno
     * @param alumno alumno que finaliza su participación en el trabajo
     * @param fechaHasta fecha de finalización del alumno en el trabajo (debe ser posterior a la fecha de inicio)
     * @param razon razón por la que el alumno finaliza su participación en el trabajo
     * @return String  - cadena con el resultado de la operación
     */
    @Override
    public String finalizarAlumno(Trabajo trabajo, Alumno alumno, LocalDate fechaHasta, String razon) {
        this.ultimoTrabajo = - 1;
        if (trabajo != null) { //existe el trabajo
            if ((alumno != null) && (fechaHasta != null) && (razon != null)) {
                for(AlumnoEnTrabajo alumnoEnTrabajo : trabajo.verAlumnosActuales()) {
                    if (alumnoEnTrabajo.verAlumno().equals(alumno)) {
                        if (fechaHasta.isAfter(alumnoEnTrabajo.verFechaDesde())) {
                            alumnoEnTrabajo.asignarFechaHasta(fechaHasta);
                            alumnoEnTrabajo.asignarRazon(razon);
                            String resultado = this.escribirArchivo();
                            if (resultado.equals(ESCRITURA_OK)) {
                                this.ultimoTrabajo = this.trabajos.indexOf(trabajo);
                                return EXITO;  
                            }
                            else
                                return ESCRITURA_ERROR;
                        }
                        else
                            return TRABAJO_FINALIZAR_ALUMNO_ERROR;
                    }
                }
                return TRABAJO_FINALIZAR_ALUMNO_INEXISTENTE;
            }
            else
                return TRABAJO_FINALIZAR_ALUMNO_ERROR;
        }
        else
            return TRABAJO_INEXISTENTE;
    }                
    
    /**
     * Lee del archivo de texto y carga el ArrayList empleando un try con recursos
     * https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html
     * Formato del archivo (suponiendo que la coma sea el separador):
     *  título 1,duración 1,área 1,fecha presentación 1,fecha aprobación 1,fecha exposición 1,cantTutores,cantCoTutores,cantJurados,cantAlumnos,cantSeminarios,dni tutor 1,dni cotutor 1,dni jurado 1,dni jurado2,dni jurado3,cx alumno1,cx alumno2 
     *  título 2,duración 1,área 1,fecha presentación 1,fecha aprobación 1,fecha exposición 1,cantTutores,cantCoTutores,cantJurados,cantAlumnos,cantSeminarios,dni tutor 2,dni cotutor 2,dni jurado 1,dni jurado2,dni jurado3,cx alumno3
     * @return String  - cadena con el resultado de la operacion
     */
    private String leerArchivo() {
        File file = new File(NOMBRE_ARCHIVO);
        if (file.exists()) {
            IGestorAreas ga = GestorAreas.instanciar();
            IGestorPersonas gp = GestorPersonas.instanciar();
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                String cadena;
                while((cadena = br.readLine()) != null) {
                    String[] vector = cadena.split(Character.toString(SEPARADOR));
                    String titulo = vector[0];
                    int duracion = Integer.parseInt(vector[1]);
                    
                    String nombreArea = vector[2];                    
                    Area area = ga.dameArea(nombreArea);
                    
                    String fPresentacion = vector[3];
                    LocalDate fechaPresentacion = this.transformarCadenaAFecha(fPresentacion);
                    
                    String fAprobacion = vector[4];
                    LocalDate fechaAprobacion = this.transformarCadenaAFecha(fAprobacion);
                    
                    String fExposicion = vector[5];
                    LocalDate fechaExposicion = null;
                    if (!fExposicion.equals(VALORES_NULOS))
                        fechaExposicion = this.transformarCadenaAFecha(fExposicion);
                    
                    int cantTutores = Integer.parseInt(vector[6]);
                    int cantCoTutores = Integer.parseInt(vector[7]);
                    int cantJurados = Integer.parseInt(vector[8]);
                    int cantAlumnos = Integer.parseInt(vector[9]);
                    int cantSeminarios = Integer.parseInt(vector[10]);

                    int dniPrimerTutor = 11;  //posición donde está el dni del primer tutor
                    int razonUltimoTutor = (dniPrimerTutor + cantTutores * 4) - 1; //posición donde está la razón del último tutor
                    int dniPrimerCoTutor = razonUltimoTutor + 1; //posición donde está el dni del primer cotutor
                    int razonUltimoCoTutor = (dniPrimerCoTutor + cantCoTutores * 4) - 1; //posición donde está la razón del último cotutor
                    int dniPrimerJurado = razonUltimoCoTutor + 1; //posición donde está el dni del primer jurado
                    int razonUltimoJurado = (dniPrimerJurado + cantJurados * 4) - 1; //posición donde está la razón del último jurado
                    int cxPrimerAlumno = razonUltimoJurado + 1; //posición donde está el cx del primer alumno
                    int razonUltimoAlumno = (cxPrimerAlumno + cantAlumnos * 4) - 1; //posición donde está la razón del último alumno
                    int fechaPrimerSeminario = razonUltimoAlumno + 1; //posición donde está la fecha de presentación del primer seminario
                    int observacionesUltimoSeminario = (fechaPrimerSeminario + cantSeminarios * 3) - 1; //posición donde están las observaciones del último seminario
                                                            
                    List<RolEnTrabajo> ret = new ArrayList<>();
                    
                    for(int i = dniPrimerTutor; i <= razonUltimoTutor; ) {  //se leen los tutores                  
                        int dniTutor = Integer.parseInt(vector[i++]);
                        Profesor tutor = gp.dameProfesor(dniTutor);
                        
                        String fDesde = vector[i++];
                        LocalDate fechaDesde = this.transformarCadenaAFecha(fDesde);
                        
                        String fHasta = vector[i++];
                        LocalDate fechaHasta = null;
                        if (!fHasta.equals(VALORES_NULOS))
                            fechaHasta = this.transformarCadenaAFecha(fHasta);
                        
                        String razon = vector[i++];
                        ret.add(new RolEnTrabajo(tutor, Rol.TUTOR, fechaDesde, fechaHasta, razon));
                    }
                    
                    for(int i = dniPrimerCoTutor; i <= razonUltimoCoTutor; ) {  //se leen los cotutores                  
                        int dniCoTutor = Integer.parseInt(vector[i++]);
                        Profesor cotutor = gp.dameProfesor(dniCoTutor);
                        
                        String fDesde = vector[i++];
                        LocalDate fechaDesde = this.transformarCadenaAFecha(fDesde);
                        
                        String fHasta = vector[i++];
                        LocalDate fechaHasta = null;
                        if (!fHasta.equals(VALORES_NULOS))
                            fechaHasta = this.transformarCadenaAFecha(fHasta);
                        
                        String razon = vector[i++];
                        ret.add(new RolEnTrabajo(cotutor, Rol.COTUTOR, fechaDesde, fechaHasta, razon));
                    }                    
                    
                    for(int i = dniPrimerJurado; i <= razonUltimoJurado; ) {  //se leen los jurados
                        int dniJurado = Integer.parseInt(vector[i++]);
                        Profesor jurado = gp.dameProfesor(dniJurado);
                        
                        String fDesde = vector[i++];
                        LocalDate fechaDesde = this.transformarCadenaAFecha(fDesde);
                        
                        String fHasta = vector[i++];
                        LocalDate fechaHasta = null;
                        if (!fHasta.equals(VALORES_NULOS))
                            fechaHasta = this.transformarCadenaAFecha(fHasta);
                        
                        String razon = vector[i++];
                        ret.add(new RolEnTrabajo(jurado, Rol.JURADO, fechaDesde, fechaHasta, razon));
                    }                                        
                                        
                    List<AlumnoEnTrabajo> aet = new ArrayList<>();
                    for(int i = cxPrimerAlumno; i <= razonUltimoAlumno; ) {  //se leen los alumnos
                        String cx = vector[i++];
                        Alumno alumno = gp.dameAlumno(cx); 
                        
                        String fDesde = vector[i++];
                        LocalDate fechaDesde = this.transformarCadenaAFecha(fDesde);
                        
                        String fHasta = vector[i++];
                        LocalDate fechaHasta = null;
                        if (!fHasta.equals(VALORES_NULOS))
                            fechaHasta = this.transformarCadenaAFecha(fHasta);
                        
                        String razon = vector[i++];
                        aet.add(new AlumnoEnTrabajo(alumno, fechaDesde, fechaHasta, razon));                        
                    }
                    
                    List<Seminario> seminarios = new ArrayList<>();
                    for(int i = fechaPrimerSeminario; i <= observacionesUltimoSeminario; ) { //se leen los seminarios
                        String fExp = vector[i++];
                        LocalDate fechaExp = this.transformarCadenaAFecha(fExp);
                        
                        NotaAprobacion notaAprobacion = this.transFormarCadenaANotaAprobacion(vector[i++]);
                        String observaciones = vector[i++];
                        Seminario seminario;
                        if (observaciones.equals(VALORES_NULOS))
                            seminario = new Seminario(fechaExp, notaAprobacion, null);
                        else
                            seminario = new Seminario(fechaExp, notaAprobacion, observaciones);
                        seminarios.add(seminario);
                    }                                        
                    Trabajo trabajo = new Trabajo(titulo, duracion, area, fechaPresentacion, fechaAprobacion, fechaExposicion, ret, aet);
                    trabajo.asignarSeminarios(seminarios);
                    this.trabajos.add(trabajo);
                }
                return LECTURA_OK;
            }
            catch (IOException ioe) {
                return LECTURA_ERROR;
            }
        }
        return ARCHIVO_INEXISTENTE;
    }  
    
    /**
     * Transforma una fecha en cadena de la forma dd/mm/aaaa en un objeto LocalDate
     * @param cadenaFecha cadena con la fecha a transformar
     * @return LocalDate  - objeto LocalDate transformado
     */
    private LocalDate transformarCadenaAFecha(String cadenaFecha) {
        String[] vector = cadenaFecha.split(Character.toString('/'));
        int dia = Integer.parseInt(vector[0]);
        int mes = Integer.parseInt(vector[1]);
        int anio = Integer.parseInt(vector[2]);
        return LocalDate.of(anio, mes, dia);
    }
    
    /**
     * Transforma una cadena en su valor a NotaAprobacion
     * @param cadenaNota cadena a transformar
     * @return NotaAprobacion  - objeto NotaAprobacion correspondiente a la cadena especificada
     */
    private NotaAprobacion transFormarCadenaANotaAprobacion(String cadenaNota) {
        switch (cadenaNota) {
            case "Aprobado S/O": return NotaAprobacion.APROBADO_SO;
            case "Aprobado C/O": return NotaAprobacion.APROBADO_CO;
            default: return NotaAprobacion.DESAPROBADO;
        }
    }
    
    /**
     * Busca si hay al menos un trabajo con el área especificada
     * A este método lo usa la clase GestorAreas
     * @param area área a buscar
     * @return boolean  - true si hay al menos un trabajo con el área especificada
     */
    @Override
    public boolean hayTrabajosConEsteArea(Area area) {
        for(Trabajo trabajo : this.trabajos) {
            if (trabajo.verArea().equals(area))
                return true;
        }
        return false;
    }

    /**
     * Agrega un seminario al trabajo especificado siempre y cuando no haya otro con la misma fecha
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param trabajo trabajo al cual se le agrega un nuevo seminario
     * @param fechaExposicion fecha de exposición del seminario
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */
    @Override
    public String nuevoSeminario(Trabajo trabajo, LocalDate fechaExposicion, NotaAprobacion notaAprobacion, String observaciones) {
        this.ultimoSeminario = - 1;
        if (trabajo != null) { //se especificó un trabajo
            String resultadoSeminario = trabajo.nuevoSeminario(fechaExposicion, notaAprobacion, observaciones);
            if (resultadoSeminario.equals(SEMINARIO_EXITO)) {                
                String resultado = this.escribirArchivo();
                if (resultado.equals(ESCRITURA_OK)) {
                    this.ultimoSeminario = trabajo.verUltimoSeminario();
                    return EXITO;  
                }
                else
                    return ESCRITURA_ERROR;
            }
            else
                return resultadoSeminario;
        }
        else //no se especificó un trabajo
            return TRABAJO_INEXISTENTE;
    }
    
    /**
     * Modifica un seminario siempre y cuando no haya otro con la misma fecha
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param trabajo trabajo al cual se le modifica un seminario
     * @param seminario seminario a modificar
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */    
    @Override
    public String modificarSeminario(Trabajo trabajo, Seminario seminario, NotaAprobacion notaAprobacion, String observaciones) {
        this.ultimoSeminario = - 1;
        if (trabajo != null) { //se especificó un trabajo
            String resultadoSeminario = trabajo.modificarSeminario(seminario, notaAprobacion, observaciones);
            if (resultadoSeminario.equals(SEMINARIO_EXITO)) {                
                String resultado = this.escribirArchivo();
                if (resultado.equals(ESCRITURA_OK)) {
                    this.ultimoSeminario = trabajo.verUltimoSeminario();
                    return EXITO;  
                }
                else
                    return ESCRITURA_ERROR;
            }
            else
                return resultadoSeminario;            
        }
        else //no se especificó un trabajo
            return TRABAJO_INEXISTENTE;        
    }

    /**
     * Devuelve la posición del último trabajo agregado/modificado
     * Sirve para manejar la tabla tablaTrabajos
     * Si cuando se agrega/modifica un trabajo se cancela la operación, devuelve - 1
     * Cada vez que se agrega/modifica un trabajo, este valor toma la posición del trabajo agregado/modificado en el ArrayList
     * @return int  - posición del último trabajo agregado/modificado
     */    
    @Override
    public int verUltimoTrabajo() {
        return this.ultimoTrabajo;
    }
        
    /**
     * Devuelve la posición del último seminario agregado/modificado
     * Sirve para manejar la tabla tablaSeminarios
     * Si cuando se agrega/modifica un seminario se cancela la operación, devuelve - 1
     * Cada vez que se agrega/modifica un seminario, este valor toma la posición del seminario agregado/modificado en el ArrayList
     * @return int  - posición del último seminario agregado/modificado
     */
    @Override
    public int verUltimoSeminario() {
        return this.ultimoSeminario;
    }

    /**
     * Asigna en -1 las variables que controlan el último trabajo y último seminario agregado/modificado
     * Sirve para manejar las tablas tablaSeminario y tablaTrabajos
     */    
    @Override
    public void cancelar() {
        this.ultimoTrabajo = - 1;
        this.ultimoSeminario = - 1; 
    }
                    
    /**
     * Escribe en el archivo de texto el ArrayList
     * Formato del archivo (suponiendo que la coma sea el separador):
     *  título 1,duración 1,área 1,fecha presentación 1,fecha aprobación 1,fecha exposición 1,cantTutores,cantCoTutores,cantJurados,cantAlumnos,cantSeminarios,dni tutor 1,dni cotutor 1,dni jurado 1,dni jurado2,dni jurado3,cx alumno1,cx alumno2 
     *  título 2,duración 1,área 1,fecha presentación 1,fecha aprobación 1,fecha exposición 1,cantTutores,cantCoTutores,cantJurados,cantAlumnos,cantSeminarios,dni tutor 2,dni cotutor 2,dni jurado 1,dni jurado2,dni jurado3,cx alumno3
     * @return String  - cadena con el resultado de la operacion
     */
    private String escribirArchivo() {
        File file = new File(NOMBRE_ARCHIVO);
        String patron = "dd/MM/yyyy";
        String fechaExposicion;
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {     
            for(Trabajo trabajo : this.trabajos) {
                LocalDate fPresentacion = trabajo.verFechaPresentacion();
                String fechaPresentacion = fPresentacion.format(DateTimeFormatter.ofPattern(patron)); 
                
                LocalDate fAprobacion = trabajo.verFechaAprobacion();
                String fechaAprobacion = fAprobacion.format(DateTimeFormatter.ofPattern(patron)); 
                
                LocalDate fExposicion = trabajo.verFechaFinalizacion();
                if (fExposicion != null)
                    fechaExposicion = fExposicion.format(DateTimeFormatter.ofPattern(patron)); 
                else
                    fechaExposicion = VALORES_NULOS;
                
                List<RolEnTrabajo> ret = trabajo.verProfesoresConRoles();
                List<AlumnoEnTrabajo> aet = trabajo.verAlumnos();
                
                String cadena = trabajo.verTitulo();
                cadena += SEPARADOR + Integer.toString(trabajo.verDuracion()) + SEPARADOR;
                cadena += trabajo.verArea().verNombre() + SEPARADOR;
                cadena += fechaPresentacion + SEPARADOR;
                cadena += fechaAprobacion + SEPARADOR;
                cadena += fechaExposicion;                
                
                int cantTutores = trabajo.cantidadProfesoresConRol(Rol.TUTOR);
                int cantCoTutores = trabajo.cantidadProfesoresConRol(Rol.COTUTOR);
                int cantJurados = trabajo.cantidadProfesoresConRol(Rol.JURADO);
                int cantAlumnos = trabajo.cantidadAlumnos();
                int cantSeminarios = trabajo.cantidadSeminarios();
                cadena += SEPARADOR + Integer.toString(cantTutores);
                cadena += SEPARADOR + Integer.toString(cantCoTutores);
                cadena += SEPARADOR + Integer.toString(cantJurados);
                cadena += SEPARADOR + Integer.toString(cantAlumnos);
                cadena += SEPARADOR + Integer.toString(cantSeminarios);
                
                //todos los docentes que participan en el trabajo
                for(RolEnTrabajo rolEnTrabajo : ret) {
                    cadena += SEPARADOR + Integer.toString(rolEnTrabajo.verProfesor().verDni()) + SEPARADOR;
                    
                    LocalDate fDesde = rolEnTrabajo.verFechaDesde();
                    String fechaDesde = fDesde.format(DateTimeFormatter.ofPattern(patron)); 
                    cadena += fechaDesde + SEPARADOR;
                    
                    LocalDate fHasta = rolEnTrabajo.verFechaHasta();
                    String fechaHasta;
                    if (fHasta != null)
                        fechaHasta = fHasta.format(DateTimeFormatter.ofPattern(patron)); 
                    else
                        fechaHasta = VALORES_NULOS;
                    cadena += fechaHasta + SEPARADOR;
                    
                    String razon;
                    if(rolEnTrabajo.verRazon() != null)
                        razon = rolEnTrabajo.verRazon();
                    else
                        razon = VALORES_NULOS;
                    cadena += razon;
                }
                
                //todos los alumnos que participan en el trabajo
                for(int i = 0; i < aet.size(); i++) {
                    AlumnoEnTrabajo alumnoEnTrabajo = aet.get(i);
                    
                    cadena += SEPARADOR + alumnoEnTrabajo.verAlumno().verCX() + SEPARADOR;
                    
                    LocalDate fDesde = alumnoEnTrabajo.verFechaDesde();
                    String fechaDesde = fDesde.format(DateTimeFormatter.ofPattern(patron));
                    cadena += fechaDesde + SEPARADOR;
                    
                    LocalDate fHasta = alumnoEnTrabajo.verFechaHasta();
                    String fechaHasta;
                    if (fHasta != null)
                        fechaHasta = fHasta.format(DateTimeFormatter.ofPattern(patron)); 
                    else
                        fechaHasta = VALORES_NULOS;
                    cadena += fechaHasta + SEPARADOR;
                    
                    String razon;
                    if(alumnoEnTrabajo.verRazon() != null)
                        razon = alumnoEnTrabajo.verRazon();
                    else
                        razon = VALORES_NULOS;
                    cadena += razon;
                }
                
                //todos los seminarios
                for(Seminario seminario : trabajo.verSeminarios()) {
                    LocalDate fExp = seminario.verFechaExposicion();
                    String fechaExp = fExp.format(DateTimeFormatter.ofPattern(patron));
                    cadena += SEPARADOR + fechaExp+ SEPARADOR;
                    cadena += seminario.verNotaAprobacion().toString() + SEPARADOR;
                    String observaciones;
                    if (seminario.verObservaciones() != null)
                        observaciones = seminario.verObservaciones();
                    else
                        observaciones = VALORES_NULOS;
                    cadena += observaciones;
                }
                
                
                bw.write(cadena);
                bw.newLine();
            }
            return ESCRITURA_OK;
        } 
        catch (IOException ioe) {
            return ESCRITURA_ERROR;            
        }
    }     
}

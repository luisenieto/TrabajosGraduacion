/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.modelos;

import gui.seminarios.modelos.Seminario;
import gui.areas.modelos.Area;
import gui.interfaces.IGestorSeminarios;
import gui.personas.modelos.Profesor;
import gui.seminarios.modelos.GestorSeminarios;
import gui.seminarios.modelos.NotaAprobacion;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Trabajo implements Comparable<Trabajo> {                 
    private String titulo;
    private int duracion;
    private List<Area> areas = new ArrayList<>();
    private LocalDate fechaPresentacion; //fecha en que se presenta el trabajo al encargado de recibirlo
    private LocalDate fechaAprobacion; //fecha en que se aprueba en comisión la propuesta de trabajo
    private LocalDate fechaFinalizacion; //fecha en la que finaliza el trabajo (los alumnos lo presentan)   
    private List<RolEnTrabajo> ret = new ArrayList<>();
    private List<AlumnoEnTrabajo> aet = new ArrayList<>();
    private List<Seminario> seminarios = new ArrayList<>();
    
    private int ultimoSeminario = - 1;
    //sirve para manejar la tabla tablaSeminarios

    /**
     * Constructor para crear un trabajo nuevo (sin fecha de exposición)
     * @param titulo título del trabajo
     * @param duracion duración del trabajo (en meses)
     * @param areas áreas del trabajo
     * @param fechaPresentacion fecha de presentación de la propuesta de trabajo
     * @param fechaAprobacion fecha en la que se aprobó la propuesta de trabajo
     * @param ret profesores que intervienen en el trabajo con sus respectivos roles (jurado, tutor y/o cotutor)
     * @param aet alumnos que participan en el trabajo
     */
    public Trabajo(String titulo, int duracion, List<Area> areas, LocalDate fechaPresentacion, LocalDate fechaAprobacion, List<RolEnTrabajo> ret, List<AlumnoEnTrabajo> aet) {
        this(titulo, duracion, areas, fechaPresentacion, fechaAprobacion, null, ret, aet);
    }
    
    /**
     * Constructor para crear un trabajo nuevo
     * @param titulo título del trabajo
     * @param duracion duración del trabajo (en meses)
     * @param areas áreas del trabajo
     * @param fechaPresentacion fecha de presentación de la propuesta de trabajo
     * @param fechaAprobacion fecha en la que se aprobó la propuesta de trabajo
     * @param fechaFinalizacion fecha de finalización del trabajo
     * @param ret profesores que intervienen en el trabajo con sus respectivos roles (jurado, tutor y/o cotutor)
     * @param aet alumnos que participan en el trabajo
     */
    public Trabajo(String titulo, int duracion, List<Area> areas, LocalDate fechaPresentacion, LocalDate fechaAprobacion, LocalDate fechaFinalizacion, List<RolEnTrabajo> ret, List<AlumnoEnTrabajo> aet) {
        this.titulo = titulo;
        this.duracion = duracion;
        this.areas = areas;
        this.fechaPresentacion = fechaPresentacion;
        this.fechaAprobacion = fechaAprobacion;
        this.fechaFinalizacion = fechaFinalizacion;
        this.ret = ret;
        this.aet = aet;
    }
        
    /**
     * Devuelve el título del trabajo
     * @return String  - título del trabajo
     */
    public String verTitulo() {
        return this.titulo;
    }

    /**
     * Devuelve la duración del trabajo
     * @return int  - duración del trabajo
     */    
    public int verDuracion() {
        return this.duracion;
    }
    
    /**
     * Devuelve las áreas del trabajo
     * @return List<Area>  - áreas del trabajo
     */            
    public List<Area> verAreas() {
        Collections.sort(this.areas);
        return this.areas;
    }    

    /**
     * Devuelve la fecha de presentación del trabajo
     * @return LocalDate  - fecha de presentación del trabajo
     */    
    public LocalDate verFechaPresentacion() {
        return this.fechaPresentacion;
    }

    /**
     * Devuelve la fecha de aprobación del trabajo
     * @return LocalDate  - fecha de aprobación del trabajo
     */        
    public LocalDate verFechaAprobacion() {
        return this.fechaAprobacion;
    }

    /**
     * Devuelve la fecha de finalización del trabajo
     * @return LocalDate  - fecha de finalización del trabajo
     */        
    public LocalDate verFechaFinalizacion() {
        return this.fechaFinalizacion;
    }

    /**
     * Asigna la fecha de finalización del trabajo
     * @param fechaFinalizacion fecha de finalización del trabajo
     */
    public void asignarFechaExposicion(LocalDate fechaFinalizacion) {
        this.fechaFinalizacion = fechaFinalizacion;
    }     
        
    /**
     * Devuelve el últmo profesor con el rol especificado (TUTOR | COTUTOR)
     * El último tutor o cotutor es el que tiene su fecha de finalización nula
     * Si no hay cotutor, devuelve null
     * @param rol rol que cumple el profesor
     * @return Profesor  - profesor con el rol especificado
     */
    public Profesor verTutorOCotutor(Rol rol) {
        Profesor profesor = null;
        if ((rol == Rol.TUTOR) || (rol == Rol.COTUTOR)) {
            for(RolEnTrabajo ret : this.ret) {
                if ((ret.verRol() == rol) && (ret.verFechaHasta() == null)) 
                    profesor = ret.verProfesor();
            }
            return profesor;
        }
        return profesor;
    }

    /**
     * Devuelve el jurado del trabajo, ordenado por apellido y nombre
     * El jurado es el último, o sea quienes tienen fecha de finalización nula
     * @return List<Profesor>  - lista con el jurado del trabajo
     */
    public List<Profesor> verJurado() {
        List<Profesor> jurado = new ArrayList<>();        
        for(RolEnTrabajo ret : this.ret) {
            if ((ret.verRol() == Rol.JURADO) && (ret.verFechaHasta() == null)) 
                jurado.add(ret.verProfesor());
        }
        Collections.sort(jurado);
        return jurado;
    }
    
    /**
     * Devuelve la lista de profesores con sus roles en el trabajo
     * La lista viene ordenada de la siguiente forma:
     * 1. Primero los tutores, luego los cotutores y luego el jurado
     * 2. Si hay 2 o más tutores (o 2 o más cotutores), se ordenan por la fecha desde la que empezaron en el proyecto
     * 3. En el caso del jurado, se ordenan por la fecha en que empezaron en el proyecto, y luego por apellido y nombre
     * @return List<RolEnTrabajo>  - lista de profesores con sus roles en el trabajo
     */
    public List<RolEnTrabajo> verProfesoresConRoles() {
        Collections.sort(this.ret);
        return this.ret;
    }
    
    /**
     * Devuelve la lista de alumnos del trabajo (los que actualmente participan y los que no)
     * La lista viene ordenada de la siguiente forma:
     * 1. Los alumnos se ordenan por la fecha en que comenzaron en el proyecto, y luego por apellido y nombre
     * @return List<AlumnoEnTrabajo>  - lista de alumnos del trabajo (los que actualmente participan y los que no)
     */
    public List<AlumnoEnTrabajo> verAlumnos() {
        Collections.sort(this.aet);
        return this.aet;
    }    
    
    /**
     * Devuelve la lista de los alumnos que actualmente participan del trabajo (sin fecha de finalización)
     * La lista viene ordenada de la siguiente forma:
     * 1. Los alumnos se ordenan por la fecha en que comenzaron en el trabajo, y luego por apellido y nombre
     * @return List<AlumnoEnTrabajo>  - lista de los alumnos que actualmente participan del trabajo
     */
    public List<AlumnoEnTrabajo> verAlumnosActuales() {
        Collections.sort(this.aet);
        List<AlumnoEnTrabajo> alumnosActuales = new ArrayList<>();
        for(AlumnoEnTrabajo alumnoEnTrabajo : this.aet) {
            if (alumnoEnTrabajo.verFechaHasta() == null)
                alumnosActuales.add(alumnoEnTrabajo);
        }
        return alumnosActuales;
    }        
    
    /**
     * Devuelve la cantidad de profesores con el rol especificado en el trabajo
     * @param rol rol de los profesores
     * @return int  - cantidad de profesores con el rol especificado en el trabajo
     */
    public int cantidadProfesoresConRol(Rol rol) {
        int cantidad = 0;
        for(RolEnTrabajo rolEnTrabajo : this.ret) {
            if(rolEnTrabajo.verRol() == rol)
                cantidad++;
        }
        return cantidad;
    }
    
    /**
     * Devuelve la cantidad de alumnos en el trabajo
     * @return int  - cantidad de alumnos en el trabajo
     */
    public int cantidadAlumnos() {
        return this.aet.size();
    }    
    
    /**
     * Devuelve la cantidad de seminarios que tiene el trabajo
     * @return int  - cantidad de seminarios que tiene el trabajo
     */
    public int cantidadSeminarios() {
        return this.seminarios.size();
    }
    
    /**
     * Informa si el trabajo tiene presentado seminarios
     * @return boolean  - true si el trabajo tiene al menos un seminario, false en caso contrario
     */
    public boolean tieneSeminarios() {
        return !this.seminarios.isEmpty();
    }
                
    /**
     * Obtiene el hashcode de un trabajo
     * @return int  - hashcode de un trabajo
     */
    @Override
    public int hashCode() {
        int hash = 3;
        hash = 89 * hash + Objects.hashCode(this.titulo);
        return hash;
    }

    /**
     * Compara si 2 trabajos son iguales según el títutlo
     * @param obj objeto contra el cual se compara
     * @return boolean  - true si 2 trabajos tienen el mismo título, false en caso contrario
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Trabajo other = (Trabajo) obj;
        if (!Objects.equals(this.titulo, other.titulo)) {
            return false;
        }
        return true;
    }
    
    /**
     * Informa si el profesor especifica participa en el trabajo
     * @param profesor profesor a buscar
     * @return boolean  - true si el profesor participa en el trabajo, false en caso constrario
     */
    public boolean tieneEsteProfesor(Profesor profesor) {
        for(RolEnTrabajo rolEnTrabajo : this.ret) {
            if (rolEnTrabajo.verProfesor().equals(profesor))
                return true;
        }
        return false;
    }
    
    /**
     * Agrega el profesor con su rol al trabajo
     * No puede haber 2 profesores iguales en el trabajo
     * @param rolEnTrabajo 
     */
    public void agregarRolEnTrabajo(RolEnTrabajo rolEnTrabajo) {
        if (!this.ret.contains(rolEnTrabajo))
            this.ret.add(rolEnTrabajo);
    }
    
    /**
     * Agrega un seminario al trabajo siempre y cuando no haya otro con la misma fecha
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param fechaExposicion fecha de exposición del seminario
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */
//    @Override
//    public String nuevoSeminario(LocalDate fechaExposicion, NotaAprobacion notaAprobacion, String observaciones) {
//        this.ultimoSeminario = - 1;
//        if ((fechaExposicion != null) && (notaAprobacion != null)) { //fecha y nota especificados
//            if (notaAprobacion == NotaAprobacion.APROBADO_SO) { //seminario aprobado sin observaciones
//                Seminario seminario = new Seminario(fechaExposicion, notaAprobacion, null);
//                if (!this.seminarios.contains(seminario)) { //no existe un seminario con esta fecha
//                    this.seminarios.add(seminario);
//                    Collections.sort(this.seminarios);
//                    this.ultimoSeminario = this.seminarios.indexOf(seminario);
//                    return IGestorTrabajos.SEMINARIO_EXITO;
//                }
//                else  //ya hay un seminario con la fecha de exposición especificada
//                    return IGestorTrabajos.SEMINARIO_DUPLICADO;                
//            }
//            else { //seminario aprobado con observaciones o desaprobado
//                if (observaciones != null) { //se especificaron las observaciones
//                    Seminario seminario = new Seminario(fechaExposicion, notaAprobacion, observaciones);
//                    if (!this.seminarios.contains(seminario)) {
//                        this.seminarios.add(seminario);
//                        Collections.sort(this.seminarios);
//                        this.ultimoSeminario = this.seminarios.indexOf(seminario);
//                        return IGestorTrabajos.SEMINARIO_EXITO;
//                    }
//                    else //ya hay un seminario con la fecha de exposición especificada
//                        return IGestorTrabajos.SEMINARIO_DUPLICADO;
//                }
//                else //no se especificaron las observaciones
//                    return IGestorTrabajos.SEMINARIO_ERROR_OBSERVACIONES;
//            }
//        }
//        else  //fecha y nota sin especificar
//            return IGestorTrabajos.SEMINARIO_ERROR;
//    }
        
    /**
     * Agrega el seminario especificado siempre y cuando no exista otro en la misma fecha
     * Y que la fecha de exposición del seminario sea posterior a la de aprobación del trabajo
     * Este método se usa cuando se leen los seminarios del archivo
     * @param seminario seminario a agregar
     * @return String  - cadena con el resultado de la operación
     */
    public String agregarSeminario(Seminario seminario) {
        if (seminario != null) {
            if (!this.seminarios.contains(seminario)) {
                if (seminario.verFechaExposicion().isAfter(this.verFechaAprobacion())) {
                    this.seminarios.add(seminario);
                    Collections.sort(this.seminarios);
                    return IGestorSeminarios.EXITO;
                }
                else
                    return IGestorSeminarios.ERROR_FECHA_EXPOSICION;
            }
            else
                return IGestorSeminarios.DUPLICADOS;
        }
        else
            return IGestorSeminarios.SEMINARIO_INEXISTENTE;
    }
    
    /**
     * Crea un seminario siempre y cuando no haya otro con la misma fecha
     * Y que la fecha de exposición del seminario sea posterior a la de aprobación del trabajo
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param fechaExposicion fecha de exposición del seminario
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */
    public String nuevoSeminario(LocalDate fechaExposicion, NotaAprobacion notaAprobacion, String observaciones) {
        this.ultimoSeminario = -1;
        IGestorSeminarios gs = GestorSeminarios.instanciar();
        String resultado = gs.nuevoSeminario(this, fechaExposicion, notaAprobacion, observaciones);
        if (resultado.equals(IGestorSeminarios.EXITO))
            this.ultimoSeminario = this.seminarios.size() - 1;
        return resultado;
    }
    
    /**
     * Modifica un seminario siempre y cuando no haya otro con la misma fecha
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param seminario seminario a modificar
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */    
    public String modificarSeminario(Seminario seminario, NotaAprobacion notaAprobacion, String observaciones) {
        this.ultimoSeminario = -1;
        IGestorSeminarios gs = GestorSeminarios.instanciar();
        String resultado = gs.modificarSeminario(this, seminario, notaAprobacion, observaciones);
        if (resultado.equals(IGestorSeminarios.EXITO))
            this.ultimoSeminario = this.seminarios.indexOf(seminario);
        return resultado;
    }

    
    /**
     * Devuelve la posición del último seminario agregado/modificado
     * Sirve para manejar la tabla tablaSeminarios
     * Cada vez que se agrega/modifica un seminario, este valor toma la posición del seminario agregado/modificado en el ArrayList
     * @return int  - posición del último seminario agregado/modificado
     */
    public int verUltimoSeminario() {
        return this.ultimoSeminario;
    }
    
    /**
     * Devuelve todos los seminarios ordenados según su fecha de exposición
     * @return List<Seminario>  - lista de seminarios ordenada según la fecha de exposición
     */
    public List<Seminario> verSeminarios() {
        Collections.sort(this.seminarios);
        return this.seminarios;
    }

    /**
     * Permite ordenar los trabajos descendentemente según la fecha en que fueron presentados para su aprobación
     * @param o trabajo contra el cual comparar
     * @return int  - resultado de la comparaciónn
     */
    @Override
    public int compareTo(Trabajo o) {
        return o.fechaAprobacion.compareTo(this.fechaAprobacion);
    }
    
    /**
     * Asigna en -1 la variable que controla el último seminario agregado/modificado
     * Sirve para manejar la tabla tablaSeminarios
     */
    public void cancelar() {
        this.ultimoSeminario = -1; 
    }    
    
    
    
    public void mostrar() {
        System.out.println("Título: " + this.titulo);
        System.out.println("Duración: " + this.duracion);
        String patron = "dd/MM/yyyy";
        System.out.println("Fecha de presentación: " + this.fechaPresentacion.format(DateTimeFormatter.ofPattern(patron))); 
        System.out.println("Fecha de aprobación: " + this.fechaAprobacion.format(DateTimeFormatter.ofPattern(patron))); 
        if (this.fechaFinalizacion != null)
            System.out.println("Fecha de exposición: " + this.fechaFinalizacion.format(DateTimeFormatter.ofPattern(patron))); 
        else
            System.out.println("Fecha de exposición: -"); 
//        for(RolEnTrabajo rolEnTrabajo : this.ret)
//            rolEnTrabajo.mostrar();
//        for(AlumnoEnTrabajo alumnoEnTrabajo : this.aet)
//            alumnoEnTrabajo.mostrar();
        for(Seminario s : this.seminarios)
            s.mostrar();
    }
    
}

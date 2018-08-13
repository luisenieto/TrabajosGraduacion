/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.modelos;

import gui.personas.modelos.Profesor;
import java.time.LocalDate;
import java.util.Objects;

public class RolEnTrabajo implements Comparable<RolEnTrabajo> {
    private Profesor profesor;
    private Rol rol;
    private LocalDate fechaDesde;
    private LocalDate fechaHasta;
    private String razon;

    /**
     * Constructor
     * @param profesor profesor que participa en el trabajo en el rol de tutor, cotutor o jurado
     * @param rol rol del profesor en el trabajo
     * @param fechaDesde fecha a partir de la cual el profesor comienza en el trabajo
     * Cuando un profesor comienza, no tiene fecha de finalización, y por lo tanto tampoco una razón por la cual dejó de participar
     */
    public RolEnTrabajo(Profesor profesor, Rol rol, LocalDate fechaDesde) {
        this(profesor, rol, fechaDesde, null, null);
    }
    
    /**
     * Constructor
     * A este constructor se lo usa cuando se lee del archivo donde están los trabajos
     * @param profesor profesor que participa en el trabajo en el rol de tutor, cotutor o jurado
     * @param rol rol del profesor en el trabajo
     * @param fechaDesde fecha a partir de la cual el profesor comienza en el trabajo
     * @param fechaHasta fecha hasta la cual el profesor participó en el trabajo
     * @param razon razón por la cual el profesor dejó de participar en el trabajo
     */    
    public RolEnTrabajo(Profesor profesor, Rol rol, LocalDate fechaDesde, LocalDate fechaHasta, String razon) {
        this.profesor = profesor;
        this.rol = rol;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.razon = razon;
    }    

    /**
     * Muestra el profesor del trabajo
     * A este método lo usa la clase ModeloTablaRolesEnTrabajos
     * @return Profesor  - objeto Profesor que participa en el trabajo
     */    
    public Profesor verProfesor() {
        return this.profesor;
    }
        
    /**
     * Muestra el rol del profesor en el trabajo
     * A este método lo usa la clase ModeloTablaRolesEnTrabajos
     * @return Rol  - objeto Rol del profesor que participa en el trabajo
     */        
    public Rol verRol() {
        return this.rol;
    }

    /**
     * Muestra la fecha a partir de la cual el profesor comienza en el trabajo
     * A este método lo usa la clase ModeloTablaRolesEnTrabajos
     * @return LocalDate  - objeto LocalDate con la fecha a partir de la cual el profesor comienza en el trabajo
     */    
    public LocalDate verFechaDesde() {
        return this.fechaDesde;
    }
    
    /**
     * Muestra la fecha hasta la cual el profesor participó en el trabajo
     * A este método lo usa la clase ModeloTablaRolesEnTrabajos
     * @return LocalDate  - objeto LocalDate con la fecha hasta la cual el profesor participó en el trabajo
     */        
    public LocalDate verFechaHasta() {
        return this.fechaHasta;
    }

    /**
     * Muestra la razón por la cual el profesor dejó de participar en el trabajo
     * A este método lo usa la clase ModeloTablaAlumnosEnTrabajos
     * @return String  - cadena con la razón por la cual el profesor dejó de participar en el trabajo
     */    
    public String verRazon() {
        return this.razon;
    }

    /**
     * Asigna la fecha de finalización de un profesor en el trabajo
     * @param fechaHasta fecha de finalización de un profesor en el trabajo
     */
    public void asignarFechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
    }

    /**
     * Asigna la razón por la cual un profesor finalizó en el trabajo
     * @param razon razón por la cual un profesor finalizó en el trabajo
     */    
    public void asignarRazon(String razon) {
        this.razon = razon;
    }

    /**
     * Devuelve el hashcode del objeto
     * @return int  - hashcode del objeto
     */
    @Override
    public int hashCode() {
        int hash = 3;
        hash = 47 * hash + Objects.hashCode(this.profesor);
        return hash;
    }

    /**
     * Determina si 2 objetos son iguales según el profesor
     * @param obj objeto contra el cual se compara
     * @return boolean  - true si los 2 objetos son iguales
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
        final RolEnTrabajo other = (RolEnTrabajo) obj;
        if (!Objects.equals(this.profesor, other.profesor)) {
            return false;
        }
        return true;
    }        
                
    /**
     * A este método lo usa la clase Trabajo (ver si hace falta en realidad)
     */    
    public void mostrar() {
        this.profesor.mostrar();
        System.out.println("Rol: " + this.rol);
    }

    /**
     * Permite ordenar los profesores según el siguiente criterio:
     * 1. Primero se muestra el o los tutores (en caso que el trabajo hubiera cambiado de tutor), teniendo en cuenta la fecha en la que comenzaron a participar en el trabajo
     * 2. Luego se muestra el o los cotutores (en caso que el trabajo hubiera cambiado de cotutor), teniendo en cuenta la fecha en la que comenzaron a participar en el trabajo
     * 3. Luego se muestra el jurado, teniendo en cuenta la fecha en la que comenzaron a participar en el trabajo
     * 4. Si 2 tutores, cotutores o jurados comenzaron en la misma fecha, se ordenan por apellido y nombre
     * @param o RolEnTrabajo contra el cual se compara
     * @return int  - resultado de la comparación
     */    
    @Override
    public int compareTo(RolEnTrabajo o) {
        if(this.rol.compareTo(o.rol) == 0) {  //mismo rol
            if (this.fechaDesde.compareTo(o.fechaDesde) == 0)  //misma fecha de comienzo
                return this.profesor.compareTo(o.profesor);
            else
                return this.fechaDesde.compareTo(o.fechaDesde);
        }
        else
            return this.rol.compareTo(o.rol);
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.modelos;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class Seminario implements Comparable<Seminario> {
    private LocalDate fechaExposicion;
    private NotaAprobacion notaAprobacion;
    private String observaciones;

    /**
     * Constructor
     * @param fechaExposicion fecha de exposición del seminario
     * @param notaAprobacion condición del seminario (aprobado, desaprobado, etc)
     * @param observaciones observaciones sobre la condición
     */
    public Seminario(LocalDate fechaExposicion, NotaAprobacion notaAprobacion, String observaciones) {
        this.fechaExposicion = fechaExposicion;
        this.notaAprobacion = notaAprobacion;
        this.observaciones = observaciones;
    }
    
//    /**
//     * Constructor
//     * @param fechaExposicion fecha de exposición del seminario
//     * @param notaAprobacion condición del seminario (aprobado, desaprobado, etc)
//     */
//    public Seminario(LocalDate fechaExposicion, NotaAprobacion notaAprobacion) {
//        this(fechaExposicion, notaAprobacion, null);
//    }
    
    /**
     * Devuelve la fecha de exposición del seminario
     * @return LocalDate  - fecha de exposición del seminario
     */    
    public LocalDate verFechaExposicion() {
        return this.fechaExposicion;
    }  
    
    /**
     * Devuelve la nota de aprobación del seminario
     * @return NotaAprobacion  - nota de aprobación del seminario
     */        
    public NotaAprobacion verNotaAprobacion() {
        return this.notaAprobacion;
    }

    /**
     * Asigna la nota de aprobación
     * @param notaAprobacion nota de aprobación
     */
    public void asignarNotaAprobacion(NotaAprobacion notaAprobacion) {
        if (notaAprobacion != null)
            this.notaAprobacion = notaAprobacion;
    }
            
    /**
     * Devuelve las observaciones del seminario
     * @return String  - observaciones del seminario
     */
    public String verObservaciones() {
        return this.observaciones;
    }

    /**
     * Asigna las observaciones del seminario
     * @param observaciones observaciones
     */
    public void asignarObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
                
    /**
     * Obtiene el hashcode del objeto
     * @return int  - hashcode del objeto
     */
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.fechaExposicion);
        return hash;
    }

    /**
     * Compara si 2 objetos son iguales según la fecha de exposición
     * @param obj objeto contra el cual se compara
     * @return boolean  - resultado de la comparación
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
        final Seminario other = (Seminario) obj;
        if (!Objects.equals(this.fechaExposicion, other.fechaExposicion)) {
            return false;
        }
        return true;
    }

    /**
     * Permite ordenar los seminarios por su fecha de exposición
     * @param o objeto contra el cual se compara
     * @return int  - resultado de la comparación
     */
    @Override
    public int compareTo(Seminario o) {
        return this.fechaExposicion.compareTo(o.fechaExposicion);
    }        
    
    public void mostrar() {
        String patron = "dd/MM/yyyy";
        System.out.println(this.fechaExposicion.format(DateTimeFormatter.ofPattern(patron)) + " - " + this.notaAprobacion.toString() + " - " + this.observaciones);
    }
}

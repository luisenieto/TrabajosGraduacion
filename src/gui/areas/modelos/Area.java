/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.areas.modelos;

import java.util.Objects;

public class Area implements Comparable<Area> {
    private String nombre;

    /**
     * Constructor
     * @param nombre nombre del área
     */
    public Area(String nombre) {
        this.nombre = nombre;
    }
    
    /**
     * Devuelve el nombre del área
     * @return String  - cadena con el nombre del área
     */
    public String verNombre() {
        return this.nombre;
    }

    /**
     * Devuelve el hashcode de un área
     * @return int  - hashcode de un área
     */
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 13 * hash + Objects.hashCode(this.nombre);
        return hash;
    }

    /**
     * Compara si 2 áreas son iguales o no según el nombre
     * @param obj objeto contra el cual comparar
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
        final Area other = (Area) obj;
        return this.nombre.trim().equalsIgnoreCase(other.nombre.trim());
    }

    /**
     * Permite ordenar las áreas por nombre
     * @param o objeto contra el cual comparar
     * @return int  - resultado de la comparación
     */
    @Override
    public int compareTo(Area o) {
        return this.nombre.compareToIgnoreCase(o.nombre);
    }

    /**
     * Devuelve la representación de un área como cadena
     * @return String  - cadena con la representación del área
     */
    @Override
    public String toString() {
        return this.nombre;
    }        
}

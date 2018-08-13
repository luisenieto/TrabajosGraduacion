/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.modelos;

public abstract class Persona implements Comparable<Persona> {
    private String apellidos;
    private String nombres;
    private int dni;

    /**
     * Constructor
     * @param apellidos apellidos de una persona
     * @param nombres nombres de una persona
     * @param dni dni de una persona
     */
    public Persona(String apellidos, String nombres, int dni) {
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.dni = dni;
    }

    /**
     * Obtiene el hashcode de una persona
     * @return int  - hashcode de una persona
     */
    @Override
    public int hashCode() {
        int hash = 3;
        hash = 11 * hash + this.dni;
        return hash;
    }

    /**
     * Compara si 2 personas son iguales según su dni
     * @param obj objeto contra el cual se compara
     * @return boolean  - true si 2 personas tienen el mismo dni, false en caso contrario
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass().getSuperclass() != obj.getClass().getSuperclass()) {
            return false;
        }
        final Persona other = (Persona) obj;
        return this.dni == other.dni;
    }

    /**
     * Muestra los apellidos de una persona
     * @return String  - apellidos de una persona
     */
    public String verApellidos() {
        return this.apellidos;
    }

    /**
     * Asigna los apellidos a una persona
     * @param apellidos apellidos de una persona
     */
    public void asignarApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    /**
     * Muestra los nombres de una persona
     * @return String  - nombres de una persona
     */    
    public String verNombres() {
        return this.nombres;
    }

    /**
     * Asigna los nombres a una persona
     * @param nombres nombres de una persona
     */    
    public void asignarNombres(String nombres) {
        this.nombres = nombres;
    }

    /**
     * Muestra el dni de una persona
     * @return int  - dni de una persona
     */    
    public int verDni() {
        return this.dni;
    }

    /**
     * Ordena 2 personas primero por los apellidos y luego por los nombres
     * @param o persona contra la cual se compara
     * @return int  - número que indica qué persona se ordena primero
     */
    @Override
    public int compareTo(Persona o) {
        if (this.apellidos.compareToIgnoreCase(o.apellidos) == 0)
            return this.nombres.compareToIgnoreCase(o.nombres);
        else
            return this.apellidos.compareToIgnoreCase(o.apellidos);
    }

    /**
     * Convierte una persona a cadena
     * @return String  - cadena que representa una persona ("apellidos, nombres")
     */
    @Override
    public String toString() {
        return this.apellidos + ", " + this.nombres;
    }
    
    /**
     * Muestra una persona
     */
    public void mostrar() {
        System.out.println(this.apellidos + ", " + this.nombres);
        System.out.println("Documento: " + this.dni);
    }
}

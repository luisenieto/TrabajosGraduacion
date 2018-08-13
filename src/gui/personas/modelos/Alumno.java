/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.modelos;

import gui.trabajos.modelos.AlumnoEnTrabajo;
import java.util.ArrayList;
import java.util.List;

public class Alumno extends Persona {
    private String cx;
    private List<AlumnoEnTrabajo> pet = new ArrayList<>();

    /**
     * Constructor
     * @param apellidos apellidos de un alumno
     * @param nombres nombres de un alumno
     * @param dni dni de un alumno
     * @param cx cx de un alumno
     */    
    public Alumno(String apellidos, String nombres, int dni, String cx) {
        super(apellidos, nombres, dni);
        this.cx = cx;
    }

    /**
     * Muestra el cx de un alumno
     * @return String  - cx de un alumno
     */        
    public String verCX() {
        return this.cx;
    }

    /**
     * Asigna el cx a un alumno
     * @param cx cx de un alumno
     */        
    public void asignarCX(String cx) {
        this.cx = cx;
    }

    /**
     * Muestra un alumno
     */    
    @Override
    public void mostrar() {
        super.mostrar();
        System.out.println("CX: " + this.cx);
    }    
}

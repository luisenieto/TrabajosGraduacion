/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.modelos;

import gui.interfaces.IGestorPersonas;
import javax.swing.DefaultComboBoxModel;

/**
 * Clase para mostrar los alumnos en una lista
 */
public class ModeloListaAlumnos extends DefaultComboBoxModel {
    
    /**
     * Constructor
     */
    public ModeloListaAlumnos() {  
        IGestorPersonas gp = GestorPersonas.instanciar();
        for (Alumno alumno : gp.buscarAlumnos(null)) { //todos los alumnos
            this.addElement(alumno); 
        }
    }

    /**
     * Devuelve el alumno seleccionado
     * @return Alumno  - alumno seleccionada
     */
    public Alumno obtenerAlumnno() { 
        return (Alumno)this.getSelectedItem();
    }
        
    /**
     * Selecciona el alumno especificado
     * @param alumno alumno
     */
    public void seleccionarAlumno(Alumno alumno) {
        this.setSelectedItem(alumno);
    }        
}

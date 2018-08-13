/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.modelos;

import gui.interfaces.IGestorPersonas;
import javax.swing.DefaultComboBoxModel;

/**
 * Clase para mostrar los profesores en un combo
 */
public class ModeloComboProfesores extends DefaultComboBoxModel {
    
    /**
     * Constructor
     */
    public ModeloComboProfesores() {  
        IGestorPersonas gp = GestorPersonas.instanciar();
        for (Profesor profesor : gp.buscarProfesores(null)) { //todos los profesores
            this.addElement(profesor); 
        }
    }

    /**
     * Devuelve el profesor seleccionado
     * @return Profesor  - profesor seleccionado
     */
    public Profesor obtenerProfesor() { 
        return (Profesor)this.getSelectedItem();
    }
        
    /**
     * Selecciona el profesor especificado
     * @param profesor profesor
     */
    public void seleccionarProfesor(Profesor profesor) {
        this.setSelectedItem(profesor);
    }        
}

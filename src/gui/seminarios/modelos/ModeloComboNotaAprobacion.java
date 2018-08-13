/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.modelos;

import gui.personas.modelos.*;
import javax.swing.DefaultComboBoxModel;

/**
 * Clase para mostrar las notas de aprobación de un seminario en un combo
 */
public class ModeloComboNotaAprobacion extends DefaultComboBoxModel {
    
    /**
     * Constructor
     */
    public ModeloComboNotaAprobacion() {  
        for (NotaAprobacion notaAprobacion : NotaAprobacion.values()) {
            this.addElement(notaAprobacion); 
        }
    }

    /**
     * Devuelve la nota de aprobación seleccionada
     * @return NotaAprobacion  - nota de aprobación seleccionada
     */
    public NotaAprobacion obtenerNotaAprobacion() { 
        return (NotaAprobacion)this.getSelectedItem();
    }
        
    /**
     * Selecciona la nota de aprobación especificada
     * @param notaAprobacion nota de aprobación
     */
    public void seleccionarNotaAprobacion(NotaAprobacion notaAprobacion) {
        this.setSelectedItem(notaAprobacion);
    }        
}

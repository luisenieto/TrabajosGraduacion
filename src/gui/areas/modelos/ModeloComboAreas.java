/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.areas.modelos;

import gui.interfaces.IGestorAreas;
import javax.swing.DefaultComboBoxModel;

/**
 * Clase para mostrar las áreas en un combo
 */
public class ModeloComboAreas extends DefaultComboBoxModel {
    
    /**
     * Constructor
     */
    public ModeloComboAreas() {  
        IGestorAreas ga = GestorAreas.instanciar();
        for (Area area : ga.buscarAreas(null)) { //todas las áreas
            this.addElement(area); 
        }
    }

    /**
     * Devuelve el área seleccionada
     * @return Area  - área seleccionada
     */
    public Area obtenerArea() { 
        return (Area)this.getSelectedItem();
    }
        
    /**
     * Selecciona el área especificada
     * @param area área
     */
    public void seleccionarArea(Area area) {
        this.setSelectedItem(area);
    }        
}

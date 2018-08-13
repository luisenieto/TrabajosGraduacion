/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.modelos;

import javax.swing.DefaultComboBoxModel;

/**
 * Clase para mostrar los cargos de los profesores en un combo
 */
public class ModeloComboCargos extends DefaultComboBoxModel {
    
    /**
     * Constructor
     */
    public ModeloComboCargos() {  
        for (Cargo cargo : Cargo.values()) {
            this.addElement(cargo); 
        }
    }

    /**
     * Devuelve el cargo seleccionado
     * @return Cargo  - cargo seleccionado
     */
    public Cargo obtenerCargo() { 
        return (Cargo)this.getSelectedItem();
    }
        
    /**
     * Selecciona el Cargo especificado
     * @param cargo cargo
     */
    public void seleccionarCargo(Cargo cargo) {
        this.setSelectedItem(cargo);
    }        
}

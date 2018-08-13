/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.modelos;

public enum Rol {
    TUTOR("Tutor"),
    COTUTOR("Cotutor"),
    JURADO("Jurado");
    
    private String valor;
    
    /**
     * Constructor
     * @param valor valor de la enumeración
     */                
    private Rol(String valor) {
        this.valor = valor;
    }            
    
    /**
     * Devuelve la constante como cadena
     * @return String  - constante como cadena
     */                
    @Override
    public String toString() {
        return this.valor;
    }                    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.modelos;

public enum Cargo {
    TITULAR("Titular"),
    ASOCIADO("Asociado"),
    ADJUNTO("Adjunto"),
    JTP("Jefe de Trabajos Prácticos"),
    ADG("Aux. Docente Graduado"),
    EXTERNO("Externo");
    
    private String valor;
    
    /**
     * Constructor
     * @param valor valor de la enumeración
     */                
    private Cargo(String valor) {
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

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.modelos;

public enum NotaAprobacion {
    APROBADO_SO("Aprobado S/O"),
    APROBADO_CO("Aprobado C/O"),
    DESAPROBADO("Desaprobado"),;
    
    private String valor;
    
    /**
     * Constructor
     * @param valor valor de la enumeración
     */                
    private NotaAprobacion(String valor) {
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

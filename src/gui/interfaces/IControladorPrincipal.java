/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import java.awt.event.ActionEvent;


public interface IControladorPrincipal {
    /**
     * Acción a ejecutar cuando se selecciona el botón Areas
     * @param evt evento
     */                        
    public void btnAreasClic(ActionEvent evt);

    /**
     * Acción a ejecutar cuando se selecciona el botón Personas
     * @param evt evento
     */                        
    public void btnPersonasClic(ActionEvent evt);

    /**
     * Acción a ejecutar cuando se selecciona el botón Trabajos
     * @param evt evento
     */                        
    public void btnTrabajosClic(ActionEvent evt);

    /**
     * Acción a ejecutar cuando se selecciona el botón Salir
     * @param evt evento
     */                        
    public void btnSalirClic(ActionEvent evt);
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.awt.event.WindowEvent;


public interface IControladorSeminarios {
    public static final String NUEVO = "Seminarios - Nuevo";
    public static final String MODIFICAR = "Seminarios - Modificar";
    public static final String TITULO = "Seminarios";
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Seminario
     * @param evt evento
     */                        
    public void btnNuevoSeminarioClic(ActionEvent evt);

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Seminario
     * @param evt evento
     */                        
    public void btnModificarSeminarioClic(ActionEvent evt);
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Volver
     * @param evt evento
     */                        
    public void btnVolverClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando la ventana obtenga el foco
     * @param evt evento
     */
    public void ventanaGanaFoco(WindowEvent evt);
}

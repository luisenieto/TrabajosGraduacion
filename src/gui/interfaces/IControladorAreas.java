/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.awt.event.WindowEvent;


public interface IControladorAreas {
    public static final String AREA_NUEVA = "Areas - Nueva";
    public static final String TITULO = "Areas";
    public static final String CONFIRMACION = "¿Desea borrar el área especificada?";
    public static final String OPERACION_ALTA = "Alta";
    public static final String OPERACION_BAJA = "Baja";    
    public static final String OPERACION_NINGUNA = "Ninguna";    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Nueva
     * @param evt evento
     */                        
    public void btnNuevaClic(ActionEvent evt);

    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar
     * @param evt evento
     */                        
    public void btnBorrarClic(ActionEvent evt);
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Volver
     * @param evt evento
     */                        
    public void btnVolverClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Buscar
     * @param evt evento
     */                        
    public void btnBuscarClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando la ventana obtenga el foco
     * @param evt evento
     */
    public void ventanaGanaFoco(WindowEvent evt);
    
    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtNombre
     * @param evt evento
     */
    public void txtNombrePresionarTecla(KeyEvent evt);    
    
}

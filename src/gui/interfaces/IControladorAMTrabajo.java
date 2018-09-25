/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;

public interface IControladorAMTrabajo {
    /**
     * Acción a ejecutar cuando se selecciona el botón Guardar
     * @param evt evento
     */                        
    public void btnGuardarClic(ActionEvent evt);
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Cancelar
     * @param evt evento
     */                        
    public void btnCancelarClic(ActionEvent evt);
    
    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtDuracion
     * @param evt evento
     */
    public void txtDuracionPresionarTecla(KeyEvent evt);
    
    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtTitulo
     * @param evt evento
     */
    public void txtTituloPresionarTecla(KeyEvent evt);
    
}

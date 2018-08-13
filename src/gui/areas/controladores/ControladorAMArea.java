/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.areas.controladores;

import gui.areas.modelos.GestorAreas;
import gui.areas.vistas.VentanaAMArea;
import gui.interfaces.IControladorAMArea;
import gui.interfaces.IControladorAreas;
import gui.interfaces.IGestorAreas;
import java.awt.Dialog;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import javax.swing.JOptionPane;


public class ControladorAMArea implements IControladorAMArea {    
    private VentanaAMArea ventana;    
    
    /**
     * Constructor
     * @param ventanaPadre (VentanaAreas en este caso)
     */    
    public ControladorAMArea(Dialog ventanaPadre) {
        this.ventana = new VentanaAMArea(this, ventanaPadre);
        this.ventana.setTitle(IControladorAreas.AREA_NUEVA);
        this.ventana.setLocationRelativeTo(null);
        this.ventana.setVisible(true);
    }    
            
    /**
     * Acción a ejecutar cuando se selecciona el botón Guardar
     * @param evt evento
     */                        
    @Override
    public void btnGuardarClic(ActionEvent evt) {
        this.guardar();
    }
    
    /**
     * Crea un área (si los datos están correctos)
     */
    private void guardar() {
        String nombre = this.ventana.verTxtNombre().getText().trim();
        IGestorAreas ga = GestorAreas.instanciar();
        String resultado;
        resultado = ga.nuevaArea(nombre);
        if (!resultado.equals(IGestorAreas.EXITO))
            JOptionPane.showMessageDialog(null, resultado, IControladorAreas.TITULO, JOptionPane.ERROR_MESSAGE);
        else
            this.ventana.dispose();
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Cancelar
     * @param evt evento
     */                            
    @Override
    public void btnCancelarClic(ActionEvent evt) {
        this.ventana.dispose();
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtNombre
     * @param evt evento
     */    
    @Override
    public void txtNombrePresionarTecla(KeyEvent evt) {
        if (evt.getKeyCode() == KeyEvent.VK_ENTER) {
            this.guardar(); 
        }
    }
}

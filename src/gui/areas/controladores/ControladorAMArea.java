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
        if (!resultado.equals(IGestorAreas.EXITO)) {
            ga.cancelar();
            JOptionPane.showMessageDialog(null, resultado, IControladorAreas.TITULO, JOptionPane.ERROR_MESSAGE);
        }
        else
            this.ventana.dispose();
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Cancelar
     * @param evt evento
     */                            
    @Override
    public void btnCancelarClic(ActionEvent evt) {
        IGestorAreas ga = GestorAreas.instanciar();
        ga.cancelar();
        this.ventana.dispose();
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtNombre
     * Sólo se permiten letras, Enter, Del, Backspace y espacio
     * @param evt evento
     */    
    @Override
    public void txtNombrePresionarTecla(KeyEvent evt) {
        char c = evt.getKeyChar();            
        if (!Character.isLetter(c)) { //sólo se aceptan letras, Enter, Del, Backspace y espacio
            switch(c) {
                case KeyEvent.VK_ENTER: 
                    this.guardar();
                    break;
                case KeyEvent.VK_BACK_SPACE:    
                case KeyEvent.VK_DELETE:
                case KeyEvent.VK_SPACE:
                    break;
                default:
                    evt.consume(); //consume el evento para que no sea procesado por la fuente
            }
        }
    }
}

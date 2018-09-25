/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.controladores;

import gui.interfaces.IControladorAMAlumno;
import gui.interfaces.IControladorPersonas;
import gui.interfaces.IGestorPersonas;
import gui.personas.modelos.Alumno;
import gui.personas.modelos.GestorPersonas;
import gui.personas.vistas.VentanaAMAlumno;
import java.awt.Dialog;
import javax.swing.JOptionPane;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;

public class ControladorAMAlumno implements IControladorAMAlumno {    
    private VentanaAMAlumno ventana;
    private Alumno alumno;

    /**
     * Constructor
     * @param ventanaPadre (VentanaPersonas en este caso)
     * @param titulo título de la ventana
     */
    public ControladorAMAlumno(Dialog ventanaPadre, String titulo) {
        this(ventanaPadre, titulo, null);
    }
    
    /**
     * Constructor
     * @param ventanaPadre (VentanaPersonas en este caso)
     * @param titulo título de la ventana
     * @param alumno alumno a modificar
     */    
    public ControladorAMAlumno(Dialog ventanaPadre, String titulo, Alumno alumno) {
        this.alumno = alumno;
        this.ventana = new VentanaAMAlumno(this, ventanaPadre);
        this.ventana.setTitle(titulo);
        this.ventana.setLocationRelativeTo(null);
        if (alumno != null) { //modificación de alumno
            this.ventana.verTxtApellidos().setText(alumno.verApellidos());            
            this.ventana.verTxtNombres().setText(alumno.verNombres());
            this.ventana.verTxtDocumento().setText(Integer.toString(alumno.verDni()));
            this.ventana.verTxtCX().setText(alumno.verCX());                    
            this.ventana.verTxtDocumento().setEditable(false);
            this.ventana.verTxtApellidos().requestFocus();            
        }
        this.ventana.setVisible(true);
    }    
            
    /**
     * Acción a ejecutar cuando se selecciona el botón Guardar
     * @param evt evento
     */                        
    @Override
    public void btnGuardarClic(ActionEvent evt) {
        String apellidos = this.ventana.verTxtApellidos().getText().trim();
        String nombres = this.ventana.verTxtNombres().getText().trim();
        int documento = 0;
        if (!this.ventana.verTxtDocumento().getText().trim().isEmpty())
            documento = Integer.parseInt(this.ventana.verTxtDocumento().getText().trim());        
        String cx = this.ventana.verTxtCX().getText().trim();
        
        if (this.alumno == null) //nuevo alumno
            this.nuevoAlumno(apellidos, nombres, documento, cx);
        else //modificar alumno
            this.modificarAlumno(apellidos, nombres, cx);
    }
    
    /**
     * Se encarga de la creación de un alumno
     * @param apellidos apellidos del alumno
     * @param nombres nombres del alumno
     * @param documento documento del alumno
     * @param cx cx del alumno
     */
    private void nuevoAlumno(String apellidos, String nombres, int documento, String cx) {
        IGestorPersonas gp = GestorPersonas.instanciar();
        String resultado = gp.nuevoAlumno(apellidos, nombres, documento, cx);
        if (!resultado.equals(IGestorPersonas.EXITO_ALUMNOS)) {
            gp.cancelarAlumno();
            JOptionPane.showMessageDialog(null, resultado, IControladorPersonas.TITULO, JOptionPane.ERROR_MESSAGE);
        }
        else
            this.ventana.dispose();                                    
    }
    
    /**
     * Se encarga de la modificación del alumno
     * @param apellidos apellidos del alumno
     * @param nombres nombres del alumno
     * @param cx cx del alumno
     */    
    private void modificarAlumno(String apellidos, String nombres, String cx) {
        IGestorPersonas gp = GestorPersonas.instanciar();
        String resultado = gp.modificarAlumno(this.alumno, apellidos, nombres, cx);
        if (!resultado.equals(IGestorPersonas.EXITO_ALUMNOS)) {
            gp.cancelarAlumno();
            JOptionPane.showMessageDialog(null, resultado, IControladorPersonas.TITULO, JOptionPane.ERROR_MESSAGE);
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
        IGestorPersonas gp = GestorPersonas.instanciar();
        gp.cancelarAlumno();
        this.ventana.dispose();
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtDocumento
     * Sólo se permiten los dígitos del 0-9, Enter, Del y Backspace
     * @param evt evento
     */    
    @Override
    public void txtDocumentoPresionarTecla(KeyEvent evt) {
        char c = evt.getKeyChar();
        if (!Character.isDigit(c)) { //sólo se aceptan los dígitos del 0-9, Enter, Del y Backspace
            switch(c) {
                case KeyEvent.VK_ENTER: 
                    this.btnGuardarClic(null); //no importa el evento en este caso
                    break;
                case KeyEvent.VK_BACK_SPACE:    
                case KeyEvent.VK_DELETE:
                    break;
                default:
                    evt.consume(); //consume el evento para que no sea procesado por la fuente
            }
        }
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtNombres
     * @param evt evento
     */    
    @Override
    public void txtNombresPresionarTecla(KeyEvent evt) {
        this.txtApellidosPresionarTecla(evt);
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtApellidos
     * Sólo se permiten letras, Enter, Del, Backspace y espacio
     * @param evt evento
     */    
    @Override
    public void txtApellidosPresionarTecla(KeyEvent evt) {
        char c = evt.getKeyChar();
        if (!Character.isLetter(c)) { //sólo se aceptan letras, Enter, Del, Backspace y espacio
            switch(c) {
                case KeyEvent.VK_ENTER: 
                    this.btnGuardarClic(null); //no importa el evento en este caso
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
    
    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtCX
     * @param evt evento
     */    
    @Override
    public void txtCXPresionarTecla(KeyEvent evt) {
        this.txtDocumentoPresionarTecla(evt);
    }    
}

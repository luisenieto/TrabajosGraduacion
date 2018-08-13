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
        if (this.alumno == null) //nuevo alumno
            this.nuevoAlumno();
        else //modificar alumno
            this.modificarAlumno();
    }
    
    /**
     * Se encarga de la creación de un alumno
     */
    private void nuevoAlumno() {
        String apellidos = this.ventana.verTxtApellidos().getText().trim();
        String nombres = this.ventana.verTxtNombres().getText().trim();
        int documento = Integer.parseInt(this.ventana.verTxtDocumento().getText().trim());
        String cx = this.ventana.verTxtCX().getText().trim();
        IGestorPersonas gp = GestorPersonas.instanciar();
        String resultado = gp.nuevoAlumno(apellidos, nombres, documento, cx);
        if (!resultado.equals(IGestorPersonas.EXITO_ALUMNOS))
            JOptionPane.showMessageDialog(null, resultado, IControladorPersonas.TITULO, JOptionPane.ERROR_MESSAGE);
        else
            this.ventana.dispose();                                    
    }
    
    /**
     * Se encarga de la modificación del alumno
     */    
    private void modificarAlumno() {
        String apellidos = this.ventana.verTxtApellidos().getText().trim();
        String nombres = this.ventana.verTxtNombres().getText().trim();
        String cx = this.ventana.verTxtCX().getText().trim();
        IGestorPersonas gp = GestorPersonas.instanciar();
        String resultado = gp.modificarAlumno(this.alumno, apellidos, nombres, cx);
        if (!resultado.equals(IGestorPersonas.EXITO_ALUMNOS))
            JOptionPane.showMessageDialog(null, resultado, IControladorPersonas.TITULO, JOptionPane.ERROR_MESSAGE);
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
     * Acción a ejecutar cuando se presiona una tecla en el campo txtDocumento
     * @param evt evento
     */    
    @Override
    public void txtDocumentoPresionarTecla(KeyEvent evt) {
        if (evt.getKeyCode() == KeyEvent.VK_ENTER) {
            if (this.alumno == null) //nuevo alumno
                this.nuevoAlumno();
            else //modificar alumno
                this.modificarAlumno();
        }
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtNombres
     * @param evt evento
     */    
    @Override
    public void txtNombresPresionarTecla(KeyEvent evt) {
        this.txtDocumentoPresionarTecla(evt);
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtApellidos
     * @param evt evento
     */    
    @Override
    public void txtApellidosPresionarTecla(KeyEvent evt) {
        this.txtDocumentoPresionarTecla(evt);
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

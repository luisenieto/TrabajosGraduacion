/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.controladores;

import gui.interfaces.IControladorAMProfesor;
import gui.interfaces.IControladorPersonas;
import gui.interfaces.IGestorPersonas;
import gui.personas.modelos.Cargo;
import gui.personas.modelos.GestorPersonas;
import gui.personas.modelos.ModeloComboCargos;
import gui.personas.modelos.Profesor;
import gui.personas.vistas.VentanaAMProfesor;
import java.awt.Dialog;
import javax.swing.JOptionPane;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;

public class ControladorAMProfesor implements IControladorAMProfesor {    
    private VentanaAMProfesor ventana;
    private Profesor profesor;

    /**
     * Constructor
     * @param ventanaPadre (VentanaPersonas en este caso)
     * @param titulo título de la ventana
     */
    public ControladorAMProfesor(Dialog ventanaPadre, String titulo) {
        this(ventanaPadre, titulo, null);
    }
    
    /**
     * Constructor
     * @param ventanaPadre (VentanaPersonas en este caso)
     * @param titulo título de la ventana
     * @param profesor profesor a modificar
     */    
    public ControladorAMProfesor(Dialog ventanaPadre, String titulo, Profesor profesor) {
        this.profesor = profesor;
        this.ventana = new VentanaAMProfesor(this, ventanaPadre);
        this.ventana.setTitle(titulo);
        this.ventana.setLocationRelativeTo(null);
        this.ventana.verComboCargo().setModel(new ModeloComboCargos());
        if (profesor != null) { //modificación de profesor
            this.ventana.verTxtApellidos().setText(profesor.verApellidos());            
            this.ventana.verTxtNombres().setText(profesor.verNombres());
            this.ventana.verTxtDocumento().setText(Integer.toString(profesor.verDni()));            
            this.ventana.verTxtDocumento().setEditable(false);
            this.ventana.verTxtApellidos().requestFocus();
            Cargo cargo = profesor.verCargo();
            ((ModeloComboCargos)this.ventana.verComboCargo().getModel()).seleccionarCargo(cargo);
        }
        else
            ((ModeloComboCargos)this.ventana.verComboCargo().getModel()).seleccionarCargo(null);
        this.ventana.setVisible(true);
    }    
            
    /**
     * Acción a ejecutar cuando se selecciona el botón Guardar
     * @param evt evento
     */                        
    @Override
    public void btnGuardarClic(ActionEvent evt) {
        if (this.profesor == null) //nuevo profesor
            this.nuevoProfesor();
        else //modificar profesor
            this.modificarProfesor();
    }
    
    /**
     * Se encarga de la creación de un profesor
     */
    private void nuevoProfesor() {
        String apellidos = this.ventana.verTxtApellidos().getText().trim();
        String nombres = this.ventana.verTxtNombres().getText().trim();
        int documento = 0;
        if (!this.ventana.verTxtDocumento().getText().trim().isEmpty())
            documento = Integer.parseInt(this.ventana.verTxtDocumento().getText().trim());
        Cargo cargo = ((ModeloComboCargos)this.ventana.verComboCargo().getModel()).obtenerCargo();
        IGestorPersonas gp = GestorPersonas.instanciar();
        String resultado = gp.nuevoProfesor(apellidos, nombres, documento, cargo);
        if (!resultado.equals(IGestorPersonas.EXITO_PROFESORES)) {
            gp.cancelarProfesor();
            JOptionPane.showMessageDialog(null, resultado, IControladorPersonas.TITULO, JOptionPane.ERROR_MESSAGE);
        }    
        else
            this.ventana.dispose();                                    
    }
    
    /**
     * Se encarga de la modificación del profesor
     */    
    private void modificarProfesor() {
        String apellidos = this.ventana.verTxtApellidos().getText().trim();
        String nombres = this.ventana.verTxtNombres().getText().trim();
        Cargo cargo = ((ModeloComboCargos)this.ventana.verComboCargo().getModel()).obtenerCargo();
        IGestorPersonas gp = GestorPersonas.instanciar();
        String resultado = gp.modificarProfesor(this.profesor, apellidos, nombres, cargo);
        if (!resultado.equals(IGestorPersonas.EXITO_PROFESORES)) {
            gp.cancelarProfesor();
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
        gp.cancelarProfesor();
        this.ventana.dispose();
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtDocumento
     * @param evt evento
     */    
    @Override
    public void txtDocumentoPresionarTecla(KeyEvent evt) { 
        char c = evt.getKeyChar();
        if (!Character.isDigit(c)) { //sólo se aceptan los dígitos del 0-9
            if(c == KeyEvent.VK_ENTER) {
                if (this.profesor == null) //nuevo profesor
                    this.nuevoProfesor();
                else //modificar profesor
                    this.modificarProfesor();
            }
            else if ((c != KeyEvent.VK_BACK_SPACE) || (c != KeyEvent.VK_DELETE))
                evt.consume();
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
     * @param evt evento
     */    
    @Override
    public void txtApellidosPresionarTecla(KeyEvent evt) {
        char c = evt.getKeyChar();
        if (!Character.isLetter(c)) { //sólo se aceptan letras
            if(c == KeyEvent.VK_ENTER) {
                if (this.profesor == null) //nuevo profesor
                    this.nuevoProfesor();
                else //modificar profesor
                    this.modificarProfesor();
            }
            else if ((c != KeyEvent.VK_BACK_SPACE) || (c != KeyEvent.VK_DELETE))
                evt.consume();
        }
    }
}

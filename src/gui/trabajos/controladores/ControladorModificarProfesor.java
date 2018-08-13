/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.controladores;

import com.toedter.calendar.JDateChooser;
import gui.interfaces.IControladorModificarProfesor;
import gui.interfaces.IGestorTrabajos;
import gui.personas.modelos.ModeloComboProfesores;
import gui.personas.modelos.Profesor;
import gui.trabajos.modelos.GestorTrabajos;
import gui.trabajos.modelos.RolEnTrabajo;
import gui.trabajos.modelos.Trabajo;
import gui.trabajos.vistas.VentanaModificarProfesor;
import java.awt.Dialog;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import javax.swing.JOptionPane;

public class ControladorModificarProfesor implements IControladorModificarProfesor {
    private VentanaModificarProfesor ventana;
    private Trabajo trabajo;
    private RolEnTrabajo rolEnTrabajo;
    
    /**
     * Constructor
     * @param ventanaPadre (VentanaTrabajos en este caso)
     * @param trabajo trabajo que se modificará
     * @param rolEnTrabajo profesor (y su rol) a modificar en el trabajo
     */    
    public ControladorModificarProfesor(Dialog ventanaPadre, Trabajo trabajo, RolEnTrabajo rolEnTrabajo) {
        this.trabajo = trabajo;
        this.rolEnTrabajo = rolEnTrabajo;
        this.ventana = new VentanaModificarProfesor(this, ventanaPadre);
        this.ventana.setLocationRelativeTo(null);
        this.ventana.verTxtProfesor().setText(rolEnTrabajo.verProfesor().toString());
        this.ventana.verTxtProfesor().setEditable(false);
        
        this.ventana.verTxtRol().setText(rolEnTrabajo.verRol().toString());
        this.ventana.verTxtRol().setEditable(false);
        
        String patron = "dd/MM/yyyy";        
        this.ventana.verTxtDesde().setText(rolEnTrabajo.verFechaDesde().format(DateTimeFormatter.ofPattern(patron)));
        this.ventana.verTxtDesde().setEditable(false);
        
        this.ventana.verComboProfesor().setModel(new ModeloComboProfesores());
        this.ventana.verComboProfesor().setSelectedIndex(-1);
        
        this.ventana.setVisible(true);
    }
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Guardar
     * @param evt evento
     */                        
    @Override
    public void btnAceptarClic(ActionEvent evt) {
        LocalDate fechaHasta = this.obtenerFechaDeJDateChooser(this.ventana.verFechaHasta());
        String razon = this.ventana.verTxtRazon().getText().trim();
        Profesor nuevoProfesor = ((ModeloComboProfesores)this.ventana.verComboProfesor().getModel()).obtenerProfesor();
        IGestorTrabajos gt = GestorTrabajos.instanciar();
        String resultado = gt.reemplazarProfesor(this.trabajo, this.rolEnTrabajo.verProfesor(), fechaHasta, razon, nuevoProfesor);
        if (!resultado.equals(IGestorTrabajos.EXITO))
            JOptionPane.showMessageDialog(null, resultado, TRABAJO_MODIFICAR, JOptionPane.ERROR_MESSAGE);
        else
            this.ventana.dispose();
    }
    
    /**
     * Obtiene la fecha de un campo JDateChooser
     * Si no hay seleccionada una fecha devuelve null
     * @param dateChooser campo JDateChooser
     * @return LocalDate  - fecha de un campo JDateChooser
     */
    private LocalDate obtenerFechaDeJDateChooser(JDateChooser dateChooser) {
        Date date;
        if (dateChooser.getCalendar() != null) {
            date = dateChooser.getCalendar().getTime();
            return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        }
        else
            return null;
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
     * Acción a ejecutar cuando se presiona una tecla en el campo txtRazon
     * @param evt evento
     */
    @Override
    public void txtRazonPresionarTecla(KeyEvent evt) {
        
    }
    
    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo fechaHasta
     * @param evt evento
     */
    @Override
    public void fechaHastaPresionarTecla(KeyEvent evt) {
        
    }                
}

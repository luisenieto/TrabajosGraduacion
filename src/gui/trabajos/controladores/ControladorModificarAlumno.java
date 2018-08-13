/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.controladores;

import com.toedter.calendar.JDateChooser;
import gui.interfaces.IControladorModificarAlumno;
import gui.interfaces.IGestorTrabajos;
import gui.trabajos.modelos.AlumnoEnTrabajo;
import gui.trabajos.modelos.GestorTrabajos;
import gui.trabajos.modelos.Trabajo;
import gui.trabajos.vistas.VentanaModificarAlumno;
import java.awt.Dialog;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import javax.swing.JOptionPane;

public class ControladorModificarAlumno implements IControladorModificarAlumno {
    private VentanaModificarAlumno ventana;
    private Trabajo trabajo;
    private AlumnoEnTrabajo alumnoEnTrabajo;
    
    /**
     * Constructor
     * @param ventanaPadre (VentanaTrabajos en este caso)
     * @param trabajo trabajo que se modificará
     * @param alumnoEnTrabajo alumno a modificar en el trabajo
     */    
    public ControladorModificarAlumno(Dialog ventanaPadre, Trabajo trabajo, AlumnoEnTrabajo alumnoEnTrabajo) {
        this.trabajo = trabajo;
        this.alumnoEnTrabajo = alumnoEnTrabajo;
        this.ventana = new VentanaModificarAlumno(this, ventanaPadre);
        this.ventana.setLocationRelativeTo(null);
        
        this.ventana.verTxtAlumno().setText(alumnoEnTrabajo.verAlumno().toString());
        this.ventana.verTxtAlumno().setEditable(false);
        
        String patron = "dd/MM/yyyy";        
        this.ventana.verTxtDesde().setText(alumnoEnTrabajo.verFechaDesde().format(DateTimeFormatter.ofPattern(patron)));
        this.ventana.verTxtDesde().setEditable(false);
        
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
        
        IGestorTrabajos gt = GestorTrabajos.instanciar();
        String resultado = gt.finalizarAlumno(this.trabajo, this.alumnoEnTrabajo.verAlumno(), fechaHasta, razon);
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

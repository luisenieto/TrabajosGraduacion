/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.controladores;

import com.toedter.calendar.JDateChooser;
import gui.interfaces.IControladorAMSeminario;
import gui.interfaces.IControladorSeminarios;
import gui.interfaces.IGestorTrabajos;
import gui.seminarios.modelos.ModeloComboNotaAprobacion;
import gui.seminarios.modelos.NotaAprobacion;
import gui.seminarios.modelos.Seminario;
import gui.seminarios.vistas.VentanaAMSeminario;
import gui.trabajos.modelos.GestorTrabajos;
import gui.trabajos.modelos.Trabajo;
import java.awt.Dialog;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.GregorianCalendar;
import javax.swing.JOptionPane;

public class ControladorAMSeminario implements IControladorAMSeminario {
    private VentanaAMSeminario ventana;
    private Trabajo trabajo;
    private Seminario seminario;
    private IGestorTrabajos gt = GestorTrabajos.instanciar();
    
    /**
     * Constructor
     * @param ventanaPadre (VentanaSeminarios en este caso)
     * @param titulo título de la ventana
     * @param trabajo trabajo al cual se crea un seminario
     */
    public ControladorAMSeminario(Dialog ventanaPadre, String titulo, Trabajo trabajo) {
        this(ventanaPadre, titulo, trabajo, null);
    }    
    
    /**
     * Constructor
     * @param ventanaPadre (VentanaSeminarios en este caso)
     * @param titulo título de la ventana
     * @param trabajo trabajo al cual se crea o modifica un seminario
     * @param seminario seminario a modificar
     */    
    public ControladorAMSeminario(Dialog ventanaPadre, String titulo, Trabajo trabajo, Seminario seminario) {
        this.trabajo = trabajo;
        this.seminario = seminario;
        this.ventana = new VentanaAMSeminario(this, ventanaPadre);
        this.ventana.setTitle(titulo);
        this.ventana.setLocationRelativeTo(null);
        this.ventana.verComboNotaAprobacion().setModel(new ModeloComboNotaAprobacion());
        
        if (this.seminario == null) { //nuevo seminario
            LocalDate fActual = LocalDate.now();
            GregorianCalendar fechaActual = GregorianCalendar.from(fActual.atStartOfDay(ZoneId.systemDefault()));
            this.ventana.verFechaExposicion().setCalendar(fechaActual); 
        }
        else { //modificación de seminario
            GregorianCalendar fExposicion = GregorianCalendar.from(this.seminario.verFechaExposicion().atStartOfDay(ZoneId.systemDefault()));
            this.ventana.verFechaExposicion().setCalendar(fExposicion);
            this.ventana.verFechaExposicion().setEnabled(false);
            ((ModeloComboNotaAprobacion)this.ventana.verComboNotaAprobacion().getModel()).seleccionarNotaAprobacion(this.seminario.verNotaAprobacion());
            this.ventana.verAreaObservaciones().setText(this.seminario.verObservaciones());
        }
        this.ventana.setVisible(true);
    }        

    /**
     * Acción a ejecutar cuando se selecciona el botón Guardar
     * @param evt evento
     */                            
    @Override
    public void btnGuardarClic(ActionEvent evt) {
        if (this.seminario == null) //nuevo seminario
            this.nuevoSeminario();
        else //modificar seminario
            this.modificarSeminario();
    }
    
    /**
     * Se encarga de la creación de un seminario
     */
    private void nuevoSeminario() {
        LocalDate fechaExposicion = this.obtenerFechaDeJDateChooser(this.ventana.verFechaExposicion());
        NotaAprobacion notaAprobacion = ((ModeloComboNotaAprobacion)this.ventana.verComboNotaAprobacion().getModel()).obtenerNotaAprobacion();
        String observaciones = this.ventana.verAreaObservaciones().getText().trim();        
        String resultado = this.gt.nuevoSeminario(this.trabajo, fechaExposicion, notaAprobacion, observaciones);
        if (!resultado.equals(IGestorTrabajos.EXITO))
            JOptionPane.showMessageDialog(null, resultado, IControladorSeminarios.TITULO, JOptionPane.ERROR_MESSAGE);
        else
            this.ventana.dispose();                                    
    }   
    
    /**
     * Se encarga de la modificación del seminario
     */    
    private void modificarSeminario() {
        NotaAprobacion notaAprobacion = ((ModeloComboNotaAprobacion)this.ventana.verComboNotaAprobacion().getModel()).obtenerNotaAprobacion();
        String observaciones = this.ventana.verAreaObservaciones().getText().trim();        
        String resultado = this.gt.modificarSeminario(this.trabajo, this.seminario, notaAprobacion, observaciones);
        if (!resultado.equals(IGestorTrabajos.EXITO))
            JOptionPane.showMessageDialog(null, resultado, IControladorSeminarios.TITULO, JOptionPane.ERROR_MESSAGE);
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
        this.gt.cancelar();
        this.ventana.dispose();
    }

    /**
     * Acción a ejecutar cuando se presiona una tecla en el área areaObservaciones
     * @param evt evento
     */
    @Override
    public void areaObservacionesPresionarTecla(KeyEvent evt) {
        if (evt.getKeyCode() == KeyEvent.VK_ENTER) {
            if (this.seminario == null) //nuevo seminario
                this.nuevoSeminario();
            else //modificar seminario
                this.modificarSeminario();
        }
    }            
}

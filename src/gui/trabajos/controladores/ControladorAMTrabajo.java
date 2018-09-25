/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.controladores;

import com.toedter.calendar.JDateChooser;
import gui.areas.modelos.Area;
import gui.areas.modelos.GestorAreas;
import gui.interfaces.IControladorAMTrabajo;
import gui.areas.modelos.ModeloComboAreas;
import gui.areas.modelos.ModeloListaAreas;
import gui.interfaces.IControladorTrabajos;
import gui.interfaces.IGestorAreas;
import gui.interfaces.IGestorPersonas;
import gui.interfaces.IGestorTrabajos;
import gui.personas.modelos.Alumno;
import gui.personas.modelos.GestorPersonas;
import gui.personas.modelos.ModeloComboProfesores;
import gui.personas.modelos.ModeloListaAlumnos;
import gui.personas.modelos.Profesor;
import gui.trabajos.modelos.AlumnoEnTrabajo;
import gui.trabajos.modelos.GestorTrabajos;
import gui.trabajos.modelos.Rol;
import gui.trabajos.modelos.RolEnTrabajo;
import gui.trabajos.modelos.Trabajo;
import gui.trabajos.vistas.VentanaAMTrabajo;
import java.awt.Dialog;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import javax.swing.JOptionPane;

public class ControladorAMTrabajo implements IControladorAMTrabajo {    
    private VentanaAMTrabajo ventana;
    private Trabajo trabajo;
    private IGestorTrabajos gt = GestorTrabajos.instanciar();

    /**
     * Constructor
     * @param ventanaPadre (VentanaTrabajos en este caso)
     * @param titulo título de la ventana
     */
    public ControladorAMTrabajo(Dialog ventanaPadre, String titulo) {
        this(ventanaPadre, titulo, null);
    }
    
    /**
     * Constructor
     * @param ventanaPadre (VentanaTrabajos en este caso)
     * @param titulo título de la ventana
     * @param trabajo trabajo a modificar
     */    
    public ControladorAMTrabajo(Dialog ventanaPadre, String titulo, Trabajo trabajo) {
        this.trabajo = trabajo;
        this.ventana = new VentanaAMTrabajo(this, ventanaPadre);
        this.ventana.setTitle(titulo);
        this.ventana.setLocationRelativeTo(null);
        
        this.configurarTituloYDuracion();
        this.configurarArea();
        this.configurarFechas();
        this.configurarTutorYCotutor();
        this.configurarJurado();
        this.configurarAlumnos();

        this.ventana.setVisible(true);
    }    

    /**
     * Configura todo lo relacionado al título y duración del trabajo
     */
    private void configurarTituloYDuracion() {
        if (this.trabajo != null) { //modificación de trabajo
            this.ventana.verTxtTitulo().setText(this.trabajo.verTitulo());            
            this.ventana.verTxtDuracion().setText(Integer.toString(this.trabajo.verDuracion()));
            this.ventana.verTxtTitulo().setEditable(false);
            this.ventana.verTxtDuracion().setEditable(false);
        }
        else
            this.ventana.verTxtTitulo().requestFocus();                        
    }
        
    /**
     * Configura todo lo relacionado a las áreas del trabajo
     */
    private void configurarArea() {
        this.ventana.verListaAreas().setModel(new ModeloListaAreas());
        if (this.trabajo != null) { //modificación de trabajo
            List<Area> areas = this.trabajo.verAreas();
            int i = 0;
            int ordenAreas[] = new int[areas.size()];
            IGestorAreas ga = GestorAreas.instanciar();
            for(Area area : areas) 
                ordenAreas[i++] = ga.ordenArea(area);
            
            this.ventana.verListaAreas().setSelectedIndices(ordenAreas);            
            this.ventana.verListaAreas().setEnabled(false);
            
        }
        
//        this.ventana.verComboArea().setModel(new ModeloComboAreas());
//        
//        if (this.trabajo != null) { //modificación de trabajo
//            ((ModeloComboAreas)this.ventana.verComboArea().getModel()).seleccionarArea(this.trabajo.verArea());        
//            this.ventana.verComboArea().setEnabled(false);
//        }
//        else
//            ((ModeloComboAreas)this.ventana.verComboArea().getModel()).seleccionarArea(null);
    }    
    
    /**
     * Configura todo lo relacionado a las fechas del trabajo
     */
    private void configurarFechas() {                
        if (this.trabajo != null) { //modificación de trabajo
            GregorianCalendar fPresentacion = GregorianCalendar.from(this.trabajo.verFechaPresentacion().atStartOfDay(ZoneId.systemDefault()));
            this.ventana.verFechaPresentacion().setCalendar(fPresentacion);            
            this.ventana.verFechaPresentacion().setEnabled(false);
            
            GregorianCalendar fAprobacion = GregorianCalendar.from(this.trabajo.verFechaAprobacion().atStartOfDay(ZoneId.systemDefault()));
            this.ventana.verFechaAprobacion().setCalendar(fAprobacion);            
            this.ventana.verFechaAprobacion().setEnabled(false);
            
            if (this.trabajo.verFechaFinalizacion() != null) {
                GregorianCalendar fExposicion = GregorianCalendar.from(this.trabajo.verFechaFinalizacion().atStartOfDay(ZoneId.systemDefault()));
                this.ventana.verFechaExposicion().setCalendar(fExposicion);                
            }                                    
        }            
        else { //nuevo trabajo
            LocalDate fActual = LocalDate.now();
            GregorianCalendar fechaActual = GregorianCalendar.from(fActual.atStartOfDay(ZoneId.systemDefault()));
            this.ventana.verFechaAprobacion().setCalendar(fechaActual);                        
            this.ventana.verFechaExposicion().setEnabled(false);                                    
        }
    }            
    
    /**
     * Configura todo lo relacionado al tutor y cotutor del trabajo
     */
    private void configurarTutorYCotutor() {
        this.ventana.verComboTutor().setModel(new ModeloComboProfesores());
        this.ventana.verComboCoTutor().setModel(new ModeloComboProfesores());        
        
        if (this.trabajo != null) { //modificación de trabajo
            ((ModeloComboProfesores)this.ventana.verComboTutor().getModel()).seleccionarProfesor(trabajo.verTutorOCotutor(Rol.TUTOR));
            this.ventana.verComboTutor().setEnabled(false);
            
            ((ModeloComboProfesores)this.ventana.verComboCoTutor().getModel()).seleccionarProfesor(trabajo.verTutorOCotutor(Rol.COTUTOR));
            this.ventana.verComboCoTutor().setEnabled(false);
        }
        else {
            ((ModeloComboProfesores)this.ventana.verComboTutor().getModel()).seleccionarProfesor(null);
            ((ModeloComboProfesores)this.ventana.verComboCoTutor().getModel()).seleccionarProfesor(null);
        }
    }            
    
    /**
     * Configura todo lo relacionado al jurado del trabajo
     */    
    private void configurarJurado() {
        this.ventana.verListaJurado().setModel(new ModeloComboProfesores());        
        if (this.trabajo != null) { //modificación de trabajo
            List<Profesor> jurado = this.trabajo.verJurado();
            int i = 0;
            int ordenJurado[] = new int[jurado.size()];
            IGestorPersonas gp = GestorPersonas.instanciar();
            for(Profesor profesor : jurado) 
                ordenJurado[i++] = gp.ordenProfesor(profesor);
            
            this.ventana.verListaJurado().setSelectedIndices(ordenJurado);            
            this.ventana.verListaJurado().setEnabled(false);
        }
    }
    
    /**
     * Configura todo lo relacionado a los alumnos que participan en el trabajo
     */    
    private void configurarAlumnos() {
        this.ventana.verListaAlumnos().setModel(new ModeloListaAlumnos());        
        if (this.trabajo != null) { //modificación de trabajo
            List<AlumnoEnTrabajo> aet = this.trabajo.verAlumnos();
            List<Alumno> alumnos = new ArrayList<>();
            for(AlumnoEnTrabajo alumnoEnTrabajo : aet) {
                if (alumnoEnTrabajo.verFechaHasta() == null)
                    alumnos.add(alumnoEnTrabajo.verAlumno());
            }
            int i = 0;
            int ordenAlumnos[] = new int[alumnos.size()];
            IGestorPersonas gp = GestorPersonas.instanciar();
            for(Alumno alumno : alumnos)
                ordenAlumnos[i++] = gp.ordenAlumno(alumno);
            
            this.ventana.verListaAlumnos().setSelectedIndices(ordenAlumnos);            
            this.ventana.verListaAlumnos().setEnabled(false);
        }        
    }    
                
    /**
     * Acción a ejecutar cuando se selecciona el botón Guardar
     * @param evt evento
     */                        
    @Override
    public void btnGuardarClic(ActionEvent evt) {
        if (this.trabajo == null) //nuevo trabajo
            this.nuevoTrabajo();
        else //modificar trabajo
            this.modificarTrabajo();
    }
    
    /**
     * Se encarga de la creación de un trabajo
     */
    private void nuevoTrabajo() {
        String titulo = this.ventana.verTxtTitulo().getText().trim();
        int duracion;
        if (!this.ventana.verTxtDuracion().getText().trim().isEmpty())
            duracion = Integer.parseInt(this.ventana.verTxtDuracion().getText().trim());
        else
            duracion = 0;
        
        List<Area> areas = this.ventana.verListaAreas().getSelectedValuesList();
        //areas es la lista de áreas seleccionadas
        
        LocalDate fechaPresentacion = this.obtenerFechaDeJDateChooser(this.ventana.verFechaPresentacion());
        LocalDate fechaAprobacion = this.obtenerFechaDeJDateChooser(this.ventana.verFechaAprobacion());
        Profesor tutor = ((ModeloComboProfesores)this.ventana.verComboTutor().getModel()).obtenerProfesor();
        Profesor cotutor = ((ModeloComboProfesores)this.ventana.verComboCoTutor().getModel()).obtenerProfesor();        
        List<Profesor> profesores = this.ventana.verListaJurado().getSelectedValuesList();
        //profesores es la lista de profesores seleccionados como jurado
        List<Alumno> alumnos = this.ventana.verListaAlumnos().getSelectedValuesList();
        //alumnos es la lista de alumnos que participan en el trabajo
        
        List<AlumnoEnTrabajo> aet = new ArrayList<>();
        for(Alumno alumno : alumnos) 
            aet.add(new AlumnoEnTrabajo(alumno, fechaAprobacion));
                
        List<RolEnTrabajo> profesoresEnElTrabajo = this.armarListaJurado(profesores, fechaAprobacion);
        if (tutor != null) {
            RolEnTrabajo tutorEnTrabajo = new RolEnTrabajo(tutor, Rol.TUTOR, fechaAprobacion);
            profesoresEnElTrabajo.add(tutorEnTrabajo);
        }              
        if (cotutor != null) {
            RolEnTrabajo cotutorEnTrabajo = new RolEnTrabajo(cotutor, Rol.COTUTOR, fechaAprobacion);
            profesoresEnElTrabajo.add(cotutorEnTrabajo);
        }
                      
        String resultado = this.gt.nuevoTrabajo(titulo, duracion, fechaPresentacion, fechaAprobacion, areas, profesoresEnElTrabajo, aet);
        if (!resultado.equals(IGestorTrabajos.EXITO))
            JOptionPane.showMessageDialog(null, resultado, IControladorTrabajos.TITULO, JOptionPane.ERROR_MESSAGE);
        else
            this.ventana.dispose();                                    
    }

    /**
     * Arma la lista de jurado según los profesores especificados
     * @param profesores profesores seleccionados como jurado
     * @param fechaDesde fecha a partir de la cual los profesores comienzan su tarea como jurado (es la fecha en la cual se aprueba el trabajo)
     * @return List<RolEnTrabajo>  - lista de jurado según los profesores especificados
     */
    private List<RolEnTrabajo> armarListaJurado(List<Profesor> profesores, LocalDate fechaDesde) {
        List<RolEnTrabajo> jurado = new ArrayList<>();
        for(Profesor profesor : profesores) {
            RolEnTrabajo ret = new RolEnTrabajo(profesor, Rol.JURADO, fechaDesde);
            jurado.add(ret);
        }
        return jurado;
    }
    
    /**
     * Arma la lista de alumnos según los alumnos especificados
     * @param alumnos alumnos seleccionados
     * @param fechaDesde fecha a partir de la cual los alumnos empiezan a participar en el trabajo (es la fecha en la cual se aprueba el trabajo)
     * @return List<AlumnoEnTrabajo>  - lista de alumnos según los alumnos especificados
     */
    private List<AlumnoEnTrabajo> armarListaAlumnos(List<Alumno> alumnos, LocalDate fechaDesde) {
        List<AlumnoEnTrabajo> listaAlumnos = new ArrayList<>();
        for(Alumno alumno : alumnos) {
            AlumnoEnTrabajo aet = new AlumnoEnTrabajo(alumno, fechaDesde);
            listaAlumnos.add(aet);
        }
        return listaAlumnos;
    }
    
    /**
     * Se encarga de la modificación del trabajo
     */    
    private void modificarTrabajo() {
        LocalDate fechaExposicion = this.obtenerFechaDeJDateChooser(this.ventana.verFechaExposicion());
                
        String resultado = this.gt.modificarTrabajo(this.trabajo, fechaExposicion);
        if (!resultado.equals(IGestorTrabajos.EXITO))
            JOptionPane.showMessageDialog(null, resultado, IControladorTrabajos.TITULO, JOptionPane.ERROR_MESSAGE);
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
    
    private void obtenerJurado() {
        
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
     * Acción a ejecutar cuando se presiona una tecla en el campo txtDuracion
     * @param evt evento
     */
    @Override
    public void txtDuracionPresionarTecla(KeyEvent evt) {
        char c = evt.getKeyChar();
        if (!Character.isDigit(c)) //sólo se aceptan los dígitos del 0-9
            evt.consume();
    }
}

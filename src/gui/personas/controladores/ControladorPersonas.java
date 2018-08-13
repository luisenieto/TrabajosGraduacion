/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.controladores;

import gui.interfaces.IControladorAMAlumno;
import gui.interfaces.IControladorAMProfesor;
import gui.interfaces.IControladorPersonas;
import gui.interfaces.IGestorPersonas;
import gui.personas.modelos.Alumno;
import gui.personas.modelos.GestorPersonas;
import gui.personas.modelos.ModeloTablaAlumnos;
import gui.personas.modelos.ModeloTablaProfesores;
import gui.personas.modelos.Profesor;
import gui.personas.vistas.VentanaPersonas;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.awt.event.WindowEvent;
import javax.swing.JOptionPane;
import javax.swing.JTable;

public class ControladorPersonas implements IControladorPersonas {
    private VentanaPersonas ventana;
    
    /**
     * Constructor
     * Muestra la ventana de personas de forma modal
     * @param ventanaPadre ventana padre (VentanaPrincipal en este caso)
     */
    public ControladorPersonas(Frame ventanaPadre) {
        this.ventana = new VentanaPersonas(this, ventanaPadre);
        this.ventana.setLocationRelativeTo(null);        
        this.ventana.setVisible(true);
    }        

    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Profesor
     * @param evt evento
     */                            
    @Override
    public void btnNuevoProfesorClic(ActionEvent evt) {
        IControladorAMProfesor controlador = new ControladorAMProfesor(this.ventana, PROFESOR_NUEVO);
    }
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Alumno
     * @param evt evento
     */                            
    @Override
    public void btnNuevoAlumnoClic(ActionEvent evt) {
        IControladorAMAlumno controlador = new ControladorAMAlumno(this.ventana, ALUMNO_NUEVO);
    }    

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Profesor
     * @param evt evento
     */                            
    @Override
    public void btnModificarProfesorClic(ActionEvent evt) {
        Profesor profesor = this.obtenerProfesorSeleccionado();
        if (profesor != null) { //hay seleccionado un profesor
            IControladorAMProfesor controlador = new ControladorAMProfesor(this.ventana, PROFESOR_MODIFICAR, profesor);
        }        
    }
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Alumno
     * @param evt evento
     */                            
    @Override
    public void btnModificarAlumnoClic(ActionEvent evt) {
        Alumno alumno = this.obtenerAlumnoSeleccionado();
        if (alumno != null) { //hay seleccionado un alumno
            IControladorAMAlumno controlador = new ControladorAMAlumno(this.ventana, ALUMNO_MODIFICAR, alumno);
        }        
    }    
    
    /**
     * Obtiene el profesor en la tabla
     * Si no hay un profesor seleccionado, devuelve null
     * @return Profesor  - profesor seleccionado
     */
    private Profesor obtenerProfesorSeleccionado() {
        JTable tablaProfesores = this.ventana.verTablaProfesores();
        if (tablaProfesores.getSelectedRow() != -1) { //hay un profesor seleccionado
            ModeloTablaProfesores mtp = (ModeloTablaProfesores)tablaProfesores.getModel();
            return mtp.obtenerProfesor(tablaProfesores.getSelectedRow());
        }
        else
            return null;
    }    
    
    /**
     * Obtiene el alumno en la tabla
     * Si no hay un alumno seleccionado, devuelve null
     * @return Alumno  - alumno seleccionado
     */
    private Alumno obtenerAlumnoSeleccionado() {
        JTable tablaAlumnos = this.ventana.verTablaAlumnos();
        if (tablaAlumnos.getSelectedRow() != -1) { //hay un alumno seleccionado
            ModeloTablaAlumnos mta = (ModeloTablaAlumnos)tablaAlumnos.getModel();
            return mta.obtenerAlumno(tablaAlumnos.getSelectedRow());
        }
        else
            return null;
    }        

    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar Profesor
     * @param evt evento
     */                            
    @Override
    public void btnBorrarProfesorClic(ActionEvent evt) {
        Profesor profesor = this.obtenerProfesorSeleccionado();
        if (profesor != null) { //hay seleccionado un profesor
            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION_PROFESOR, TITULO, JOptionPane.YES_NO_OPTION);
            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el profesor
                IGestorPersonas gp = GestorPersonas.instanciar();
                String resultado = gp.borrarProfesor(profesor);
                if (resultado.equals(IGestorPersonas.EXITO_PROFESORES)) { //se pudo borrar el profesor
                    JTable tablaProfesores = this.ventana.verTablaProfesores();
                    tablaProfesores.setModel(new ModeloTablaProfesores(""));
                }
                else
                    JOptionPane.showMessageDialog(null, resultado, TITULO, JOptionPane.ERROR_MESSAGE);
            }
        }        
    }
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar Alumno
     * @param evt evento
     */                            
    @Override
    public void btnBorrarAlumnoClic(ActionEvent evt) {
        Alumno alumno = this.obtenerAlumnoSeleccionado();
        if (alumno != null) { //hay seleccionado un alumno
            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION_ALUMNO, TITULO, JOptionPane.YES_NO_OPTION);
            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el alumno
                IGestorPersonas gp = GestorPersonas.instanciar();
                String resultado = gp.borrarAlumno(alumno);
                if (resultado.equals(IGestorPersonas.EXITO_ALUMNOS)) { //se pudo borrar el alumno
                    JTable tablaAlumnos = this.ventana.verTablaAlumnos();
                    tablaAlumnos.setModel(new ModeloTablaAlumnos(""));
                }
                else
                    JOptionPane.showMessageDialog(null, resultado, TITULO, JOptionPane.ERROR_MESSAGE);
            } 
        }        
    }    

    /**
     * Acción a ejecutar cuando se selecciona el botón Volver
     * @param evt evento
     */                        
    @Override
    public void btnVolverClic(ActionEvent evt) {
        this.ventana.dispose();
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Buscar Profesores
     * @param evt evento
     */                            
    @Override
    public void btnBuscarProfesorClic(ActionEvent evt) {
        this.buscarProfesores();
    }
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Buscar Alumnos
     * @param evt evento
     */                            
    @Override
    public void btnBuscarAlumnoClic(ActionEvent evt) {
        this.buscarAlumnos();
    }    
    
    /**
     * Muestra en la tabla los profesores cuyos apellidos coincidan con el especificado
     */
    private void buscarProfesores() {
        String apellidos;
        if (this.ventana.verTxtApellidosProfesor().getText().trim().isEmpty())
            apellidos = null;
        else
            apellidos = this.ventana.verTxtApellidosProfesor().getText().trim();
        ModeloTablaProfesores mtp = new ModeloTablaProfesores(apellidos);
        JTable tablaProfesores = this.ventana.verTablaProfesores();
        tablaProfesores.setModel(mtp);
        if (mtp.getRowCount() > 0)
            tablaProfesores.setRowSelectionInterval(0, 0);        
    }    
    
    /**
     * Muestra en la tabla los alumnos cuyos apellidos coincidan con el especificado
     */
    private void buscarAlumnos() {
        String apellidos;
        if (this.ventana.verTxtApellidosAlumno().getText().trim().isEmpty())
            apellidos = null;
        else
            apellidos = this.ventana.verTxtApellidosAlumno().getText().trim();
        ModeloTablaAlumnos mta = new ModeloTablaAlumnos(apellidos);
        JTable tablaAlumnos = this.ventana.verTablaAlumnos();
        tablaAlumnos.setModel(mta);
        if (mta.getRowCount() > 0)
            tablaAlumnos.setRowSelectionInterval(0, 0);        
    }        
    
    /**
     * Acción a ejecutar cuando la ventana obtenga el foco
     * @param evt evento
     */
    @Override
    public void ventanaGanaFoco(WindowEvent evt) {
        JTable tablaProfesores = this.ventana.verTablaProfesores();
        if (tablaProfesores.getSelectedRow() == -1) { 
            //si no hay seleccionada ninguna fila, 
            //y hay filas para seleccionar, se selecciona la primera
            ModeloTablaProfesores mtp = new ModeloTablaProfesores(null); //todos los profesores
            tablaProfesores.setModel(mtp); //todos los profesores           
            if (mtp.getRowCount() > 0)
                tablaProfesores.setRowSelectionInterval(0, 0); 
        }  
        else { //sí hay seleccionada una fila
            int fila = tablaProfesores.getSelectedRow();
            tablaProfesores.setModel(new ModeloTablaProfesores(null)); 
            //Se hace esto porque a lo mejor se modificó alguna
            tablaProfesores.setRowSelectionInterval(fila, fila);             
        }
        
        JTable tablaAlumnos = this.ventana.verTablaAlumnos();
        if (tablaAlumnos.getSelectedRow() == -1) { 
            //si no hay seleccionada ninguna fila, 
            //y hay filas para seleccionar, se selecciona la primera
            ModeloTablaAlumnos mta = new ModeloTablaAlumnos(null); //todos los alumnos
            tablaAlumnos.setModel(mta); //todos los alumnos           
            if (mta.getRowCount() > 0)
                tablaAlumnos.setRowSelectionInterval(0, 0); 
        }  
        else { //sí hay seleccionada una fila
            int fila = tablaAlumnos.getSelectedRow();
            tablaAlumnos.setModel(new ModeloTablaAlumnos(null)); 
            //Se hace esto porque a lo mejor se modificó alguna
            tablaAlumnos.setRowSelectionInterval(fila, fila);             
        }        
    }    

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtApellidosProfesor
     * @param evt evento
     */        
    @Override
    public void txtApellidosProfesorPresionarTecla(KeyEvent evt) {
        if (evt.getKeyCode() == KeyEvent.VK_ENTER)
            this.buscarProfesores();
    }
    
    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtApellidosAlumno
     * @param evt evento
     */    
    @Override
    public void txtApellidosAlumnoPresionarTecla(KeyEvent evt) {
        if (evt.getKeyCode() == KeyEvent.VK_ENTER)
            this.buscarAlumnos();
    }    
}

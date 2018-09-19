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
    private int profesorSeleccionado;
    //sirve para manejar la tabla tablaProfesores
    private int alumnoSeleccionado;
    //sirve para manejar la tabla tablaAlumnos
    private String operacionProfesor;
    //sirve para manejar la tabla tablaProfesores
    private String operacionAlumno;
    //sirve para manejar la tabla tablaAlumnos    
    
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
        JTable tablaProfesores = this.ventana.verTablaProfesores();
        this.profesorSeleccionado = tablaProfesores.getSelectedRow(); 
        this.operacionProfesor = OPERACION_ALTA_PROFESOR;
        IControladorAMProfesor controlador = new ControladorAMProfesor(this.ventana, PROFESOR_NUEVO);
    }
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Alumno
     * @param evt evento
     */                            
    @Override
    public void btnNuevoAlumnoClic(ActionEvent evt) {
        JTable tablaAlumnos = this.ventana.verTablaAlumnos();
        this.alumnoSeleccionado = tablaAlumnos.getSelectedRow(); 
        this.operacionAlumno = OPERACION_ALTA_ALUMNO;
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
            this.operacionProfesor = OPERACION_MODIFICACION_PROFESOR;
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
            this.operacionAlumno = OPERACION_MODIFICACION_ALUMNO;
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
            this.profesorSeleccionado = tablaProfesores.getSelectedRow();
            return mtp.obtenerProfesor(tablaProfesores.getSelectedRow());
        }
        else {
            this.profesorSeleccionado = -1;
            return null;
        }
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
            this.alumnoSeleccionado = tablaAlumnos.getSelectedRow();
            return mta.obtenerAlumno(tablaAlumnos.getSelectedRow());
        }
        else {
            this.alumnoSeleccionado = -1;
            return null;
        }
    }        

    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar Profesor
     * @param evt evento
     */                            
    @Override
    public void btnBorrarProfesorClic(ActionEvent evt) {
        Profesor profesor = this.obtenerProfesorSeleccionado();
        if (profesor != null) { //hay seleccionado un profesor
            this.operacionProfesor = OPERACION_BAJA_PROFESOR;
            IGestorPersonas gp = GestorPersonas.instanciar();
            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION_PROFESOR, TITULO, JOptionPane.YES_NO_OPTION);
            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el profesor
                String resultado = gp.borrarProfesor(profesor);
                if (!resultado.equals(IGestorPersonas.EXITO_PROFESORES)) { //no se pudo borrar el profesor
                    gp.cancelarProfesor();
                    JOptionPane.showMessageDialog(null, resultado, TITULO, JOptionPane.ERROR_MESSAGE);
                }
            }
            else
                gp.cancelarProfesor();
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
            this.operacionAlumno = OPERACION_BAJA_ALUMNO;
            IGestorPersonas gp = GestorPersonas.instanciar();
            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION_ALUMNO, TITULO, JOptionPane.YES_NO_OPTION);
            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el alumno                
                String resultado = gp.borrarAlumno(alumno);
                if (!resultado.equals(IGestorPersonas.EXITO_ALUMNOS)) { //no se pudo borrar el alumno
                    gp.cancelarAlumno();
                    JOptionPane.showMessageDialog(null, resultado, TITULO, JOptionPane.ERROR_MESSAGE);
                }
            } 
            else
                gp.cancelarAlumno();
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
        //La ventana gana el foco cuando:
        //  1. Se presiona el botón "Personas" en la ventana principal
	//  2. Se vuelve de la ventana de alta de profesores/alumnos
        //  3. Se vuelve de la ventana de modificación de profesores/alumnos
        //  4. Se vuelve de borrar un profesor/alumno

        //1.  Implica que las tablas no tienen asignado ModeloTablaProfesores/ModeloTablaAlumnos
        //    Hay que asignárselos, si tienen filas, hay que seleccionar la primera (inicializar las tablas)

        //2., 3. y 4. Implica que las tablas ya tienen asignados ModeloTablaProfesores/ModeloTablaAlumnos
        //2.  Se puede volver:
            //2.1 Sin haber creado ningún profesor/alumno: seleccionar el profesor/alumno que estaba seleccionado
            //2.2 Habiendo creado un profesor/alumno: seleccionar el profesor/alumno recién creado
            
        //3.  Se puede volver:
            //3.1 Sin haber modificado ningún profesor/alumno: seleccionar el profesor/alumno que estaba seleccionado
            //3.2 Habiendo modificado un profesor/alumno: seleccionar el profesor/alumno recién modificado (que es el que estaba seleccionado)
            
        //4. Se puede volver:
            //4.1 Sin haber borrado el profesor/alumno: seleccionar el profesor/alumno que estaba seleccionado
            //4.2 Habiendo borrado el profesor/alumno: si hay filas, seleccionar la primera        
        
        JTable tablaProfesores = this.ventana.verTablaProfesores();
        if (tablaProfesores.getModel() instanceof ModeloTablaProfesores) {   //2, 3 y 4: se vuelve de la ventana AMProfesor, o de borrar un profesor
            this.seleccionarProfesorEnTabla(tablaProfesores);
        }
        else  {//1: se viene de la ventana principal
            this.inicializarTablaProfesores(tablaProfesores);
        }
        
        JTable tablaAlumnos = this.ventana.verTablaAlumnos();
        if (tablaAlumnos.getModel() instanceof ModeloTablaAlumnos) {   //2, 3 y 4: se vuelve de la ventana AMAlumno, o de borrar un alumno
            this.seleccionarAlumnoEnTabla(tablaAlumnos);
        }
        else  {//1: se viene de la ventana principal
            this.inicializarTablaAlumnos(tablaAlumnos);
        }
     
        this.operacionProfesor = OPERACION_NINGUNA_PROFESOR;
        this.operacionAlumno = OPERACION_NINGUNA_ALUMNO;
        //luego de mostrar las tablas, se resetean las operaciones
    }    
    
    /**
     * Selecciona una fila en la tabla tablaProfesores según la operación realizada
     * @param tablaProfesores tabla de profesores
     */
    private void seleccionarProfesorEnTabla(JTable tablaProfesores) {
        IGestorPersonas gp = GestorPersonas.instanciar();
        ModeloTablaProfesores mtp = (ModeloTablaProfesores)tablaProfesores.getModel();
        if (this.operacionProfesor.equals(OPERACION_ALTA_PROFESOR)) { //se vuelve de la ventana AMProfesor
            if (gp.verUltimoProfesor() == -1) {  //no se creó ningún profesor: se selecciona el que estaba seleccionado
                if (this.profesorSeleccionado != -1) //hay filas
                    tablaProfesores.setRowSelectionInterval(this.profesorSeleccionado, this.profesorSeleccionado);               
            }
            else {  //se creó un profesor: se lo selecciona
                mtp.fireTableDataChanged(); //se refresca la tabla
                tablaProfesores.setRowSelectionInterval(gp.verUltimoProfesor(), gp.verUltimoProfesor()); 
            }
        }
        else if (this.operacionProfesor.equals(OPERACION_MODIFICACION_PROFESOR)) { //se vuelve de la ventana AMProfesor
            mtp.fireTableDataChanged();
            tablaProfesores.setRowSelectionInterval(this.profesorSeleccionado, this.profesorSeleccionado);               
        }
        else if (this.operacionProfesor.equals(OPERACION_BAJA_PROFESOR)) { //se vuelve de borrar un profesor
            if (gp.verUltimoProfesor() == -1)  //no se borró ningún profesor: se selecciona el que estaba seleccionado
                tablaProfesores.setRowSelectionInterval(this.profesorSeleccionado, this.profesorSeleccionado);               
            else {  //se borró un profesor: se selecciona la primera (si hay)
                mtp.fireTableDataChanged(); //se refresca la tabla
                if (mtp.getRowCount() > 0) { //si hay filas, se selecciona la primera
                    this.profesorSeleccionado = 0;
                    tablaProfesores.setRowSelectionInterval(this.profesorSeleccionado, this.profesorSeleccionado);                           
                }
                else
                    this.profesorSeleccionado = -1;
            }
        }                    
    }
    
    /**
     * Inicializa la tabla de profesores cuando se muestra la ventana por primera vez
     * @param tablaProfesores tabla de profesores
     */
    private void inicializarTablaProfesores(JTable tablaProfesores) {
        ModeloTablaProfesores mtp = new ModeloTablaProfesores(null); //todos los profesores
        tablaProfesores.setModel(mtp);

        if (mtp.getRowCount() > 0) { //si hay filas, se selecciona la primera
            this.profesorSeleccionado = 0;
            tablaProfesores.setRowSelectionInterval(this.profesorSeleccionado, this.profesorSeleccionado);                           
        }
        else
            this.profesorSeleccionado = -1;
    }

    /**
     * Selecciona una fila en la tabla tablaAlumnos según la operación realizada
     * @param tablaAlumnos tabla de alumnos
     */
    private void seleccionarAlumnoEnTabla(JTable tablaAlumnos) {
        IGestorPersonas gp = GestorPersonas.instanciar();
        ModeloTablaAlumnos mta = (ModeloTablaAlumnos)tablaAlumnos.getModel();
        if (this.operacionAlumno.equals(OPERACION_ALTA_ALUMNO)) { //se vuelve de la ventana AMAlumno
            if (gp.verUltimoAlumno() == -1) {  //no se creó ningún alumno: se selecciona el que estaba seleccionado
                if (this.alumnoSeleccionado != -1) //hay filas
                    tablaAlumnos.setRowSelectionInterval(this.alumnoSeleccionado, this.alumnoSeleccionado);               
            }
            else {  //se creó un alumno: se lo selecciona
                mta.fireTableDataChanged(); //se refresca la tabla
                tablaAlumnos.setRowSelectionInterval(gp.verUltimoAlumno(), gp.verUltimoAlumno()); 
            }
        }
        else if (this.operacionAlumno.equals(OPERACION_MODIFICACION_ALUMNO)) { //se vuelve de la ventana AMAlumno
            mta.fireTableDataChanged();
            tablaAlumnos.setRowSelectionInterval(this.alumnoSeleccionado, this.alumnoSeleccionado);               
        }
        else if (this.operacionAlumno.equals(OPERACION_BAJA_ALUMNO)) { //se vuelve de borrar un alumno
            if (gp.verUltimoAlumno() == -1)  //no se borró ningún alumno: se selecciona el que estaba seleccionado
                tablaAlumnos.setRowSelectionInterval(this.alumnoSeleccionado, this.alumnoSeleccionado);               
            else {  //se borró un alumno: se selecciona la primera (si hay)
                mta.fireTableDataChanged(); //se refresca la tabla
                if (mta.getRowCount() > 0) { //si hay filas, se selecciona la primera
                    this.alumnoSeleccionado = 0;
                    tablaAlumnos.setRowSelectionInterval(this.alumnoSeleccionado, this.alumnoSeleccionado);                           
                }
                else
                    this.alumnoSeleccionado = -1;
            }
        }                    
    }
    
    /**
     * Inicializa la tabla de alumnos cuando se muestra la ventana por primera vez
     * @param tablaAlumnos tabla de alumnos 
     */
    private void inicializarTablaAlumnos(JTable tablaAlumnos) {
        ModeloTablaAlumnos mta = new ModeloTablaAlumnos(null); //todos los alumnos
        tablaAlumnos.setModel(mta);

        if (mta.getRowCount() > 0) { //si hay filas, se selecciona la primera
            this.alumnoSeleccionado = 0;
            tablaAlumnos.setRowSelectionInterval(this.alumnoSeleccionado, this.alumnoSeleccionado);                           
        }
        else
            this.alumnoSeleccionado = -1;
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

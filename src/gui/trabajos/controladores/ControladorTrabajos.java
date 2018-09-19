/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.controladores;

import gui.interfaces.IControladorAMTrabajo;
import gui.interfaces.IControladorModificarAlumno;
import gui.interfaces.IControladorModificarProfesor;
import gui.interfaces.IControladorSeminarios;
import gui.interfaces.IControladorTrabajos;
import gui.interfaces.IGestorTrabajos;
import gui.seminarios.controladores.ControladorSeminarios;
import gui.trabajos.modelos.AlumnoEnTrabajo;
import gui.trabajos.modelos.GestorTrabajos;
import gui.trabajos.modelos.ModeloTablaAlumnosEnTrabajos;
import gui.trabajos.modelos.ModeloTablaRolesEnTrabajos;
import gui.trabajos.modelos.ModeloTablaTrabajos;
import gui.trabajos.modelos.RolEnTrabajo;
import gui.trabajos.modelos.Trabajo;
import gui.trabajos.vistas.VentanaTrabajos;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.WindowEvent;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

public class ControladorTrabajos implements IControladorTrabajos {
    private VentanaTrabajos ventana;
    private int trabajoSeleccionado;
    //sirve para manejar la tabla tablaTrabajos
    private int profesorSeleccionado = -1;
    //sirve para manejar la tabla tablaProfesores
    private int alumnoSeleccionado = -1;
    //sirve para manejar la tabla tablaAlumnos
    private String operacion;
    //sirve para manejar la tabla tablaTrabajos
    
    /**
     * Constructor
     * Muestra la ventana de trabajos de forma modal
     * @param ventanaPadre ventana padre (VentanaPrincipal en este caso)
     */
    public ControladorTrabajos(Frame ventanaPadre) {
        this.ventana = new VentanaTrabajos(this, ventanaPadre);
        this.ventana.setLocationRelativeTo(null);   
        this.ventana.setVisible(true);
    }          
        
    /**
     * Muestra la tabla de profesores
     * @param trabajo trabajo al cual se le muestran los profesores
     */
    private void mostrarTablaProfesores(Trabajo trabajo) {
        JTable tablaProfesores = this.ventana.verTablaProfesores();
        ModeloTablaRolesEnTrabajos mtret = new ModeloTablaRolesEnTrabajos(trabajo);
        tablaProfesores.setModel(mtret);
        
        if (this.profesorSeleccionado == -1) //no hay seleccionado un profesor
            this.profesorSeleccionado = 0;
        tablaProfesores.setRowSelectionInterval(this.profesorSeleccionado, this.profesorSeleccionado);         
    }        
        
    
    /**
     * Muestra la tabla de alumnos
     * @param trabajo trabajo al cual se le muestran los alumnos
     */
    private void mostrarTablaAlumnos(Trabajo trabajo) {
        JTable tablaAlumnos = this.ventana.verTablaAlumnos();
        ModeloTablaAlumnosEnTrabajos mtaet = new ModeloTablaAlumnosEnTrabajos(trabajo);
        tablaAlumnos.setModel(mtaet);
        
        if (this.alumnoSeleccionado == -1) //no hay seleccionado un alumno
            this.alumnoSeleccionado = 0;
        tablaAlumnos.setRowSelectionInterval(this.alumnoSeleccionado, this.alumnoSeleccionado);         
    }        
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Trabajo
     * @param evt evento
     */                            
    @Override
    public void btnNuevoClic(ActionEvent evt) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        this.trabajoSeleccionado = tablaTrabajos.getSelectedRow(); 
        this.operacion = OPERACION_ALTA;
        IControladorAMTrabajo controlador = new ControladorAMTrabajo(this.ventana, TRABAJO_NUEVO);
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Trabajo
     * @param evt evento
     */                            
    @Override
    public void btnModificarClic(ActionEvent evt) {
        Trabajo trabajo = this.obtenerTrabajoSeleccionado();        
        if (trabajo != null) { //hay seleccionado un trabajo
            this.operacion = OPERACION_MODIFICACION;
            IControladorAMTrabajo controlador = new ControladorAMTrabajo(this.ventana, TRABAJO_MODIFICAR, trabajo);
        }
    }
    
    /**
     * Obtiene el profesor (y su rol) seleccionado en la tabla
     * Si no hay un profesor seleccionado, devuelve null
     * @return RolEnTrabajo  - profesor (y su rol) seleccionado
     */
    private RolEnTrabajo obtenerRolEnTrabajoSeleccionado() {
        JTable tablaProfesores = this.ventana.verTablaProfesores();
        if (tablaProfesores.getSelectedRow() != -1) { //hay un profesor seleccionado
            ModeloTablaRolesEnTrabajos mtre = (ModeloTablaRolesEnTrabajos)tablaProfesores.getModel();
            return mtre.obtenerRolEnTrabajo(tablaProfesores.getSelectedRow());
        }
        else
            return null;
    }    
    
    /**
     * Obtiene el alumno seleccionado en la tabla
     * Si no hay un alumno seleccionado, devuelve null
     * @return AlumnoEnTrabajo  - alumno seleccionado
     */
    private AlumnoEnTrabajo obtenerAlumnoEnTrabajoSeleccionado() {
        JTable tablaAlumnos = this.ventana.verTablaAlumnos();
        if (tablaAlumnos.getSelectedRow() != -1) { //hay un alumno seleccionado
            ModeloTablaAlumnosEnTrabajos mtaet = (ModeloTablaAlumnosEnTrabajos)tablaAlumnos.getModel();
            return mtaet.obtenerAlumnoEnTrabajo(tablaAlumnos.getSelectedRow());
        }
        else
            return null;
    }    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar Trabajo
     * @param evt evento
     */                           
    @Override
    public void btnBorrarClic(ActionEvent evt) {
        Trabajo trabajo = this.obtenerTrabajoSeleccionado();
        if (trabajo != null) { //hay seleccionado un trabajo
            this.operacion = OPERACION_BAJA;
            IGestorTrabajos gt = GestorTrabajos.instanciar();
            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION_TRABAJO, TITULO, JOptionPane.YES_NO_OPTION);
            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el trabajo
                String resultado = gt.borrarTrabajo(trabajo);
                if (!resultado.equals(IGestorTrabajos.EXITO)) { //no se pudo borrar el trabajo
                    gt.cancelar();
                    JOptionPane.showMessageDialog(null, resultado, TITULO, JOptionPane.ERROR_MESSAGE);
                }
            }
            else
                gt.cancelar();
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
     * Acción a ejecutar cuando la ventana obtenga el foco
     * @param evt evento
     */    
    @Override
    public void ventanaGanaFoco(WindowEvent evt) {        
        //La ventana gana el foco cuando:
        //  1. Se presiona el botón "Trabajos" en la ventana principal
        //  2. Se vuelve de la ventana de alta de trabajos
        //  3. Se vuelve de la ventana de modificación de trabajos
        //  4. Se vuelve de borrar un trabajo
        //  5. Se vuelve de la ventana de seminarios
        //  6. Se vuelve de la ventana de modificar un profesor
        //  7. Se vuelve de la ventana de modificar un alumno
        
        //1.  Implica que la tabla no tiene asignado ModeloTablaTrabajos
        //    Hay que asignárselo, si tiene filas, hay que seleccionar la primera (inicializar la tabla)
        //    Hay que hacer que escuche el cambio de selección para que refrezque las tablas de jurado y de alumnos

        //2., 3., 4., 5., 6. y 7. Implica que la tabla ya tiene asignados ModeloTablaTrabajos
        //2.  Se puede volver:
            //2.1 Sin haber creado ningún trabajo: seleccionar el trabajo que estaba seleccionado
            //2.2 Habiendo creado un trabajo: seleccionar el trabajo recién creado
            
        //3.  Se puede volver:
            //3.1 Sin haber modificado ningún trabajo: seleccionar el trabajo que estaba seleccionado
            //3.2 Habiendo modificado un trabajo: seleccionar el trabajo recién modificado (que es el que estaba seleccionado)
            
        //4. Se puede volver:
            //4.1 Sin haber borrado el trabajo: seleccionar el trabajo que estaba seleccionado
            //4.2 Habiendo borrado el trabajo: si hay filas, seleccionar la primera        
            
        //5. Se puede volver:
            //...
            
        //6. Se puede volver:
            //6.1 Sin haber modificado el profesor: hay que seleccionar el profesor que estaba seleccionado
            //6.2 Habiendo modificado el profesor: hay que seleccionar el profesor que estaba seleccionado y actualizar la tabla de profesores
        
            
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        if (tablaTrabajos.getModel() instanceof ModeloTablaTrabajos) {   //2, 3, 4 y 5: se vuelve de la ventana AMTrabajo, de borrar un trabajo o de la ventana de seminarios
            this.seleccionarTrabajoEnTabla(tablaTrabajos);
        }
        else  {//1: se viene de la ventana principal
            this.inicializarTablaTrabajos(tablaTrabajos);
        }

        this.operacion = OPERACION_NINGUNA;
    }
    
    /**
     * Selecciona una fila en la tabla tablaTrabajos según la operación realizada
     * @param tablaTrabajos tabla de trabajos
     */
    private void seleccionarTrabajoEnTabla(JTable tablaTrabajos) {
        IGestorTrabajos gt = GestorTrabajos.instanciar();
        ModeloTablaTrabajos mtt = (ModeloTablaTrabajos)tablaTrabajos.getModel();
        if (this.operacion.equals(OPERACION_ALTA)) { //se vuelve de la ventana AMTrabajo
            if (gt.verUltimoTrabajo() == -1) {  //no se creó ningún trabajo: se selecciona el que estaba seleccionado
                if (this.trabajoSeleccionado != -1) //hay filas
                    tablaTrabajos.setRowSelectionInterval(this.trabajoSeleccionado, this.trabajoSeleccionado);               
            }
            else {  //se creó un trabajo: se lo selecciona
                mtt.fireTableDataChanged(); //se refresca la tabla
                tablaTrabajos.setRowSelectionInterval(gt.verUltimoTrabajo(), gt.verUltimoTrabajo()); 
            }
        }
        else if (this.operacion.equals(OPERACION_MODIFICACION)) { //se vuelve de la ventana AMTrabajo
            mtt.fireTableDataChanged();
            tablaTrabajos.setRowSelectionInterval(this.trabajoSeleccionado, this.trabajoSeleccionado);               
        }
        else if (this.operacion.equals(OPERACION_BAJA)) { //se vuelve de borrar un trabajo
            if (gt.verUltimoTrabajo() == -1)  //no se borró ningún trabajo: se selecciona el que estaba seleccionado
                tablaTrabajos.setRowSelectionInterval(this.trabajoSeleccionado, this.trabajoSeleccionado);               
            else {  //se borró un trabajo: se selecciona la primera (si hay)
                mtt.fireTableDataChanged(); //se refresca la tabla
                if (mtt.getRowCount() > 0) { //si hay filas, se selecciona la primera
                    this.trabajoSeleccionado = 0;
                    tablaTrabajos.setRowSelectionInterval(this.trabajoSeleccionado, this.trabajoSeleccionado);                           
                }
                else
                    this.trabajoSeleccionado = -1;
            }
        } 
        else if (this.operacion.equals(OPERACION_SEMINARIOS)) {
            
        }
        else if (this.operacion.equals(OPERACION_PROFESORES)) {
            Trabajo trabajo = this.obtenerTrabajoSeleccionado();
            this.mostrarTablaProfesores(trabajo);            
        }
        else if (this.operacion.equals(OPERACION_ALUMNOS)) {
            Trabajo trabajo = this.obtenerTrabajoSeleccionado();
            this.mostrarTablaAlumnos(trabajo);            
        }
    }
    
    /**
     * Inicializa la tabla de trabajos cuando se muestra la ventana por primera vez
     * @param tablaTrabajos tabla de trabajos
     */
    private void inicializarTablaTrabajos(JTable tablaTrabajos) {
//        ModeloTablaTrabajos mtt = new ModeloTablaTrabajos(null); //todos los trabajos
        ModeloTablaTrabajos mtt = new ModeloTablaTrabajos(); //todos los trabajos
        tablaTrabajos.setModel(mtt);
        
        tablaTrabajos.getSelectionModel().addListSelectionListener(new ListSelectionListener() {
            @Override
            public void valueChanged(ListSelectionEvent e) {
                if (!e.getValueIsAdjusting()) {
                    //En esta tabla se puede seleccionar sólo un elemento a la vez, 
                    //por lo que cuando se realiza una nueva selección, 
                    //el elemento seleccionado anteriormente se convierte en no seleccionado, 
                    //disparándose 2 eventos cada vez que se selecciona un elemento diferente
                    //Para evitar responder al evento cuando un elemento deja de estar seleccionado
                    //y luego cuando otro queda seleccionado, se comprueba que esta secuencia de eventos
                    //esté terminada mediante getValueIsAdjusting()
                    
                    Trabajo trabajoSeleccionado = obtenerTrabajoSeleccionado();
                    mostrarTablaProfesores(trabajoSeleccionado);
                    mostrarTablaAlumnos(trabajoSeleccionado);
                }
            }            
        });        
        
        tablaTrabajos.getColumn("Título").setPreferredWidth(200);      
        tablaTrabajos.getColumn("Duración").setPreferredWidth(10);                    
        tablaTrabajos.getColumn("Area").setPreferredWidth(20);                    
        tablaTrabajos.getColumn("Presentación").setPreferredWidth(20);     
        tablaTrabajos.getColumn("Aprobación").setPreferredWidth(15);     
        tablaTrabajos.getColumn("Exposición").setPreferredWidth(15);                     

        if (mtt.getRowCount() > 0) { //si hay filas, se selecciona la primera
            this.trabajoSeleccionado = 0;
            tablaTrabajos.setRowSelectionInterval(this.trabajoSeleccionado, this.trabajoSeleccionado);                           
        }
        else
            this.trabajoSeleccionado = -1;
    }    

    /**
     * Acción a ejecutar cuando se selecciona el botón Seminarios 
     * @param evt evento
     */                            
    @Override
    public void btnSeminariosClic(ActionEvent evt) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        Trabajo trabajo = this.obtenerTrabajoSeleccionado();
        if (trabajo != null) {
            IControladorSeminarios controlador = new ControladorSeminarios(this.ventana, trabajo);
        }
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Profesor
     * @param evt evento
     */                            
    @Override
    public void btnModificarProfesorClic(ActionEvent evt) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        Trabajo trabajo = this.obtenerTrabajoSeleccionado();
        if (trabajo != null) { //hay seleccionado un trabajo
            RolEnTrabajo rolEnTrabajo = this.obtenerRolEnTrabajoSeleccionado();
            if (rolEnTrabajo != null) { //hay seleccioado un profesor
                JTable tablaProfesores = this.ventana.verTablaProfesores();
                this.profesorSeleccionado = tablaProfesores.getSelectedRow(); 
                this.operacion = OPERACION_PROFESORES;
                IControladorModificarProfesor controlador = new ControladorModificarProfesor(this.ventana, trabajo, rolEnTrabajo);
            }
        }
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Alumno
     * @param evt evento
     */                            
    @Override
    public void btnModificarAlumnoClic(ActionEvent evt) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        Trabajo trabajo = this.obtenerTrabajoSeleccionado();
        if (trabajo != null) { //hay seleccionado un trabajo
            AlumnoEnTrabajo alumnoEnTrabajo = this.obtenerAlumnoEnTrabajoSeleccionado();
            if (alumnoEnTrabajo != null) { //hay seleccioado un alumno
                JTable tablaAlumnos = this.ventana.verTablaAlumnos();
                this.alumnoSeleccionado = tablaAlumnos.getSelectedRow(); 
                this.operacion = OPERACION_ALUMNOS;
                IControladorModificarAlumno controlador = new ControladorModificarAlumno(this.ventana, trabajo, alumnoEnTrabajo);
            }
        }
    }
    
    
    /**
     * Obtiene el trabajo en la tabla
     * Si no hay un trabajo seleccionado, devuelve null
     * @return Trabajo  - trabajo seleccionado
     */
    private Trabajo obtenerTrabajoSeleccionado() {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        if (tablaTrabajos.getSelectedRow() != -1) { //hay un trabajo seleccionado
            ModeloTablaTrabajos mtt = (ModeloTablaTrabajos)tablaTrabajos.getModel();
            this.trabajoSeleccionado = tablaTrabajos.getSelectedRow();
            return mtt.obtenerTrabajo(tablaTrabajos.getSelectedRow());
        }
        else {
            this.trabajoSeleccionado = -1;
            return null;
        }
    }        
}

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
import java.util.Comparator;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

public class ControladorTrabajos implements IControladorTrabajos {
    private VentanaTrabajos ventana;
    private int numeroTrabajoSeleccionado;
    //sirve para manejar la tabla tablaTrabajos
    
    /**
     * Constructor
     * Muestra la ventana de trabajos de forma modal
     * @param ventanaPadre ventana padre (VentanaPrincipal en este caso)
     */
    public ControladorTrabajos(Frame ventanaPadre) {
        this.ventana = new VentanaTrabajos(this, ventanaPadre);
        this.ventana.setLocationRelativeTo(null);   
//        this.configurarTablaTrabajos();
        this.ventana.setVisible(true);
    }          
    
    /**
     * Configura la tabla de trabajos para que responda cuando se le seleccione un trabajo
     */
    private void configurarTablaTrabajos() {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
                
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
                    int fila = tablaTrabajos.getSelectedRow();
                    if (fila != -1) {
                        Trabajo trabajoSeleccionado = ((ModeloTablaTrabajos)tablaTrabajos.getSelectionModel()).obtenerTrabajo(fila);
//                        mostrarTablaAlumnos(trabajoSeleccionado);
                    }
                }
            }            
        }); 
    }
    
    /**
     * Muestra la tabla de profesores
     * @param trabajo trabajo al cual se le muestran los profesores
     */
    private void mostrarTablaProfesores(Trabajo trabajo) {
        JTable tablaProfesores = this.ventana.verTablaProfesores();
        ModeloTablaRolesEnTrabajos mtret = new ModeloTablaRolesEnTrabajos(trabajo);
        tablaProfesores.setModel(mtret);
    }        
        
    
    /**
     * Muestra la tabla de alumnos
     * @param trabajo trabajo al cual se le muestran los alumnos
     */
    private void mostrarTablaAlumnos(Trabajo trabajo) {
        JTable tablaAlumnos = this.ventana.verTablaAlumnos();
        ModeloTablaAlumnosEnTrabajos mtaet = new ModeloTablaAlumnosEnTrabajos(trabajo);
        tablaAlumnos.setModel(mtaet);
    }        
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Trabajo
     * @param evt evento
     */                            
    @Override
    public void btnNuevoClic(ActionEvent evt) {
        IControladorAMTrabajo controlador = new ControladorAMTrabajo(this.ventana, TRABAJO_NUEVO);
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Trabajo
     * @param evt evento
     */                            
    @Override
    public void btnModificarClic(ActionEvent evt) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        this.numeroTrabajoSeleccionado = tablaTrabajos.getSelectedRow();
        if (this.numeroTrabajoSeleccionado != -1) { //hay seleccionado un trabajo
            Trabajo trabajo = this.obtenerTrabajoSeleccionado(this.numeroTrabajoSeleccionado);
            IControladorAMTrabajo controlador = new ControladorAMTrabajo(this.ventana, TRABAJO_MODIFICAR, trabajo);
        }
    }
    
    /**
     * Obtiene el trabajo correspondiente al número especificado (se corresponde con su posición dentro de la tabla)
     * @return Trabajo  - trabajo seleccionado
     */
    private Trabajo obtenerTrabajoSeleccionado(int numTrabajo) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        ModeloTablaTrabajos mtt = (ModeloTablaTrabajos)tablaTrabajos.getModel();
        return mtt.obtenerTrabajo(numTrabajo);
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
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        this.numeroTrabajoSeleccionado = tablaTrabajos.getSelectedRow();
        if (this.numeroTrabajoSeleccionado != -1) { //hay seleccionado un trabajo
            Trabajo trabajo = this.obtenerTrabajoSeleccionado(this.numeroTrabajoSeleccionado);
            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION_TRABAJO, TITULO, JOptionPane.YES_NO_OPTION);
            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el trabajo
                IGestorTrabajos gt = GestorTrabajos.instanciar();
                String resultado = gt.borrarTrabajo(trabajo);
                if (resultado.equals(IGestorTrabajos.EXITO)) { //se pudo borrar el trabajo
                    ModeloTablaTrabajos mtt = new ModeloTablaTrabajos();
                    tablaTrabajos.setModel(mtt);
                    if (mtt.getRowCount() > 0)
                        this.numeroTrabajoSeleccionado = 0; //para que se seleccione el primer trabajo
                }
                else
                    JOptionPane.showMessageDialog(null, resultado, TITULO, JOptionPane.ERROR_MESSAGE);
            }
        }
                        
//        Trabajo trabajo = this.obtenerTrabajoSeleccionado();
//        if (trabajo != null) { //hay seleccionado un trabajo
//            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION_TRABAJO, TITULO, JOptionPane.YES_NO_OPTION);
//            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el trabajo
//                IGestorTrabajos gt = GestorTrabajos.instanciar();
//                String resultado = gt.borrarTrabajo(trabajo);
//                if (resultado.equals(IGestorTrabajos.EXITO)) { //se pudo borrar el trabajo
//                    Comparator<Trabajo> cmp = (t1, t2) -> t1.verFechaAprobacion().compareTo(t2.verFechaAprobacion());
//                    JTable tablaTrabajos = this.ventana.verTablaTrabajos();
//                    tablaTrabajos.setModel(new ModeloTablaTrabajos());
//                }
//                else
//                    JOptionPane.showMessageDialog(null, resultado, TITULO, JOptionPane.ERROR_MESSAGE);
//            }
//        }
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
        //  2. Se vuelve de la ventana de alta/modificación de trabajos
        //  3. Se vuelve después de borrar un trabajo
        
        //1.  Implica que la tabla no tiene asignado ModeloTablaTrabajos
        //    Hay que asignárselo, si tiene filas, hay que seleccionar la primera, y tiene que escuchar cuando cambia de selección
        
        //2.  Se puede volver:
            //2.1 Sin haber creado ningún trabajo: 
            //    Si no hay trabajos, no se hace nada
            //    Si hay trabajos, se selecciona el que estaba seleccionado
            //2.2 Habiendo creado el primer trabajo: se lo debe mostrar y seleccionar
            //2.3 Habiendo creado el trabajo N: se lo debe mostrar y seleccionar
            //2.4 Habiendo modificado un trabajo: se lo debe mostrar y seleccionar
        
        //3.  Si hay trabajos, seleccionar el primero
        
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        if (tablaTrabajos.getModel() instanceof ModeloTablaTrabajos) {  //2: se vuelve de la ventana AMTrabajo            
            ModeloTablaTrabajos mtt = (ModeloTablaTrabajos)tablaTrabajos.getModel();
            mtt.fireTableDataChanged(); //se refresca la tabla
            IGestorTrabajos gt = GestorTrabajos.instanciar();
            if (mtt.getRowCount() > 0) {
                if (gt.verUltimoTrabajo() == -1) //no se agregó ni modificó un trabajo
                    tablaTrabajos.setRowSelectionInterval(this.numeroTrabajoSeleccionado, this.numeroTrabajoSeleccionado);               
                else //se agregó o modificó un trabajo
                    tablaTrabajos.setRowSelectionInterval(gt.verUltimoTrabajo(), gt.verUltimoTrabajo());
            }
        }
        else { //1: se viene de la ventana principal
            ModeloTablaTrabajos mtt = new ModeloTablaTrabajos();
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
                        int fila = tablaTrabajos.getSelectedRow();
                        if (fila != -1) {
                            Trabajo trabajoSeleccionado = mtt.obtenerTrabajo(fila);
                            mostrarTablaProfesores(trabajoSeleccionado);
                            mostrarTablaAlumnos(trabajoSeleccionado);
                        }
                    }
                }            
            });

            if (mtt.getRowCount() > 0) 
                tablaTrabajos.setRowSelectionInterval(0, 0);
            else {
                mostrarTablaProfesores(null); //para mostrar los títulos de las columnas
                mostrarTablaAlumnos(null); //para mostrar los títulos de las columnas
            }
        }        
        
        tablaTrabajos.getColumn("Título").setPreferredWidth(200);      
        tablaTrabajos.getColumn("Duración").setPreferredWidth(10);                    
        tablaTrabajos.getColumn("Area").setPreferredWidth(20);                    
        tablaTrabajos.getColumn("Presentación").setPreferredWidth(20);     
        tablaTrabajos.getColumn("Aprobación").setPreferredWidth(15);     
        tablaTrabajos.getColumn("Exposición").setPreferredWidth(15);             
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Seminarios 
     * @param evt evento
     */                            
    @Override
    public void btnSeminariosClic(ActionEvent evt) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        this.numeroTrabajoSeleccionado = tablaTrabajos.getSelectedRow();
        if (this.numeroTrabajoSeleccionado != -1) { //hay seleccionado un trabajo
            Trabajo trabajo = this.obtenerTrabajoSeleccionado(this.numeroTrabajoSeleccionado);
            IControladorSeminarios controlador = new ControladorSeminarios(this.ventana, trabajo);
        }                        
//        Trabajo trabajo = this.obtenerTrabajoSeleccionado();
//        if (trabajo != null) {
//            IControladorSeminarios controlador = new ControladorSeminarios(this.ventana, trabajo);
//        }
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Profesor
     * @param evt evento
     */                            
    @Override
    public void btnModificarProfesorClic(ActionEvent evt) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        this.numeroTrabajoSeleccionado = tablaTrabajos.getSelectedRow();
        if (this.numeroTrabajoSeleccionado != -1) { //hay seleccionado un trabajo
            Trabajo trabajo = this.obtenerTrabajoSeleccionado(this.numeroTrabajoSeleccionado);
            RolEnTrabajo rolEnTrabajo = this.obtenerRolEnTrabajoSeleccionado();
            if (rolEnTrabajo != null) { //hay seleccioado un profesor
                IControladorModificarProfesor controlador = new ControladorModificarProfesor(this.ventana, trabajo, rolEnTrabajo);
            }
        }                
//        Trabajo trabajo = this.obtenerTrabajoSeleccionado();
//        RolEnTrabajo rolEnTrabajo = this.obtenerRolEnTrabajoSeleccionado();
//        if (rolEnTrabajo != null) { //hay seleccioado un profesor
//            IControladorModificarProfesor controlador = new ControladorModificarProfesor(this.ventana, trabajo, rolEnTrabajo);
//        }        
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Alumno
     * @param evt evento
     */                            
    @Override
    public void btnModificarAlumnoClic(ActionEvent evt) {
        JTable tablaTrabajos = this.ventana.verTablaTrabajos();
        this.numeroTrabajoSeleccionado = tablaTrabajos.getSelectedRow();
        if (this.numeroTrabajoSeleccionado != -1) { //hay seleccionado un trabajo
            Trabajo trabajo = this.obtenerTrabajoSeleccionado(this.numeroTrabajoSeleccionado);
            AlumnoEnTrabajo alumnoEnTrabajo = this.obtenerAlumnoEnTrabajoSeleccionado();
            if (alumnoEnTrabajo != null) { //hay seleccionado un alumno
                IControladorModificarAlumno controlador = new ControladorModificarAlumno(this.ventana, trabajo, alumnoEnTrabajo);
            }
        }
        
        
        
//        Trabajo trabajo = this.obtenerTrabajoSeleccionado();
//        AlumnoEnTrabajo alumnoEnTrabajo = this.obtenerAlumnoEnTrabajoSeleccionado();
//        if (alumnoEnTrabajo != null) { //hay seleccioado un alumno
//            IControladorModificarAlumno controlador = new ControladorModificarAlumno(this.ventana, trabajo, alumnoEnTrabajo);
//        }
    }
    
    
    
}

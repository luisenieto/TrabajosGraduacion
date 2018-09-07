/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.areas.controladores;

import gui.areas.modelos.Area;
import gui.areas.modelos.GestorAreas;
import gui.areas.modelos.ModeloTablaAreas;
import gui.areas.vistas.VentanaAreas;
import gui.interfaces.IControladorAMArea;
import gui.interfaces.IControladorAreas;
import gui.interfaces.IGestorAreas;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.awt.event.WindowEvent;
import javax.swing.JOptionPane;
import javax.swing.JTable;

public class ControladorAreas implements IControladorAreas {
    private VentanaAreas ventana;
    private int numeroAreaSeleccionada;
    //sirve para manejar la tabla tablaAreas
    
    /**
     * Constructor
     * Muestra la ventana de áreas de forma modal
     * @param ventanaPadre ventana padre (VentanaPrincipal en este caso)
     */
    public ControladorAreas(Frame ventanaPadre) {
        this.ventana = new VentanaAreas(this, ventanaPadre);
        this.ventana.setLocationRelativeTo(null);
        this.ventana.setVisible(true);
    }
        
    /**
     * Acción a ejecutar cuando se selecciona el botón Nueva
     * @param evt evento
     */                            
    @Override
    public void btnNuevaClic(ActionEvent evt) {
        JTable tablaAreas = this.ventana.verTablaAreas();
        ModeloTablaAreas mta = (ModeloTablaAreas)tablaAreas.getModel();
        this.numeroAreaSeleccionada = mta.getRowCount() > 0 ? tablaAreas.getSelectedRow() : -1;        
        IControladorAMArea controlador = new ControladorAMArea(this.ventana);
    }
    
    /**
     * Obtiene el área seleccionada en la tabla
     * Si no hay un área seleccionada, devuelve null
     * @return Area  - área seleccionada
     */
    private Area obtenerAreaSeleccionada() {
        JTable tablaAreas = this.ventana.verTablaAreas();
        if (tablaAreas.getSelectedRow() != -1) { //hay un área seleccionada
            ModeloTablaAreas mta = (ModeloTablaAreas)tablaAreas.getModel();
            return mta.obtenerArea(tablaAreas.getSelectedRow());
        }
        else
            return null;
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar
     * @param evt evento
     */                            
    @Override
    public void btnBorrarClic(ActionEvent evt) {
        Area area = this.obtenerAreaSeleccionada();
        if (area != null) { //hay seleccionada un área
            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION, TITULO, JOptionPane.YES_NO_OPTION);
            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el área
                IGestorAreas ga = GestorAreas.instanciar();
                String resultado = ga.borrarArea(area);
                if (resultado.equals(IGestorAreas.EXITO)) { //se pudo borrar el área
                    JTable tablaAreas = this.ventana.verTablaAreas();
                    ModeloTablaAreas mta = new ModeloTablaAreas("");
                    tablaAreas.setModel(mta);
                    if (mta.getRowCount() > 0) { //si hay filas, se selecciona la primera
                        tablaAreas.setRowSelectionInterval(0, 0);           
                        this.numeroAreaSeleccionada = 0;
                    }
                    else
                        this.numeroAreaSeleccionada = -1;                        
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
     * Acción a ejecutar cuando se selecciona el botón Buscar
     * @param evt evento
     */                            
    @Override
    public void btnBuscarClic(ActionEvent evt) {
        this.buscar();

    }
    
    /**
     * Muestra en la tabla las áreas cuyo nombre coincidan con el nombre especificado
     */
    private void buscar() {
        String nombre;
        if (this.ventana.verTxtNombre().getText().trim().isEmpty())
            nombre = null;
        else
            nombre = this.ventana.verTxtNombre().getText().trim();
        ModeloTablaAreas mta = new ModeloTablaAreas(nombre);
        JTable tablaAreas = this.ventana.verTablaAreas();
        tablaAreas.setModel(mta);
        if (mta.getRowCount() > 0)
            tablaAreas.setRowSelectionInterval(0, 0);        
    }
    
    /**
     * Acción a ejecutar cuando la ventana obtenga el foco
     * @param evt evento
     */
    @Override
    public void ventanaGanaFoco(WindowEvent evt) {
        //La ventana gana el foco cuando:
        //  1. Se presiona el botón "Areas" en la ventana principal
	//  2. Se vuelve de la ventana de alta de áreas
        //  3. Se vuelve al borrar un área

        //1.  Implica que la tabla no tiene asignado ModeloTablaAreas
        //    Hay que asignárselo, si tiene filas, hay que seleccionar la primera

        //2.  Se puede volver:
            //2.1 Sin haber creado ningún área: 
            //    Si no hay áreas, no se hace nada
            //    Si ya hay áreas, se selecciona la que estaba seleccionada
            //2.2 Habiendo creado un área: se la debe mostrar y seleccionar
            
        //3. Se puede volver:
            //3.1 Sin haber borrado el área
                //Se selecciona el área que estaba seleccionada
            //3.2 Habiendo borrado el área
                //Si no hay áreas, no se hace nada
                //Si hay áreas, se selecciona la primera
                
        JTable tablaAreas = this.ventana.verTablaAreas();
        IGestorAreas ga = GestorAreas.instanciar();
        if (tablaAreas.getModel() instanceof ModeloTablaAreas) {  //2 y 3: se vuelve de la ventana AMArea, o de borrar un área
            ModeloTablaAreas mta = (ModeloTablaAreas)tablaAreas.getModel();
            mta.fireTableDataChanged(); //se refresca la tabla
//            IGestorAreas ga = GestorAreas.instanciar();
            if (ga.verUltimaArea() == -1) { //2.1 no se creó ningún área
//                if (mta.getRowCount() > 0) //si ya hay áreas
                    tablaAreas.setRowSelectionInterval(this.numeroAreaSeleccionada, this.numeroAreaSeleccionada);               
            }
            else { //2.2 se creó un área: se la selecciona
                tablaAreas.setRowSelectionInterval(ga.verUltimaArea(), ga.verUltimaArea()); 
            }
            System.out.println("AMArea - " + "this.numeroAreaSeleccionada: " + this.numeroAreaSeleccionada + ", ga.verUltimaArea(): " + ga.verUltimaArea());
        }
        else { //1: se viene de la ventana principal
            ModeloTablaAreas mta = new ModeloTablaAreas(null); //todas las áreas
            tablaAreas.setModel(mta);
            
            if (mta.getRowCount() > 0) { //si hay filas, se selecciona la primera
                tablaAreas.setRowSelectionInterval(0, 0);           
                this.numeroAreaSeleccionada = 0;
            }
            else
                this.numeroAreaSeleccionada = -1;
            System.out.println("principal - " + "this.numeroAreaSeleccionada: " + this.numeroAreaSeleccionada + ", ga.verUltimaArea(): " + ga.verUltimaArea());
        }
        
//        System.out.println(this.numeroAreaSeleccionada);
            
//        JTable tablaAreas = this.ventana.verTablaAreas();
//        if (tablaAreas.getSelectedRow() == -1) {
//            //si no hay seleccionada ninguna fila, 
//            //y hay filas para seleccionar, se selecciona la primera
//            ModeloTablaAreas mta = new ModeloTablaAreas(null); //todas las áreas
//            tablaAreas.setModel(mta); //todas las áreas
//            if (mta.getRowCount() > 0)
//                tablaAreas.setRowSelectionInterval(0, 0); 
//        }     
//        else { //sí hay seleccionada una fila
//            int fila = tablaAreas.getSelectedRow();
//            tablaAreas.setModel(new ModeloTablaAreas(null)); 
//            //Se hace esto porque a lo mejor se modificó alguno
//            tablaAreas.setRowSelectionInterval(fila, fila); 
//        }        
    } 

    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtNombre
     * @param evt evento
     */    
    @Override
    public void txtNombrePresionarTecla(KeyEvent evt) {
        if (evt.getKeyCode() == KeyEvent.VK_ENTER)
            this.buscar();
    }            
}

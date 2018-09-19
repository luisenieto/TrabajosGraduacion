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
    private int areaSeleccionada;
    //sirve para manejar la tabla tablaAreas
    private String operacion;
    
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
        this.areaSeleccionada = tablaAreas.getSelectedRow();
        this.operacion = OPERACION_ALTA;
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
            this.areaSeleccionada = tablaAreas.getSelectedRow();
            return mta.obtenerArea(tablaAreas.getSelectedRow());
        }
        else {
            this.areaSeleccionada = -1;
            return null;
        }
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar
     * @param evt evento
     */                            
    @Override
    public void btnBorrarClic(ActionEvent evt) {
        Area area = this.obtenerAreaSeleccionada();        
        if (area != null) { //hay seleccionada un área
            this.operacion = OPERACION_BAJA;
            IGestorAreas ga = GestorAreas.instanciar();
            int opcion = JOptionPane.showConfirmDialog(null, CONFIRMACION, TITULO, JOptionPane.YES_NO_OPTION);
            if (opcion == JOptionPane.YES_OPTION) { //se quiere borrar el área                
                String resultado = ga.borrarArea(area);
                if (!resultado.equals(IGestorAreas.EXITO)) { //no se pudo borrar el área
                    ga.cancelar();
                    JOptionPane.showMessageDialog(null, resultado, TITULO, JOptionPane.ERROR_MESSAGE);
                }
            }
            else
                ga.cancelar();
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
        //  3. Se vuelve de borrar un área

        //1.  Implica que la tabla no tiene asignado ModeloTablaAreas
        //    Hay que asignárselo, si tiene filas, hay que seleccionar la primera

        //2. y 3. Implica que la tabla ya tiene asignado ModeloTablaAreas
        //2.  Se puede volver:
            //2.1 Sin haber creado ningún área: seleccionar el área que estaba seleccionada
            //2.2 Habiendo creado un área: seleccionar el área recién creada
            
        //3. Se puede volver:
            //3.1 Sin haber borrado el área: seleccionar el área que estaba seleccionada
            //3.2 Habiendo borrado el área: si hay filas, seleccionar la primera
                
        JTable tablaAreas = this.ventana.verTablaAreas();
        if (tablaAreas.getModel() instanceof ModeloTablaAreas)   //2 y 3: se vuelve de la ventana AMArea, o de borrar un área
            this.seleccionarAreaEnTabla(tablaAreas);
        else  //1: se viene de la ventana principal
            this.inicializarTablaProfesores(tablaAreas);
        
        this.operacion = OPERACION_NINGUNA;
    } 
    
    /**
     * Selecciona una fila en la tabla tablaAreas según la operación realizada
     * @param tablaAreas tabla de áreas
     */
    private void seleccionarAreaEnTabla(JTable tablaAreas) {
        IGestorAreas ga = GestorAreas.instanciar();
        ModeloTablaAreas mta = (ModeloTablaAreas)tablaAreas.getModel();
        if (this.operacion.equals(OPERACION_ALTA)) { //se vuelve de la ventana AMArea
            if (ga.verUltimaArea() == -1) {  //no se creó ningún área: se selecciona la que estaba seleccionada
                if (this.areaSeleccionada != -1) //hay filas
                    tablaAreas.setRowSelectionInterval(this.areaSeleccionada, this.areaSeleccionada);               
            }
            else {  //se creó un área: se la selecciona
                mta.fireTableDataChanged(); //se refresca la tabla
                tablaAreas.setRowSelectionInterval(ga.verUltimaArea(), ga.verUltimaArea()); 
            }
        }
        else if (this.operacion.equals(OPERACION_BAJA)) { //se vuelve de borrar un área
            if (ga.verUltimaArea() == -1)  //no se borró ningún área: se selecciona la que estaba seleccionada
                tablaAreas.setRowSelectionInterval(this.areaSeleccionada, this.areaSeleccionada);               
            else {  //se borró un área: se selecciona la primera (si hay)
                mta.fireTableDataChanged(); //se refresca la tabla
                if (mta.getRowCount() > 0) { //si hay filas, se selecciona la primera
                    this.areaSeleccionada = 0;
                    tablaAreas.setRowSelectionInterval(this.areaSeleccionada, this.areaSeleccionada);                           
                }
                else
                    this.areaSeleccionada = -1;
            }
        }                    
    }
        
    /**
     * Inicializa la tabla de áreas cuando se muestra la ventana por primera vez
     * @param tablaAreas tabla de áreas
     */
    private void inicializarTablaProfesores(JTable tablaAreas) {
        ModeloTablaAreas mta = new ModeloTablaAreas(null); //todas las áreas
        tablaAreas.setModel(mta);

        if (mta.getRowCount() > 0) { //si hay filas, se selecciona la primera
            this.areaSeleccionada = 0;
            tablaAreas.setRowSelectionInterval(this.areaSeleccionada, this.areaSeleccionada);                           
        }
        else
            this.areaSeleccionada = -1;
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

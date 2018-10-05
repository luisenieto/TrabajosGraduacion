/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.controladores;

import gui.interfaces.IControladorAMSeminario;
import gui.interfaces.IControladorSeminarios;
import gui.interfaces.IGestorSeminarios;
import gui.interfaces.IGestorTrabajos;
import gui.seminarios.modelos.GestorSeminarios;
import gui.seminarios.modelos.ModeloTablaSeminarios;
import gui.seminarios.modelos.Seminario;
import gui.seminarios.vistas.VentanaSeminarios;
import gui.trabajos.modelos.GestorTrabajos;
import gui.trabajos.modelos.Trabajo;
import java.awt.Dialog;
import java.awt.event.ActionEvent;
import java.awt.event.WindowEvent;
import javax.swing.JTable;

public class ControladorSeminarios implements IControladorSeminarios {
    private VentanaSeminarios ventana;
    private Trabajo trabajo;
    private int seminarioSeleccionado;
    //sirve para manejar la tabla tablaSeminarios
    private String operacion;
    //sirve para manejar la tabla tablaSeminarios
    
    /**
     * Constructor
     * Muestra la ventana de personas de forma modal
     * @param ventanaPadre ventana padre (VentanaTrabajos en este caso)
     * @param trabajo trabajo al cual se le agrega un seminario
     */
    public ControladorSeminarios(Dialog ventanaPadre, Trabajo trabajo) {
        this.trabajo = trabajo;
        IGestorSeminarios gs = GestorSeminarios.instanciar();
        //con esto, se leen del archivo los seminarios de todos los trabajos
        //esto se hace una única vez, al instanciar por primera vez el gestor
        
        this.ventana = new VentanaSeminarios(this, ventanaPadre);
        this.ventana.setTitle(TITULO);
        this.ventana.verTxtTrabajo().setText(trabajo.verTitulo());
        this.ventana.setLocationRelativeTo(null);        
        this.ventana.setVisible(true);
    } 

    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Seminario
     * @param evt evento
     */
    @Override
    public void btnNuevoSeminarioClic(ActionEvent evt) {
        JTable tablaSeminarios = this.ventana.verTablaSeminarios();
        this.seminarioSeleccionado = tablaSeminarios.getSelectedRow(); 
        this.operacion = OPERACION_ALTA;
        IControladorAMSeminario controlador = new ControladorAMSeminario(this.ventana, NUEVO, this.trabajo);
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Seminario
     * @param evt evento
     */
    @Override
    public void btnModificarSeminarioClic(ActionEvent evt) {
        Seminario seminario = this.obtenerSeminarioSeleccionado();        
        if (seminario != null) { //hay seleccionado un seminario
            this.operacion = OPERACION_MODIFICACION;
            IControladorAMSeminario controlador = new ControladorAMSeminario(this.ventana, MODIFICAR, this.trabajo, seminario);
        }
    }
    
    /**
     * Obtiene el seminario en la tabla
     * Si no hay un seminario seleccionado, devuelve null
     * @return Seminario  - seminario seleccionado
     */
    private Seminario obtenerSeminarioSeleccionado() { 
        JTable tablaSeminarios = this.ventana.verTablaSeminarios();
        if (tablaSeminarios.getSelectedRow() != -1) { //hay un seminario seleccionado
            ModeloTablaSeminarios mts = (ModeloTablaSeminarios)tablaSeminarios.getModel();
            this.seminarioSeleccionado = tablaSeminarios.getSelectedRow();
            return mts.obtenerSeminario(tablaSeminarios.getSelectedRow());
        }
        else {
            this.seminarioSeleccionado = -1;
            return null;
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
        //  1. Se presiona el botón "Seminarios" en la ventana de trabajos
	//  2. Se vuelve de la ventana de alta de seminarios
        //  3. Se vuelve de la ventana de modificación de seminarios

        //1.  Implica que la tabla no tiene asignado ModeloTablaSeminarios
        //    Hay que asignárselo, si tiene filas, hay que seleccionar la primera

        //2. y 3. Implica que la tabla ya tiene asignado ModeloTablaSeminarios
        //2.  Se puede volver:
            //2.1 Sin haber creado ningún seminario: seleccionar el seminario que estaba seleccionado
            //2.2 Habiendo creado un seminario: seleccionar el seminario recién creado
            
        //3. Se puede volver:
            //3.1 Sin haber modificado el seminario: seleccionar el seminario que estaba seleccionado
            //3.2 Habiendo modificado un seminario: seleccionar el seminario recién modificado (que es el que estaba seleccionado)
        

        JTable tablaSeminarios = this.ventana.verTablaSeminarios();
        if (tablaSeminarios.getModel() instanceof ModeloTablaSeminarios) {   //2 y 3: se vuelve de la ventana AMSeminario
            this.seleccionarSeminarioEnTabla(tablaSeminarios);
        }
        else  {//1: se viene de la ventana principal
            this.inicializarTablaSeminarios(tablaSeminarios);
        }
    }     
    
    /**
     * Inicializa la tabla de seminarios cuando se muestra la ventana por primera vez
     * @param tablaSeminarios tabla de seminarios
     */
    private void inicializarTablaSeminarios(JTable tablaSeminarios) {
        ModeloTablaSeminarios mts = new ModeloTablaSeminarios(this.trabajo); //todos los seminarios del trabajo
        tablaSeminarios.setModel(mts);

        if (mts.getRowCount() > 0) { //si hay filas, se selecciona la primera
            this.seminarioSeleccionado = 0;
            tablaSeminarios.setRowSelectionInterval(this.seminarioSeleccionado, this.seminarioSeleccionado);                           
        }
        else
            this.seminarioSeleccionado = -1;
        
        tablaSeminarios.getColumn(ModeloTablaSeminarios.COLUMNA_FECHA).setPreferredWidth(25);      
        tablaSeminarios.getColumn(ModeloTablaSeminarios.COLUMNA_NOTA).setPreferredWidth(25); 
        tablaSeminarios.getColumn(ModeloTablaSeminarios.COLUMNA_OBSERVACIONES).setPreferredWidth(195);         
    }   
    
    /**
     * Selecciona una fila en la tabla tablaSeminarios según la operación realizada
     * @param tablaSeminarios tabla de seminarios
     */
    private void seleccionarSeminarioEnTabla(JTable tablaSeminarios) {
        IGestorSeminarios gs = GestorSeminarios.instanciar();
        ModeloTablaSeminarios mts = (ModeloTablaSeminarios)tablaSeminarios.getModel();
        if (this.operacion.equals(OPERACION_ALTA)) { //se vuelve de la ventana AMSeminario
            if (this.trabajo.verUltimoSeminario() == -1) {  //no se creó ningún seminario: se selecciona el que estaba seleccionado
                if (this.seminarioSeleccionado != -1) //hay filas
                    tablaSeminarios.setRowSelectionInterval(this.seminarioSeleccionado, this.seminarioSeleccionado);               
            }
            else {  //se creó un seminario: se lo selecciona
                mts.fireTableDataChanged(); //se refresca la tabla
                tablaSeminarios.setRowSelectionInterval(this.trabajo.verUltimoSeminario(), this.trabajo.verUltimoSeminario()); 
            }
        }
        else if (this.operacion.equals(OPERACION_MODIFICACION)) { //se vuelve de la ventana AMSeminario
            mts.fireTableDataChanged();
            tablaSeminarios.setRowSelectionInterval(this.seminarioSeleccionado, this.seminarioSeleccionado);               
        }
    }    
}

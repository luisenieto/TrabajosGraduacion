/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.controladores;

import gui.interfaces.IControladorAMSeminario;
import gui.interfaces.IControladorSeminarios;
import gui.interfaces.IGestorTrabajos;
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
    private int numeroSeminarioSeleccionado;
    //sirve para manejar la tabla tablaSeminarios
    
    /**
     * Constructor
     * Muestra la ventana de personas de forma modal
     * @param ventanaPadre ventana padre (VentanaTrabajos en este caso)
     * @param trabajo trabajo al cual se le agrega un seminario
     */
    public ControladorSeminarios(Dialog ventanaPadre, Trabajo trabajo) {
        this.trabajo = trabajo;
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
        this.numeroSeminarioSeleccionado = tablaSeminarios.getSelectedRow();        
        IControladorAMSeminario controlador = new ControladorAMSeminario(this.ventana, NUEVO, this.trabajo);
    }

    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Seminario
     * @param evt evento
     */
    @Override
    public void btnModificarSeminarioClic(ActionEvent evt) {
        JTable tablaSeminarios = this.ventana.verTablaSeminarios();
        this.numeroSeminarioSeleccionado = tablaSeminarios.getSelectedRow(); 
        if (this.numeroSeminarioSeleccionado != -1) { //hay seleccionado un seminario
            Seminario seminario = this.obtenerSeminarioSeleccionado(this.numeroSeminarioSeleccionado);
            IControladorAMSeminario controlador = new ControladorAMSeminario(this.ventana, MODIFICAR, this.trabajo, seminario);
        }
    }
    
     /**
     * Obtiene el seminario correspondiente al número especificado (se corresponde con su posición dentro de la tabla)
     * @return Seminario  - seminario seleccionado
     */
    private Seminario obtenerSeminarioSeleccionado(int numSeminario) { 
        JTable tablaSeminarios = this.ventana.verTablaSeminarios();
        ModeloTablaSeminarios mts = (ModeloTablaSeminarios)tablaSeminarios.getModel();
        return mts.obtenerSeminario(numSeminario);
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
            //  2. se vuelve de la ventana de alta/modificación de seminarios

            //1.  Implica que la tabla no tiene asignado ModeloTablaSeminarios
            //    Hay que asignárselo, y si tiene filas, hay que seleccionar la primera
            
            //2.  Se puede volver:
                //2.1 Sin haber creado ningún seminario: 
                //    Si no hay seminarios, no se hace nada
                //    Si hay seminarios, se selecciona el que estaba seleccionado
                //2.2 Habiendo creado el primer seminario: se lo debe mostrar y seleccionar
                //2.3 Habiendo creado el seminario N: se lo debe mostrar y seleccionar
                //2.4 Habiendo modificado un seminario: se lo debe mostrar y seleccionar

        JTable tablaSeminarios = this.ventana.verTablaSeminarios();
        if (tablaSeminarios.getModel() instanceof ModeloTablaSeminarios) {  //2: se vuelve de la ventana AMSeminario
            ModeloTablaSeminarios mts = (ModeloTablaSeminarios)tablaSeminarios.getModel();
            mts.fireTableDataChanged(); //se refresca la tabla
            IGestorTrabajos gt = GestorTrabajos.instanciar();
            if (mts.getRowCount() > 0) {
                if (gt.verUltimoSeminario() == -1) //no se agregó ni modificó un seminario
                    tablaSeminarios.setRowSelectionInterval(this.numeroSeminarioSeleccionado, this.numeroSeminarioSeleccionado);
                else //se agregó o modificó un seminario
                    tablaSeminarios.setRowSelectionInterval(gt.verUltimoSeminario(), gt.verUltimoSeminario());
            }
        }
        else { //1: se viene de la ventana seminarios
            ModeloTablaSeminarios mts = new ModeloTablaSeminarios(this.trabajo);
            tablaSeminarios.setModel(mts);
            if (mts.getRowCount() > 0)
                tablaSeminarios.setRowSelectionInterval(0, 0);
        }
        
        tablaSeminarios.getColumn("Fecha").setPreferredWidth(25);      
        tablaSeminarios.getColumn("Nota").setPreferredWidth(25); 
        tablaSeminarios.getColumn("Observaciones").setPreferredWidth(195); 
    }        
}

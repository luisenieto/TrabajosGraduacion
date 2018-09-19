/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import java.awt.event.ActionEvent;
import java.awt.event.WindowEvent;

public interface IControladorTrabajos {
    public static final String TRABAJO_NUEVO = "Trabajos - Nuevo";
    public static final String TRABAJO_MODIFICAR = "Trabajos - Modificar";
    public static final String TITULO = "Trabajos";
    public static final String CONFIRMACION_TRABAJO = "¿Desea borrar el trabajo especificado?";    
    
    //Constantes para manejar la tabla de trabajos
    public static final String OPERACION_ALTA = "Alta";
    public static final String OPERACION_BAJA = "Baja";    
    public static final String OPERACION_MODIFICACION = "Modificación"; 
    public static final String OPERACION_SEMINARIOS = "Seminarios"; 
    public static final String OPERACION_NINGUNA = "Ninguna"; 
    //Constantes para manejar la tabla de profesores
    public static final String OPERACION_PROFESORES = "Profesores";
    //Constantes para manejar la tabla de alumnos
    public static final String OPERACION_ALUMNOS = "Alumnos";
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo
     * @param evt evento
     */                        
    public void btnNuevoClic(ActionEvent evt);
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar 
     * @param evt evento
     */                        
    public void btnModificarClic(ActionEvent evt);
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar 
     * @param evt evento
     */                        
    public void btnBorrarClic(ActionEvent evt);
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Seminarios 
     * @param evt evento
     */                        
    public void btnSeminariosClic(ActionEvent evt);    
        
    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Profesor
     * @param evt evento
     */                        
    public void btnModificarProfesorClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Modificar Alumno
     * @param evt evento
     */                        
    public void btnModificarAlumnoClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Volver
     * @param evt evento
     */                        
    public void btnVolverClic(ActionEvent evt);    
        
    /**
     * Acción a ejecutar cuando la ventana obtenga el foco
     * @param evt evento
     */
    public void ventanaGanaFoco(WindowEvent evt);    
}

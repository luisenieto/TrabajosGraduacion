/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.awt.event.WindowEvent;


public interface IControladorPersonas {
    public static final String PROFESOR_NUEVO = "Profesores - Nuevo";
    public static final String PROFESOR_MODIFICAR = "Profesores - Modificar";
    public static final String ALUMNO_NUEVO = "Alumnos - Nuevo";
    public static final String ALUMNO_MODIFICAR = "Alumnos - Modificar";    
    public static final String TITULO = "Personas";
    public static final String CONFIRMACION_PROFESOR = "¿Desea borrar el profesor especificado?";    
    public static final String CONFIRMACION_ALUMNO = "¿Desea borrar el alumno especificado?";    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Profesor
     * @param evt evento
     */                        
    public void btnNuevoProfesorClic(ActionEvent evt);

    /**
     * Acción a ejecutar cuando se selecciona el botón Nuevo Alumno
     * @param evt evento
     */                        
    public void btnNuevoAlumnoClic(ActionEvent evt);
    
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
     * Acción a ejecutar cuando se selecciona el botón Borrar Profesor
     * @param evt evento
     */                        
    public void btnBorrarProfesorClic(ActionEvent evt);
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Borrar Alumno
     * @param evt evento
     */                        
    public void btnBorrarAlumnoClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Volver
     * @param evt evento
     */                        
    public void btnVolverClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Buscar Profesor
     * @param evt evento
     */                        
    public void btnBuscarProfesorClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando se selecciona el botón Buscar Alumno
     * @param evt evento
     */                        
    public void btnBuscarAlumnoClic(ActionEvent evt);    
    
    /**
     * Acción a ejecutar cuando la ventana obtenga el foco
     * @param evt evento
     */
    public void ventanaGanaFoco(WindowEvent evt);
    
    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtApellidosProfesor
     * @param evt evento
     */    
    public void txtApellidosProfesorPresionarTecla(KeyEvent evt);
    
    /**
     * Acción a ejecutar cuando se presiona una tecla en el campo txtApellidosAlumno
     * @param evt evento
     */    
    public void txtApellidosAlumnoPresionarTecla(KeyEvent evt);    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import gui.seminarios.modelos.NotaAprobacion;
import gui.seminarios.modelos.Seminario;
import gui.trabajos.modelos.Trabajo;
import java.time.LocalDate;

public interface IGestorSeminarios {
    //Constantes para las operaciones de E/S
    public static final String LECTURA_ERROR = "Error al leer los seminarios";
    public static final String LECTURA_OK = "Se pudieron leer los seminarios";
    public static final String ARCHIVO_INEXISTENTE = "No existe el archivo";
    public static final String ESCRITURA_ERROR = "Error al guardar los seminarios";
    public static final String ESCRITURA_OK = "Se pudieron guardar los seminarios";    
    
    //Constantes para los seminarios
    public static final String SEMINARIO_INEXISTENTE = "No se especificó el seminario";
    public static final String ERROR = "El trabajo, el seminario, la fecha y/o nota de aprobación no pueden ser nulas";    
    public static final String DUPLICADOS = "El trabajo ya tiene un seminario expuesto es esa fecha";    
    public static final String ERROR_FECHA_EXPOSICION = "La fecha de exposición del seminario debe ser posterior a la de aceptación del trabajo";        
    public static final String ERROR_OBSERVACIONES = "Se deben especificar las observaciones";    
    public static final String EXITO = "Seminario creado/modificado con éxito";
        
    /**
     * Crea un seminario para el trabajo especificado siempre y cuando no haya otro con la misma fecha
     * Y que la fecha de exposición del seminario sea posterior a la de aprobación del trabajo
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param trabajo trabajo al cual se le agrega un nuevo seminario
     * @param fechaExposicion fecha de exposición del seminario
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */
    public String nuevoSeminario(Trabajo trabajo, LocalDate fechaExposicion, NotaAprobacion notaAprobacion, String observaciones);
    
    /**
     * Modifica un seminario siempre y cuando no haya otro con la misma fecha
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param trabajo trabajo al cual se le modifica un seminario
     * @param seminario seminario a modificar
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */
    public String modificarSeminario(Trabajo trabajo, Seminario seminario, NotaAprobacion notaAprobacion, String observaciones);    
}

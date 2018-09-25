/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.interfaces;

import gui.areas.modelos.Area;
import java.util.List;

public interface IGestorAreas {
    //Constantes para las operaciones de E/S
    public static final String LECTURA_ERROR = "Error al leer las áreas";
    public static final String LECTURA_OK = "Se pudieron leer las áreas";
    public static final String ARCHIVO_INEXISTENTE = "No existe el archivo";
    public static final String ESCRITURA_ERROR = "Error al guardar las áreas";
    public static final String ESCRITURA_OK = "Se pudieron guardar las áreas";    

    //Constantes para el ABM de áreas    
    public static final String EXITO = "Area creada/borrada con éxito";
    public static final String ERROR = "El nombre del área no puede ser nulo";
    public static final String DUPLICADOS = "Ya existe un área con ese nombre";
    public static final String AREA_CON_TRABAJO = "No se puede borrar el área porque hay trabajo(s) con la misma";    

    
    /**
     * Crea un nueva área
     * @param nombre nombre del área
     * @return cadena con el resultado de la operación
    */                                                                    
    public String nuevaArea(String nombre);
        
    /**
     * Borra un área siempre y cuando no haya trabajos con la misma
     * @param area área a borrar
     * @return String  - cadena con el resultado de la operación
     */
    public String borrarArea(Area area);
    
    /**
     * Busca si existe un área con el nombre especificado (total o parcialmente)
     * Si no se especifica un nombre de área, devuelve todas las áreas
     * Este método es necesario para las clases ModeloTablaAreas y ModeloComboAreas
     * @param nombre nombre del área a buscar
     * @return List<Area>  - lista de áreas, ordenadas por nombre, cuyos nombres coincidan con el especificado
    */                                                                           
    public List<Area> buscarAreas(String nombre);
    
    /**
     * Busca si existe un área que coincida con el nombre especificado
     * Si existe un área con el nombre especificado, la devuelve
     * Si no hay un área con el nombre especicado, devuelve null
     * A este método lo usa la clase GestorTrabajos
     * @param nombre nombre del área a buscar
     * @return Area  - objeto Area cuyo nombre coincida con el nombre especificado, o null
     */
    public Area dameArea(String nombre);
    
    /**
     * Devuelve la posición de la última área agregada
     * Sirve para manejar la tabla tablaAreas
     * Si cuando se agrega un área se cancela la operación, devuelve - 1
     * Cada vez que se agrega un área, este valor toma la posición del área agregada en el ArrayList
     * @return int  - posición de la última área agregada
     */
    public int verUltimaArea();
    
    /**
     * Asigna en -1 la variable que controla la última área agregada
     * Sirve para manejar la tabla tablaAreas
     */
    public void cancelar();    
    
    /**
     * Devuelve el orden que ocupa el área en todo el conjunto de áreas
     * Si no existe el área especificada, devuelve -1
     * Este método es necesario para poder seleccionar las áreas a las que pertenece el trabajo en una JList
     * @param area área al cual se le determina el orden
     * @return int  - orden que ocupa el área
     */
    public int ordenArea(Area area);    
}

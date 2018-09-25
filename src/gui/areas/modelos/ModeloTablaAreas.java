/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.areas.modelos;

import gui.interfaces.IGestorAreas;
import java.util.ArrayList;
import java.util.List;
import javax.swing.table.AbstractTableModel;

/**
 * Clase para mostrar las áreas en una tabla
 */
public class ModeloTablaAreas extends AbstractTableModel {
    public static final String COLUMNA_NOMBRE = "Nombre";
    //constantes para los nombres de las columnas 
    private List<Area> areas;
    //los datos los saca de GestorAreas
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    
    /**
    * Constructor
    * @param nombre nombre que se usa para filtrar la búsqueda de áreas
    */                                                        
    public ModeloTablaAreas(String nombre) {
        this.nombresColumnas.add(COLUMNA_NOMBRE);
        IGestorAreas ga = GestorAreas.instanciar();        
        this.areas = ga.buscarAreas(nombre);
    }    
    
    
    /**
    * Obtiene el valor de la celda especificada
    * @param fila fila de la celda
    * @param columna columna de la celda
    * @return Object  - valor de la celda
    */                        
    @Override
    public Object getValueAt(int fila, int columna) {
        Area area = this.areas.get(fila);
        return area.verNombre();
    }
    
    /**
    * Obtiene la cantidad de columnas de la tabla
    * @return int  - cantidad de columnas de la tabla
    */                            
    @Override
    public int getColumnCount() { 
        return this.nombresColumnas.size();
    }

    /**
    * Obtiene la cantidad de filas de la tabla
    * @return int  - cantidad de filas de la tabla
    */                        
    @Override
    public int getRowCount() { 
        return this.areas.size();
    }

    /**
    * Obtiene el nombre de una columna
    * @param columna columna sobre la que se quiere obtener el nombre
    * @return String  - nombre de la columna especificada
    */                        
    @Override
    public String getColumnName(int columna) {
        return this.nombresColumnas.get(columna);
    }
    
    /**
    * Devuelve el Area correspondiente a la fila especificada dentro de la tabla
    * @param fila fila dentro de la tabla
    * @return Area  - objeto Area correspondiente a la fila que se especifica
    * @see Area
    */        
    public Area obtenerArea(int fila) {
        return this.areas.get(fila);
    }    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.modelos;

import gui.interfaces.IGestorPersonas;
import java.util.ArrayList;
import java.util.List;
import javax.swing.table.AbstractTableModel;

/**
 * Clase para mostrar los profesores en una tabla (en la ventana de profesores)
 */
public class ModeloTablaProfesores extends AbstractTableModel {
    private List<Profesor> profesores;
    //los datos los saca de GestorPersonas
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    
    /**
    * Constructor
    * @param apellidos apellidos que se usa para filtrar la búsqueda de profesores
    */                                                        
    public ModeloTablaProfesores(String apellidos) {
        this.nombresColumnas.add("Apellidos");
        this.nombresColumnas.add("Nombres");
        this.nombresColumnas.add("DNI");
        this.nombresColumnas.add("Cargo");
        IGestorPersonas gp = GestorPersonas.instanciar();        
        this.profesores = gp.buscarProfesores(apellidos);
    }    
    
    
    /**
    * Obtiene el valor de la celda especificada
    * @param fila fila de la celda
    * @param columna columna de la celda
    * @return Object  - valor de la celda
    */                        
    @Override
    public Object getValueAt(int fila, int columna) {
        Profesor profesor = this.profesores.get(fila);
        switch (columna) {
            case 0: return profesor.verApellidos();
            case 1: return profesor.verNombres();
            case 2: return profesor.verDni();            
            default: return profesor.verCargo();
        }
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
        return this.profesores.size();
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
    * Devuelve el Profesor correspondiente a la fila especificada dentro de la tabla
    * @param fila fila dentro de la tabla
    * @return Profesor  - objeto Profesor correspondiente a la fila que se especifica
    * @see Profesor
    */        
    public Profesor obtenerProfesor(int fila) {
        return this.profesores.get(fila);
    }    
}

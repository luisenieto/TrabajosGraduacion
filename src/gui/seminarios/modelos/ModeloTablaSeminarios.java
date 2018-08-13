/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.modelos;

import gui.trabajos.modelos.Trabajo;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.swing.table.AbstractTableModel;

/**
 * Clase para mostrar los seminarios en una tabla
 */
public class ModeloTablaSeminarios extends AbstractTableModel {
    private List<Seminario> seminarios;
    //los datos los saca del trabajo
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    private Trabajo trabajo;
    
    /**
    * Constructor
    * @param trabajo trabajo del cual se obtienen los seminarios
    */                                                        
    public ModeloTablaSeminarios(Trabajo trabajo) {
        this.nombresColumnas.add("Fecha");
        this.nombresColumnas.add("Nota");
        this.nombresColumnas.add("Observaciones");
        this.seminarios = trabajo.verSeminarios();
        this.trabajo = trabajo;
    }    
    
    
    /**
    * Obtiene el valor de la celda especificada
    * @param fila fila de la celda
    * @param columna columna de la celda
    * @return Object  - valor de la celda
    */                        
    @Override
    public Object getValueAt(int fila, int columna) {
        Seminario seminario = this.seminarios.get(fila);
        switch (columna) {
            case 0: String patron = "dd/MM/yyyy";
                    return seminario.verFechaExposicion().format(DateTimeFormatter.ofPattern(patron)); 
            case 1: return seminario.verNotaAprobacion();                      
            default: return seminario.verObservaciones();
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
        return this.seminarios.size();
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
    * Devuelve el Seminario correspondiente a la fila especificada dentro de la tabla
    * @param fila fila dentro de la tabla
    * @return Seminario  - objeto Seminario correspondiente a la fila que se especifica
    * @see Seminario
    */        
    public Seminario obtenerSeminario(int fila) {
        return this.seminarios.get(fila);
    }    
}

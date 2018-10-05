/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.modelos;

import gui.trabajos.modelos.Trabajo;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.swing.table.AbstractTableModel;

/**
 * Clase para mostrar los seminarios en una tabla
 */
public class ModeloTablaSeminarios extends AbstractTableModel {
    public static final String COLUMNA_FECHA = "Fecha";
    public static final String COLUMNA_NOTA = "Nota";
    public static final String COLUMNA_OBSERVACIONES = "Observaciones";
    //constantes para los nombres de las columnas 
    
    private List<Seminario> seminarios = new ArrayList<>();
    //los datos los saca del trabajo
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    private Trabajo trabajo;
    private static final String OBSERVACION_NULA = "-";
    //caracter para cuando no hay fecha
    
    /**
    * Constructor
    * @param trabajo trabajo del cual se obtienen los seminarios
    */                                                        
    public ModeloTablaSeminarios(Trabajo trabajo) {
        this.nombresColumnas.add(COLUMNA_FECHA);
        this.nombresColumnas.add(COLUMNA_NOTA);
        this.nombresColumnas.add(COLUMNA_OBSERVACIONES);
        this.seminarios = trabajo.verSeminarios();
        this.trabajo = trabajo;
        if (this.trabajo != null)
            this.seminarios = this.trabajo.verSeminarios();
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
            case 0: return this.transformarFechaEnCadena(seminario.verFechaExposicion());
            case 1: return seminario.verNotaAprobacion();                      
            default: if (seminario.verObservaciones() == null)
                        return OBSERVACION_NULA;
                     else
                        return seminario.verObservaciones();
        }
    }
    
    /**
     * Dada una fecha, devuelve una cadena de la forma dd/mm/aaaa
     * @param fecha fecha a transformar
     * @return String  - cadena con la representación de la fecha
     */
    private String transformarFechaEnCadena(LocalDate fecha) {        
        String patron = "dd/MM/yyyy";
        return fecha.format(DateTimeFormatter.ofPattern(patron));
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

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.modelos;

import gui.interfaces.IGestorTrabajos;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import javax.swing.table.AbstractTableModel;

public class ModeloTablaTrabajos extends AbstractTableModel {
    private List<Trabajo> trabajos = new ArrayList<>();
    //los datos los saca de GestorTrabajos
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    
    /**
    * Constructor
    */                                                        
    public ModeloTablaTrabajos() {
        this.nombresColumnas.add("Título");
        this.nombresColumnas.add("Duración");
        this.nombresColumnas.add("Area");
        this.nombresColumnas.add("Presentación");
        this.nombresColumnas.add("Aprobación");
        this.nombresColumnas.add("Exposición"); 
                
        IGestorTrabajos gt = GestorTrabajos.instanciar();
        this.trabajos = gt.buscarTrabajos(null); //todos los trabajos
    }    
    
    
    /**
    * Obtiene el valor de la celda especificada
    * @param fila fila de la celda
    * @param columna columna de la celda
    * @return Object  - valor de la celda
    */                        
    @Override
    public Object getValueAt(int fila, int columna) {
        Trabajo trabajo = this.trabajos.get(fila);
        String patron = "dd/MM/yyyy";
        switch (columna) {
            case 0: return trabajo.verTitulo();
            case 1: return trabajo.verDuracion();
            case 2: return trabajo.verArea();
            case 3: return trabajo.verFechaPresentacion().format(DateTimeFormatter.ofPattern(patron)); 
            case 4: return trabajo.verFechaAprobacion().format(DateTimeFormatter.ofPattern(patron)); 
            default:
                if (trabajo.verFechaFinalizacion() != null)
                    return trabajo.verFechaFinalizacion().format(DateTimeFormatter.ofPattern(patron));
                else
                    return "-";
            
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
        return this.trabajos.size();
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
    * Devuelve el Trabajo correspondiente a la fila especificada dentro de la tabla
    * @param fila fila dentro de la tabla
    * @return Trabajo  - objeto Trabajo correspondiente a la fila que se especifica
    * @see Trabajo
    */        
    public Trabajo obtenerTrabajo(int fila) {
        return this.trabajos.get(fila);
    }    
    
    
}

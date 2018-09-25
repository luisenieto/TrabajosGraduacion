/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.modelos;

import gui.interfaces.IGestorTrabajos;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.swing.table.AbstractTableModel;

public class ModeloTablaTrabajos extends AbstractTableModel {
    public static final String COLUMNA_TITULO = "Título";
    public static final String COLUMNA_DURACION = "Duración";
    public static final String COLUMNA_AREAS = "Areas";
    public static final String COLUMNA_PRESENTACION = "Presentación";
    public static final String COLUMNA_APROBACION = "Aprobación";
    public static final String COLUMNA_EXPOSICION = "Exposición";
    //constantes para los nombres de las columnas        
    
    private List<Trabajo> trabajos = new ArrayList<>();
    //los datos los saca de GestorTrabajos
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    private final char SEPARADOR = ';'; 
    //caracter usado como separador
    private static final String FECHA_NULA = "-";
    //caracter para cuando no hay fecha
    
    /**
    * Constructor
    */                                                        
    public ModeloTablaTrabajos() {
        this.nombresColumnas.add(COLUMNA_TITULO);
        this.nombresColumnas.add(COLUMNA_DURACION);
        this.nombresColumnas.add(COLUMNA_AREAS);
        this.nombresColumnas.add(COLUMNA_PRESENTACION);
        this.nombresColumnas.add(COLUMNA_APROBACION);
        this.nombresColumnas.add(COLUMNA_EXPOSICION); 
                
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
        switch (columna) {
            case 0: return trabajo.verTitulo();
            case 1: return trabajo.verDuracion();
            case 2: return this.transformarAreasEnCadena(trabajo);
            case 3: return this.transformarFechaEnCadena(trabajo.verFechaPresentacion());
            case 4: return this.transformarFechaEnCadena(trabajo.verFechaAprobacion());
            default:return this.transformarFechaEnCadena(trabajo.verFechaFinalizacion());
        }
    }
    
    /**
     * Dada una fecha, devuelve una cadena de la forma dd/mm/aaaa
     * Si la fecha es nula, devuelve el caracter usado para fechas nulas
     * @param fecha fecha a transformar
     * @return String  - cadena con la representación de la fecha
     */
    private String transformarFechaEnCadena(LocalDate fecha) {        
        if (fecha != null) {
            String patron = "dd/MM/yyyy";
            return fecha.format(DateTimeFormatter.ofPattern(patron));
        }
        else
            return FECHA_NULA;            
    }
    
    /**
     * Dadas las áreas de un trabajo, devuelve una cadena con las mismas separadas por algún caracter
     * @param trabajo trabajo del cual se ven sus áreas
     * @return String  - cadena con las áreas del trabajo
     */
    private String transformarAreasEnCadena(Trabajo trabajo) {
        String cadena = "";
        for(int i = 0; i < trabajo.verAreas().size() - 1; i++) {
            cadena += trabajo.verAreas().get(i).toString() + SEPARADOR;
        }
        cadena += trabajo.verAreas().get(trabajo.verAreas().size() - 1).toString(); //última área
                
        return cadena;
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

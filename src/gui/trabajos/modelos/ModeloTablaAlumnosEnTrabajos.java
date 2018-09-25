/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.modelos;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.swing.table.AbstractTableModel;

/**
 * Clase para mostrar en una tabla los alumnos que participan del trabajo
 */
public class ModeloTablaAlumnosEnTrabajos extends AbstractTableModel {
    public static final String COLUMNA_APELLIDOS = "Apellidos";
    public static final String COLUMNA_NOMBRES = "Nombres";
    public static final String COLUMNA_CX = "CX";
    public static final String COLUMNA_DESDE = "Desde";
    public static final String COLUMNA_HASTA = "Hasta";
    public static final String COLUMNA_RAZON = "Razón";
    //constantes para los nombres de las columnas
    
    private List<AlumnoEnTrabajo> aet = new ArrayList<>();
    //los datos los saca del trabajo
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    
    /**
    * Constructor
    * @param trabajo trabajo al cual se le muestran los alumnos
    */                                                        
    public ModeloTablaAlumnosEnTrabajos(Trabajo trabajo) {
        this.nombresColumnas.add(COLUMNA_APELLIDOS);
        this.nombresColumnas.add(COLUMNA_NOMBRES);
        this.nombresColumnas.add(COLUMNA_CX);
        this.nombresColumnas.add(COLUMNA_DESDE);
        this.nombresColumnas.add(COLUMNA_HASTA);
        this.nombresColumnas.add(COLUMNA_RAZON);
                
        if (trabajo != null)
            this.aet = trabajo.verAlumnos();
        //Si trabajo es null, se tienen que mostrar los nombres de las columnas
    }    
    
    
    /**
    * Obtiene el valor de la celda especificada
    * @param fila fila de la celda
    * @param columna columna de la celda
    * @return Object  - valor de la celda
    */                        
    @Override
    public Object getValueAt(int fila, int columna) {
        if (!this.aet.isEmpty()) {
            AlumnoEnTrabajo alumnoEnTrabajo = this.aet.get(fila);
            String patron = "dd/MM/yyyy";
            switch (columna) {
                case 0: return alumnoEnTrabajo.verAlumno().verApellidos();
                case 1: return alumnoEnTrabajo.verAlumno().verNombres();
                case 2: return alumnoEnTrabajo.verAlumno().verCX();
                case 3: return alumnoEnTrabajo.verFechaDesde().format(DateTimeFormatter.ofPattern(patron)); 
                case 4: 
                    if (alumnoEnTrabajo.verFechaHasta() != null)
                        return alumnoEnTrabajo.verFechaHasta().format(DateTimeFormatter.ofPattern(patron));
                    else
                        return "-";
                default:
                    if (alumnoEnTrabajo.verRazon() != null)
                        return alumnoEnTrabajo.verRazon();
                    else
                        return "-";            
            }            
        }
        else
            return null;
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
        return this.aet.size();
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
    * Devuelve el AlumnoEnTrabajo correspondiente a la fila especificada dentro de la tabla
    * @param fila fila dentro de la tabla
    * @return AlumnoEnTrabajo  - objeto AlumnoEnTrabajo correspondiente a la fila que se especifica
    * @see AlumnoEnTrabajo
    */        
    public AlumnoEnTrabajo obtenerAlumnoEnTrabajo(int fila) {
        return this.aet.get(fila);
    }    
}

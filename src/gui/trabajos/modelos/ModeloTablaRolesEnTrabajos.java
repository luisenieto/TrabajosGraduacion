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
 * Clase para mostrar en una tabla los profesores y sus roles dentro de un trabajo
 */
public class ModeloTablaRolesEnTrabajos extends AbstractTableModel {
    public static final String COLUMNA_PROFESOR = "Profesor";
    public static final String COLUMNA_ROL = "Rol";
    public static final String COLUMNA_DESDE = "Desde";
    public static final String COLUMNA_HASTA = "Hasta";
    public static final String COLUMNA_RAZON = "Razón";
    //constantes para los nombres de las columnas
    
    private List<RolEnTrabajo> ret = new ArrayList<>();
    //los datos los saca del trabajo
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    
    /**
    * Constructor
    * @param trabajo trabajo al cual se le muestran los profesores
    */                                                        
    public ModeloTablaRolesEnTrabajos(Trabajo trabajo) {
        this.nombresColumnas.add(COLUMNA_PROFESOR);
        this.nombresColumnas.add(COLUMNA_ROL);
        this.nombresColumnas.add(COLUMNA_DESDE);
        this.nombresColumnas.add(COLUMNA_HASTA);
        this.nombresColumnas.add(COLUMNA_RAZON); 

        if(trabajo != null)
            this.ret = trabajo.verProfesoresConRoles();
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
        if (!this.ret.isEmpty()) {
            RolEnTrabajo rolEnTrabajo = this.ret.get(fila);
            String patron = "dd/MM/yyyy";
            switch (columna) {
                case 0: return rolEnTrabajo.verProfesor().verApellidos() + ", " + rolEnTrabajo.verProfesor().verNombres();
                case 1: return rolEnTrabajo.verRol();
                case 2: return rolEnTrabajo.verFechaDesde().format(DateTimeFormatter.ofPattern(patron)); 
                case 3: 
                    if (rolEnTrabajo.verFechaHasta() != null)
                        return rolEnTrabajo.verFechaHasta().format(DateTimeFormatter.ofPattern(patron));
                    else
                        return "-";
                default:
                    if (rolEnTrabajo.verRazon() != null)
                        return rolEnTrabajo.verRazon();
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
        return this.ret.size();
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
    * Devuelve el RolEnTrabajo correspondiente a la fila especificada dentro de la tabla
    * @param fila fila dentro de la tabla
    * @return RolEnTrabajo  - objeto RolEnTrabajo correspondiente a la fila que se especifica
    * @see RolEnTrabajo
    */        
    public RolEnTrabajo obtenerRolEnTrabajo(int fila) {
        return this.ret.get(fila);
    }    
}

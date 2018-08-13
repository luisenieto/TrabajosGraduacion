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
 * Clase para mostrar los alumnos en una tabla
 */
public class ModeloTablaAlumnos extends AbstractTableModel {
    private List<Alumno> alumnos;
    //los datos los saca de GestorPersonas
    private List<String> nombresColumnas = new ArrayList<>();        
    //colección para guardar los nombres de las columnas
    
    /**
    * Constructor
    * @param apellidos apellidos que se usan para filtrar la búsqueda de alumnos
    */                                                        
    public ModeloTablaAlumnos(String apellidos) {
        this.nombresColumnas.add("Apellidos");
        this.nombresColumnas.add("Nombres");
        this.nombresColumnas.add("DNI");
        this.nombresColumnas.add("CX");
        IGestorPersonas gp = GestorPersonas.instanciar();        
        this.alumnos = gp.buscarAlumnos(apellidos);
    }    
    
    
    /**
    * Obtiene el valor de la celda especificada
    * @param fila fila de la celda
    * @param columna columna de la celda
    * @return Object  - valor de la celda
    */                        
    @Override
    public Object getValueAt(int fila, int columna) {
        Alumno alumno = this.alumnos.get(fila);
        switch (columna) {
            case 0: return alumno.verApellidos();
            case 1: return alumno.verNombres();
            case 2: return alumno.verDni();            
            default: return alumno.verCX();
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
        return this.alumnos.size();
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
    * Devuelve el Alumno correspondiente a la fila especificada dentro de la tabla
    * @param fila fila dentro de la tabla
    * @return Alumno  - objeto Alumno correspondiente a la fila que se especifica
    * @see Alumno
    */        
    public Alumno obtenerAlumno(int fila) {
        return this.alumnos.get(fila);
    }    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.seminarios.modelos;

import gui.auxiliares.fechas.ManejoDeFechas;
import gui.interfaces.IGestorSeminarios;
import gui.interfaces.IGestorTrabajos;
import gui.trabajos.modelos.GestorTrabajos;
import gui.trabajos.modelos.Trabajo;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author root
 */
public class GestorSeminarios implements IGestorSeminarios {
    private final String NOMBRE_ARCHIVO = "./Seminarios.txt";
    //nombre del archivo con los seminarios    
    private final char SEPARADOR = ';'; 
    //caracter usado como separador 
    
    private List<Seminario> seminarios = new ArrayList<>();    
    private static GestorSeminarios gestor;
            
    private final String OBSERVACIONES_NULAS = "-";
    //cadena usada para cuando no hay observaciones
        
    /**
     * Constructor
    */                                            
    private GestorSeminarios() {      
        this.leerArchivo();
    }
    
    /**
     * Método estático que permite crear una única instancia de GestorSeminarios
     * @return GestorSeminarios
    */                                                            
    public static GestorSeminarios instanciar() {
        if (gestor == null)
            gestor = new GestorSeminarios();            
        return gestor;
    }     

    /**
     * Crea un seminario para el trabajo especificado siempre y cuando no haya otro con la misma fecha
     * Y que la fecha de exposición del seminario sea posterior a la de aprobación del trabajo
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param trabajo trabajo al cual se le agrega un nuevo seminario
     * @param fechaExposicion fecha de exposición del seminario
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */
    @Override
    public String nuevoSeminario(Trabajo trabajo, LocalDate fechaExposicion, NotaAprobacion notaAprobacion, String observaciones) {
        if ((trabajo != null) && (fechaExposicion != null) && (notaAprobacion != null)) { //trabajo, fecha y nota especificados
            if ((notaAprobacion != NotaAprobacion.APROBADO_SO) && (observaciones == null))  //aprobado con observaciones o desaprobado sin las observaciones en ambos casos
                return ERROR_OBSERVACIONES;
            else { //seminario aprobado sin observaciones o con observaciones o desaprobado con las observaciones
                Seminario seminario = new Seminario(fechaExposicion, notaAprobacion, observaciones);
                String resultado = trabajo.agregarSeminario(seminario);
                if (resultado.equals(EXITO)) { //se pudo agregar el seminario al trabajo
                    resultado = this.escribirArchivo();
                    return (resultado.equals(ESCRITURA_OK) ? EXITO : resultado);
                }
                else  //no se pudo agregar el seminario al trabajo
                    return resultado;
            }
        }
        else //trabajo, fecha y/o nota sin especificar
            return ERROR;
    }

    /**
     * Modifica un seminario siempre y cuando no haya otro con la misma fecha
     * Si el seminario está aprobado con observaciones, o desaprobado, se deben especificar las observaciones
     * @param trabajo trabajo al cual se le modifica un seminario
     * @param seminario seminario a modificar
     * @param notaAprobacion nota de aprobación del seminario
     * @param observaciones observaciones del seminario
     * @return String  - cadena con el resultado de la operación
     */    
    @Override
    public String modificarSeminario(Trabajo trabajo, Seminario seminario, NotaAprobacion notaAprobacion, String observaciones) {
        if ((trabajo != null) && (seminario != null) && (notaAprobacion != null)) { //trabajo, seminario y nota especificados
            if ((notaAprobacion != NotaAprobacion.APROBADO_SO) && (observaciones == null))  //aprobado con observaciones o desaprobado sin las observaciones, en ambos casos
                return ERROR_OBSERVACIONES;
            else { //seminario aprobado sin observaciones o con observaciones o desaprobado con las observaciones
                seminario.asignarNotaAprobacion(notaAprobacion);
                seminario.asignarObservaciones(observaciones);
                String resultado = this.escribirArchivo();
                return (resultado.equals(ESCRITURA_OK) ? EXITO : resultado);
            }
        }
        else //trabajo, seminario, fecha y/o nota sin especificar
            return ERROR;
    }

    /**
     * Escribe en el archivo de texto el ArrayList
     * Formato del archivo:
     *  nombre trabajo 1;cantidad de seminarios;fecha seminario 1;nota 1;observaciones 1;fecha seminario 2;nota 2;-
     *  nombre trabajo 2;cantidad de seminarios;fecha seminario 1;nota 1;observaciones
     *  nombre trabajo 3;cantidad de seminarios
     * @return String  - cadena con el resultado de la operacion
     */
    private String escribirArchivo() {
        File file = new File(NOMBRE_ARCHIVO);
        String patron = "dd/MM/yyyy";
        int cantSeminarios = 0;
        IGestorTrabajos gt = GestorTrabajos.instanciar();
        List<Trabajo> trabajos = gt.buscarTrabajos(null); //lista con todos los trabajos
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {     
            for(Trabajo trabajo : trabajos) {
                String cadena = trabajo.verTitulo();
                cantSeminarios = trabajo.verSeminarios().size();
                cadena += SEPARADOR + Integer.toString(cantSeminarios); 
                if (cantSeminarios > 0) {
                    for(Seminario seminario : trabajo.verSeminarios()) {
                        LocalDate fExposicion = seminario.verFechaExposicion();
                        String fechaExposicion = fExposicion.format(DateTimeFormatter.ofPattern(patron)); 
                        cadena += SEPARADOR + fechaExposicion + SEPARADOR;
                        cadena += seminario.verNotaAprobacion().toString() + SEPARADOR;
                        if (seminario.verObservaciones() != null)
                            cadena += seminario.verObservaciones();
                        else
                            cadena += OBSERVACIONES_NULAS;
                    }
                }
                bw.write(cadena);
                bw.newLine();
            }
            return ESCRITURA_OK;
        } 
        catch (IOException ioe) {
            return ESCRITURA_ERROR;            
        }
    }    
    
    /**
     * Lee del archivo de texto y carga el ArrayList empleando un try con recursos
     * https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html
     * Formato del archivo:
     *  nombre trabajo 1;cantidad de seminarios;fecha seminario 1;nota 1;observaciones 1;fecha seminario 2;nota 2;-
     *  nombre trabajo 2;cantidad de seminarios;fecha seminario 1;nota 1;observaciones
     *  nombre trabajo 3;cantidad de seminarios
     * @return String  - cadena con el resultado de la operacion
     */
    private String leerArchivo() {
        File file = new File(NOMBRE_ARCHIVO);
        if (file.exists()) {
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                IGestorTrabajos gt = GestorTrabajos.instanciar();
                String cadena;
                while((cadena = br.readLine()) != null) {
                    String[] vector = cadena.split(Character.toString(SEPARADOR));
                    String tituloTrabajo = vector[0];
                    Trabajo trabajo = gt.dameTrabajo(tituloTrabajo);
                    
                    int cantSeminarios = Integer.parseInt(vector[1]);
                    if (cantSeminarios > 0) { //el trabajo tiene al menos 1 seminario
                        for(int i = 2; i <= cantSeminarios * 3 + 1; ) {
                            String fecha = vector[i++];
                            LocalDate fechaExposicion = ManejoDeFechas.transformarCadenaAFecha(fecha);

                            String nota = vector[i++];
                            NotaAprobacion notaAprobacion = NotaAprobacion.verNota(nota);

                            String obs = vector[i++];
                            if (obs.equals(OBSERVACIONES_NULAS))
                                obs = null;

                            trabajo.agregarSeminario(new Seminario(fechaExposicion, notaAprobacion, obs));
                        }
                    }
                }
                return LECTURA_OK;
            }
            catch (IOException ioe) {
                return LECTURA_ERROR;
            }
        }
        else
            return ARCHIVO_INEXISTENTE;
    }    
}

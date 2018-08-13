/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.personas.modelos;

import gui.interfaces.IGestorPersonas;
import gui.interfaces.IGestorTrabajos;
import gui.trabajos.modelos.GestorTrabajos;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GestorPersonas implements IGestorPersonas {
    private final String NOMBRE_ARCHIVO_PROFESORES = "./Profesores.txt";
    //nombre del archivo con los profesores    
    private final String NOMBRE_ARCHIVO_ALUMNOS = "./Alumnos.txt";
    //nombre del archivo con los alumnos    
    private final char SEPARADOR = ','; 
    //caracter usado como separador      
    
    private List<Persona> personas = new ArrayList<>();    
    private static GestorPersonas gestor;
    
    /**
     * Constructor
    */                                            
    private GestorPersonas() {   
        this.leerArchivoProfesores();
        this.leerArchivoAlumnos();
    }
    
    /**
     * Método estático que permite crear una única instancia de GestorMaterias
     * @return GestorMaterias
    */                                                            
    public static GestorPersonas instanciar() {
        if (gestor == null) 
            gestor = new GestorPersonas();            
        return gestor;
    } 
    
    /**
     * Crea un nuevo profesor
     * @param apellidos apellidos del profesor
     * @param nombres nombres del profesor
     * @param dni documento del profesor
     * @param cargo cargo del profesor
     * @return cadena con el resultado de la operación
    */                                                                    
    @Override
    public String nuevoProfesor(String apellidos, String nombres, int dni, Cargo cargo) {
        if ((apellidos != null) && (!apellidos.trim().isEmpty()) && (nombres != null) && (!nombres.trim().isEmpty()) && (dni > 0) && (cargo != null))  { //apellidos, nombres, dni y cargo correctos
            Persona profesor = new Profesor(apellidos, nombres, dni, cargo);
            if (!this.personas.contains(profesor)) { //no existe este profesor
                this.personas.add(profesor);
                String resultado = this.escribirArchivoProfesores();
                if (resultado.equals(ESCRITURA_PROFESORES_OK))
                    return EXITO_PROFESORES;
                else
                    return ESCRITURA_PROFESORES_ERROR;               
            }
            else //ya existe un profesor con este documento
                return PROFESORES_DUPLICADOS;
        }
        else  //apellidos y/o nombres y/o dni y/o cargo incorrectos
           return ERROR_PROFESORES;
    }

    /**
     * Crea un nuevo alumno
     * @param apellidos apellidos del alumno
     * @param nombres nombres del alumno
     * @param dni documento del profesor
     * @param cx cx del alumno
     * @return cadena con el resultado de la operación
    */                                                                    
    @Override
    public String nuevoAlumno(String apellidos, String nombres, int dni, String cx) {
        if ((apellidos != null) && (!apellidos.trim().isEmpty()) && (nombres != null) && (!nombres.trim().isEmpty()) && (dni > 0) && (cx != null) && (!cx.trim().isEmpty()))  { //apellidos, nombres, dni y cx correctos
            Persona alumno = new Alumno(apellidos, nombres, dni, cx);
            if (!this.personas.contains(alumno)) { //no existe este alumno
                this.personas.add(alumno);
                String resultado = this.escribirArchivoAlumnos();
                if (resultado.equals(ESCRITURA_ALUMNOS_OK))
                    return EXITO_ALUMNOS;
                else
                    return ESCRITURA_ALUMNOS_ERROR;               
            }
            else //ya existe un alumno con este documento
                return ALUMNOS_DUPLICADOS;
        }
        else  //apellidos y/o nombre y/o dni y/o CX incorrectos
           return ERROR_ALUMNOS;
    }
    
    /**
     * Modifica un profesor
     * @param profesor profesor a editar
     * @param apellidos apellidos del profesor
     * @param nombres nombres del profesor
     * @param cargo cargo del profesor
     * @return cadena con el resultado de la operación
    */                                                                    
    @Override
    public String modificarProfesor(Profesor profesor, String apellidos, String nombres, Cargo cargo) {        
        if (profesor != null) {
            if ((apellidos != null) && (!apellidos.trim().isEmpty()) && (nombres != null) && (!nombres.trim().isEmpty()) && (cargo != null))  { //apellidos, nombres y cargo correctos
                profesor.asignarApellidos(apellidos);
                profesor.asignarNombres(nombres);
                profesor.asignarCargo(cargo);
                String resultado = this.escribirArchivoProfesores();                      
                if (resultado.equals(ESCRITURA_PROFESORES_OK))
                    return EXITO_PROFESORES;
                else
                    return ESCRITURA_PROFESORES_ERROR;
            }
            else //apellidos y/o nombres y/o cargo incorrectos
                return ERROR_PROFESORES;
        }
        else
            return PROFESOR_INEXISTENTE;
    }    
    
    /**
     * Modifica un alumno
     * @param alumno alumno a editar
     * @param apellidos apellidos del profesor
     * @param nombres nombres del profesor
     * @param cx cx del alumno
     * @return cadena con el resultado de la operación
    */                                                                    
    @Override
    public String modificarAlumno(Alumno alumno, String apellidos, String nombres, String cx) {
        if (alumno != null) {
            if ((apellidos != null) && (!apellidos.trim().isEmpty()) && (nombres != null) && (!nombres.trim().isEmpty()) && (cx != null) && (!cx.trim().isEmpty()))  { //apellidos, nombres y cx correctos
                alumno.asignarApellidos(apellidos);
                alumno.asignarNombres(nombres);
                alumno.asignarCX(cx);
                String resultado = this.escribirArchivoAlumnos();                      
                if (resultado.equals(ESCRITURA_ALUMNOS_OK))
                    return EXITO_ALUMNOS;
                else
                    return ESCRITURA_ALUMNOS_ERROR;
            }
            else //apellidos y/o nombre y/o CX incorrectos
                return ERROR_ALUMNOS;
        }
        else 
            return ALUMNO_INEXISTENTE;
    }        
    
    /**
     * Busca si existe un profesor con el apellido especificado (total o parcialmente)
     * Si no se especifica un apellido, o si el mismo está vacío, devuelve todos los profesores
     * @param apellidos apellidos del profesor a buscar
     * @return List<Profesor>  - lista de profesores, ordenados por apellidos y nombres, cuyos apellidos coincidan con el especificado
    */                                                                            
    @Override
    public List<Profesor> buscarProfesores(String apellidos) {
        Collections.sort(this.personas);
        List<Profesor> profesoresBuscados = new ArrayList<>();
        for(Persona persona : this.personas) {
            if (persona instanceof Profesor) {
                if (apellidos != null) {
                    if (persona.verApellidos().toLowerCase().contains(apellidos.toLowerCase()))
                        profesoresBuscados.add((Profesor)persona);
                }
                else { //todos los profesores
                    profesoresBuscados.add((Profesor)persona);
                }                
            }
        }
        return profesoresBuscados;
    }    
        
    /**
     * Busca si existe un alumno con el apellido especificado (total o parcialmente)
     * Si no se especifica un apellido, o si el mismo está vacío, devuelve todos los alumnos
     * @param apellidos apellidos del alumno a buscar
     * @return List<Alumno>  - lista de alumnos, ordenados por apellidos y nombres, cuyos apellidos coincidan con el especificado
    */                                                                            
    @Override
    public List<Alumno> buscarAlumnos(String apellidos) {
        Collections.sort(this.personas);
        List<Alumno> alumnosBuscados = new ArrayList<>();
        for(Persona persona : this.personas) {
            if (persona instanceof Alumno) {
                if (apellidos != null) {
                    if (persona.verApellidos().toLowerCase().contains(apellidos.toLowerCase()))
                        alumnosBuscados.add((Alumno)persona);
                }
                else { //todos los alumnos
                    alumnosBuscados.add((Alumno)persona);
                }                
            }
        }
        return alumnosBuscados;
    }
    
    /**
     * Borra un profesor siempre y cuando no figure como tutor, cotutor y/o jurado de algún trabajo
     * @param profesor profesor a borrar
     * @return String  - cadena con el resultado de la operación
     */
    @Override
    public String borrarProfesor(Profesor profesor) {
        IGestorTrabajos gt = GestorTrabajos.instanciar();
        if (gt.hayTrabajosConEsteProfesor(profesor)) { //hay al menos un trabajo con este profesor
            return TRABAJO_CON_PROFESOR;
        }
        else { //no hay trabajos con este profesor
            this.personas.remove(profesor);
            String resultado = this.escribirArchivoProfesores();
            if (resultado.equals(ESCRITURA_PROFESORES_OK))
                return EXITO_PROFESORES;
            else
                return ESCRITURA_PROFESORES_ERROR;
        }
    }

    /**
     * Borra un alumno siempre y cuando no figure en algún trabajo
     * @param alumno alumno a borrar
     * @return String  - cadena con el resultado de la operación
     */
    @Override
    public String borrarAlumno(Alumno alumno) {
        IGestorTrabajos gt = GestorTrabajos.instanciar();
        if (gt.hayTrabajosConEsteAlumno(alumno)) { //hay al menos un trabajo con este alumno
            return TRABAJO_CON_ALUMNO;
        }
        else { //no hay trabajos con este profesor
            this.personas.remove(alumno);
            String resultado = this.escribirArchivoProfesores();
            if (resultado.equals(ESCRITURA_ALUMNOS_OK))
                return EXITO_ALUMNOS;
            else
                return ESCRITURA_ALUMNOS_ERROR;
        }
    }    
    
    /**
     * Busca si existe un profesor cuyo documento coincida con el especificado
     * Si existe un profesor con el documento especificado, lo devuelve
     * Si no hay un profesor con el documento especicado, devuelve null
     * A este método lo usa la clase GestorTrabajos
     * @param documento documento del profesor a buscar
     * @return Profesor  - objeto Profesor cuyo documento coincida con el especificado, o null
     */
    @Override
    public Profesor dameProfesor(int documento) {
        for(Persona persona : this.personas) {
            if ((persona instanceof Profesor) && (persona.verDni() == documento))
                return (Profesor)persona;
        }
        return null;        
    }
    
    /**
     * Busca si existe un alumno cuyo cx coincida con el especificado
     * Si existe un alumno con el cx especificado, lo devuelve
     * Si no hay un alumno con el cx especicado, devuelve null
     * A este método lo usa la clase GestorTrabajos
     * @param cx cx del alumno a buscar
     * @return Alumno  - objeto Alumno cuyo cx coincida con el especificado, o null
     */
    @Override
    public Alumno dameAlumno(String cx) {
        for(Persona persona : this.personas) {
            if ((persona instanceof Alumno) && (((Alumno)persona).verCX().equals(cx)))
                return (Alumno)persona;
        }
        return null;        
    }    
    
    /**
     * Devuelve el orden que ocupa el profesor en todo el conjunto de profesores
     * Si no existe el profesor especificado, devuelve -1
     * Este método es necesario para poder seleccionar los 3 profesores que integran el jurado en una JList
     * @param profesor profesor al cual se le determina el orden
     * @return int  - orden que ocupa el profesor
     */
    @Override
    public int ordenProfesor(Profesor profesor) {
        List<Profesor> profesores = this.buscarProfesores(null);
        return profesores.indexOf(profesor);
    }   
    
    /**
     * Devuelve el orden que ocupa el alumno en todo el conjunto de alumnos
     * Si no existe el alumno especificado, devuelve -1
     * Este método es necesario para poder seleccionar los alumnos que participan en el trabajo en una JList
     * @param alumno alumno al cual se le determina el orden
     * @return int  - orden que ocupa el alumno
     */
    @Override
    public int ordenAlumno(Alumno alumno) {
        List<Alumno> alumnos = this.buscarAlumnos(null);
        return alumnos.indexOf(alumno);
    }    
        
    /**
     * Lee del archivo de texto y carga el ArrayList empleando un try con recursos
     * https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html
     * Formato del archivo (suponiendo que la coma sea el separador):
     *  apellidos 1,nombres 1,dni 1,CX 1 
     *  apellidos 2,nombres 2,dni 2,CX 2 
     *  apellidos 3,nombres 3,dni 3,CX 3 
     *  apellidos 4,nombres 4,dni 4,CX 4 
     * @return String  - cadena con el resultado de la operacion
     */
    private String leerArchivoAlumnos() {
        File file = new File(NOMBRE_ARCHIVO_ALUMNOS);
        if (file.exists()) {
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                String cadena;
                while((cadena = br.readLine()) != null) {
                    String[] vector = cadena.split(Character.toString(SEPARADOR));
                    String apellidos = vector[0];
                    String nombres = vector[1];
                    int dni = Integer.parseInt(vector[2]);                    
                    String cx = vector[3];
                    Persona alumno = new Alumno(apellidos, nombres, dni, cx);
                    this.personas.add(alumno);
                }
                return LECTURA_ALUMNOS_OK;
            }
            catch (IOException ioe) {
                return LECTURA_ALUMNOS_ERROR;
            }
        }
        return ARCHIVO_ALUMNOS_INEXISTENTE;
    }                    
    
    /**
     * Lee del archivo de texto y carga el ArrayList empleando un try con recursos
     * https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html
     * Formato del archivo (suponiendo que la coma sea el separador):
     *  apellidos 1,nombres 1,dni 1,cargo 1 
     *  apellidos 2,nombres 2,dni 2,cargo 1 
     *  apellidos 3,nombres 3,dni 3,cargo 2 
     *  apellidos 4,nombres 4,dni 4,cargo 3
     * @return String  - cadena con el resultado de la operacion
     */
    private String leerArchivoProfesores() {
        File file = new File(NOMBRE_ARCHIVO_PROFESORES);
        if (file.exists()) {
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                String cadena;
                while((cadena = br.readLine()) != null) {
                    String[] vector = cadena.split(Character.toString(SEPARADOR));
                    String apellidos = vector[0];
                    String nombres = vector[1];
                    int dni = Integer.parseInt(vector[2]);                    
                    String cadenaCargo = vector[3];
                    Cargo cargo = this.obtenerCargo(cadenaCargo);
                    Persona profesor = new Profesor(apellidos, nombres, dni, cargo);
                    this.personas.add(profesor);
                }
                return LECTURA_PROFESORES_OK;
            }
            catch (IOException ioe) {
                return LECTURA_PROFESORES_ERROR;
            }
        }
        return ARCHIVO_PROFESORES_INEXISTENTE;
    }    
    
    /**
     * Transforma una cadena en el valor de su enumeración correspondiente
     * @param cargo
     * @return Cargo
     */
    private Cargo obtenerCargo(String cargo) {
        if (cargo.trim().equals("Titular"))
            return Cargo.TITULAR;
        else if (cargo.trim().equals("Asociado"))
            return Cargo.ASOCIADO;
        else if (cargo.trim().equals("Adjunto"))
            return Cargo.ADJUNTO;
        else if (cargo.trim().equals("Jefe de Trabajos Prácticos"))
            return Cargo.JTP;
        else
            return Cargo.ADG;
    }        
    
    /**
     * Escribe en el archivo de texto el ArrayList
     * Formato del archivo (suponiendo que la coma sea el separador):
     *  apellidos 1,nombres 1,dni 1,CX 1 
     *  apellidos 2,nombres 2,dni 2,CX 2 
     *  apellidos 3,nombres 3,dni 3,CX 3 
     *  apellidos 4,nombres 4,dni 4,CX 4 
     * @return String  - cadena con el resultado de la operacion
     */
    private String escribirArchivoAlumnos() {
        File file = new File(NOMBRE_ARCHIVO_ALUMNOS);
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {     
            for(Persona persona : this.personas) {
                if (persona instanceof Alumno) {
                    String cadena = persona.verApellidos() + SEPARADOR;
                    cadena += persona.verNombres();
                    cadena += SEPARADOR + Integer.toString(persona.verDni()) + SEPARADOR;
                    cadena += ((Alumno)persona).verCX();
                    bw.write(cadena);
                    bw.newLine();
                }
            }
            return ESCRITURA_ALUMNOS_OK;
        } 
        catch (IOException ioe) {
            return ESCRITURA_ALUMNOS_ERROR;            
        }
    } 
        
    /**
     * Escribe en el archivo de texto el ArrayList
     * Formato del archivo (suponiendo que la coma sea el separador):
     *  apellidos 1,nombres 1,dni 1,cargo 1 
     *  apellidos 2,nombres 2,dni 2,cargo 1 
     *  apellidos 3,nombres 3,dni 3,cargo 2 
     *  apellidos 4,nombres 4,dni 4,cargo 3
     * @return String  - cadena con el resultado de la operacion
     */
    private String escribirArchivoProfesores() {
        File file = new File(NOMBRE_ARCHIVO_PROFESORES);
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {     
            for(Persona persona : this.personas) {
                if (persona instanceof Profesor) {
                    String cadena = persona.verApellidos() + SEPARADOR;
                    cadena += persona.verNombres();
                    cadena += SEPARADOR + Integer.toString(persona.verDni()) + SEPARADOR;
                    cadena += ((Profesor)persona).verCargo();
                    bw.write(cadena);
                    bw.newLine();
                }
            }
            return ESCRITURA_PROFESORES_OK;
        } 
        catch (IOException ioe) {
            return ESCRITURA_PROFESORES_ERROR;            
        }
    }         
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.auxiliares.fechas;

import java.time.LocalDate;

/**
 *
 * @author root
 */
public class ManejoDeFechas {
    public static final String SEPARADOR_FECHAS = "/";
    
    /**
     * Transforma una fecha expresada en cadena de la forma dd/mm/aaaa en un objeto LocalDate
     * @param cadenaFecha cadena con la fecha a transformar
     * @return LocalDate  - objeto LocalDate transformado
     */
    public static LocalDate transformarCadenaAFecha(String cadenaFecha) {
        String[] vector = cadenaFecha.split(SEPARADOR_FECHAS);
        int dia = Integer.parseInt(vector[0]);
        int mes = Integer.parseInt(vector[1]);
        int anio = Integer.parseInt(vector[2]);
        return LocalDate.of(anio, mes, dia);
    }
}

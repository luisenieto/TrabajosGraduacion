/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui.trabajos.vistas;

import com.toedter.calendar.JDateChooser;
import gui.interfaces.IControladorModificarProfesor;
import java.awt.Dialog;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JTextField;

public class VentanaModificarProfesor extends JDialog {
    private IControladorModificarProfesor controlador;

    /**
     * Constructor
     * @param controlador controlador de la ventana
     * @param ventanaPadre ventana padre (VentanaTrabajos en este caso)
     */
    public VentanaModificarProfesor(IControladorModificarProfesor controlador, Dialog ventanaPadre) {
        super(ventanaPadre, true);
        initComponents();
        this.controlador = controlador;
    }
    
    /**
     * Devuelve el campo de texto txtProfesor
     * @return JTextField  - campo de texto txtProfesor
     */    
    public JTextField verTxtProfesor() {
        return this.txtProfesor;
    }    
    
    /**
     * Devuelve el campo de texto txtRol
     * @return JTextField  - campo de texto txtRol
     */    
    public JTextField verTxtRol() {
        return this.txtRol;
    }        

    /**
     * Devuelve el campo de texto txtDesde
     * @return JTextField  - campo de texto txtDesde
     */    
    public JTextField verTxtDesde() {
        return this.txtDesde;
    }        
    
    /**
     * Devuelve el campo de fecha fechaHasta
     * @return JTextField  - campo de fecha fechaHasta
     */    
    public JDateChooser verFechaHasta() {
        return this.fechaHasta;
    }   
    
    /**
     * Devuelve el campo de texto txtRazon
     * @return JTextField  - campo de texto txtRazon
     */    
    public JTextField verTxtRazon() {
        return this.txtRazon;
    }            
    
    /**
     * Devuelve el combo comboProfesor
     * @return JComboBox  - combo comboProfesor
     */    
    public JComboBox verComboProfesor() {
        return this.comboProfesor;
    }            
    
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel1 = new javax.swing.JLabel();
        txtProfesor = new javax.swing.JTextField();
        jLabel2 = new javax.swing.JLabel();
        txtRol = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        txtDesde = new javax.swing.JTextField();
        jLabel4 = new javax.swing.JLabel();
        fechaHasta = new com.toedter.calendar.JDateChooser();
        jLabel5 = new javax.swing.JLabel();
        txtRazon = new javax.swing.JTextField();
        jLabel6 = new javax.swing.JLabel();
        comboProfesor = new javax.swing.JComboBox<>();
        btnCancelar = new javax.swing.JButton();
        btnAceptar = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("Modificar profesor en el trabajo");
        setResizable(false);

        jLabel1.setText("Profesor:");

        jLabel2.setText("Rol:");

        jLabel3.setText("Desde:");

        jLabel4.setText("Hasta:");

        fechaHasta.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyPressed(java.awt.event.KeyEvent evt) {
                fechaHastaPresionarTecla(evt);
            }
        });

        jLabel5.setText("Raz??n:");

        txtRazon.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyPressed(java.awt.event.KeyEvent evt) {
                txtRazonPresionarTecla(evt);
            }
        });

        jLabel6.setText("Profesor:");

        comboProfesor.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Item 1", "Item 2", "Item 3", "Item 4" }));

        btnCancelar.setMnemonic('C');
        btnCancelar.setText("Cancelar");
        btnCancelar.setToolTipText("Cancela la operaci??n");
        btnCancelar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnCancelarClic(evt);
            }
        });

        btnAceptar.setMnemonic('A');
        btnAceptar.setText("Aceptar");
        btnAceptar.setToolTipText("Modifica el profesor");
        btnAceptar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnAceptarClicTecla(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel1)
                            .addComponent(jLabel2)
                            .addComponent(jLabel3)
                            .addComponent(jLabel4)
                            .addComponent(jLabel5))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(txtProfesor)
                            .addComponent(txtRol)
                            .addComponent(txtDesde)
                            .addComponent(fechaHasta, javax.swing.GroupLayout.DEFAULT_SIZE, 299, Short.MAX_VALUE)
                            .addComponent(txtRazon)))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jLabel6)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(comboProfesor, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGap(0, 0, Short.MAX_VALUE)
                        .addComponent(btnAceptar)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(btnCancelar)))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1)
                    .addComponent(txtProfesor, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtRol, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel2))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtDesde, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel3))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(fechaHasta, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel4))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtRazon, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel5))
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel6)
                    .addComponent(comboProfesor, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 68, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btnCancelar)
                    .addComponent(btnAceptar))
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void txtRazonPresionarTecla(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_txtRazonPresionarTecla
        this.controlador.txtRazonPresionarTecla(evt);
    }//GEN-LAST:event_txtRazonPresionarTecla

    private void fechaHastaPresionarTecla(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_fechaHastaPresionarTecla
        this.controlador.fechaHastaPresionarTecla(evt);
    }//GEN-LAST:event_fechaHastaPresionarTecla

    private void btnAceptarClicTecla(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnAceptarClicTecla
        this.controlador.btnAceptarClic(evt);
    }//GEN-LAST:event_btnAceptarClicTecla

    private void btnCancelarClic(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnCancelarClic
        this.controlador.btnCancelarClic(evt);
    }//GEN-LAST:event_btnCancelarClic


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnAceptar;
    private javax.swing.JButton btnCancelar;
    private javax.swing.JComboBox<String> comboProfesor;
    private com.toedter.calendar.JDateChooser fechaHasta;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JTextField txtDesde;
    private javax.swing.JTextField txtProfesor;
    private javax.swing.JTextField txtRazon;
    private javax.swing.JTextField txtRol;
    // End of variables declaration//GEN-END:variables
}

package com.demo.nuxtendemo.services;

import net.sf.jasperreports.engine.JasperCompileManager;

public class CompileJasperReport {

    public static void main(String[] args) {
        try {
            // Ruta al archivo JRXML
            String jrxmlFile = "D:/trabajoDeGrado/Repository/nuxten_project/nuxtendemo/nuxtendemo/src/main/resources/nuxtenReport.jrxml";

            // Compilar el archivo JRXML y generar el archivo Jasper
            JasperCompileManager.compileReportToFile(jrxmlFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

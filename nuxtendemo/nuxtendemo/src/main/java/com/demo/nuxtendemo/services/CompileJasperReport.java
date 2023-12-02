package com.demo.nuxtendemo.services;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

public class CompileJasperReport {

    /**public static void main(String[] args) {
        try {
            // Ruta al archivo JRXML
            String jrxmlFile = "D:/trabajoDeGrado/Repository/nuxten_project/nuxtendemo/nuxtendemo/src/main/resources/nuxtenReport.jrxml";

            // Compilar el archivo JRXML y generar el archivo Jasper
            JasperCompileManager.compileReportToFile(jrxmlFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }*/

    public static void main(String[] args) {
        try {

            Resource resource = new ClassPathResource("nuxtenReport.jrxml");
            String reportPath = resource.getFile().getAbsolutePath();
            JasperCompileManager.compileReportToFile(reportPath);

        } catch (JRException e) {
            e.printStackTrace();
            System.err.println("Error al compilar el archivo JRXML: " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    }

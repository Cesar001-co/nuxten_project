package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.repository.EvaluacionRepository;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MyReportService {

    @Autowired
    private EvaluacionRepository evaluacionRepository; // Reemplaza con tu lógica de acceso a datos

    public JasperPrint generateReports(Long idEvaluacion, String nombreSitio, String urlSitio, String tipoSitio, String fechaCreacion) {
        // Fetch data from the database using Spring Data JPA or JDBC
        List<EvaluacionesEntity> data = evaluacionRepository.findAll(); // Reemplaza con tu lógica de acceso a datos

        // Create parameters for the report
        Map<String, Object> params = new HashMap<>();
        params.put("idEvaluacion", idEvaluacion);
        params.put("nombreSitio", nombreSitio);
        params.put("urlSitio", urlSitio);
        params.put("tipoSitio", tipoSitio);
        params.put("fechaCreacion", fechaCreacion);

        // Convert your data to a JRBeanCollectionDataSource
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(data);

        try {
            // Path to your compiled JasperReport file
            //String reportPath = "D:/trabajoDeGrado/Repository/nuxten_project/nuxtendemo/nuxtendemo/src/main/resources/nuxtenReport.jasper";
// Path to your compiled JasperReport file
            String reportPath = "D:/trabajoDeGrado/Repository/nuxten_project/nuxtendemo/nuxtendemo/src/main/resources/nuxtenReport.jasper";


            // Generate the JasperPrint
            return JasperFillManager.fillReport(reportPath, params, dataSource);
        } catch (Exception e) {
            e.printStackTrace(); // Handle or log the exception as needed
            return null;
        }
    }

    public JasperPrint generateReport(Long idEvaluacion, String nombreSitio, String urlSitio, String tipoSitio, String fechaCreacion) {
        // Fetch data from the database using Spring Data JPA or JDBC
        List<EvaluacionesEntity> data = evaluacionRepository.findAll(); // Reemplaza con tu lógica de acceso a datos

        // Create parameters for the report
        Map<String, Object> params = new HashMap<>();
        params.put("idEvaluacion", idEvaluacion);
        params.put("nombreSitio", nombreSitio);
        params.put("urlSitio", urlSitio);
        params.put("tipoSitio", tipoSitio);
        params.put("fechaCreacion", fechaCreacion);

        // Obtener la referencia a la imagen en el classpath
        Resource resource = new ClassPathResource("recursos/logotipo.png");

        // Obtener la ruta absoluta de la imagen
        String rutaImagen;
        try {
            rutaImagen = resource.getFile().getAbsolutePath();
        } catch (IOException e) {
            // Manejar la excepción según sea necesario
            throw new RuntimeException("Error al obtener la ruta de la imagen.", e);
        }

        // Pasar la ruta de la imagen como parámetro al informe
        params.put("RUTA_IMAGEN", rutaImagen);

        // Convert your data to a JRBeanCollectionDataSource
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(data);

        try {
            // Path to your compiled JasperReport file
            String reportPath = "D:/trabajoDeGrado/Repository/nuxten_project/nuxtendemo/nuxtendemo/src/main/resources/nuxtenReport.jasper";

            // Generate the JasperPrint
            return JasperFillManager.fillReport(reportPath, params, dataSource);
        } catch (Exception e) {
            e.printStackTrace(); // Handle or log the exception as needed
            return null;
        }
    }
}

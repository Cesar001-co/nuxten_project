package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.repository.EvaluacionRepository;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MyReportService {

    @Autowired
    private EvaluacionRepository evaluacionRepository;

    //Servicio encargado de generar el reporte por idEvaluacion
    public JasperPrint generateReportFromEntity(EvaluacionesEntity evaluacionEntity) {

        Map<String, Object> params = new HashMap<>();
        params.put("idEvaluacion", evaluacionEntity.getIdEvaluacion());
        params.put("nombreSitio", evaluacionEntity.getNombreSitio());
        params.put("urlSitio", evaluacionEntity.getUrlSitio());
        params.put("tipoSitio", evaluacionEntity.getTipoSitio());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String fechaCreacionStr = evaluacionEntity.getFechaCreacion().format(formatter);
        params.put("fechaCreacion", fechaCreacionStr);

        Resource resource = new ClassPathResource("recursos/logotipo.png");

        // Obtener la ruta absoluta de la imagen
        String rutaImagen;

        try {
            rutaImagen = resource.getFile().getAbsolutePath();
        } catch (IOException e) {
            // Manejar la excepción según sea necesario
            throw new RuntimeException("Error al obtener la ruta de la imagen.", e);
        }
        params.put("RUTA_IMAGEN", rutaImagen);

        try {
            String reportPath = "D:/trabajoDeGrado/Repository/nuxten_project/nuxtendemo/nuxtendemo/src/main/resources/nuxtenReport.jasper";
            return JasperFillManager.fillReport(reportPath, params, new JREmptyDataSource());

        } catch (Exception e) {
            e.printStackTrace(); // Handle or log the exception as needed
            return null;
        }
    }

}

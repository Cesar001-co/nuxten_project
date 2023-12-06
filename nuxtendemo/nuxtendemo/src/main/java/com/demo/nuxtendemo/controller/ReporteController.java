package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.DTO.ReporteEvaluacionDTO;
import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.services.EvaluacionServices;
import com.demo.nuxtendemo.services.MyReportService;
import com.demo.nuxtendemo.services.UsuarioServices;
import jakarta.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reporteController")
public class ReporteController {

    @Autowired
    private EvaluacionServices evaluacionServices;

    @Autowired
    private MyReportService reportService;

    @Autowired
    private UsuarioServices usuariosServices;

    //Para abrir el archivo en el navegador: http://localhost:8080/reporteController/generarReportePDF/{idEvaluacion}

    // Constructor injection
    public void ReportController(MyReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping(value = "/generarReportePDF/{idEvaluacion}", produces = MediaType.APPLICATION_PDF_VALUE)
    public void generateReport(@PathVariable Long idEvaluacion, HttpServletResponse response) throws IOException {
        try {
            EvaluacionesEntity evaluacionEntity = evaluacionServices.findByIdEvaluacion(idEvaluacion);

            if (evaluacionEntity != null) {
                // Obtener la lista de usuarios relacionados con la evaluación
                List<UsuariosEntity> usuariosList = usuariosServices.findByIdEvaluacion(idEvaluacion);

                // Convertir la lista de entidades a una lista de DTO
                List<ReporteEvaluacionDTO> usuariosDTOList = usuariosList.stream()
                        .map(usuario -> new ReporteEvaluacionDTO(
                                usuario.getNombreExperto(),
                                usuario.getEmail(),
                                usuario.getNumero(),
                                evaluacionEntity.getIdEvaluacion().toString(),
                                evaluacionEntity.getNombreSitio(),
                                evaluacionEntity.getUrlSitio(),
                                evaluacionEntity.getTipoSitio(),
                                evaluacionEntity.getFechaCreacion().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                        ))
                        .collect(Collectors.toList());

                // Generar el informe a partir de la lista de DTO
                JasperPrint jasperPrint = reportService.generateReportFromDTO(usuariosDTOList);

                // Configurar la respuesta HTTP
                response.setContentType("application/pdf");
                response.setHeader("Content-Disposition", "inline; filename=reporteEvaluacion.pdf");

                // Exportar el informe a PDF
                JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Evaluación no encontrada");
            }
        } catch (IOException | JRException e) {
            e.printStackTrace(); // Manejar o registrar la excepción según sea necesario
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al generar el informe");
        }
    }


    /**@GetMapping(value = "/generarReportePDF/{idEvaluacion}", produces = MediaType.APPLICATION_PDF_VALUE)
    public void generateReportq(@PathVariable Long idEvaluacion, HttpServletResponse response) throws IOException {
        try {
            JasperPrint jasperPrint = reportService.generateReportFromEntity(idEvaluacion);
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=reporteEvaluacion.pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());

        } catch (JRException e) {
            e.printStackTrace(); // Manejar o registrar la excepción según sea necesario
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al generar el informe");
        }
    }

    // Método para generar el reporte en PDF
    /**@GetMapping(value = "/generarReportePDFs/{idEvaluacion}", produces = MediaType.APPLICATION_PDF_VALUE)
    public void generateReports(@PathVariable Long idEvaluacion, HttpServletResponse response) throws IOException {
        try {
            EvaluacionesEntity evaluacionEntity = evaluacionServices.findByIdEvaluacion(idEvaluacion);

            if(evaluacionEntity != null) {
                JasperPrint jasperPrint = reportService.generateReportFromEntity(evaluacionEntity);
                response.setContentType("application/pdf");
                response.setHeader("Content-Disposition", "inline; filename=reporteEvaluacion.pdf");
                JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
            }else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Evaluación no encontrada");
            }

        } catch (JRException e) {
            e.printStackTrace();
        }
    }*/



}

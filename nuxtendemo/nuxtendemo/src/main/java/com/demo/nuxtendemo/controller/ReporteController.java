package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.DTO.ReporteEvaluacionDTO;
import com.demo.nuxtendemo.DTO.generarReporteDTO;
import com.demo.nuxtendemo.DTO.guardarReporteDTO;
import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.ExpertosEntity;
import com.demo.nuxtendemo.entitys.ReportesEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.services.*;
import jakarta.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private ReporteServices reportesService;


    //Para abrir el archivo en el navegador: http://localhost:8080/reporteController/generarReportePDF/{idEvaluacion}

    // Constructor injection
    public void ReportController(MyReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping(value = "/generarReportePDF", produces = MediaType.APPLICATION_PDF_VALUE)
    public void generateReport(HttpServletResponse response, @RequestBody generarReporteDTO inDTO) throws IOException {
        try {
            EvaluacionesEntity evaluacionEntity = evaluacionServices.findByIdEvaluacion(inDTO.getIdEvaluacion());

            if (evaluacionEntity != null) {
                // Obtener la lista de usuarios relacionados con la evaluación
                List<UsuariosEntity> usuariosList = usuariosServices.findByIdEvaluacion(inDTO.getIdEvaluacion());

                // Convertir la lista de entidades a una lista de DTO
                List<ReporteEvaluacionDTO> usuariosDTOList = usuariosList.stream()
                        .map(usuario -> new ReporteEvaluacionDTO(
                                usuario.getNombreExperto(),
                                usuario.getEmail(),
                                usuario.getNumero(),
                                evaluacionEntity.getIdEvaluacion(),
                                evaluacionEntity.getNombreSitio(),
                                evaluacionEntity.getUrlSitio(),
                                evaluacionEntity.getTipoSitio(),
                                evaluacionEntity.getFechaCreacion().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                        ))
                        .collect(Collectors.toList());

                // Generar el informe a partir de la lista de DTO
                JasperPrint jasperPrint = reportService.generateReportFromDTO(usuariosDTOList, inDTO.getProblemas());

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

    @PostMapping("/testDTO")
    public ResponseEntity<String> testDTO(@RequestBody generarReporteDTO pruebaDTO) {
        try {
            String mensaje = String.format("DTO recibido correctamente: %s", pruebaDTO.toString());

            return ResponseEntity.ok(mensaje);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor");
        }
    }


    // Método para guardar el reporte en la base de datos
    @PostMapping("/saveReportData")
    public ResponseEntity<String> saveReportData(@RequestBody guardarReporteDTO reporteDTO) {

        try {
            byte[] reporteBytes = reporteDTO.getArchivoReporte().getBytes();
            reportesService.crearReporte(reporteDTO.getNombreSitio(), reporteDTO.getVerUrl(),
                    reporteDTO.getIdEvaluacion(), reporteBytes, reporteDTO.getIdGrupo());

            return ResponseEntity.ok("Reporte creado exitosamente.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el reporte.");
        }
    }

    // Método para obtener los reportes por idGrupo
    @GetMapping("/obtenerReportesPorIdUser/{idUser}")
    public ResponseEntity<List<ReportesEntity>> obtenerReportesPorIdUser(@PathVariable Long idUser) {
        List<ReportesEntity> reportes = reportesService.obtenerReportesPorIdUser(idUser);

        if (!reportes.isEmpty()) {
            return new ResponseEntity<>(reportes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    //Metodo encarga de eliminar un reporte en la base de datos por idReporte
    @DeleteMapping("/deleteByIdReporte/{idReporte}")
    public ResponseEntity<String> deleteByIdReporte(@PathVariable("idReporte") Long idReporte) {
        try {
            reportesService.deleteById(idReporte);
            return ResponseEntity.ok("Reporte eliminado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el reporte: " + e.getMessage());
        }
    }
}

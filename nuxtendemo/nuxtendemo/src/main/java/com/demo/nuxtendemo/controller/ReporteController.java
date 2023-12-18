package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.DTO.guardarReporteDTO;
import com.demo.nuxtendemo.entitys.ReportesEntity;
import com.demo.nuxtendemo.services.ReporteServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Clase encargada de controlar las peticiones de los reportes
 */
@RestController
@RequestMapping("/reporteController")
public class ReporteController {

    @Autowired
    private ReporteServices reporteService;

    // Método para obtener los reportes por idGrupo
    @GetMapping("/obtenerReportesPorIdUser/{idUser}")
    public ResponseEntity<List<ReportesEntity>> obtenerReportesPorIdUser(@PathVariable Long idUser) {
        List<ReportesEntity> reportes = reporteService.obtenerReportesPorIdUser(idUser);

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
            reporteService.deleteById(idReporte);
            return ResponseEntity.ok("Reporte eliminado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el reporte: " + e.getMessage());
        }
    }

    // Método para obtener todos los reportes
    @GetMapping("/findAllReportes")
    public List<ReportesEntity> findAllReported() {
        return reporteService.findAll();
    }

    @GetMapping("/descargar/{idReporte}")
    public ResponseEntity<byte[]> descargarReporte(@PathVariable Long idReporte) {
        byte[] reporte = reporteService.descargarReporte(idReporte);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "reporte_" + idReporte + ".pdf");

        return new ResponseEntity<>(reporte, headers, HttpStatus.OK);
    }


    // Método para guardar el reporte en la base de datos
    @PostMapping("/saveReportData")
    public ResponseEntity<String> saveReportData(@RequestBody guardarReporteDTO reporteDTO) {

        try {
            byte[] reporteBytes = reporteDTO.getArchivoReporte().getBytes();
            reporteService.crearReporte(reporteDTO.getNombreSitio(), reporteDTO.getVerUrl(),
                    reporteDTO.getIdEvaluacion(), reporteBytes, reporteDTO.getIdGrupo());

            return ResponseEntity.ok("Reporte creado exitosamente.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el reporte.");
        }
    }


}

package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.ReportesEntity;
import com.demo.nuxtendemo.services.ReporteServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
}

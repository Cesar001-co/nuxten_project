package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.DTO.EvidenciasDTO;
import com.demo.nuxtendemo.entitys.EvidenciasEntity;
import com.demo.nuxtendemo.services.EvidenciasServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/**
 * Clase encargada de controlar las peticiones de las evidencias
 */
@RestController
@RequestMapping("/evidenciasController")
public class EvidenciasController {

    @Autowired
    private EvidenciasServices evidenciasServices;

    public EvidenciasController(EvidenciasServices evidenciasServices) {
        this.evidenciasServices = evidenciasServices;
    }

    //Metodo encargado de crear una evidencias en la base de datos
    @PostMapping("/crear-evidencia")
    public ResponseEntity<String> crearEvidencia(@RequestBody EvidenciasDTO inDTO) throws IOException {

        EvidenciasEntity evidencia = evidenciasServices.crearEvidencia(inDTO);
        //return ResponseEntity.ok("Evidencia creada con ID: " + evidencia.getIdEvidencia());
        return ResponseEntity.ok("" + evidencia.getIdEvidencia());
    }

    //Metodo encargado de eliminar una evidencias en la base de datos por idEvidencia
    @DeleteMapping("/deleteByIdEvidencia/{idEvidencia}")
    public ResponseEntity<String> deleteByIdEvidencia(@PathVariable("idEvidencia") Long idEvidencia) {
        try {
            evidenciasServices.deleteById(idEvidencia);
            return ResponseEntity.ok("Evidencia eliminada exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la evidencia: " + e.getMessage());
        }
    }

    //Metodo para actualizar una evidencia por idEvidencia
    @PutMapping("/updateEvidencia")
    public ResponseEntity<EvidenciasEntity> updateEvidencia(@RequestBody EvidenciasEntity entity) {
        try {
            EvidenciasEntity evidencias = evidenciasServices.saveAndFlush(entity);
            return ResponseEntity.ok(evidencias);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Metodo para buscar Evidencias por idEvaluacion
    @GetMapping("/getEvidenciaByIdEvaluacion/{idEvaluacion}")
    public List<EvidenciasEntity> getEvidenciaByIdEvaluacion(@PathVariable Long idEvaluacion) {
        return evidenciasServices.findByIdEvaluacion(idEvaluacion);
    }

}

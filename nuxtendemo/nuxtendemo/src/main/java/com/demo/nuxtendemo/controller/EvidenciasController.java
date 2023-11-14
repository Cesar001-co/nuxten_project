package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.DTO.EvidenciasDTO;
import com.demo.nuxtendemo.entitys.EvidenciasEntity;
import com.demo.nuxtendemo.services.EvidenciasServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/evidenciasController")
public class EvidenciasController {

    @Autowired
    private EvidenciasServices evidenciasServices;

    public EvidenciasController(EvidenciasServices evidenciasServices) {
        this.evidenciasServices = evidenciasServices;
    }

    @PostMapping("/crear-evidencia")
    public ResponseEntity<String> crearEvidencia(@RequestBody EvidenciasDTO inDTO) throws IOException {

        EvidenciasEntity evidencia = evidenciasServices.crearEvidencia(inDTO);
        return ResponseEntity.ok("Evidencia creada con ID: " + evidencia.getIdEvidencia());
    }

}

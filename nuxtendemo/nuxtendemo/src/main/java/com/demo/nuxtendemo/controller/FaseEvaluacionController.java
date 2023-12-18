package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.FaseEvaEntity;
import com.demo.nuxtendemo.services.FaseEvaluacionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Clase encargada de controlar las peticiones de las fases de evaluacion
 */
@RestController
@RequestMapping("/FaseEvaluacionController")
public class FaseEvaluacionController {

    @Autowired
    private FaseEvaluacionServices faseEvaluacionServices;

    //Metodo que permite consultar una fase de evaluacion por idFaseEva
    @GetMapping("/{idfaseEva}")
    public ResponseEntity<FaseEvaEntity> findFaseEvaById(@PathVariable Long idfaseEva) {
        FaseEvaEntity faseEvaEntity = faseEvaluacionServices.findByIdfaseEva(idfaseEva);
        if (faseEvaEntity != null) {
            return ResponseEntity.ok(faseEvaEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Metodo que permite editar una fase evaluacion por idFaseEva
    @PutMapping("/updateFaseEva")
    public ResponseEntity<FaseEvaEntity> updateFaseEva(@RequestBody FaseEvaEntity entity) {
        try {
            FaseEvaEntity update = faseEvaluacionServices.updateFaseInfo(entity);
            return ResponseEntity.ok(update);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}

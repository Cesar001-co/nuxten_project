package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.ExpertosEntity;
import com.demo.nuxtendemo.services.EvaluacionServices;
import com.demo.nuxtendemo.services.ExpertoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/ExpertoController")
public class ExpertoController {

    @Autowired
    private ExpertoServices expertoServices;

    @GetMapping("/{idExperto}")
    public ResponseEntity<ExpertosEntity> obtenerExpertoPorId(@PathVariable Long idExperto) {
        Optional<ExpertosEntity> expertoOptional = expertoServices.findById(idExperto);
        if (expertoOptional.isPresent()) {
            return ResponseEntity.ok(expertoOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }




}

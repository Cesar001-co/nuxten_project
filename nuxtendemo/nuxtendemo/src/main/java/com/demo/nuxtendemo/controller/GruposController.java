package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.DTO.ResponseDTO;
import com.demo.nuxtendemo.entitys.GruposEntity;
import com.demo.nuxtendemo.services.GruposServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/gruposController")
public class GruposController {

    @Autowired
    private GruposServices gruposServices;

    @PostMapping("/crear")
    public ResponseEntity<ResponseDTO<GruposEntity>> crearGrupo(@RequestBody List<Long> listaUsuarios) {
        try {
            GruposEntity nuevoGrupo = gruposServices.saveGroupByListUser(listaUsuarios);
            return new ResponseEntity<>(new ResponseDTO<>(nuevoGrupo, "Grupo creado exitosamente"), HttpStatus.CREATED);
        } catch (Exception e) {
            String mensajeError = "Error al crear el grupo: " + e.getMessage();
            return new ResponseEntity<>(new ResponseDTO<>(null, mensajeError), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

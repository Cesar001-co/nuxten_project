package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.services.EvaluacionServices;
import com.demo.nuxtendemo.services.GruposServices;
import com.demo.nuxtendemo.services.UsuarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/evaluacionController")
public class EvaluacionController {

    @Autowired
    private EvaluacionServices evaluacionServices;

    @Autowired
    private GruposServices gruposServices;

    @Autowired
    private UsuarioServices usuarioServices;

    //Metodo para guardar una evaluacion en la base de datos.
    @PostMapping("/saveEvaluacion")
    public ResponseEntity<EvaluacionesEntity> saveEva(@RequestBody EvaluacionesEntity evaluacion) {
        try {
            EvaluacionesEntity evaluacionSave = evaluacionServices.save(evaluacion);

            // Llama a un método para obtener los usuarios por grupo y actualiza el campo idEvaluacion
            List<Long> usuarios = getUsersByGroupId(evaluacion.getIdGrupo());
            if (!usuarios.isEmpty()) {
                usuarioServices.updateIdEvaluacionInBulk(usuarios, evaluacionSave.getIdEvaluacion());
            }

            return ResponseEntity.created(new URI("/evaluacionController/saveEvaluacion/" + evaluacionSave.getIdEvaluacion())).body(evaluacionSave);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Método para obtener los usuarios por idGrupo
    private List<Long> getUsersByGroupId(Long grupoId) {
        List<Long> usuarios = gruposServices.getUsersByGroupId(grupoId);

        if (usuarios != null) {
            return usuarios;
        } else {
            return Collections.emptyList(); // Devuelve una lista vacía
        }
    }

}

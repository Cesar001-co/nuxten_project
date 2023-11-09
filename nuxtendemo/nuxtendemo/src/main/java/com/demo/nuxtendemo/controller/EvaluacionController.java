package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.DTO.EvaluacionDTO;
import com.demo.nuxtendemo.DTO.ResponseDTO;
import com.demo.nuxtendemo.DTO.UsuarioInfoDTO;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/evaluacionController")
public class  EvaluacionController {

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

    //Metodo para listar todas las evaluaciones de la base de datos
    @GetMapping("/findAllEvaluaciones")
    public List<EvaluacionDTO> findAllEvaluaciones() {
        List<EvaluacionesEntity> evaluaciones = evaluacionServices.findAllEvaluaciones();

        List<EvaluacionDTO> evaluacionDTOs = evaluaciones.stream()
                .map(EvaluacionDTO::fromEntity)
                .collect(Collectors.toList());

        return evaluacionDTOs;
    }

    //Metodo para listar todas las evaluaciones de la base de datos por idEvaluacion
    @GetMapping("/{idEvaluacion}")
    public ResponseEntity<?> findEvaluacionById(@PathVariable Long idEvaluacion) {
        try {
            EvaluacionesEntity evaluacionEntity = evaluacionServices.findByIdEvaluacion(idEvaluacion);

            if (evaluacionEntity == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(EvaluacionDTO.fromEntity(evaluacionEntity));
        } catch (Exception e) {
            String mensajeError = "Error al consultar la evaluacion: " + e.getMessage();
            return new ResponseEntity<>(new ResponseDTO<>(null, mensajeError), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Metodo que permite editar una evaluacion por idEvaluacion
    @PutMapping("/updateEvaluacionInfo")
    public ResponseEntity<EvaluacionDTO> updateEvaluacionInfo(@RequestBody EvaluacionDTO dto) {
        try {
            EvaluacionDTO evaluacionActualizada = evaluacionServices.updateEvaluacionInfo(dto);
            return ResponseEntity.ok(evaluacionActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Metodo que permite editar la fase en la que esta la evaluacion
    @PutMapping("/updateNombreFaseEva")
    public ResponseEntity<EvaluacionDTO> updateNombreFaseEva(@RequestBody EvaluacionDTO dto) {
        try {
            EvaluacionDTO evaluacionActualizada = evaluacionServices.updateNombreFaseEva(dto);
            return ResponseEntity.ok(evaluacionActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para eliminar una evaluación por idEvaluacion y actualizar usuarios
    @DeleteMapping("/deleteEvaluacion/{idEvaluacion}")
    public ResponseEntity<String> deleteEvaluacion(@PathVariable Long idEvaluacion) {
        try {
            EvaluacionesEntity evaluacion = evaluacionServices.findByIdEvaluacion(idEvaluacion);

            if (evaluacion == null) {
                return ResponseEntity.notFound().build();
            }

            List<Long> usuarios = getUsersByGroupId(evaluacion.getIdGrupo());

            if (!usuarios.isEmpty()) {
                usuarioServices.updateIdEvaluacionInBulk(usuarios, null);
            }
            evaluacionServices.deleteById(idEvaluacion);

            return ResponseEntity.ok("Evaluación eliminada con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la evaluación: " + e.getMessage());
        }
    }

    // Método para obtener información de usuarios por idEvaluacion
    @GetMapping("/getUsuariosByEvaluacion/{idEvaluacion}")
    public ResponseEntity<List<UsuarioInfoDTO>> getUsuariosByEvaluacion(@PathVariable Long idEvaluacion) {
        try {
            EvaluacionesEntity evaluacion = evaluacionServices.findByIdEvaluacion(idEvaluacion);
            if (evaluacion == null) {
                return ResponseEntity.notFound().build();
            }

            List<Long> usuarios = getUsersByGroupId(evaluacion.getIdGrupo());

            if (usuarios.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList());
            }

            List<UsuarioInfoDTO> usuariosInfo = new ArrayList<>();
            for (Long userId : usuarios) {
                UsuariosEntity usuario = usuarioServices.findByIdUser(userId);
                if (usuario != null) {
                    UsuarioInfoDTO usuarioInfo = new UsuarioInfoDTO(
                            usuario.getIdUser(),
                            usuario.getNombres(),
                            usuario.getApellidos(),
                            usuario.getNumero(),
                            usuario.getEmail()
                    );
                    usuariosInfo.add(usuarioInfo);
                }
            }

            return ResponseEntity.ok(usuariosInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}

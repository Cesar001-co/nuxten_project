package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.services.EvaluacionServices;
import com.demo.nuxtendemo.services.UsuarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/evaluacionController")
public class EvaluacionController {

    @Autowired
    private EvaluacionServices evaluacionServices;

    //Metodo para guardar una evaluacion en la base de datos
    @PostMapping("/saveEvaluacion")
    public ResponseEntity<EvaluacionesEntity> saveEva(@RequestBody EvaluacionesEntity evaluacion){
        try{
            EvaluacionesEntity evaluacionSave = evaluacionServices.save(evaluacion);
            return ResponseEntity.created(new URI("/evaluacionController/saveEvaluacion/" + evaluacionSave.getIdEvaluacion())).body (evaluacionSave);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /*//Metodo para listar todos los usuarios de la base de datos menos el admin (idUser = 1)
    @GetMapping("/findAllUsersNotAdmin")
    public ResponseEntity<List<UsuariosEntity>> findAllUsersNotAdmin(){
        Long idUser = 1L;
        return ResponseEntity.ok(usuarioServices.findAllByIdUserNot(idUser));
    }*/



    /*//Metodo para listar todos los usuarios de la base de datos
    @GetMapping("/findAllUsers")
    public List<UsuariosEntity> findAllUsers(){
        return usuarioServices.findAll();
    }

    //Metodo para buscar usuarios por email y contraseña
    @GetMapping("/byEmailAndPassword")
    public ResponseEntity<UsuariosEntity> byEmailAndPassword(
            @RequestParam("email") String email,
            @RequestParam("contraseña") String contraseña) {

        UsuariosEntity usuario = usuarioServices.byEmailAndContraseña(email, contraseña);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuario);
        }
    }

    //Metodo para eliminar un usuario de la base de datos por idUser
    @DeleteMapping("/{idUser}")
    public ResponseEntity<Void> deleteById(@PathVariable("idUser") Long idUser) {
        usuarioServices.deleteById(idUser);
        return ResponseEntity.noContent().build();
    }

    //Metodo para actualizar un usuario de la base de datos
    @PutMapping("/updateUser")
    public ResponseEntity<UsuariosEntity> updateUser(@RequestBody UsuariosEntity entity) {
        try {
            UsuariosEntity usuarioActualizado = usuarioServices.saveAndFlush(entity);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Metodo para buscar usuarios por email
    @GetMapping("/byEmail")
    public ResponseEntity<UsuariosEntity> byEmail(
            @RequestParam("email") String email){
        UsuariosEntity usuario = usuarioServices.byEmail(email);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuario);
        }
    }*/
}
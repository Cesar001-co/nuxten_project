package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.services.UsuarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuarioController")
public class UsuarioController {

    @Autowired
    private UsuarioServices usuarioServices;

    //Metodo para listar todos los usuarios de la base de datos menos el admin (idUser = 1)
    @GetMapping("/findAllUsersNotAdmin")
    public ResponseEntity<List<UsuariosEntity>> findAllUsersNotAdmin(){
        Long idUser = 1L;
        return ResponseEntity.ok(usuarioServices.findAllByIdUserNot(idUser));
    }

    //Metodo para guardar un usuario en la base de datos
    @PostMapping("/saveUsers")
    public ResponseEntity<UsuariosEntity> saveUsers(@RequestBody UsuariosEntity usu){
        try{
            UsuariosEntity usuarioSave = usuarioServices.save(usu);
            return ResponseEntity.created(new URI("/usuarioController/saveUsers"+usuarioSave.getIdUser())).body (usuarioSave);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    //Metodo para listar todos los usuarios de la base de datos
    @GetMapping("/findAllUsers")
    public List<UsuariosEntity> findAllUsers(){
        return usuarioServices.findAll();
    }

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

    /*


    @PostMapping
    public UsuariosEntity insertar(@RequestBody UsuariosEntity usu){
        return usuarioServices.insertar(usu);
    }

    @PutMapping
    public UsuariosEntity actualizar(@RequestBody UsuariosEntity usu){
        return usuarioServices.actualizar(usu);
    }

    @DeleteMapping
    public void eliminar(@RequestBody UsuariosEntity usu){
        usuarioServices.eliminar(usu);
    } */
}

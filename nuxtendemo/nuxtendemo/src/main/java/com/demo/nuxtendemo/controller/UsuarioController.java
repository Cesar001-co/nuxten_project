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

    @GetMapping
    private ResponseEntity<List<UsuariosEntity>> getAllUsuarios(){
        return ResponseEntity.ok(usuarioServices.findAll());
    }

    @PostMapping
    private ResponseEntity<UsuariosEntity> saveUsuario(@RequestBody UsuariosEntity usu){
        try{
            UsuariosEntity usuarioSave = usuarioServices.save(usu);
            return ResponseEntity.created(new URI("/usuarioController/"+usuarioSave.getIdUser())).body (usuarioSave);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    /*
    @GetMapping
    public List<UsuariosEntity> listar(){
        return usuarioServices.listar();
    }

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

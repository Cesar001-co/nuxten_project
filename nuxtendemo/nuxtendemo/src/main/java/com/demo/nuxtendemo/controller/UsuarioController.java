package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.services.UsuarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarioController")
public class UsuarioController {

    @Autowired
    private UsuarioServices usuarioServices;

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
    }
}

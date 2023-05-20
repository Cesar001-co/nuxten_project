package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServices{

    @Autowired
    private UsuarioRepository usuarioRepository;

    //Metodo encargado de agregar usuarios
    public UsuariosEntity insertar(UsuariosEntity usu){
        if (usuarioRepository.existsById(usu.getIdCedula().intValue())) {
            throw new RuntimeException("El ID ya existe");
        }
        return usuarioRepository.save(usu);
    }

    //Metodo encargado de actualizar usuarios
    public UsuariosEntity actualizar(UsuariosEntity usu){
        return usuarioRepository.save(usu);
    }

    //Metodo encargado de listar usuarios
    public List<UsuariosEntity> listar(){
        return usuarioRepository.findAll();
    }

    //Metodo encargado de eliminar usuarios
    public void eliminar(UsuariosEntity usu){
        usuarioRepository.delete(usu);
    }
}

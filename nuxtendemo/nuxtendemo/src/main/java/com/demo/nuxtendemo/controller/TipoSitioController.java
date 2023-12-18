package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.TipoSitioEntity;
import com.demo.nuxtendemo.services.TipoSitiosServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Clase encargada de controlar las peticiones de los tipos de sitios */
@RestController
@RequestMapping("/tipoSitioController")
public class TipoSitioController {

    @Autowired
    private TipoSitiosServices tipoSitiosServices;

    //Metodo encargado de consultar los tipos de sitios en la base de datos
    @GetMapping("/findAllTipoSitio")
    public List<TipoSitioEntity> findAllTipoSitio(){

        return tipoSitiosServices.findAll();
    }
}

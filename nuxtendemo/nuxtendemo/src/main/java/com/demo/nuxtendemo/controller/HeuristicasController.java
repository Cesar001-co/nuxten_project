package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.HeuristicasEntity;
import com.demo.nuxtendemo.services.HeuristicasServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/heuristicasController")
public class HeuristicasController {

    @Autowired
    private HeuristicasServices heuristicasServices;

    //Metodo encargado de consultar todas las heuristicas de la base de datos

    @GetMapping("/findAllHeuristicas")
    public List<HeuristicasEntity> findAllHeuristicas(){

        return heuristicasServices.findAll();
    }

}

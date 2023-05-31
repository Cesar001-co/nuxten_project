package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
* Entidad que representa la tabla grupos de la base de datos
*/
@Entity
@Table(name = "faseEva")
public class FaseEvaEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idfaseEva", unique = true, nullable = false)
    private Long idfaseEva;

    //Campo que identifica el json que contiene la evaluacion
    @Column(columnDefinition = "jsonb")
    private String evaluacion;

    public FaseEvaEntity(String evaluacion) {
        this.evaluacion = evaluacion;
    }

    public FaseEvaEntity() {

    }

    public Long getIdfaseEva() {
        return idfaseEva;
    }

    public void setIdfaseEva(Long idfaseEva) {
        this.idfaseEva = idfaseEva;
    }

    public String getEvaluacion() {
        return evaluacion;
    }

    public void setEvaluacion(String evaluacion) {
        this.evaluacion = evaluacion;
    }
}

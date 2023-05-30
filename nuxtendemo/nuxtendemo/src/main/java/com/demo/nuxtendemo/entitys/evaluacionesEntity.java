package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

/*
* Entidad que representa la tabla grupos de la base de datos
*/
@Entity
@Table(name = "evaluaciones")
public class evaluacionesEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEvaluacion", unique = true, nullable = false)
    private Long idEvaluacion;

    //Campo que identifica el nombre del sitio a evaluar
    private String nombreSitio;

    //Campo que identifica la url del sitio a evaluar
    private String urlSitio;

    //Campo que identifica el tipo de sitio a evaluar
    private String tipoSitio;

    //Campo que identifica la fecha de creacion de la evaluacion
    private LocalDateTime fechaCreacion;

    //Campo que dertemina la fase en la que se encuentra la evaluacion
    private String fase;

    //Campo que determina la llave foranea de la tabla fasesEva
    private Long idFaseEva;

    //Campo que determina la llave foranea de la tabla grupos
    private Long IdGrupo;

    public evaluacionesEntity(String nombreSitio, String urlSitio, String tipoSitio, LocalDateTime fechaCreacion, String fase, Long idFaseEva, Long idGrupo) {
        this.nombreSitio = nombreSitio;
        this.urlSitio = urlSitio;
        this.tipoSitio = tipoSitio;
        this.fechaCreacion = fechaCreacion;
        this.fase = fase;
        this.idFaseEva = idFaseEva;
        IdGrupo = idGrupo;
    }

    public evaluacionesEntity() {

    }

    public Long getIdGrupo() {
        return idEvaluacion;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idEvaluacion = idGrupo;
    }

    public String getNombreSitio() {
        return nombreSitio;
    }

    public void setNombreSitio(String nombreSitio) {
        this.nombreSitio = nombreSitio;
    }

    public String getUrlSitio() {
        return urlSitio;
    }

    public void setUrlSitio(String urlSitio) {
        this.urlSitio = urlSitio;
    }

    public String getTipoSitio() {
        return tipoSitio;
    }

    public void setTipoSitio(String tipoSitio) {
        this.tipoSitio = tipoSitio;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getFase() {
        return fase;
    }

    public void setFase(String fase) {
        this.fase = fase;
    }

    public Long getIdFaseEva() {
        return idFaseEva;
    }

    public void setIdFaseEva(Long idFaseEva) {
        this.idFaseEva = idFaseEva;
    }
}

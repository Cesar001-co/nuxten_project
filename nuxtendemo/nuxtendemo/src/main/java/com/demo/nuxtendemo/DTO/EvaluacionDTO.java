package com.demo.nuxtendemo.DTO;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;

import java.time.LocalDateTime;

/**
 * Clase encargada de mapear los datos de la evaluacion
 */
public class EvaluacionDTO {

    //Atributo encargado de almacenar el id de la evaluacion
    private Long idEvaluacion;

    //Atributo encargado de almacenar el nombre del sitio
    private String nombreSitio;

    //Atributo encargado de almacenar la url del sitio
    private String urlSitio;

    //Atributo encargado de almacenar el tipo de sitio
    private String tipoSitio;

    //Atributo encargado de almacenar la fecha de creacion de la evaluacion
    private LocalDateTime fechaCreacion;

    //Atributo encargado de almacenar la fase de la evaluacion
    private String fase;

    //Atributo encargado de almacenar el id de la fase de la evaluacion
    private String idFaEva;

    //Atributo encargado de almacenar el id del grupo de la evaluacion
    private Long idGrupo;

    //Constructor de la clase
    public EvaluacionDTO(Long idEvaluacion, String nombreSitio, String urlSitio, String tipoSitio, LocalDateTime fechaCreacion, String fase, String idFaEva, Long idGrupo) {
        this.idEvaluacion = idEvaluacion;
        this.nombreSitio = nombreSitio;
        this.urlSitio = urlSitio;
        this.tipoSitio = tipoSitio;
        this.fechaCreacion = fechaCreacion;
        this.fase = fase;
        this.idFaEva = idFaEva;
        this.idGrupo = idGrupo;
    }

    public static EvaluacionDTO fromEntity(EvaluacionesEntity entity) {
        return new EvaluacionDTO(
                entity.getIdEvaluacion(),
                entity.getNombreSitio(),
                entity.getUrlSitio(),
                entity.getTipoSitio(),
                entity.getFechaCreacion(),
                entity.getFase(),
                entity.getIdFaEva(),
                entity.getIdGrupo()
        );
    }


    public Long getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(Long idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
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

    public String getIdFaEva() {
        return idFaEva;
    }

    public void setIdFaEva(String idFaEva) {
        this.idFaEva = idFaEva;
    }

    public Long getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idGrupo = idGrupo;
    }
}

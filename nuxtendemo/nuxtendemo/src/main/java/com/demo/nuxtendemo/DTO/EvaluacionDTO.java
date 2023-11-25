package com.demo.nuxtendemo.DTO;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;

import java.time.LocalDateTime;

public class EvaluacionDTO {
    private Long idEvaluacion;
    private String nombreSitio;
    private String urlSitio;
    private String tipoSitio;
    private LocalDateTime fechaCreacion;
    private String fase;
    private String idFaEva;
    private Long idGrupo;

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

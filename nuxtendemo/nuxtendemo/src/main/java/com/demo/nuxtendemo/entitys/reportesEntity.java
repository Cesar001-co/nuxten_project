package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/*
* Entidad que representa la tabla reportes de la base de datos
*/
@Entity
@Table(name = "reportes")
public class reportesEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idReportes", unique = true, nullable = false)
    private Long idReportes;

    //Campo que identifica el nombre del sitio
    private String nombreSitio;

    //Campo que identifica la url del sitio
    private String verUrl;

    //Campo que identifica el id de la evaluacion
    private String idEvaluacion;

    //Campo que identifica la fecha del reporte
    private LocalDateTime fechaReporte;

    //Campo que identifica el reporte
    private byte[] reporte;

    //Campo que identifica la llave foranea de la tabla grupos
    private Long idGrupo;

    public reportesEntity(String nombreSitio, String verUrl, String idEvaluacion, LocalDateTime fechaReporte, byte[] reporte, Long idGrupo) {
        this.nombreSitio = nombreSitio;
        this.verUrl = verUrl;
        this.idEvaluacion = idEvaluacion;
        this.fechaReporte = fechaReporte;
        this.reporte = reporte;
        this.idGrupo = idGrupo;
    }

    public reportesEntity() {
    }

    public Long getIdReportes() {
        return idReportes;
    }

    public void setIdReportes(Long idReportes) {
        this.idReportes = idReportes;
    }

    public String getNombreSitio() {
        return nombreSitio;
    }

    public void setNombreSitio(String nombreSitio) {
        this.nombreSitio = nombreSitio;
    }

    public String getVerUrl() {
        return verUrl;
    }

    public void setVerUrl(String verUrl) {
        this.verUrl = verUrl;
    }

    public String getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(String idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }

    public LocalDateTime getFechaReporte() {
        return fechaReporte;
    }

    public void setFechaReporte(LocalDateTime fechaReporte) {
        this.fechaReporte = fechaReporte;
    }

    public byte[] getReporte() {
        return reporte;
    }

    public void setReporte(byte[] reporte) {
        this.reporte = reporte;
    }

    public Long getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idGrupo = idGrupo;
    }
}

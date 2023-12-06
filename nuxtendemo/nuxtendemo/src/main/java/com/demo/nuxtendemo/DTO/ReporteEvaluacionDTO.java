package com.demo.nuxtendemo.DTO;

public class ReporteEvaluacionDTO {

    private String nombreExperto;
    private String email;
    private String numero;
    private Long idEvaluacion;
    private String nombreSitio;
    private String urlSitio;
    private String tipoSitio;
    private String fechaCreacion;

    public ReporteEvaluacionDTO(String nombreExperto, String email, String numero, String idEvaluacion, String nombreSitio, String urlSitio, String tipoSitio, String fechaCreacion) {
        this.nombreExperto = nombreExperto;
        this.email = email;
        this.numero = numero;
        this.idEvaluacion = (idEvaluacion != null) ? Long.valueOf(idEvaluacion.toString()) : null;
        this.nombreSitio = nombreSitio;
        this.urlSitio = urlSitio;
        this.tipoSitio = tipoSitio;
        this.fechaCreacion = fechaCreacion;
    }

    public String getNombreExperto() {
        return nombreExperto;
    }

    public void setNombreExperto(String nombreExperto) {
        this.nombreExperto = nombreExperto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
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

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(String fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
}

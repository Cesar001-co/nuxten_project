package com.demo.nuxtendemo.DTO;

public class guardarReporteDTO {

    private String nombreSitio;
    private String verUrl;
    private String idEvaluacion;
    private String archivoReporte;
    private Long idGrupo;

    public guardarReporteDTO() {
    }

    public guardarReporteDTO(String nombreSitio, String verUrl, String idEvaluacion, String archivoReporte, Long idGrupo) {
        this.nombreSitio = nombreSitio;
        this.verUrl = verUrl;
        this.idEvaluacion = idEvaluacion;
        this.archivoReporte = archivoReporte;
        this.idGrupo = idGrupo;
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

    public String getArchivoReporte() {
        return archivoReporte;
    }

    public void setArchivoReporte(String archivoReporte) {
        this.archivoReporte = archivoReporte;
    }

    public Long getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idGrupo = idGrupo;
    }
}

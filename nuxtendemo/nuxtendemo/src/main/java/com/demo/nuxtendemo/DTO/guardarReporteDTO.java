package com.demo.nuxtendemo.DTO;

/**
 * Clase encargada de guardar los datos de un reporte
 */
public class guardarReporteDTO {

    // Atributo que guarda el nombre del sitio
    private String nombreSitio;
    // Atributo que guarda la url del sitio
    private String verUrl;
    // Atributo que guarda el id de la evaluación
    private String idEvaluacion;
    // Atributo que guarda el archivo del reporte
    private String archivoReporte;
    // Atributo que guarda el id del grupo
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

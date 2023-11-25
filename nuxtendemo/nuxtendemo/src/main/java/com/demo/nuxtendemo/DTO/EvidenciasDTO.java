package com.demo.nuxtendemo.DTO;

public class EvidenciasDTO {

    private String imagen;
    private Long idEvaluacion;

    // Constructor, getters y setters

    public EvidenciasDTO(String imagen, Long idEvaluacion) {
        this.imagen = imagen;
        this.idEvaluacion = idEvaluacion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Long getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(Long idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }
}
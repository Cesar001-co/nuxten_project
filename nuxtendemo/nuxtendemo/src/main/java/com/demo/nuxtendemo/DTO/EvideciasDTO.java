package com.demo.nuxtendemo.DTO;

public class EvideciasDTO {

    private byte[] imagen;
    private Long idEvaluacion;

    // Constructor, getters y setters

    public EvideciasDTO(byte[] imagen, Long idEvaluacion) {
        this.imagen = imagen;
        this.idEvaluacion = idEvaluacion;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public Long getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(Long idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }
}
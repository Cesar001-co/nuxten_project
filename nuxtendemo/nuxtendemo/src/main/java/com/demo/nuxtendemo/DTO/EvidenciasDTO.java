package com.demo.nuxtendemo.DTO;

/**
 * Clase encargada de gestionar los atributos de Evidencias como EvidenciasDTO
 */
public class EvidenciasDTO {

    // Atributo encargado de almacenar la imagen
    private String imagen;

    // Atributo encargado de almacenar el id de la evaluacion
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
package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
* Entidad que representa la tabla grupos de la base de datos
*/
@Entity
@Table(name = "evidencias")
public class EvidenciasEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEvidencia", unique = true, nullable = false)
    private Long idEvidencia;

    //Campo encargado de almacenar las imagenes de las evidencias
    @Lob
    @Column(name = "imagen", columnDefinition = "bytea")
    private byte[] imagen;

    //Campo que identifica la llave foranea de la evaluacion
    private Long idEvaluacion;

    public EvidenciasEntity(Long idEvidencia, byte[] imagen, Long idEvaluacion) {
        this.idEvidencia = idEvidencia;
        this.imagen = imagen;
        this.idEvaluacion = idEvaluacion;
    }
    public EvidenciasEntity() {

    }

    public Long getIdEvidencia() {
        return idEvidencia;
    }

    public void setIdEvidencia(Long idEvidencia) {
        this.idEvidencia = idEvidencia;
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

package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
* Entidad que representa la tabla grupos de la base de datos
*/
@Entity
@Table(name = "evidencias")
public class evidenciasEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEvidencia", unique = true, nullable = false)
    private Long idEvidencia;

    //Campo encargado de almacenar las imagenes de las evidencias
    private byte[] imagen;

    //Campo que identifica la llave foranea de la evaluacion
    @OneToOne(mappedBy = "idEvaluacion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private evaluacionesEntity idEvaluacion;

    public evidenciasEntity(Long idEvidencia, byte[] imagen, evaluacionesEntity idEvaluacion) {
        this.idEvidencia = idEvidencia;
        this.imagen = imagen;
        this.idEvaluacion = idEvaluacion;
    }
    public evidenciasEntity() {

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

    public evaluacionesEntity getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(evaluacionesEntity idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }
}

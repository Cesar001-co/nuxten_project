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
    private byte[] imagen;

    //Campo que identifica la llave foranea de la evaluacion
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idEvaluacion")
    private EvaluacionesEntity idEvaluacion;

    public EvidenciasEntity(Long idEvidencia, byte[] imagen, EvaluacionesEntity idEvaluacion) {
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

    public EvaluacionesEntity getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(EvaluacionesEntity idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }
}

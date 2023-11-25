package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
 * Entidad que representa la tabla tipoSitios de la base de datos
 */
@Entity
@Table(name = "tipoSitios")
public class TipoSitioEntity {

    //Id de la tabla tipoSitios
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSitio", unique = true, nullable = false)
    private Long idSitio;

    //Campo que identifica los tipos de sitios web
    private String tipoSitio;

    public TipoSitioEntity(Long idSitio, String tipoSitio) {
        this.idSitio = idSitio;
        this.tipoSitio = tipoSitio;
    }

    public TipoSitioEntity() {

    }

    public Long getIdSitio() {
        return idSitio;
    }

    public void setIdSitio(Long idSitio) {
        this.idSitio = idSitio;
    }

    public String getTipoSitio() {
        return tipoSitio;
    }

    public void setTipoSitio(String tipoSitio) {
        this.tipoSitio = tipoSitio;
    }
}

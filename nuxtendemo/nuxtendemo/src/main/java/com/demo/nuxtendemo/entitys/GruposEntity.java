package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
* Entidad que representa la tabla grupos de la base de datos
*/
@Entity
@Table(name = "grupos")
public class GruposEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idGrupo", unique = true, nullable = false)
    private Long idGrupo;

    public GruposEntity(Long idGrupo) {
        this.idGrupo = idGrupo;
    }

    public GruposEntity() {

    }

    public Long getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idGrupo = idGrupo;
    }
}

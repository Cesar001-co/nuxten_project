package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
* Entidad que representa la tabla expertos de la base de datos
*/
@Entity
@Table(name = "expertos")
public class expertosEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idExperto", unique = true, nullable = false)
    private Long idExperto;

    //Campo que identifica la llave foranea de la tabla usuarios
    private Long idUser;

    //Campo que identifica la llave foranea de la tabla grupos
    private Long idGrupo;

    public expertosEntity() {

    }

    public expertosEntity(Long idUser, Long idGrupo) {
        this.idUser = idUser;
        this.idGrupo = idGrupo;
    }

    public Long getIdExperto() {
        return idExperto;
    }

    public void setIdExperto(Long idExperto) {
        this.idExperto = idExperto;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idGrupo = idGrupo;
    }
}

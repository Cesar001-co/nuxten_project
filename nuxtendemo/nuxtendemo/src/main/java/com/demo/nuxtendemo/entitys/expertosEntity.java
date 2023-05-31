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
    @OneToOne(mappedBy = "idUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UsuariosEntity idUser;

    //Campo que identifica la llave foranea de la tabla grupos
    @OneToOne(mappedBy = "idGrupo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private gruposEntity idGrupo;

    public expertosEntity(Long idExperto, UsuariosEntity idUser, gruposEntity idGrupo) {
        this.idExperto = idExperto;
        this.idUser = idUser;
        this.idGrupo = idGrupo;
    }
    public expertosEntity() {

    }

    public Long getIdExperto() {
        return idExperto;
    }

    public void setIdExperto(Long idExperto) {
        this.idExperto = idExperto;
    }

    public UsuariosEntity getIdUser() {
        return idUser;
    }

    public void setIdUser(UsuariosEntity idUser) {
        this.idUser = idUser;
    }

    public gruposEntity getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(gruposEntity idGrupo) {
        this.idGrupo = idGrupo;
    }
}

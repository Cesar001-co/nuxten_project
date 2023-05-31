package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
* Entidad que representa la tabla expertos de la base de datos
*/
@Entity
@Table(name = "expertos")
public class ExpertosEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idExperto", unique = true, nullable = false)
    private Long idExperto;

    //Campo que identifica la llave foranea de la tabla usuarios
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idUser")
    private UsuariosEntity idUser;

    //Campo que identifica la llave foranea de la tabla grupos
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idGrupo")
    private GruposEntity idGrupo;

    public ExpertosEntity(Long idExperto, UsuariosEntity idUser, GruposEntity idGrupo) {
        this.idExperto = idExperto;
        this.idUser = idUser;
        this.idGrupo = idGrupo;
    }
    public ExpertosEntity() {

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

    public GruposEntity getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(GruposEntity idGrupo) {
        this.idGrupo = idGrupo;
    }
}

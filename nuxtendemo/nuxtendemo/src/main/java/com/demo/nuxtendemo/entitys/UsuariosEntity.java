package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
 * Entidad que representa la tabla usuarios de la base de datos
 */
@Entity
@Table(name = "usuarios")
public class UsuariosEntity {

    //Id de la tabla usuarios
    @Id
    @Column(unique = true, length = 15)
    private Long idUser;

    //Campo que identifica los nombres del usuario
    private String nombres;

    //Campo que identifica los apellidos del usuario
    private String apellidos;

    //Campo que identifica el telefono del usuario
    @Column(length = 15)
    private String numero;

    //Campo que identifica el correo electronico del usuario
    @Column(unique = true)
    private String email;

    //Campo que identifica la llave foranea de la tabla evaluaciones
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idEvaluacion")
    private evaluacionesEntity idEvaluacion;

    //Campo que identifica el rol del usuario
    private String rol;

    //Campo que identifica la contraseña del usuario
    private String contraseña;

    public UsuariosEntity() {
    }

    public UsuariosEntity(String nombres, String apellidos, String telefono, String correoElectronico, String userId, Long idEvaluacion) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.numero = telefono;
        this.email = correoElectronico;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public evaluacionesEntity getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(evaluacionesEntity idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }
}

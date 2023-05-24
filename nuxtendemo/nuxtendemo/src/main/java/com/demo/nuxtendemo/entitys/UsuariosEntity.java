package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class UsuariosEntity {

    //Id de la tabla usuarios
    @Id
    @Column(unique = true, length = 10)
    private Long idUser;

    //Campo que identifica los nombres del usuario
    private String nombres;

    //Campo que identifica los apellidos del usuario
    private String apellidos;

    //Campo que identifica el telefono del usuario
    @Column(length = 10)
    private String numero;

    //Campo que identifica el correo electronico del usuario
    @Column(unique = true)
    private String email;

    private Long idEvaluacion;

    private String rol;

    private String contraseña;

    public UsuariosEntity() {
    }

    public UsuariosEntity(String nombres, String apellidos, String telefono, String correoElectronico, String userId, Long idEvaluacion) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.numero = telefono;
        this.email = correoElectronico;
        this.idEvaluacion = idEvaluacion;
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

    public Long getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(Long idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
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
}

package com.demo.nuxtendemo.entitys;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import javax.lang.model.element.Name;

/*
 * Entidad que representa la tabla usuarios de la base de datos
 */
@Entity
@Table(name = "usuarios")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
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

    //Campo que el id de evaluacion al que corresponde el usuario
    //@Column(name = "id_evalu")
    private Long idEvaluacion;

    //Campo que identifica el rol del usuario
    private String rol;

    //Campo que identifica la contraseña del usuario
    private String contraseña;

    public UsuariosEntity(String nombres, String apellidos, String numero, String email, Long idEvaluacion, String rol, String contraseña) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.numero = numero;
        this.email = email;
        this.idEvaluacion = idEvaluacion;
        this.rol = rol;
        this.contraseña = contraseña;
    }

    public UsuariosEntity(String nombres, String numero, String email) {
        this.nombres = nombres;
        this.numero = numero;
        this.email = email;
    }

    public UsuariosEntity() {

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

    public Long getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(Long idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }

    // Método para obtener el nombre completo
    public String getNombreExperto() {
        return nombres + " " + apellidos;
    }
}

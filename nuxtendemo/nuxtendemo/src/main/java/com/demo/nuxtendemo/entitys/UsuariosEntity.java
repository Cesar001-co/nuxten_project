package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class UsuariosEntity {

    //Id de la tabla usuarios
    @Id
    @Column(unique = true, length = 10)
    private Long idCedula;

    //Campo que identifica los nombres del usuario
    private String nombres;

    //Campo que identifica los apellidos del usuario
    private String apellidos;

    //Campo que identifica el telefono del usuario
    private String telefono;

    //Campo que identifica el correo electronico del usuario
    private String correoElectronico;

    private String userId;

    private Integer idEvaluacion;

    public Long getIdCedula() {
        return idCedula;
    }

    public void setIdCedula(Long idCedula) {
        this.idCedula = idCedula;
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

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(Integer idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }
}

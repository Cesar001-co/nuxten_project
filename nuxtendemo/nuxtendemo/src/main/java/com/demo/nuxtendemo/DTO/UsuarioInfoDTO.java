package com.demo.nuxtendemo.DTO;
public class UsuarioInfoDTO {

    private Long idUser;
    private String nombres;
    private String apellidos;
    private String numeroCelular;
    private String correo;

    public UsuarioInfoDTO(Long idUser, String nombres, String apellidos, String numeroCelular, String correo) {
        this.idUser = idUser;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.numeroCelular = numeroCelular;
        this.correo = correo;
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

    public String getNumeroCelular() {
        return numeroCelular;
    }

    public void setNumeroCelular(String numeroCelular) {
        this.numeroCelular = numeroCelular;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
}

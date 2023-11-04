package com.demo.nuxtendemo.DTO;
public class UsuarioInfoDTO {
    private String nombres;
    private String apellidos;
    private String identificacion;
    private String correo;

    public UsuarioInfoDTO(String nombres, String apellidos, String identificacion, String correo) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.identificacion = identificacion;
        this.correo = correo;
    }

    // Getters y setters (si es necesario) para cada campo

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

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
}

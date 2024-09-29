package com.demo.nuxtendemo.DTO;

/**
 * Clase que representa la información de un usuario
 * que se envía al frontend
 */
public class UsuarioInfoDTO {

    // Atributo que representa el id del usuario
    private Long idUser;

    // Atributo que representa el nombre del usuario
    private String nombres;

    // Atributo que representa el apellido del usuario
    private String apellidos;

    // Atributo que representa el número de celular del usuario
    private String numeroCelular;

    // Atributo que representa el correo del usuario
    private String correo;

    /**
     * Constructor de la clase
     * @param idUser
     * @param nombres
     * @param apellidos
     * @param numeroCelular
     * @param correo
     */
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

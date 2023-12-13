package com.demo.nuxtendemo.DTO;

public class expertoDTO {

    private String nombreExperto;
    private String email;
    private String numero;

    public expertoDTO(String nombreExperto, String email, String numero) {
        this.nombreExperto = nombreExperto;
        this.email = email;
        this.numero = numero;
    }

    public expertoDTO() {
    }

    public String getNombreExperto() {
        return nombreExperto;
    }

    public void setNombreExperto(String nombreExperto) {
        this.nombreExperto = nombreExperto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}

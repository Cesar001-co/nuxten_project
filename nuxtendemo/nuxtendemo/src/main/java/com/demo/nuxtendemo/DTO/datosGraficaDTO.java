package com.demo.nuxtendemo.DTO;

public class datosGraficaDTO {

    private Long desvCriticidad;
    private String num;

    public datosGraficaDTO(Long desvCriticidad, String num) {
        this.desvCriticidad = desvCriticidad;
        this.num = num;
    }

    public datosGraficaDTO() {
    }

    public Long getDesvCriticidad() {
        return desvCriticidad;
    }

    public void setDesvCriticidad(Long desvCriticidad) {
        this.desvCriticidad = desvCriticidad;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }
}

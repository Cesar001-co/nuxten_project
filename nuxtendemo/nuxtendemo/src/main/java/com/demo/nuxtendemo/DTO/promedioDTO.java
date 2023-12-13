package com.demo.nuxtendemo.DTO;

import java.math.BigDecimal;

public class promedioDTO {

    private BigDecimal severidad;
    private BigDecimal frecuencia;
    private BigDecimal criticidad;

    public promedioDTO(BigDecimal severidad, BigDecimal frecuencia, BigDecimal criticidad) {
        this.severidad = severidad;
        this.frecuencia = frecuencia;
        this.criticidad = criticidad;
    }

    public promedioDTO() {
    }

    public BigDecimal getSeveridad() {
        return severidad;
    }

    public void setSeveridad(BigDecimal severidad) {
        this.severidad = severidad;
    }

    public BigDecimal getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(BigDecimal frecuencia) {
        this.frecuencia = frecuencia;
    }

    public BigDecimal getCriticidad() {
        return criticidad;
    }

    public void setCriticidad(BigDecimal criticidad) {
        this.criticidad = criticidad;
    }
}

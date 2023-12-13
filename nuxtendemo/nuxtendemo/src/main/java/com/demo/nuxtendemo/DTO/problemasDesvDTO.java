package com.demo.nuxtendemo.DTO;

import com.demo.nuxtendemo.DTO.promedioDTO;

import java.util.List;

public class problemasDesvDTO {

    private String problema;
    private promedioDTO promedio;
    private promedioDTO desvEst;
    private String num;


    public problemasDesvDTO(String problema, promedioDTO promedio, promedioDTO desvEst, String num) {
        this.problema = problema;
        this.promedio = promedio;
        this.desvEst = desvEst;
        this.num = num;
    }

    public String getProblema() {
        return problema;
    }

    public void setProblema(String problema) {
        this.problema = problema;
    }

    public promedioDTO getPromedio() {
        return promedio;
    }

    public void setPromedio(promedioDTO promedio) {
        this.promedio = promedio;
    }

    public promedioDTO getDesvEst() {
        return desvEst;
    }

    public void setDesvEst(promedioDTO desvEst) {
        this.desvEst = desvEst;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }
}

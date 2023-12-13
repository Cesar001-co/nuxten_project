package com.demo.nuxtendemo.DTO;

public class solucionesDTO {

    private String num;
    private String def;
    private String solucion;

    public solucionesDTO(String num, String def, String solucion) {
        this.num = num;
        this.def = def;
        this.solucion = solucion;
    }

    public solucionesDTO() {
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getDef() {
        return def;
    }

    public void setDef(String def) {
        this.def = def;
    }

    public String getSolucion() {
        return solucion;
    }

    public void setSolucion(String solucion) {
        this.solucion = solucion;
    }
}

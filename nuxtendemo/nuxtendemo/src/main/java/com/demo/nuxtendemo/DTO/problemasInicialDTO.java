package com.demo.nuxtendemo.DTO;

public class problemasInicialDTO {

    private String num;
    private String defProb;
    private String expProb;
    private String principios;
    private Long idEvid;
    private String evidencia;

    public problemasInicialDTO(String num, String defProb, String expProb, String principios, Long idEvid, String evidencia) {
        this.num = num;
        this.defProb = defProb;
        this.expProb = expProb;
        this.principios = principios;
        this.idEvid = idEvid;
        this.evidencia = evidencia;
    }

    public problemasInicialDTO() {
    }



    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getDefProb() {
        return defProb;
    }

    public void setDefProb(String defProb) {
        this.defProb = defProb;
    }

    public String getExpProb() {
        return expProb;
    }

    public void setExpProb(String expProb) {
        this.expProb = expProb;
    }

    public String getPrincipios() {
        return principios;
    }

    public void setPrincipios(String principios) {
        this.principios = principios;
    }

    public Long getIdEvid() {
        return idEvid;
    }

    public void setIdEvid(Long idEvid) {
        this.idEvid = idEvid;
    }

    public String getEvidencia() {
        return evidencia;
    }

    public void setEvidencia(String evidencia) {
        this.evidencia = evidencia;
    }
}

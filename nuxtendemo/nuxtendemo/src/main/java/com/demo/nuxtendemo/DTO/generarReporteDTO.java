package com.demo.nuxtendemo.DTO;

import java.util.List;

public class generarReporteDTO {

    private Long idEvaluacion;

    private List<problemasInicialDTO> problemas;

    private List<problemasDesvDTO> problemasPromDesv;

    private List<datosGraficaDTO> grafica;

    private List<solucionesDTO> soluciones;

    public generarReporteDTO(Long idEvaluacion, List<problemasInicialDTO> problemas, List<problemasDesvDTO> problemasPromDesv, List<datosGraficaDTO> grafica, List<solucionesDTO> soluciones) {
        this.idEvaluacion = idEvaluacion;
        this.problemas = problemas;
        this.problemasPromDesv = problemasPromDesv;
        this.grafica = grafica;
        this.soluciones = soluciones;
    }

    public generarReporteDTO() {
    }

    public Long getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(Long idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }

    public List<problemasInicialDTO> getProblemas() {
        return problemas;
    }

    public void setProblemas(List<problemasInicialDTO> problemas) {
        this.problemas = problemas;
    }

    public List<problemasDesvDTO> getProblemasPromDesv() {
        return problemasPromDesv;
    }

    public void setProblemasPromDesv(List<problemasDesvDTO> problemasPromDesv) {
        this.problemasPromDesv = problemasPromDesv;
    }

    public List<datosGraficaDTO> getGrafica() {
        return grafica;
    }

    public void setGrafica(List<datosGraficaDTO> grafica) {
        this.grafica = grafica;
    }

    public List<solucionesDTO> getSoluciones() {
        return soluciones;
    }

    public void setSoluciones(List<solucionesDTO> soluciones) {
        this.soluciones = soluciones;
    }
}

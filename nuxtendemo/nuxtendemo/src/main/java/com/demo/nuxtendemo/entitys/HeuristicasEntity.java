package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
 * Entidad que representa la tabla heutisticas de la base de datos
 */
@Entity
@Table(name = "heutisticas")
public class HeuristicasEntity {

    //Id de la tabla heutisticas
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idHeuristicas", unique = true, nullable = false)
    private Long idHeuristicas;

    //Campo que identifica el codigo de la heuritica
    private String codigoHeuristica;

    //Campo que identifica el nombre de la heuristica
    private String nombreHeuristica;

    //Campo que identifica la descripcion de la heuristica
    private String descripcionHeuristica;

    public HeuristicasEntity(Long idHeuristicas, String codigoHeuristica, String nombreHeuristica, String descripcionHeuristica) {
        this.idHeuristicas = idHeuristicas;
        this.codigoHeuristica = codigoHeuristica;
        this.nombreHeuristica = nombreHeuristica;
        this.descripcionHeuristica = descripcionHeuristica;
    }

    public HeuristicasEntity() {
    }
    public Long getIdHeuristicas() {
        return idHeuristicas;
    }

    public void setIdHeuristicas(Long idHeuristicas) {
        this.idHeuristicas = idHeuristicas;
    }

    public String getCodigoHeuristica() {
        return codigoHeuristica;
    }

    public void setCodigoHeuristica(String codigoHeuristica) {
        this.codigoHeuristica = codigoHeuristica;
    }

    public String getNombreHeuristica() {
        return nombreHeuristica;
    }

    public void setNombreHeuristica(String nombreHeuristica) {
        this.nombreHeuristica = nombreHeuristica;
    }

    public String getDescripcionHeuristica() {
        return descripcionHeuristica;
    }

    public void setDescripcionHeuristica(String descripcionHeuristica) {
        this.descripcionHeuristica = descripcionHeuristica;
    }
}

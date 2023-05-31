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

    public HeuristicasEntity(Long idHeuristicas, String codigoHeuristica) {
        this.idHeuristicas = idHeuristicas;
        this.codigoHeuristica = codigoHeuristica;
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
}

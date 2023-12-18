package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

/*
 * Entidad que representa  la tabla plantillas de la base de datos
 */
@Entity
@Table(name = "plantillas")
public class PlantillasEntity {

    //Id de la tabla plantillas
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPlantillas", unique = true, nullable = false)
    private Long idPlantillas;

    //Campo que identifica el codigo de la plantillas
    private byte[] plantilla;

    //Constructor de la clase
    public PlantillasEntity(Long idPlantillas, byte[] plantilla) {
        this.idPlantillas = idPlantillas;
        this.plantilla = plantilla;
    }

    public PlantillasEntity() {
    }

    public Long getIdPlantillas() {
        return idPlantillas;
    }

    public void setIdPlantillas(Long idPlantillas) {
        this.idPlantillas = idPlantillas;
    }

    public byte[] getPlantilla() {
        return plantilla;
    }

    public void setPlantilla(byte[] plantilla) {
        this.plantilla = plantilla;
    }
}

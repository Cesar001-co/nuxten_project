package com.demo.nuxtendemo.entitys;

import jakarta.persistence.*;

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

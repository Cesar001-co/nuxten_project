package com.demo.nuxtendemo.entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

/*
* Entidad que representa la tabla grupos de la base de datos
*/
@Entity
@Table(name = "grupos")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GruposEntity {

    //Id de la tabla grupos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idGrupo", unique = true, nullable = false)
    private Long idGrupo;

    @ElementCollection
    @CollectionTable(name = "grupo_usuarios", joinColumns = @JoinColumn(name = "grupo_id"))
    @Column(name = "usuario_id")
    private List<Long> usuarios;

    @OneToMany(mappedBy = "idGrupo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ReportesEntity> reportes;

    public GruposEntity(Long idGrupo) {
        this.idGrupo = idGrupo;
    }

    public GruposEntity() {

    }

    public Long getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idGrupo = idGrupo;
    }

    public List<Long> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Long> usuarios) {
        this.usuarios = usuarios;
    }

    public List<ReportesEntity> getReportes() {
        return reportes;
    }

    public void setReportes(List<ReportesEntity> reportes) {
        this.reportes = reportes;
    }
}

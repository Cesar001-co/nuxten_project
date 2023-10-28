package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluacionRepository extends JpaRepository<EvaluacionesEntity, Long> {

    // Definición de la consulta personalizada para buscar evaluaciones por idEvaluacion
    @Query("SELECT e FROM EvaluacionesEntity e WHERE e.idEvaluacion = :idEvaluacion")
    EvaluacionesEntity findByIdEvaluacion(@Param("idEvaluacion") Long idEvaluacion);

}

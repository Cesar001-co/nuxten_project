package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.EvidenciasEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvidenciasRepository extends JpaRepository<EvidenciasEntity, Long> {

    void deleteByidEvaluacion(Long idEvaluacion);

    List<EvidenciasEntity> findByIdEvaluacion(Long idEvaluacion);
}

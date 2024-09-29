package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.ReportesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReporteRepository extends JpaRepository<ReportesEntity, Long> {

    Optional<ReportesEntity> findByIdReportes(Long idReportes);
}

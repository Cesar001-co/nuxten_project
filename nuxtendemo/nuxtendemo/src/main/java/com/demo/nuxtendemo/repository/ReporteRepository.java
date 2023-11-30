package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.ReportesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReporteRepository extends JpaRepository<ReportesEntity, Long> {
}

package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.EvidenciasEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvidenciasRepository extends JpaRepository<EvidenciasEntity, Long> {
}

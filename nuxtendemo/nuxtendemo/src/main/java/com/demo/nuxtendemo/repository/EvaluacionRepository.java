package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluacionRepository extends JpaRepository<EvaluacionesEntity, Long> {

}

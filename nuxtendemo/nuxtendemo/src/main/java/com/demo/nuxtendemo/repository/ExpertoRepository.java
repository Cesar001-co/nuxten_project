package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.ExpertosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpertoRepository extends JpaRepository<ExpertosEntity, Long> {

}

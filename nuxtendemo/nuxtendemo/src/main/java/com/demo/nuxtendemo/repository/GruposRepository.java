package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.GruposEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GruposRepository extends JpaRepository<GruposEntity, Long> {

}

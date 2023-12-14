package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.GruposEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GruposRepository extends JpaRepository<GruposEntity, Long> {

}

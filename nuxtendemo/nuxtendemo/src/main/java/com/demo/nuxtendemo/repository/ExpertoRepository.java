package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.ExpertosEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExpertoRepository extends JpaRepository<ExpertosEntity, Long> {
    Optional<ExpertosEntity> findByIdUser(Long idUser);

}

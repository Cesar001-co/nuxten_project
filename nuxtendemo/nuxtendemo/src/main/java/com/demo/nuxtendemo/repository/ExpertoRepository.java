package com.demo.nuxtendemo.repository;

import com.demo.nuxtendemo.entitys.ExpertosEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExpertoRepository extends JpaRepository<ExpertosEntity, Long> {

    @Query(value = "SELECT e.idGrupo.idGrupo FROM ExpertosEntity e WHERE e.idUser.idUser = :idUser")
    Long findIdGrupoByIdUser(@Param("idUser") Long idUser);

}

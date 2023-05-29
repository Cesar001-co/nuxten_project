package com.demo.nuxtendemo.repository;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuariosEntity, Long> {

    //Repositorio para listar todos los usuarios de la base de datos menos un id especifico
    List<UsuariosEntity> findAllByIdUserNot(Long idUser);

    //Repositorio para consultar por email y contraseña
    @Query("SELECT u FROM UsuariosEntity u WHERE u.email = :email AND u.contraseña = :contraseña")
    UsuariosEntity byEmailAndContraseña(@Param("email") String email, @Param("contraseña") String contraseña);

    //Repositorio para actualizar un usuario
    UsuariosEntity saveAndFlush(UsuariosEntity entity);

    //Repositorio para consultar por email
    @Query("SELECT u FROM UsuariosEntity u WHERE u.email = :email")
    UsuariosEntity byEmail(@Param("email") String email);

}

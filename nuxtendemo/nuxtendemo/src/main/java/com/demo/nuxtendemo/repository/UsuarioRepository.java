package com.demo.nuxtendemo.repository;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuariosEntity, Long> {



}

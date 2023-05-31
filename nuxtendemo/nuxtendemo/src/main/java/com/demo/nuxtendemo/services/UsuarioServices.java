package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class UsuarioServices implements UsuarioRepository{

    @Autowired
    private UsuarioRepository usuarioRepository;


    //SERVICIOS EN USO

    //Servicio encargado de guardar usuarios

    @Override
    public <S extends UsuariosEntity> S save(S entity) {
        if (usuarioRepository.existsById(entity.getIdUser().longValue())) {
            throw new RuntimeException("El ID ya existe");
        }
        return usuarioRepository.save(entity);
    }

    //Servicio encargado de listar todos los usuarios de la base de datos
    @Override
    public List<UsuariosEntity> findAll() {
        return usuarioRepository.findAll();

    }

    //Servicio encargado de listar todos los usuarios de la base de datos menos el admin (idUser = 1)
    @Override
    public List<UsuariosEntity> findAllByIdUserNot(Long idUser) {
        return usuarioRepository.findAllByIdUserNot(idUser);
    }

    //Servicio encargado de buscar usuarios por email y contraseña
    @Override
    public UsuariosEntity byEmailAndContraseña(String email, String contraseña) {
        return usuarioRepository.byEmailAndContraseña(email, contraseña);
    }

    //Servicio encargado de actualizar usuarios por nombres, apellido, email, numero y contraseña
    @Override
    public UsuariosEntity saveAndFlush(UsuariosEntity entity) {
        UsuariosEntity usuarioActualizado = usuarioRepository.findById(entity.getIdUser()).orElse(null);
        if (usuarioActualizado != null) {

            usuarioActualizado.setNombres(entity.getNombres());
            usuarioActualizado.setApellidos(entity.getApellidos());
            usuarioActualizado.setNumero(entity.getNumero());
            usuarioActualizado.setEmail(entity.getEmail());
            usuarioActualizado.setContraseña(entity.getContraseña());

            return usuarioRepository.saveAndFlush(usuarioActualizado);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    //Servicio encargado de buscar usuarios por email
    @Override
    public UsuariosEntity byEmail(String email) {
        return usuarioRepository.byEmail(email);
    }

    //SERVICIOS SIN USO

    @Override
    public void flush() {

    }

    @Override
    public <S extends UsuariosEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<UsuariosEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public UsuariosEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public UsuariosEntity getById(Long aLong) {
        return null;
    }

    @Override
    public UsuariosEntity getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends UsuariosEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends UsuariosEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends UsuariosEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends UsuariosEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends UsuariosEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends UsuariosEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends UsuariosEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends UsuariosEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<UsuariosEntity> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<UsuariosEntity> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {
        usuarioRepository.deleteById(aLong);
    }

    //eliminar
    @Override
    public void delete(UsuariosEntity entity) {
        usuarioRepository.delete(entity);
    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends UsuariosEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<UsuariosEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<UsuariosEntity> findAll(Pageable pageable) {
        return null;
    }

}

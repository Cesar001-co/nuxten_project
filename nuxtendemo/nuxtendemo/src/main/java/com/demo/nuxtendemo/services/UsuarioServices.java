package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public void flush() {

    }

    @Override
    public <S extends UsuariosEntity> S saveAndFlush(S entity) {
        return null;
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
    public <S extends UsuariosEntity> S save(S entity) {
        if (usuarioRepository.existsById(entity.getIdUser().longValue())) {
            throw new RuntimeException("El ID ya existe");
        }
        return usuarioRepository.save(entity);
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
    public List<UsuariosEntity> findAll() {
        return usuarioRepository.findAll();
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

    /*//Metodo encargado de agregar usuarios
    public UsuariosEntity insertar(UsuariosEntity usu){
        if (usuarioRepository.existsById(usu.getIdCedula().longValue())) {
            throw new RuntimeException("El ID ya existe");
        }
        return usuarioRepository.save(usu);
    }

    //Metodo encargado de actualizar usuarios
    public UsuariosEntity actualizar(UsuariosEntity usu){
        return usuarioRepository.save(usu);
    }

    //Metodo encargado de listar usuarios
    public List<UsuariosEntity> listar(){
        return usuarioRepository.findAll();
    }

    //Metodo encargado de eliminar usuarios
    public void eliminar(UsuariosEntity usu){
        usuarioRepository.delete(usu);
    }*/


}

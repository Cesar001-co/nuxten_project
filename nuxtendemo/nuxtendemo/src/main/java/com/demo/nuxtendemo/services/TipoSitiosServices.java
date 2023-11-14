package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.TipoSitioEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.repository.TipoSitioRespository;
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
public class TipoSitiosServices implements TipoSitioRespository {

    @Autowired
    private TipoSitioRespository tipoSitioRespository;

    //SERVICIOS EN USO

    //Servicio encargado de listar todos los tipos de sitios de la base de datos
    @Override
    public List<TipoSitioEntity> findAll() {
        return tipoSitioRespository.findAll();

    }

    //SERVICIOS EN DESUSO
    @Override
    public void flush() {

    }

    @Override
    public <S extends TipoSitioEntity> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends TipoSitioEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<TipoSitioEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public TipoSitioEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public TipoSitioEntity getById(Long aLong) {
        return null;
    }

    @Override
    public TipoSitioEntity getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends TipoSitioEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends TipoSitioEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends TipoSitioEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends TipoSitioEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends TipoSitioEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends TipoSitioEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends TipoSitioEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends TipoSitioEntity> S save(S entity) {
        return null;
    }

    @Override
    public <S extends TipoSitioEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<TipoSitioEntity> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<TipoSitioEntity> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public void delete(TipoSitioEntity entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends TipoSitioEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<TipoSitioEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<TipoSitioEntity> findAll(Pageable pageable) {
        return null;
    }
}

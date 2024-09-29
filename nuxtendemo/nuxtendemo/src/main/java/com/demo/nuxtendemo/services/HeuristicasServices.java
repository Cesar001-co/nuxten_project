package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.HeuristicasEntity;
import com.demo.nuxtendemo.repository.HeuristicasRepository;
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

/**
 * Clase que implementa los servicios de la interfaz HeuristicasRepository
 */
@Service
public class HeuristicasServices implements HeuristicasRepository {

    @Autowired
    HeuristicasRepository heuristicasRepository;

    //SERVICIO EN USO

    //Metodo para guardar una heuristica
    @Override
    public List<HeuristicasEntity> findAll() {
        return heuristicasRepository.findAll();
    }

    //SERVICIO EN DESUSO

    @Override
    public void flush() {

    }

    @Override
    public <S extends HeuristicasEntity> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends HeuristicasEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<HeuristicasEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public HeuristicasEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public HeuristicasEntity getById(Long aLong) {
        return null;
    }

    @Override
    public HeuristicasEntity getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends HeuristicasEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends HeuristicasEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends HeuristicasEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends HeuristicasEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends HeuristicasEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends HeuristicasEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends HeuristicasEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends HeuristicasEntity> S save(S entity) {
        return null;
    }

    @Override
    public <S extends HeuristicasEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<HeuristicasEntity> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }



    @Override
    public List<HeuristicasEntity> findAllById(Iterable<Long> longs) {
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
    public void delete(HeuristicasEntity entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends HeuristicasEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<HeuristicasEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<HeuristicasEntity> findAll(Pageable pageable) {
        return null;
    }
}

package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.ExpertosEntity;
import com.demo.nuxtendemo.repository.EvaluacionRepository;
import com.demo.nuxtendemo.repository.ExpertoRepository;
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
public class ExpertoServices implements ExpertoRepository{

    @Autowired
    private ExpertoRepository expertoRepository;

    @Override
    public void flush() {

    }

    @Override
    public <S extends ExpertosEntity> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends ExpertosEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<ExpertosEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public ExpertosEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public ExpertosEntity getById(Long aLong) {
        return null;
    }

    @Override
    public ExpertosEntity getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends ExpertosEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends ExpertosEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends ExpertosEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends ExpertosEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends ExpertosEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends ExpertosEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends ExpertosEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends ExpertosEntity> S save(S entity) {
        return null;
    }

    @Override
    public <S extends ExpertosEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<ExpertosEntity> findById(Long idExperto) {
        return expertoRepository.findById(idExperto);
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<ExpertosEntity> findAll() {
        return null;
    }

    @Override
    public List<ExpertosEntity> findAllById(Iterable<Long> longs) {
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
    public void delete(ExpertosEntity entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends ExpertosEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<ExpertosEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<ExpertosEntity> findAll(Pageable pageable) {
        return null;
    }
}

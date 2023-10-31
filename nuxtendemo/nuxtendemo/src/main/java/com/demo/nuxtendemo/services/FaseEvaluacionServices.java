package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.DTO.EvaluacionDTO;
import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.FaseEvaEntity;
import com.demo.nuxtendemo.repository.ExpertoRepository;
import com.demo.nuxtendemo.repository.FaseEvaluacionRepository;
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
public class FaseEvaluacionServices implements FaseEvaluacionRepository {

    @Autowired
    private FaseEvaluacionRepository faseEvaluacionRepository;

    //SERVICIOS EN USO

    // Método para buscar una entidad por idfaseEva
    public FaseEvaEntity findByIdfaseEva(Long idfaseEva) {
        return faseEvaluacionRepository.findById(idfaseEva).orElse(null);
    }

    // Método para actualizar una evaluacion por idEvaluacion
    public FaseEvaEntity updateFaseInfo(FaseEvaEntity dto) {

        FaseEvaEntity actualizar = faseEvaluacionRepository.findById(dto.getIdfaseEva()).orElse(null);
        if (actualizar != null) {

            actualizar.setEvaluacion(dto.getEvaluacion());

            return faseEvaluacionRepository.saveAndFlush(actualizar);
        } else {
            throw new RuntimeException("El ID no existe");
        }
    }

    //SERVICIOS SIN USO

    public void flush() {

    }

    public <S extends FaseEvaEntity> S saveAndFlush(S entity) {
        return null;
    }

    public <S extends FaseEvaEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    public void deleteAllInBatch(Iterable<FaseEvaEntity> entities) {

    }

    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    public void deleteAllInBatch() {

    }

    public FaseEvaEntity getOne(Long aLong) {
        return null;
    }

    public FaseEvaEntity getById(Long aLong) {
        return null;
    }

    public FaseEvaEntity getReferenceById(Long aLong) {
        return null;
    }

    public <S extends FaseEvaEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    public <S extends FaseEvaEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    public <S extends FaseEvaEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    public <S extends FaseEvaEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    public <S extends FaseEvaEntity> long count(Example<S> example) {
        return 0;
    }

    public <S extends FaseEvaEntity> boolean exists(Example<S> example) {
        return false;
    }

    public <S extends FaseEvaEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    public <S extends FaseEvaEntity> S save(S entity) {
        return null;
    }

    public <S extends FaseEvaEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    public Optional<FaseEvaEntity> findById(Long aLong) {
        return Optional.empty();
    }

    public boolean existsById(Long aLong) {
        return false;
    }

    public List<FaseEvaEntity> findAll() {
        return null;
    }

    public List<FaseEvaEntity> findAllById(Iterable<Long> longs) {
        return null;
    }

    public long count() {
        return 0;
    }

    public void deleteById(Long aLong) {

    }

    public void delete(FaseEvaEntity entity) {

    }

    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    public void deleteAll(Iterable<? extends FaseEvaEntity> entities) {

    }

    public void deleteAll() {

    }

    public List<FaseEvaEntity> findAll(Sort sort) {
        return null;
    }

    public Page<FaseEvaEntity> findAll(Pageable pageable) {
        return null;
    }
}

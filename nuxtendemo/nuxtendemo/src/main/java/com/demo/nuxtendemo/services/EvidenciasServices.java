package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.DTO.EvidenciasDTO;
import com.demo.nuxtendemo.entitys.EvidenciasEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.repository.EvidenciasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class EvidenciasServices implements EvidenciasRepository {

    @Autowired
    private EvidenciasRepository evidenciasRepository;

    //SERVICIOS EN USO
    public EvidenciasServices(EvidenciasRepository evidenciasRepository) {
        this.evidenciasRepository = evidenciasRepository;
    }

    //Metodo encargado de crear una evidencias en la base de datos
    @Transactional
    public EvidenciasEntity crearEvidencia(EvidenciasDTO inDTO) {

        byte[] decodedBytes = Base64.getDecoder().decode(inDTO.getImagen());

        EvidenciasEntity evidencia = new EvidenciasEntity();
        evidencia.setImagen(decodedBytes);
        evidencia.setIdEvaluacion(inDTO.getIdEvaluacion());
        return evidenciasRepository.save(evidencia);
    }


    //Servicio encargado de eliminar una evidencias en la base de datos por idEvidencia
    public void deleteById(Long aLong) {
        evidenciasRepository.deleteById(aLong);
    }

    //Servicio encargado de eliminar una evidencias en la base de datos por idEvaluacion
    @Transactional
    public void deleteByidEvaluacion(Long idEvaluacion) {

        evidenciasRepository.deleteByidEvaluacion(idEvaluacion);
    }

    public List<EvidenciasEntity> findByIdEvaluacion(Long idEvaluacion) {
        return evidenciasRepository.findByIdEvaluacion(idEvaluacion);
    }

    //Servicio encargado de actualizar una evidencia por idEvidencia
    @Override
    public  EvidenciasEntity saveAndFlush(EvidenciasEntity entity) {
        EvidenciasEntity actualizar = evidenciasRepository.findById(entity.getIdEvidencia()).orElse(null);
        if (actualizar != null) {

            actualizar.setImagen(entity.getImagen());
            actualizar.setIdEvaluacion(entity.getIdEvaluacion());
            actualizar = evidenciasRepository.saveAndFlush(actualizar);

            return actualizar;
        } else {
            throw new RuntimeException("El ID no existe");
        }
    }


    //SERVICIOS EN DESUSO

    @Override
    public void flush() {

    }



    @Override
    public <S extends EvidenciasEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<EvidenciasEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public EvidenciasEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public EvidenciasEntity getById(Long aLong) {
        return null;
    }

    @Override
    public EvidenciasEntity getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends EvidenciasEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends EvidenciasEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends EvidenciasEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends EvidenciasEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends EvidenciasEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends EvidenciasEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends EvidenciasEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends EvidenciasEntity> S save(S entity) {
        return null;
    }

    @Override
    public <S extends EvidenciasEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<EvidenciasEntity> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<EvidenciasEntity> findAll() {
        return null;
    }

    @Override
    public List<EvidenciasEntity> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void delete(EvidenciasEntity entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends EvidenciasEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<EvidenciasEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<EvidenciasEntity> findAll(Pageable pageable) {
        return null;
    }


}

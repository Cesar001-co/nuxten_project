package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.GruposEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.repository.GruposRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class GruposServices implements GruposRepository {

    @Autowired
    private GruposRepository gruposRepository;


    //SERVICIOS EN USO

    public GruposEntity saveGroupByListUser(List<Long> listaUsuarios) {
        GruposEntity nuevoGrupo = new GruposEntity();
        nuevoGrupo.setUsuarios(listaUsuarios);
        return gruposRepository.save(nuevoGrupo);
    }

    public List<Long> getUsersByGroupId(Long groupId) {
        // Aquí implementa la lógica para obtener la lista de usuarios por el ID del grupo
        Optional<GruposEntity> grupoOptional = gruposRepository.findById(groupId);

        if (grupoOptional.isPresent()) {
            GruposEntity grupo = grupoOptional.get();
            return grupo.getUsuarios();
        }

        return null;
    }


    //SERVICIOS SIN USO

    @Override
    public void flush() {

    }

    @Override
    public <S extends GruposEntity> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends GruposEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<GruposEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public GruposEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public GruposEntity getById(Long aLong) {
        return null;
    }

    @Override
    public GruposEntity getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends GruposEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends GruposEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends GruposEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends GruposEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends GruposEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends GruposEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends GruposEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends GruposEntity> S save(S entity) {
        return null;
    }

    @Override
    public <S extends GruposEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<GruposEntity> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<GruposEntity> findAll() {
        return null;
    }

    @Override
    public List<GruposEntity> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {
        gruposRepository.deleteById(aLong); ;
    }


    @Override
    public void delete(GruposEntity entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends GruposEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<GruposEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<GruposEntity> findAll(Pageable pageable) {
        return null;
    }


}

package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.DTO.EvaluacionDTO;
import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.repository.EvaluacionRepository;
import com.demo.nuxtendemo.repository.UsuarioRepository;
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

/*
 * Clase que implementa los servicios de la interfaz EvaluacionRepository
 */
@Service
public class EvaluacionServices implements EvaluacionRepository{

    @Autowired
    private EvaluacionRepository evaluacionRepository;

    @Autowired
    private GruposServices gruposService;

    //SERVICIOS EN USO

    //Servicio encargado de guardar evaluacion
    public List<EvaluacionesEntity>  findAllEvaluaciones (){
        return evaluacionRepository.findAll();
    }

    //Servicio encargado de actualizar evaluacion por nombreSitio, url y tipo
    public EvaluacionDTO  updateEvaluacionInfo(EvaluacionDTO dto) {

        EvaluacionesEntity actualizar = evaluacionRepository.findById(dto.getIdEvaluacion()).orElse(null);
        if (actualizar != null) {

            actualizar.setNombreSitio(dto.getNombreSitio());
            actualizar.setUrlSitio(dto.getUrlSitio());
            actualizar.setTipoSitio(dto.getTipoSitio());
            actualizar = evaluacionRepository.saveAndFlush(actualizar);

            return EvaluacionDTO.fromEntity(actualizar);
        } else {
            throw new RuntimeException("El ID no existe");
        }
    }

    //Servicio encargado de eliminar grupo por idEvaluacion
    @Transactional
    public void eliminarGrupoAsociado(Long idEvaluacion) {

        // Busca la evaluación por su ID
        Optional<EvaluacionesEntity> evaluacionOptional = evaluacionRepository.findById(idEvaluacion);

        if (evaluacionOptional.isPresent()) {
            EvaluacionesEntity evaluacion = evaluacionOptional.get();

            // Obtén el ID del grupo asociado a la evaluación
            Long idGrupo = evaluacion.getIdGrupo();
            gruposService.deleteById(idGrupo);

            // Finalmente, elimina la evaluación
            evaluacionRepository.deleteById(idEvaluacion);
        } else {
            // Manejar el caso en el que la evaluación no existe con ese ID
            // Puedes lanzar una excepción o realizar otras acciones según tus necesidades
            throw new RuntimeException("La evaluación con ID " + idEvaluacion + " no existe.");
        }
    }

    //Servicio encargado de actualizar la fase de la evaluacion
    public EvaluacionDTO  updateNombreFaseEva(EvaluacionDTO dto) {

        EvaluacionesEntity actualizar = evaluacionRepository.findById(dto.getIdEvaluacion()).orElse(null);
        if (actualizar != null) {

            actualizar.setFase(dto.getFase());
            actualizar = evaluacionRepository.saveAndFlush(actualizar);

            return EvaluacionDTO.fromEntity(actualizar);
        } else {
            throw new RuntimeException("El ID no existe");
        }
    }

    //Servicio encargado de guardar evaluacion
    public <S extends EvaluacionesEntity> S save(S entity) {
        return evaluacionRepository.save(entity);
    }

    //Servicio encargado de buscar evaluacion por idEvaluacion
    public EvaluacionesEntity findByIdEvaluacion(Long idEvaluacion) {
        return evaluacionRepository.findByIdEvaluacion(idEvaluacion);
    }

    //Servicio encargado de eliminar evaluacion por idEvaluacion
    public void deleteById(Long aLong) {
        evaluacionRepository.deleteById(aLong);
    }

    //SERVICIOS SIN USO

    @Override
    public void flush() {

    }

    @Override
    public <S extends EvaluacionesEntity> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends EvaluacionesEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<EvaluacionesEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public EvaluacionesEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public EvaluacionesEntity getById(Long aLong) {
        return null;
    }

    @Override
    public EvaluacionesEntity getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends EvaluacionesEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends EvaluacionesEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends EvaluacionesEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends EvaluacionesEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends EvaluacionesEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends EvaluacionesEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends EvaluacionesEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends EvaluacionesEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<EvaluacionesEntity> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<EvaluacionesEntity> findAll() {
        return null;
    }

    @Override
    public List<EvaluacionesEntity> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void delete(EvaluacionesEntity entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends EvaluacionesEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<EvaluacionesEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<EvaluacionesEntity> findAll(Pageable pageable) {
        return null;
    }


}

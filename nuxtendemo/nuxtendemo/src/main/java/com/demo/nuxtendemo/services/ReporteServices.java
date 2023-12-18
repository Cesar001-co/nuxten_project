package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.entitys.GruposEntity;
import com.demo.nuxtendemo.entitys.ReportesEntity;
import com.demo.nuxtendemo.repository.GruposRepository;
import com.demo.nuxtendemo.repository.ReporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class ReporteServices implements ReporteRepository {

    @Autowired
    ReporteRepository reporteRepository;

    @Autowired
    GruposRepository gruposRepository;

    @Autowired
    GruposServices gruposServices;


    //SERVICIO EN USO

    public void guardarPlantilla(byte[] contenidoPlantilla) {
        ReportesEntity plantilla = new ReportesEntity();
        plantilla.setReporte(contenidoPlantilla);
        reporteRepository.save(plantilla);
    }

    @Transactional
    public void crearReporte(String nombreSitio, String verUrl, String idEvaluacion, byte[] reporte, Long idGrupoId) {
        LocalDateTime fechaReporte = LocalDateTime.now();

        // Busca el grupo por su ID
        Optional<GruposEntity> grupoOptional = gruposRepository.findById(idGrupoId);

        if (grupoOptional.isPresent()) {
            GruposEntity grupo = grupoOptional.get();

            // Crea el nuevo reporte con el grupo encontrado
            ReportesEntity nuevoReporte = new ReportesEntity(nombreSitio, verUrl, idEvaluacion, fechaReporte, reporte, grupo);

            // Guarda el nuevo reporte en la base de datos
            reporteRepository.save(nuevoReporte);
        } else {
            throw new RuntimeException("El grupo con ID " + idGrupoId + " no existe.");
        }
    }

    public List<ReportesEntity> obtenerReportesPorIdUser(Long idUser) {
        List<Long> idGrupos = gruposServices.findIdGrupoByIdUser(idUser);

        if (!idGrupos.isEmpty()) {
            List<GruposEntity> grupos = gruposRepository.findAllById(idGrupos);

            List<ReportesEntity> reportes = new ArrayList<>();
            for (GruposEntity grupo : grupos) {
                reportes.addAll(grupo.getReportes());
            }

            return reportes;
        }

        // Retorna una lista vacía si no se encuentra el grupo
        return Collections.emptyList();
    }

    //Servicio encargado de eliminar reporte por idReporte
    public void deleteById(Long aLong) {
        reporteRepository.deleteById(aLong);
    }

    //Servicio encargado de buscar todos los reportes sin parametros
    public List<ReportesEntity> findAll() {
        return reporteRepository.findAll();
    }


    public byte[] descargarReporte(Long idReporte) {
        Optional<ReportesEntity> reporteOptional = reporteRepository.findByIdReportes(idReporte);

        if (reporteOptional.isPresent()) {
            ReportesEntity reporteEntity = reporteOptional.get();
            return reporteEntity.getReporte();
        } else {
            throw new RuntimeException("Reporte no encontrado con ID: " + idReporte);
        }
    }

    //SERVICIO EN DESUSO
    @Override
    public void flush() {

    }

    @Override
    public <S extends ReportesEntity> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends ReportesEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<ReportesEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public ReportesEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public ReportesEntity getById(Long aLong) {
        return null;
    }

    @Override
    public ReportesEntity getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends ReportesEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends ReportesEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends ReportesEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends ReportesEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends ReportesEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends ReportesEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends ReportesEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends ReportesEntity> S save(S entity) {
        return null;
    }

    @Override
    public <S extends ReportesEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<ReportesEntity> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<ReportesEntity> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void delete(ReportesEntity entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends ReportesEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<ReportesEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<ReportesEntity> findAll(Pageable pageable) {
        return null;
    }


    @Override
    public Optional<ReportesEntity> findByIdReportes(Long idReportes) {
        return Optional.empty();
    }
}

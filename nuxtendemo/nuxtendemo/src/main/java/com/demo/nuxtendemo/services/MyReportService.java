package com.demo.nuxtendemo.services;

import com.demo.nuxtendemo.DTO.ReporteEvaluacionDTO;
import com.demo.nuxtendemo.DTO.expertoDTO;
import com.demo.nuxtendemo.DTO.problemasInicialDTO;
import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.UsuariosEntity;
import com.demo.nuxtendemo.repository.EvaluacionRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MyReportService {

    @Autowired
    private EvaluacionRepository evaluacionRepository;

    private final EvaluacionServices evaluacionServices;
    private final UsuarioServices usuariosServices;

    // Constructor injection
    public MyReportService(EvaluacionServices evaluacionServices, UsuarioServices usuariosServices) {
        this.evaluacionServices = evaluacionServices;
        this.usuariosServices = usuariosServices;
    }

    public JasperPrint generateReportFromDTO(List<ReporteEvaluacionDTO> usuariosList, List<problemasInicialDTO> usuariosList2) {
        try {
            // Configurar la lista de expertos como fuente de datos
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(usuariosList);

            List<expertoDTO> listaExperto =
                    usuariosList.stream()
                            .map(x-> new expertoDTO(x.getNombreExperto(), x.getEmail(), x.getNumero())).toList();
            List<problemasInicialDTO> problemasInicialDTOList =
                    usuariosList2.stream()
                            .map(x-> new problemasInicialDTO(x.getNum(), x.getDefProb(), x.getExpProb(), x.getPrincipios(), x.getIdEvid(),x.getEvidencia())).toList();

            Map<String, Object> params = new HashMap<String, Object>();
            params.put("expertData", new JRBeanCollectionDataSource(listaExperto));
            params.put("problemasInicialesData", new JRBeanCollectionDataSource(problemasInicialDTOList));
            params.put("nombreSitio", usuariosList.get(0).getNombreSitio());
            params.put("urlSitio", usuariosList.get(0).getUrlSitio());
            params.put("tipoSitio", usuariosList.get(0).getTipoSitio());
            params.put("fechaCreacion", usuariosList.get(0).getFechaCreacion());
            params.put("idEvaluacion", usuariosList.get(0).getIdEvaluacion());


            return JasperFillManager.fillReport(JasperCompileManager.compileReport(
                    ResourceUtils.getFile("classpath:nuxtenReport.jrxml")
                            .getAbsolutePath()), params, new JREmptyDataSource());

            // Cargar el archivo de diseño del informe
            //Resource resource = new ClassPathResource("nuxtenReport.jasper");
            //String reportPath = resource.getFile().getAbsolutePath();
            //return JasperFillManager.fillReport(reportPath, null, dataSource);

        } catch (IOException | JRException e) {
            e.printStackTrace(); // Manejar o registrar la excepción según sea necesario
            throw new RuntimeException("Error al generar el informe", e);
        }
    }

    public JasperPrint generateReportFromEntity(Long idEvaluacion) {
        try {
            EvaluacionesEntity evaluacionEntity = evaluacionServices.findByIdEvaluacion(idEvaluacion);

            if (evaluacionEntity != null) {
                // Obtener la lista de usuarios relacionados con la evaluación
                List<UsuariosEntity> usuariosList = usuariosServices.findByIdEvaluacion(idEvaluacion);

                // Configurar la lista de expertos como fuente de datos
                List<UsuariosEntity> expertosList = usuariosList.stream()
                        .map(usuario -> new UsuariosEntity(usuario.getNombreExperto(), usuario.getEmail(), usuario.getNumero()))
                        .collect(Collectors.toList());

                JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(expertosList);

                // Cargar el archivo de diseño del informe
                Resource resource = new ClassPathResource("nuxtenReport.jasper");
                String reportPath = resource.getFile().getAbsolutePath();
                return JasperFillManager.fillReport(reportPath, null, dataSource);

            } else {
                throw new RuntimeException("Evaluación no encontrada");
            }
        } catch (IOException | JRException e) {
            e.printStackTrace(); // Manejar o registrar la excepción según sea necesario
            throw new RuntimeException("Error al generar el informe", e);
        }
    }

    //Servicio encargado de generar el reporte por idEvaluacion.
    public JasperPrint generateReportFromEntityS(EvaluacionesEntity evaluacionEntity) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("idEvaluacion", evaluacionEntity.getIdEvaluacion());
            params.put("nombreSitio", evaluacionEntity.getNombreSitio());
            params.put("urlSitio", evaluacionEntity.getUrlSitio());
            params.put("tipoSitio", evaluacionEntity.getTipoSitio());

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String fechaCreacionStr = evaluacionEntity.getFechaCreacion().format(formatter);
            params.put("fechaCreacion", fechaCreacionStr);

            // Utilizar una ruta relativa para cargar la imagen
            params.put("RUTA_IMAGEN", "recursos/logotipo.png");

            // Obtener la ruta del informe desde el directorio de recursos
            Resource resource = new ClassPathResource("nuxtenReport.jasper");
            String reportPath = resource.getFile().getAbsolutePath();

            return JasperFillManager.fillReport(reportPath, params, new JREmptyDataSource());
        } catch (IOException | JRException e) {
            e.printStackTrace(); // Manejar o registrar la excepción según sea necesario

            // Puedes lanzar una excepción personalizada o devolver null, según tus requisitos
            throw new RuntimeException("Error al generar el informe", e);
        }
    }
}
package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.ReportesEntity;
import com.demo.nuxtendemo.repository.ReporteRepository;
import com.demo.nuxtendemo.services.MyReportService;
import com.demo.nuxtendemo.services.ReporteServices;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import jakarta.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/reporteController")
public class ReporteController {

    @Autowired
    private ReporteServices reporteServices;

    @Autowired
    private ReporteRepository reporteRepository;

    @Autowired
    private MyReportService reportService;

    @GetMapping(value = "/generate", produces = MediaType.APPLICATION_PDF_VALUE)
    public void generateReport(HttpServletResponse response) throws IOException {
        try {
            // Supongamos que necesitas algunos parámetros, puedes ajustar esto según tus necesidades
            Long idEvaluacion = 1L;
            String nombreSitio = "Sitio de ejemplo";
            String urlSitio = "http://ejemplo.com";
            String tipoSitio = "Ejemplo";
            String fechaCreacion = "2023-01-01";

            // Genera el informe
            JasperPrint jasperPrint = reportService.generateReport(idEvaluacion, nombreSitio, urlSitio, tipoSitio, fechaCreacion);

            // Configura la respuesta HTTP
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=reporte.pdf"); // Puedes cambiar "reporte.pdf" al nombre que desees

            // Exporta el informe a PDF y envíalo como respuesta
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());

            // ... tu código para generar el informe ...
        } catch (JRException e) {
            e.printStackTrace();
            // También puedes lanzar una nueva excepción personalizada o manejarla de otra manera
        }
    }

}

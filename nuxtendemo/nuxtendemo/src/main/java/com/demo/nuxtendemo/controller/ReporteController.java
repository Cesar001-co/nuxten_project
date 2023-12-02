package com.demo.nuxtendemo.controller;

import com.demo.nuxtendemo.entitys.EvaluacionesEntity;
import com.demo.nuxtendemo.entitys.ReportesEntity;
import com.demo.nuxtendemo.repository.ReporteRepository;
import com.demo.nuxtendemo.services.EvaluacionServices;
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
import org.springframework.web.bind.annotation.PathVariable;
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
    private EvaluacionServices evaluacionServices;

    @Autowired
    private MyReportService reportService;

    //Para abrir el archivo en el navegador: http://localhost:8080/reporteController/generarReportePDF/{idEvaluacion}

    // Método para generar el reporte en PDF
    @GetMapping(value = "/generarReportePDF/{idEvaluacion}", produces = MediaType.APPLICATION_PDF_VALUE)
    public void generateReport(@PathVariable Long idEvaluacion, HttpServletResponse response) throws IOException {
        try {
            EvaluacionesEntity evaluacionEntity = evaluacionServices.findByIdEvaluacion(idEvaluacion);

            if(evaluacionEntity != null) {
                JasperPrint jasperPrint = reportService.generateReportFromEntity(evaluacionEntity);
                response.setContentType("application/pdf");
                response.setHeader("Content-Disposition", "inline; filename=reporteEvaluacion.pdf");
                JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
            }else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Evaluación no encontrada");
            }

        } catch (JRException e) {
            e.printStackTrace();
        }
    }

}

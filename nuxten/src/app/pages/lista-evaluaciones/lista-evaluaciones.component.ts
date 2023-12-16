import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { listaEvaluaciones } from 'src/app/interfaces/Evaluaciones';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { ReportesService } from 'src/app/services/gestionar-evaluaciones/reportes.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'nuxten-lista-evaluaciones',
  templateUrl: './lista-evaluaciones.component.html',
  styleUrls: ['./lista-evaluaciones.component.scss']
})
export class ListaEvaluacionesComponent implements OnInit {

  dataSouceEvaluaciones!: MatTableDataSource<listaEvaluaciones>;
  displayedColumnsEvaluaciones: string[] = ['nom', 'ver', 'eva', 'fec', 'des'];
  problemasDesvEvaluaciones: listaEvaluaciones[] = [];

  constructor(
    private reporteService: ReportesService,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.getEvaluaciones();
  }

  //OBTENER LAS EVALUACIONES
  getEvaluaciones() {
    this.userService.getUserData().subscribe((experto: ExpertoData) => {
      this.reporteService.getReportesByUserID(experto.idUser).subscribe({
        next: (reportes: any) => {
          reportes.map((reporte: any) => {
            this.problemasDesvEvaluaciones.push({
              idReporte: reporte.idReportes,
              idGrupo: reporte.idGrupo.idGrupo,
              nombre: reporte.nombreSitio,
              verUrl: reporte.verUrl,
              evaluacion: reporte.idEvaluacion,
              fecha: reporte.fechaReporte,
              reporte: reporte.reporte
            });
          })
          this.dataSouceEvaluaciones = new MatTableDataSource(this.problemasDesvEvaluaciones);
        },
        error: (err) => {
          console.log(err);
        },
      });
    })
  }

  //DESCARGAR EL REPORTE
  download(base64: string) {
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map(char => char.charCodeAt(0))
    );
  
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    let pdfName = "reports.pdf";

    const url = window.URL.createObjectURL(file);


    const link = document.createElement('a');

    link.href = url;
    link.download = 'file.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  changeDataFormat(fecha: any) {
    //CAMBIAR EL FORMATO DE LA FECHA DE CREACION
    const opcionesFechaHora: any = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    const fechaCreacion = new Date(fecha);
    return fechaCreacion.toLocaleString('es-ES', opcionesFechaHora);
  }
}

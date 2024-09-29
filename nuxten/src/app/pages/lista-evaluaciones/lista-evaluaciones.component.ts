import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { listaEvaluaciones } from 'src/app/interfaces/Evaluaciones';
import { ReportesService } from 'src/app/services/gestionar-evaluaciones/reportes.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AdvertenciaComponent } from 'src/app/components/dialog-alerts/advertencia/advertencia.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'nuxten-lista-evaluaciones',
  templateUrl: './lista-evaluaciones.component.html',
  styleUrls: ['./lista-evaluaciones.component.scss']
})
export class ListaEvaluacionesComponent implements OnInit {

  dataSouceEvaluaciones!: MatTableDataSource<listaEvaluaciones>;
  displayedColumnsEvaluaciones: string[] = ['nom', 'ver', 'eva', 'fec', 'des'];
  evaluacionesReportes: listaEvaluaciones[] = [];

  lista_evaluaciones!: any

  constructor(
    private reporteService: ReportesService,
    private dialog: MatDialog,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.lista_evaluaciones = this.route.snapshot.data['listaEva'];
    this.setReportes(this.lista_evaluaciones);
  }

  setReportes(reportes) {
    if (reportes) {
      this.evaluacionesReportes = [];
      if (this.evaluacionesReportes.length == 0) {
        reportes.map((reporte: any) => {
          this.evaluacionesReportes.push({
            idReporte: reporte.idReportes,
            idGrupo: reporte.idGrupo.idGrupo,
            nombre: reporte.nombreSitio,
            verUrl: reporte.verUrl,
            evaluacion: reporte.idEvaluacion,
            fecha: reporte.fechaReporte,
            reporte: reporte.reporte
          });
        });
        this.dataSouceEvaluaciones = new MatTableDataSource(this.evaluacionesReportes);
      }
    }
  }

  //DESCARGAR EL REPORTE
  //ESTA FUNCION DESCIFRA LA EVALUACION EN DE BASE 64 A UN JSON ENTENDIBLE POR PDFMAKE
  download(reporte: any, id: any) {
    // const binaryData = atob(reporte);
    // const binaryData2 = atob(binaryData);
    const binaryData = decodeURIComponent(escape(atob(reporte)));
    const binaryData2 = decodeURIComponent(escape(atob(binaryData)));
    // const uint8Array = new Uint8Array(binaryData2.length);

    // for (let i = 0; i < binaryData2.length; i++) {
    //   uint8Array[i] = binaryData2.charCodeAt(i);
    // }

    // const chunkSize = 0x8000;
    // let jsonString = '';

    // for (let i = 0; i < uint8Array.length; i += chunkSize) {
    //   const chunk = uint8Array.subarray(i, i + chunkSize);
    //   jsonString += String.fromCharCode.apply(null, chunk);
    // }

    // console.log(jsonString);
    
    const parsedJson = JSON.parse(binaryData2);

    const pdf = pdfMake.createPdf(parsedJson.docDefinition);
    pdf.download('Evaluacion_' + id + '.pdf');
  }

  eliminar(reporte: any) {
    const dialogAv = this.dialog.open(AdvertenciaComponent, {
      data: { selected: 14, name: reporte },
      disableClose: true
    })
    dialogAv.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteReporte(reporte);
      }
    });
  }

  //ESTA FUNCION ELEMINAR EL REPORTE DE LA BASE DE DATOS
  deleteReporte(reporte: any) {
    this.reporteService.deleteReporte(reporte).subscribe({
      error: (err) => {
        if (err.status == 200) {
          this.toast.success("Reporte eliminado con exito", "Mensaje de Confirmación");
          this.lista_evaluaciones = this.lista_evaluaciones.filter(evaluaciones => evaluaciones.idReportes !== reporte);
          this.setReportes(this.lista_evaluaciones);
        } else {
          console.log(err);
        }
      },
    })
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

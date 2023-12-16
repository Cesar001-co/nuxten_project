import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { listaEvaluaciones } from 'src/app/interfaces/Evaluaciones';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { ReportesService } from 'src/app/services/gestionar-evaluaciones/reportes.service';

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
      this.reporteService.getReportesByUserID(experto.idUser).subscribe((reportes: any) => {
        console.log(reportes);
        this.problemasDesvEvaluaciones.push(
          {
            nombre: 'nuxten',
            verUrl: '1.0.0',
            evaluacion: 12,
            fecha: (new Date()).toString(),
            reporte: undefined
          },
          {
            nombre: 'lan',
            verUrl: 'LAN.COM',
            evaluacion: 122,
            fecha: (new Date()).toString(),
            reporte: undefined
          }
        )
        this.dataSouceEvaluaciones= new MatTableDataSource(this.problemasDesvEvaluaciones);
      });
    })
  }

  //DESCARGAR EL REPORTE
  download(evaluacion: any) {
    console.log('descargando: ', evaluacion.reporte);
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

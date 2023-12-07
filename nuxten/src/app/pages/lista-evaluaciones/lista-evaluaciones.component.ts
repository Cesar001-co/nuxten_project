import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { listaEvaluaciones } from 'src/app/interfaces/Evaluaciones';

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

  ) {

  }

  ngOnInit() {
    this.getEvaluaciones();
  }

  //OBTENER LAS EVALUACIONES
  getEvaluaciones() {
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

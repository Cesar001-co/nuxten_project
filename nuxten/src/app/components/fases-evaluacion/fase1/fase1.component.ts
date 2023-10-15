import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Problema } from 'src/app/interfaces/Evaluaciones';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { AgregarProblemaComponent } from '../agregar-problema/agregar-problema.component';
import { Principio, listaPrincipios } from '../../../interfaces/Principios';

// interface principio {
//   heuristica: string,
//   nombre: string,
//   descripcion: string
// }

@Component({
  selector: 'nuxten-fase1',
  templateUrl: './fase1.component.html',
  styleUrls: ['./fase1.component.scss']
})

export class Fase1Component implements OnInit {

  dataSource!: MatTableDataSource<Problema>;
  problemas: Problema[] = []
  principios: Principio [] = listaPrincipios;
  displayedColumns: string[] = ['heuristica', 'nombre', 'descripcion'];
  displayedColumnsProblemas: string[] = ['def', 'des', 'principios', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.getUserProblemas();
  }

  ngOnDestroy() {
    //GUARDAR DATOS PROBLEMAS DE LA EVALUACION DEL EVALUADOR
    
  }

  getUserProblemas() {
    //VERIFICA SI EL USUARIO HA AGREGADO PROBLEMAS EN EL EVALUACION

  }

  agregarProblema() {
    const dialogPr = this.dialog.open(AgregarProblemaComponent);
    dialogPr.afterClosed().subscribe(problema => {
      if (problema) {
        this.problemas.push(problema);
        this.dataSource = new MatTableDataSource(this.problemas);
      }
    });
    // this.problemas.push(
    //   {
    //     defProb: 'Enlaces rotos “404 Not Found”',
    //     expProb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacus orci. Donec consequat risus in pretium dapibus. Proin scelerisque, tellus sit amet suscipit tincidunt, elit diam consequat nisi, vitae scelerisque dolor dui eget ex. Donec gravida turpis et pellentesque accumsan. Vivamus posuere dolor sit amet urna bibendum accumsan. Vivamus auctor ornare enim, et euismod mi luctus id.',
    //     principios: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']
    //   },
    //   {
    //     defProb: 'Botones que retornan a la misma pagina',
    //     expProb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacus orci. Donec consequat risus in pretium dapibus. Proin scelerisque, tellus sit amet suscipit tincidunt, elit diam consequat nisi, vitae scelerisque dolor dui eget ex. Donec gravida turpis et pellentesque accumsan. Vivamus posuere dolor sit amet urna bibendum accumsan. Vivamus auctor ornare enim, et euismod mi luctus id.',
    //     principios: ['H1', 'H2']
    //   }
    // )
  }

  deleteProblema(problema: Problema) {
    const dialogAv = this.dialog.open(AdvertenciaComponent, {
      data: { selected: 9, name: problema.defProb },
      disableClose: true
    })
    dialogAv.afterClosed().subscribe(result => {
      if (result == true) {
        this.toast.success("Problema eliminado con exito", "Mensaje de Confirmación");
        this.problemas = this.problemas.filter(problemas => problemas != problema);
        this.dataSource = new MatTableDataSource(this.problemas);
      }
    })
  }

}

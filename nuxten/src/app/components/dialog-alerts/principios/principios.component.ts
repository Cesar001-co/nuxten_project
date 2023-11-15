import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Principio } from 'src/app/interfaces/Principios';
import { HeuristicasService } from 'src/app/services/gestionar-fases/heuristicas.service';

@Component({
  selector: 'nuxten-principios',
  templateUrl: './principios.component.html',
  styleUrls: ['./principios.component.scss']
})
export class PrincipiosComponent implements OnInit{

  principios: Principio [] = [];
  principiosDataSource!: MatTableDataSource<Principio>;
  displayedColumns: string[] = ['heuristica', 'nombre', 'descripcion'];

  constructor (
    private heuristicasService: HeuristicasService
  ) {

  }

  ngOnInit() {
    this.getHeuristicas()
  }

  getHeuristicas() {
    this.heuristicasService.getAllHeuristicas().subscribe( (heuristica: any) => {
      for (const heuristicas of heuristica) {
        this.principios.push({
          heuristica: heuristicas.codigoHeuristica,
          nombre: heuristicas.nombreHeuristica,
          descripcion: heuristicas.descripcionHeuristica
        });
      }
      this.principiosDataSource = new MatTableDataSource(this.principios);
    });
  }
  
}

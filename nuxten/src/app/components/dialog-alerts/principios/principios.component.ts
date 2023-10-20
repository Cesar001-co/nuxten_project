import { Component } from '@angular/core';
import { Principio, listaPrincipios } from 'src/app/interfaces/Principios';

@Component({
  selector: 'nuxten-principios',
  templateUrl: './principios.component.html',
  styleUrls: ['./principios.component.scss']
})
export class PrincipiosComponent {
  principios: Principio [] = listaPrincipios;
  displayedColumns: string[] = ['heuristica', 'nombre', 'descripcion'];
}

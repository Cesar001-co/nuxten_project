import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface Select {
  selected: number,
  name: string
}

@Component({
  selector: 'nuxten-advertencia',
  templateUrl: './advertencia.component.html',
  styleUrls: ['./advertencia.component.scss']
})

export class AdvertenciaComponent {
  title = '';
  label = '';
  parrafo = '';

  desicion = false;
  display = [
    {title: 'Advertencia', label: '¿Esta seguro que desea agregar al experto '+this.data.name+'?', parrafo: ''},
    {title: 'Advertencia', label: '¿Esta seguro que desea eliminar al experto '+ this.data.name +'?', parrafo: ''},
    {title: 'Advertencia', label: '¿Esta seguro que desea finalizar la fase?', parrafo: 'una vez finalizada la fase no se podra retornar'},
    {title: 'Advertencia', label: '¿Esta seguro que desea modificar la información del experto '+ this.data.name +'?', parrafo: ''}
  ];

  constructor(
    public dialogRef: MatDialogRef<AdvertenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Select,
  ) {
    this.setDisplay();
  }

  setDisplay() {
    this.title = this.display[this.data.selected].title;
    this.label = this.display[this.data.selected].label;
    this.parrafo = this.display[this.data.selected].parrafo;
  }
}
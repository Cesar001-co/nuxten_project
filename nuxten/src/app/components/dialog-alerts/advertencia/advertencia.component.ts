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
    {title: 'Advertencia', label: '¿Esta seguro que desea modificar la información del experto '+ this.data.name +'?', parrafo: ''},
    {title: 'Advertencia', label: '¿Esta seguro que desea modificar la información?', parrafo: 'una vez se modifica la información se debe iniciar sesión de nuevo'},
    {title: 'Advertencia', label: '¿Esta seguro que desea cambiar la contraseña?', parrafo: 'una vez se cambia la contraseña se debe iniciar sesión de nuevo'},
    {title: 'Advertencia', label: '¿Esta seguro que desea crear la evaluación ?', parrafo: ''},
    {title: 'Advertencia', label: '¿Esta seguro que desea eliminar la evaluación '+ this.data.name +'?', parrafo: ''},
    {title: 'Advertencia', label: '¿Esta seguro que desea finalizar la fase?', parrafo: 'una vez finalizada la fase no se puede retornar'}
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

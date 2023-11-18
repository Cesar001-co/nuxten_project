import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface Select {
  selected: number,
  name: string,
  name2: String
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
    //ADVERTENCIA 0:
    {title: 'Advertencia', label: '¿Esta seguro que desea AGREGAR al experto '+this.data.name+'?', parrafo: ''},
    //ADVERTENCIA 1:
    {title: 'Advertencia', label: '¿Esta seguro que desea ELIMINAR al experto '+ this.data.name +'?', parrafo: ''},
    //ADVERTENCIA 2:
    {title: 'Advertencia', label: '¿Esta seguro que desea FINALIZAR la fase?', parrafo: 'una vez finalizada la fase no se podra retornar'},
    //ADVERTENCIA 3:
    {title: 'Advertencia', label: '¿Esta seguro que desea MODIFICAR la información del experto '+ this.data.name +'?', parrafo: ''},
    //ADVERTENCIA 4:
    {title: 'Advertencia', label: '¿Esta seguro que desea MODIFICAR la información?', parrafo: 'una vez se modifica la información se debe iniciar sesión de nuevo'},
    //ADVERTENCIA 5:
    {title: 'Advertencia', label: '¿Esta seguro que desea CAMBIAR la contraseña?', parrafo: 'una vez se cambia la contraseña se debe iniciar sesión de nuevo'},
    //ADVERTENCIA 6:
    {title: 'Advertencia', label: '¿Esta seguro que desea CREAR la evaluación ?', parrafo: ''},
    //ADVERTENCIA 7:
    {title: 'Advertencia', label: '¿Esta seguro que desea ELIMINAR la evaluación '+ this.data.name +'?', parrafo: ''},
    //ADVERTENCIA 8: FINALIZAR FASE
    {title: 'Advertencia', label: '¿Esta seguro que desea FINALIZAR la fase?', parrafo: 'una vez finalizada la fase no se puede retornar'},
    //ADVERTENCIA 9:
    {title: 'Advertencia', label: '¿Esta seguro que desea ELIMINAR el problema "'+ this.data.name +'"?', parrafo: ''},
    //ADVERTENCIA 10: AGREGAR PROBLEMA
    {title: 'Advertencia', label: '¿Esta seguro que desea AGREGAR el problema "'+ this.data.name +'"?', parrafo: ''},
    //ADVERTENCIA 11: AGREGAR UNA EVIDENCIA SI YA EXISTE OTRA
    {title: 'Advertencia', label: '¿Esta seguro que deseas REEMPLAZAR la evidenica ('+ this.data.name +') por ('+ this.data.name2 +')', parrafo: ''},
    //ADVERTENCIA 12: ELIMINAR UNA EVIDENCIA
    {title: 'Advertencia', label: '¿Esta seguro que deseas ELIMINAR la evidenica ('+ this.data.name +')', parrafo: ''},
    //ADVERTENCIA 13: AGREGAR SOLUCION
    {title: 'Advertencia', label: '¿Esta seguro que desea AGREGAR la solucion al problema?', parrafo: ''},
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

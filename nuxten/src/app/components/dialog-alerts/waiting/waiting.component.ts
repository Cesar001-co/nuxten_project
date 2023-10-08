import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'nuxten-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent {

  desicion = false;

  constructor(
    public dialogRef: MatDialogRef<WaitingComponent>,
  ) {
    setTimeout(()=> {this.cerrrar()}, 5000)
  }
  
  cerrrar() {
    this.dialogRef.close();
  }
}

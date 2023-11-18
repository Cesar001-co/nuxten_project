import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdvertenciaComponent } from '../advertencia/advertencia.component';
import { ProblemaInfo } from 'src/app/interfaces/Evaluaciones';

@Component({
  selector: 'nuxten-editar-solucion',
  templateUrl: './editar-solucion.component.html',
  styleUrls: ['./editar-solucion.component.scss']
})
export class EditarSolucionComponent implements OnInit{

  submitted = false;
  problemaInfo!: ProblemaInfo; 

  constructor (
    public dialogRef: MatDialogRef<EditarSolucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    this.problemaInfo = data.problema;
  }
  ngOnInit(): void {
    this.problemaForm.get('solucion')?.setValue(this.problemaInfo.solucion);
  }

  problemaForm = new FormGroup({
    solucion: new FormControl('', Validators.required)
  });

  onChange(id: any, form: FormGroup) {
    let textField = document.getElementById(id);
    if (this.submitted == true) {
      if (form.get(id)?.invalid) {
        textField?.classList.add('error');
      } else {
        textField?.classList.remove('error');
      }
    }
  }

  agregar() {
    if (this.submitted == true) {
      if (this.problemaForm.invalid) {
        let soltxtField = document.getElementById('solucion');
        if (this.problemaForm.get('solucion')?.invalid) {
          soltxtField?.classList.add('error');
        }
      } else {
        const dialogAv = this.dialog.open(AdvertenciaComponent, {
          data: { selected: 13, name: '' },
          disableClose: true
        })
        dialogAv.afterClosed().subscribe(result => {
          if (result) {
            this.problemaInfo.solucion = this.problemaForm.get('solucion')?.value!;
            this.dialogRef.close(this.problemaInfo);
          }
        })
      }
    } else {
      this.submitted = true;
      this.agregar();
    }
  }

  goBack() {
    this.dialogRef.close();
  }
}

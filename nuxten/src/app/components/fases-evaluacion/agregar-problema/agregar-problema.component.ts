import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { PrincipiosComponent } from '../../dialog-alerts/principios/principios.component';
import { HeuristicasService } from 'src/app/services/gestionar-fases/heuristicas.service';

@Component({
  selector: 'nuxten-agregar-problema',
  templateUrl: './agregar-problema.component.html',
  styleUrls: ['./agregar-problema.component.scss']
})
export class AgregarProblemaComponent implements OnInit{

  submitted = false;
  principios: any [] = [];

  constructor(
    public dialogRef: MatDialogRef<AgregarProblemaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private heuristicasService: HeuristicasService
  ) {

  }
  ngOnInit() {
    this.getHeuristicas();
  }

  problemaForm = new FormGroup({
    defProb: new FormControl('', Validators.required),
    expProb: new FormControl('', Validators.required),
    principios: new FormControl('', Validators.required)
  });

  getHeuristicas() {
    this.heuristicasService.getAllHeuristicas().subscribe( (heuristicas: any) => {
      this.principios = heuristicas.map( (heuristica: any) => heuristica.codigoHeuristica);
    });
  }

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

  onChangeSelect(id: any) {
    let textField = document.getElementById(id);
    if (this.submitted == true) {
      if ((this.problemaForm.get(id)?.value)?.length! > 0) {
        textField?.classList.remove('error');
      } else {
        textField?.classList.add('error');
      }
    }
    
  }

  agregar() {
    if (this.submitted == true) {
      if (this.problemaForm.invalid) {
        let deftxtField = document.getElementById('defProb');
        let exptxtField = document.getElementById('expProb');
        let princitxtField = document.getElementById('principios');

        if (this.problemaForm.get('defProb')?.invalid) {
          deftxtField?.classList.add('error');
        }
        if (this.problemaForm.get('expProb')?.invalid) {
          exptxtField?.classList.add('error');
        }
        if (this.problemaForm.get('principios')?.invalid) {
          princitxtField?.classList.add('error');
        }
      } else {
        const dialogAv = this.dialog.open(AdvertenciaComponent, {
          data: { selected: 10, name: this.problemaForm.get('defProb')?.value },
          disableClose: true
        })
        dialogAv.afterClosed().subscribe(result => {
          this.registrarProblema(result);
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

  goPrincipios(){
    const dialogPrin = this.dialog.open(PrincipiosComponent);
  }

  registrarProblema(desicion: boolean) {
    if (desicion) {
      this.dialogRef.close(this.problemaForm.value);
    }
  }
}

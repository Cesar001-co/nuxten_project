import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpertoInFo } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';

@Component({
  selector: 'nuxten-modificar-experto',
  templateUrl: './modificar-experto.component.html',
  styleUrls: ['./modificar-experto.component.scss']
})
export class ModificarExpertoComponent {
  submitted = false;
  hide2 = true;
  hide1 = true;
  disableTextbox = true;

  constructor(
    public dialogRef: MatDialogRef<ModificarExpertoComponent>,
    private dialog: MatDialog,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: ExpertoInFo
  ) {
    this.setData();
    this.userExpertForm.get('identfi')?.disable();
  }

  userExpertForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    identfi: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    numero: new FormControl('', Validators.required)
  });

  setData() {

    this.userExpertForm.get('nombres')?.setValue(this.data.nombres);
    this.userExpertForm.get('apellidos')?.setValue(this.data.apellidos);
    this.userExpertForm.get('identfi')?.setValue('' + this.data.identfi);
    this.userExpertForm.get('email')?.setValue(this.data.email);
    this.userExpertForm.get('numero')?.setValue('' + this.data.numero)
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

  goBack() {
    this.dialogRef.close();
  }

  modificar() {
    if (this.submitted == true) {
      if (this.userExpertForm.invalid) {
        let nombrestxtField = document.getElementById('nombres');
        let apellidostxtField = document.getElementById('apellidos');
        let identfitxtField = document.getElementById('identfi');
        let emailtxtField = document.getElementById('email');
        let numerotxtField = document.getElementById('numero');

        if (this.userExpertForm.get('nombres')?.invalid) {
          nombrestxtField?.classList.add('error');
        }
        if (this.userExpertForm.get('apellidos')?.invalid) {
          apellidostxtField?.classList.add('error');
        }
        if (this.userExpertForm.get('identfi')?.invalid) {
          identfitxtField?.classList.add('error');
        }
        if (this.userExpertForm.get('email')?.invalid) {
          emailtxtField?.classList.add('error');
        }
        if (this.userExpertForm.get('numero')?.invalid) {
          numerotxtField?.classList.add('error');
        }
      } else {
        const dialogAv = this.dialog.open(AdvertenciaComponent, {
          data: { selected: 3, name: (this.userExpertForm.get('nombres')?.value + ' ' + this.userExpertForm.get('apellidos')?.value) },
          disableClose: true
        })
        dialogAv.afterClosed().subscribe(result => {
          if (result == true) {
            //mensaje de confirmacion?
            this.updateExperto();
          }
        });
      }
    } else {
      this.submitted = true;
      this.modificar();
    }
  }

  updateExperto() {
    // this.expert.idCedula = Number(this.userExpertForm.get('identfi')?.value);
    // this.expert.nombres = '' + this.userExpertForm.get('nombres')?.value;
    // this.expert.apellidos = '' + this.userExpertForm.get('apellidos')?.value;
    // this.expert.telefono = '' + (this.userExpertForm.get('numero')?.value);
    // this.expert.correoElectronico = '' + this.userExpertForm.get('email')?.value;
    console.log('usuario: ' + 
    this.userExpertForm.get('identfi')?.value + ' ' + this.userExpertForm.get('nombres')?.value + ' modificado');
    this.userService.updateExperto();
    // this.userService.register(this.expert)
    //   .then(() => {
    //     this.goBack();
    //   });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpertInFo } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { ToastrService } from 'ngx-toastr';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';

@Component({
  selector: 'nuxten-modificar-experto',
  templateUrl: './modificar-experto.component.html',
  styleUrls: ['./modificar-experto.component.scss']
})
export class ModificarExpertoComponent implements OnInit {
  submitted = false;
  hide2 = true;
  hide1 = true;
  disableTextbox = true;

  constructor(
    public dialogRef: MatDialogRef<ModificarExpertoComponent>,
    private dialog: MatDialog,
    private userService: UserService,
    private errorService: ErrorCatchService,
    @Inject(MAT_DIALOG_DATA) public data: ExpertInFo,
    private toast: ToastrService
  ) {

  }
  ngOnInit(): void {
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
    this.userExpertForm.get('identfi')?.setValue('' + this.data.idUser);
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
    this.data.idUser = Number(this.userExpertForm.get('identfi')?.value);
    this.data.nombres = '' + this.userExpertForm.get('nombres')?.value;
    this.data.apellidos = '' + this.userExpertForm.get('apellidos')?.value;
    this.data.numero = '' + (this.userExpertForm.get('numero')?.value);
    this.data.email = '' + this.userExpertForm.get('email')?.value;
    // this.userService.updateExperto().subscribe({
    //   next: (res) => {
    //     this.toast.success("Experto modificado con exito", "Mensaje de Confirmación");
    //     this.goBack();
    //   },
    //   error: (err) => {
    //     this.errorService.catchError(err.status);
    //     console.log(err);
    //   }
    // });
  }
}

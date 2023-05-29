import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertExperto } from 'src/app/interfaces/Experto';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { ExpertoService } from 'src/app/services/gestionar-experto/experto.service';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';
import { ToastrService } from 'ngx-toastr';
import { HashPasswordService } from 'src/app/services/auth/hash-password.service';

@Component({
  selector: 'nuxten-agregar-experto',
  templateUrl: './agregar-experto.component.html',
  styleUrls: ['./agregar-experto.component.scss']
})
export class AgregarExpertoComponent {
  submitted = false;
  hide2 = true;
  hide1 = true;
  desicion = false;

  insertExpert: InsertExperto = {
    idUser: 0,
    nombres: '',
    apellidos: '',
    numero: '',
    rol: 'Experto',
    email: '',
    contraseña: '',
    idEvaluacion: null
  }

  constructor(
    public dialogRef: MatDialogRef<AgregarExpertoComponent>,
    public dialogAv: MatDialogRef<AdvertenciaComponent>,
    public dialog: MatDialog,
    private expertService: ExpertoService,
    private errorService: ErrorCatchService,
    private toast: ToastrService,
    private hashPasService: HashPasswordService
  ) {

  }

  userExpertForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    identfi: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    numero: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ]),
    repPassword: new FormControl('', Validators.required)
  });

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('repPassword')?.value;
    if (password !== confirmPassword) {
      control.get('repPassword')?.setErrors({ NoPassswordMatch: true });
    }
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

  agregar() {
    if (this.submitted == true) {
      this.passwordMatchValidator(this.userExpertForm);
      if (this.userExpertForm.invalid) {
        let nombrestxtField = document.getElementById('nombres');
        let apellidostxtField = document.getElementById('apellidos');
        let identfitxtField = document.getElementById('identfi');
        let emailtxtField = document.getElementById('email');
        let numerotxtField = document.getElementById('numero');
        let passwordtxtField = document.getElementById('password');
        let repPasswordtxtField = document.getElementById('repPassword');

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
        if (this.userExpertForm.get('password')?.invalid) {
          passwordtxtField?.classList.add('error');
        }
        if (this.userExpertForm.get('repPassword')?.invalid) {
          repPasswordtxtField?.classList.add('error');
        }
      } else {
        const dialogAv = this.dialog.open(AdvertenciaComponent, {
          data: { selected: 0, name: this.userExpertForm.get('nombres')?.value },
          disableClose: true
        })
        dialogAv.afterClosed().subscribe(result => {
          this.desicion = result;
          this.registrarExperto(this.desicion);
        })
      }
    } else {
      this.submitted = true;
      this.agregar();
    }
  }

  registrarExperto(des: boolean) {
    if (des == true) {
      //registrar usuario
      this.insertExpert.idUser = Number(this.userExpertForm.get('identfi')?.value);
      this.insertExpert.nombres = '' + (this.userExpertForm.get('nombres')?.value);
      this.insertExpert.apellidos = '' + this.userExpertForm.get('apellidos')?.value;
      this.insertExpert.numero = '' + (this.userExpertForm.get('numero')?.value);
      this.insertExpert.email = '' + (this.userExpertForm.get('email')?.value);
      this.insertExpert.contraseña = '' + (this.userExpertForm.get('password')?.value);
      this.expertService.addExperto(this.insertExpert).subscribe(
        next => {
          this.toast.success("Experto agregado con exito", "Mensaje de Confirmación");
          this.goBack();
        },
        error => {
          this.errorService.catchError(error.status);
          console.log(error);
        }
      );
      // this.hashPasService.encypt(this.insertExpert.contraseña).then((res:any)=> {
      //   this.insertExpert.contraseña = res;
      //   this.expertService.addExperto(this.insertExpert).subscribe(
      //     next => {
      //       this.toast.success("Experto agregado con exito", "Mensaje de Confirmación");
      //       this.goBack();
      //     },
      //     error => {
      //       this.errorService.catchError(error.status);
      //       console.log(error);
      //     }
      //   );
      // })
    }
  }
}
 
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertExperto, PruebaExperto } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';

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
  // expert: InsertExperto = {
  //   nombres: '',
  //   apellidos: '',
  //   identfi: 0,
  //   email: '',
  //   numero: 0,
  //   password: ''
  // };
  expert: PruebaExperto = {
    idCedula: 0,
    nombres: '',
    apellidos: '',
    telefono: '',
    correoElectronico: '',
    userId: null,
    idEvaluacion: null
  }

  constructor(
    public dialogRef: MatDialogRef<AgregarExpertoComponent>,
    public dialogAv: MatDialogRef<AdvertenciaComponent>,
    public dialog: MatDialog,
    private userService: UserService
  ) {

  }

  userExpertForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    identfi: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    numero: new FormControl('', Validators.required),
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
        }).unsubscribe
      }
    } else {
      this.submitted = true;
      this.agregar();
    }
  }

  registrarExperto(des: boolean) {
    if (des == true) {
      //registrar usuario
      this.expert.idCedula = Number(this.userExpertForm.get('identfi')?.value);
      this.expert.nombres = '' + this.userExpertForm.get('nombres')?.value;
      this.expert.apellidos = ''+ this.userExpertForm.get('apellidos')?.value;
      this.expert.telefono = '' + (this.userExpertForm.get('numero')?.value);
      this.expert.correoElectronico = ''+ this.userExpertForm.get('email')?.value;
      console.log('user data: ',this.expert)
      this.userService.register(this.expert);
    }
    
  }
}

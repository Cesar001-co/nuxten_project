import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdvertenciaComponent } from '../advertencia/advertencia.component';
import { HashPasswordService } from 'src/app/services/auth/hash-password.service';
import { ExpertoService } from 'src/app/services/gestionar-experto/experto.service';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/auth/user.service';
import { ExpertoData } from 'src/app/interfaces/Experto';

@Component({
  selector: 'nuxten-cambiar-passw',
  templateUrl: './cambiar-passw.component.html',
  styleUrls: ['./cambiar-passw.component.scss']
})

export class CambiarPasswComponent implements OnInit {
  submitted = false;
  hide3 = true;
  hide2 = true;
  hide1 = true;
  desicion = false;

  constructor(
    public dialogRef: MatDialogRef<CambiarPasswComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ExpertoData,
    private hashpassService: HashPasswordService,
    private expertoService: ExpertoService,
    private toast: ToastrService,
    private errorService: ErrorCatchService,
    private userService: UserService
  ) {

  }
  ngOnInit(): void {

  }

  userPasswordForm = new FormGroup({
    lastPassword: new FormControl('', [
      Validators.required
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ]),
    repNewPassword: new FormControl('', Validators.required)
  });

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('newPassword')?.value;
    const confirmPassword: string = control.get('repNewPassword')?.value;
    if (password !== confirmPassword) {
      control.get('repNewPassword')?.setErrors({ NoPassswordMatch: true });
    }
  }

  async lastPasswordMatchValidator(control: AbstractControl) {
    if (this.submitted == true) {
      const password: string = control.get('lastPassword')?.value;
      if (! await this.hashpassService.compare(password, this.data.contraseña)) {
        document.getElementById('lastPassword')?.classList.add('error');
        control.get('lastPassword')?.setErrors({ NoLastPasswordMatch: true })
        return true
      } else {
        document.getElementById('lastPassword')?.classList.remove('error');
        return false
      }
    } else {
      return false
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

  async update() {
    if (this.submitted == true) {
      this.passwordMatchValidator(this.userPasswordForm);
      if (!await this.lastPasswordMatchValidator(this.userPasswordForm)) {
        if (this.userPasswordForm.invalid) {
          let lastPasswordtxtField = document.getElementById('lastPassword');
          let newPasswordtxtField = document.getElementById('newPassword');
          let repNewPasswordtxtField = document.getElementById('repNewPassword');
  
          if (this.userPasswordForm.get('lastPassword')?.invalid) {
            lastPasswordtxtField?.classList.add('error');
          }
          if (this.userPasswordForm.get('newPassword')?.invalid) {
            newPasswordtxtField?.classList.add('error');
          }
          if (this.userPasswordForm.get('repNewPassword')?.invalid) {
            repNewPasswordtxtField?.classList.add('error');
          }
        } else {
          const dialogAv = this.dialog.open(AdvertenciaComponent, {
            data: { selected: 5, name: '' },
            disableClose: true
          })
          dialogAv.afterClosed().subscribe(result => {
            if (result == true) {
              this.updatePasswordExperto();
            }
          });
        }
      }
    } else {
      this.submitted = true;
      this.update();
    }
  }

  updatePasswordExperto() {
    this.hashpassService.encypt(this.userPasswordForm.get('newPassword')?.value!).then((res: any) => {
      this.data.contraseña = res;
      this.expertoService.updateExperto(this.data).subscribe({
        next: () => {
          this.toast.success("Información modificada con exito", "Mensaje de Confirmación");
          this.goBack();
          this.userService.logOut();
        },
        error: (err) => {
          this.errorService.catchError(err.status);
          console.log(err);
        }
      });
    });
  }

  goBack() {
    this.dialogRef.close();
  }
}




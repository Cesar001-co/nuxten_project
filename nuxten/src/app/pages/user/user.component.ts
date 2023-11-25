import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdvertenciaComponent } from 'src/app/components/dialog-alerts/advertencia/advertencia.component';
import { CambiarPasswComponent } from 'src/app/components/dialog-alerts/cambiar-passw/cambiar-passw.component';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';
import { ExpertoService } from 'src/app/services/gestionar-experto/experto.service';

@Component({
  selector: 'nuxten-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  submitted = false;
  disableTextbox = true;
  userData!: ExpertoData

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private expertoService: ExpertoService,
    private toast: ToastrService,
    private errorService: ErrorCatchService
  ) {

  }
  ngOnInit(): void {
    this.getUserData();
    this.userExpertForm.get('identfi')?.disable();
  }

  userExpertForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    identfi: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    numero: new FormControl('', Validators.required)
  });

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
          data: { selected: 4, name: (this.userExpertForm.get('nombres')?.value + ' ' + this.userExpertForm.get('apellidos')?.value) },
          disableClose: true
        })
        dialogAv.afterClosed().subscribe(result => {
          if (result == true) {
            //mensaje de confirmacion?
            this.updateUser();
          }
        });
      }
    } else {
      this.submitted = true;
      this.modificar();
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

  getUserData() {
    this.userService.getUserData().subscribe((userData: ExpertoData) => {
      this.userData = userData;
      this.userExpertForm.get('nombres')?.setValue(this.userData.nombres);
      this.userExpertForm.get('apellidos')?.setValue(this.userData.apellidos);
      this.userExpertForm.get('identfi')?.setValue('' + this.userData.idUser);
      this.userExpertForm.get('email')?.setValue(this.userData.email);
      this.userExpertForm.get('numero')?.setValue('' + this.userData.numero);
    });
  }

  cambiarContra() {
    const dialogAv = this.dialog.open(CambiarPasswComponent, {
      data: this.userData,
      disableClose: true
    })
    dialogAv.afterClosed().subscribe(result => {
      if (result == true) {
        //mensaje de confirmacion?
        // this.userService.logOut();
      }
    });
  }

  updateUser() {
    this.userData.idUser = Number(this.userExpertForm.get('identfi')?.value);
    this.userData.nombres = '' + this.userExpertForm.get('nombres')?.value;
    this.userData.apellidos = '' + this.userExpertForm.get('apellidos')?.value;
    this.userData.numero = '' + (this.userExpertForm.get('numero')?.value);
    this.userData.email = '' + this.userExpertForm.get('email')?.value;
    this.expertoService.updateExperto(this.userData).subscribe({
      next: () => {
        this.toast.success("Información modificada con exito", "Mensaje de Confirmación");
        this.userService.logOut();
      },
      error: (err) => {
        this.errorService.catchError(err.status);
        console.log(err);
      }
    });
  }
}

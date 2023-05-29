import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginInfo } from 'src/app/interfaces/Experto';
import { HashPasswordService } from 'src/app/services/auth/hash-password.service';
import { UserService } from 'src/app/services/auth/user.service';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';

@Component({
  selector: 'nuxten-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  hide = true;
  submitted = false;
  userdata: loginInfo = {
    email: '',
    contraseña: ''
  };

  userLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  userRecoverForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private userService: UserService,
    private errorCatch: ErrorCatchService,
    private hashpassService: HashPasswordService,
  ) {

  }

  toRecovery() {
    this.submitted = false;
    let wrapper = document.getElementById('wrapper');
    wrapper?.classList.add('active');
  }

  toLogin() {
    this.submitted = false;
    let wrapper = document.getElementById('wrapper');
    wrapper?.classList.remove('active');
  }

  ingresar() {
    if (this.submitted = true) {
      if (this.userLoginForm.invalid) {
        let emailtxtField = document.getElementById('email');
        let passtxtField = document.getElementById('password');
        if (this.userLoginForm.get('email')?.invalid) {
          emailtxtField?.classList.add('error');
        }
        if (this.userLoginForm.get('password')?.invalid) {
          passtxtField?.classList.add('error');
        }
      } else {
        this.userdata.email = '' + this.userLoginForm.get('email')?.value;
        this.userdata.contraseña = '' + this.userLoginForm.get('password')?.value;
        this.userService.logIn(this.userdata).subscribe({
          next: async (data: any) => {
            if (await this.hashpassService.compare(this.userdata.contraseña, data.contraseña)) {
              this.userService.setToken(data);
              this.userService.toHome()
            } else {
              this.errorCatch.catchLoginError('CatchPassword');
            }
          },
          error: (error) => {
            this.errorCatch.catchLoginError(error.status);
            console.log(error);
          }
        });
      }
    } else {
      this.submitted = true;
      this.ingresar();
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

  recuperar() {
    if (this.submitted = true) {
      if (this.userRecoverForm.invalid) {
        let emailtxtField = document.getElementById('emailRe');
        if (this.userRecoverForm.get('email')?.invalid) {
          emailtxtField?.classList.add('error');
        }
      } else {

        // this.userService.recover(this.userRecoverForm.value)
        //   .then((a) => {
        //     if (a != undefined) {
        //       this.userRecoverForm.get('email')?.setValue('');
        //       this.toLogin();
        //     }
        //   });
      }
    } else {
      this.submitted = true;
      this.recuperar()
    }
  }
}
function next(value: Object): void {
  throw new Error('Function not implemented.');
}


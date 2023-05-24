import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserExperto, loginInfo } from 'src/app/interfaces/Experto';
import { environment } from 'src/environments/environment.development';

const initUsId = '';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  // private usID$ = new BehaviorSubject<string>(initUsId);
  private API_SERVER = environment.posgresDB.API_SERVER + "usuarioController/";

  constructor(
    private toast: ToastrService,
    private router: Router,
    private httpClient: HttpClient
  ) {

  }

  // get sUsID$(): Observable<string> {
  //   return this.usID$.asObservable();
  // }

  // setUsId(usID: string) {
  //   this.usID$.next(usID);
  // }

  logIn(loginData: loginInfo) {
    return this.httpClient.get(this.API_SERVER + 'byEmailAndPassword?email='+ loginData.email +'&contraseña=' + loginData.contraseña)
  }

  logOut() {
    this.toast.info("Sesión finalizada con exito", "Mensaje de información")
    this.router.navigate(['']);
  }

  recover({ email }: any) {
    // return sendPasswordResetEmail(this.auth, email)
    //   .then(() => this.toast.success("Correo enviado al email", "Mensaje de Confirmación"))
    //   .catch(error => {
    //     console.log(error.code);
    //     this.firebasError(error.code);
    //   })
  }

  toHome(userData: any) {
    console.log(userData);
    this.router.navigate(['NUXTEN_PROJECT/nuxten/inicio']);
    this.toast.success("Bienvenido a nuxten", "Mensaje de confirmación");
  }
}

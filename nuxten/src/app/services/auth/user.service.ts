import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const initUsId = '';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  // private usID$ = new BehaviorSubject<string>(initUsId);
  // private API_SERVER = environment.posgresDB.API_SERVER + "usuarioController/";

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

  logIn({ email, password }: any) {
    // this.toHome('123');
    // return signInWithEmailAndPassword(this.auth, email, password)
    //   .then(response => {
    //     console.log('userid: ', response.user.uid);
    //     this.toHome(response.user.uid);
    //   })
    //   .catch(error => {
    //     console.log(error.code);
    //     this.firebasError(error.code);
    //   })
  }

  logOut() {
    this.toast.info("Sesión finalizada con exito", "Mensaje de información")
    this.router.navigate(['/Inicio-de-sesion']);
    // return signOut(this.auth)
    //   .then(() => {
    //     this.toast.info("Sesión finalizada con exito", "Mensaje de información")
    //     this.router.navigate(['/Inicio-de-sesion']);
    //   })
    //   .catch(error => {
    //     console.log(error.code);
    //     this.firebasError(error.code);
    //   });
  }

  recover({ email }: any) {
    // return sendPasswordResetEmail(this.auth, email)
    //   .then(() => this.toast.success("Correo enviado al email", "Mensaje de Confirmación"))
    //   .catch(error => {
    //     console.log(error.code);
    //     this.firebasError(error.code);
    //   })
  }

  toHome(userID: any) {
    this.router.navigate(['/nuxten']);
    this.toast.success("Bienvenido a nuxten", "Mensaje de confirmación");
  }

  updateExperto() {
    this.toast.success("Experto modificado con exito", "Mensaje de Confirmación");
    return null;
  }

  updateUser() {
    this.toast.success("Usuario modificado con exito", "Mensaje de Confirmación");
    return null;
  }

  deleteUser(id: number) {
    this.toast.success("Usuario eliminado con exito", "Mensaje de Confirmación");
    //delete form db
    // auth.deleteUser(uid)
    //   .then(() => {
    //     this.toast.success("usuario eliminado con exito", "Mensaje de Confirmación");
    //   })
    //   .catch(error => {
    //     console.log(error.code);
    //     this.firebasError(error.code);
    //   })
  }
}

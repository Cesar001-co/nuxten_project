import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { InsertExperto, PruebaExperto } from 'src/app/interfaces/Experto';
import { environment } from 'src/environments/environment.development';

const initUsId = '';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usID$ = new BehaviorSubject<string>(initUsId);
  private API_SERVER = environment.posgresDB.API_SERVER + "usuarioController/";

  constructor(
    private toast: ToastrService,
    private router: Router,
    private httpClient: HttpClient
  ) {

  }

  get sUsID$(): Observable<string> {
    return this.usID$.asObservable();
  }

  setUsId(usID: string) {
    this.usID$.next(usID);
  }

  logIn({ email, password }: any) {
    this.toHome('123');
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

  register(registerExpert: PruebaExperto) {
    console.log('api: ', this.API_SERVER);
    console.log('userdata: ', registerExpert);
    return this.httpClient.post(this.API_SERVER, registerExpert).toPromise()
      .then( () => {
        this.toast.success("Usuario agregado con exito", "Mensaje de Confirmación");
      })
      .catch(error => {
        console.log(error.code);
        this.firebasError(error.code);
      })
    // console.log(registerExpert);
    // return createUserWithEmailAndPassword(this.auth, registerExpert.email, registerExpert.password)
    //   .catch(error => {
    //     console.log(error.code);
    //     this.firebasError(error.code);
    //   })
  }

  updateExperto() {
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

  recover({ email }: any) {
    // return sendPasswordResetEmail(this.auth, email)
    //   .then(() => this.toast.success("Correo enviado al email", "Mensaje de Confirmación"))
    //   .catch(error => {
    //     console.log(error.code);
    //     this.firebasError(error.code);
    //   })
  }

  logOut() {
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

  firebasError(code: any) {
    switch (code) {
      // case 'auth/invalid-email': {
      //   //contraseña incorrecta
      //   this.toast.error("Correo incorrecto", "Mensaje de ERROR");
      //   console.log('correo incorrecto');
      //   break;
      // }
      // case 'auth/wrong-password': {
      //   //contraseña incorrecta
      //   this.toast.warning("Contraseñá incorrecta", "Mensaje de Advertencia");
      //   console.log('contraseñá incorrecta');
      //   break;
      // }
      // case 'auth/user-not-found': {
      //   //usuario no existe
      //   this.toast.error("Usuario no existe", "Mensaje de ERROR");
      //   console.log('Usuario no encontrado');
      //   break;
      // }

      // case 'auth/email-already-in-use': {
      //   //el correo ya existe
      //   this.toast.warning("El correo se encuentra en uso", "Mensaje de ERROR");
      //   console.log('Usuario no encontrado');
      //   break;
      // }

      default:
        console.log('error: ', code)
        this.toast.error('Algo salio mal, intenta de nuevo', 'Mensaje de ERROR');
    }
  }

  toHome(userID: any) {
    // this.setUsId(userID);
    this.router.navigate(['/nuxten']);
    this.toast.success("Bienvenido a nuxten", "Mensaje de confirmación");
  }
}

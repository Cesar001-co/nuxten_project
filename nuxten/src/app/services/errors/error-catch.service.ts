import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorCatchService {

  constructor(
    private toast: ToastrService,
  ) {

  }

  catchError(code: any) {
    switch (code) {
      case 400 : {
        //usuario ya existe
        this.toast.error("Experto ya existe, verifique la identificación o el correo del experto", "Mensaje de ERROR");
        console.log('usuario ya existe');
        break; 
      }
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
}

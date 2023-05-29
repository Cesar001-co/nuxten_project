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
      case 400: {
        //usuario ya existe
        this.toast.error("Experto ya existe, verifique la identificación o el correo del experto", "Mensaje de ERROR");
        console.log('usuario ya existe');
        break;
      }
      default:
        console.log('error: ', code)
        this.toast.error('Algo salio mal, intenta de nuevo', 'Mensaje de ERROR');
    }
  }

  catchLoginError(code: any) {
    switch (code) {
      case 404: {
        //usuario no existe
        this.toast.error("Usuario no existe, verifique el correo", "Mensaje de ERROR");
        console.log('usuario no existe');
        break;
      }

      case 'CatchPassword': {
        //usuario no existe
        this.toast.warning("Constraseñá incorrecta, verifique la contraseña", "Mensaje de ERROR");
        console.log('Constraseñá incorrecta');
        break;
      }
      
      default:
        console.log('error: ', code)
        this.toast.error('Algo salio mal, intenta de nuevo', 'Mensaje de ERROR');
    }
  }
}

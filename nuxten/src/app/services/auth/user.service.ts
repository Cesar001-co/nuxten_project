import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserExperto, loginInfo } from 'src/app/interfaces/Experto';
import { environment } from 'src/environments/environment.development';
import { HashPasswordService } from './hash-password.service';
import { CookieService } from 'ngx-cookie-service';

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
    private httpClient: HttpClient,
    private hashPasService: HashPasswordService,
    private cookieService: CookieService
  ) {

  }

  // get sUsID$(): Observable<string> {
  //   return this.usID$.asObservable();
  // }

  // setUsId(usID: string) {
  //   this.usID$.next(usID);
  // }

  logIn(loginData: loginInfo) {
    if (this.cookieService.check('token')) {
      this.cookieService.deleteAll();
      console.log('cookie eliminada')
    }
    return this.httpClient.get(this.API_SERVER + 'byEmailAndPassword?email=' + loginData.email + '&contraseña=' + loginData.contraseña)
    // return this.httpClient.get(this.API_SERVER + 'byEmailAndPassword?email='+ loginData.email)
  }

  logOut() {
    this.cookieService.deleteAll();
    this.toast.info("Sesión finalizada con exito", "Mensaje de información")
    this.router.navigate(['']); 
  }

  setToken(userData: any) {
    let datas = JSON.stringify(userData);
    this.cookieService.set('token', datas);
  }

  recover({ email }: any) {

  }

  toHome() {
    this.router.navigate(['NUXTEN_PROJECT/inicio']);
    this.toast.success("Bienvenido a nuxten", "Mensaje de confirmación");
  }
}

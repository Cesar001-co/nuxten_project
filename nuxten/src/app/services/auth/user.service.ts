import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginInfo } from 'src/app/interfaces/Experto';
import { environment } from 'src/environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private API_SERVER = environment.posgresDB.API_SERVER + "usuarioController/";

  constructor(
    private toast: ToastrService,
    private router: Router,
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {

  }

  logIn(loginData: loginInfo) {
    this.cookieService.deleteAll()
    return this.httpClient.get(this.API_SERVER + 'byEmail?email=' + loginData.email)
  }

  logOut() {
    this.cookieService.deleteAll();
    this.toast.info("Sesión finalizada con exito", "Mensaje de información")
    this.router.navigate(['']);
  }

  closeSesion() {
    this.cookieService.deleteAll();
  }

  setToken(userData: any) {
    let datas = JSON.stringify(userData);
    this.cookieService.set('token', userData.idUser);
    this.cookieService.set('userData', datas);
  }

  getUserData() {
    return JSON.parse(this.cookieService.get('userData'))
  }

  recover({ email }: any) {

  }

  toHome() {
    this.router.navigate(['NUXTEN_PROJECT/inicio']);
    this.toast.success("Bienvenido a nuxten", "Mensaje de confirmación");
  }
}

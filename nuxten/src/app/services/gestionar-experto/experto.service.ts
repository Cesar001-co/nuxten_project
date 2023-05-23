import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ErrorCatchService } from '../errors/error-catch.service';
import { ToastrService } from 'ngx-toastr';
import { InsertExperto } from 'src/app/interfaces/Experto';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertoService {

  private API_SERVER = environment.posgresDB.API_SERVER + "usuarioController";

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorCatchService
  ) {

  }


  addExperto(registerExpert: InsertExperto) {
    // console.log('userdata: ', registerExpert);
    return this.httpClient.post(this.API_SERVER, registerExpert)
  }
}

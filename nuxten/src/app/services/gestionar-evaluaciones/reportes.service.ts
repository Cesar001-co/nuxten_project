import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private API_SERVER = environment.posgresDB.API_SERVER + "reporteController/";

  constructor(
    private httpClient: HttpClient,
    private toast: ToastrService
  ) {

  }

  //reporte
  generarReporte(infoReport: any) {
    return this.httpClient.post(this.API_SERVER + "generarReportePDF", infoReport);
  }
}

import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, catchError, delay, of, switchMap } from "rxjs";
import { ReportesService } from "../services/gestionar-evaluaciones/reportes.service";
import { UserService } from "../services/auth/user.service";
import { ExpertoData } from "../interfaces/Experto";


@Injectable({
    providedIn: 'root'
})

export class LiestaEvalacionesResolver implements Resolve<Observable<any>> {

    constructor(
        private reporteService: ReportesService,
        private userService: UserService,
    ) {

    }

    resolve() {
        return this.userService.getUserData().pipe(
            switchMap((user: ExpertoData) => {
                const userId = user.idUser;
                if (user.rol == 'Experto') {
                    return this.reporteService.getReportesByUserID(userId).pipe(
                        switchMap((reportes: any) => {
                            return of(reportes)
                        }),
                        catchError((err) => {
                            return of(err)
                        })
                    );
                } else {
                    return this.reporteService.getAllReportes().pipe(
                        switchMap((reportes: any) => {
                            return of(reportes)
                        }),
                        catchError((err) => {
                            return of(err)
                        })
                    );
                }
            })
        )
    }
}
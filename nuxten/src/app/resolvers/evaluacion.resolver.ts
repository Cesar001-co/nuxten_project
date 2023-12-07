import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, catchError, delay, map, of, switchMap } from "rxjs";
import { UserService } from "../services/auth/user.service";
import { ExpertoData } from "../interfaces/Experto";
import { EvaluacionService } from "../services/gestionar-evaluaciones/evaluacion.service";
import { EvaluacionInfo, EvaluacionJS } from "../interfaces/Evaluaciones";
import { FasesEvaluacionService } from "../services/gestionar-fases/fases-evaluacion.service";
import { ToastrService } from "ngx-toastr";


@Injectable({
    providedIn: 'root'
})

export class EvaluacionResolver implements Resolve<Observable<any>> {

    userData!: ExpertoData;
    infoEvaluacion!: EvaluacionInfo;
    evaFasesInfo!: EvaluacionJS

    constructor(
        private userService: UserService,
        private evaluacionService: EvaluacionService,
        private fasesEvaService: FasesEvaluacionService,
        private toast: ToastrService
    ) {

    }

    resolve() {
        return this.userService.getUserData().pipe(
            switchMap((userData: ExpertoData) => {
                this.userData = userData;
                if (this.userData.idEvaluacion != null) {
                    return this.evaluacionService.getEvaluacion(this.userData.idEvaluacion).pipe(
                        switchMap((evaluacion: EvaluacionInfo) => {
                            this.infoEvaluacion = evaluacion;
                            return this.fasesEvaService.getFaseEva(this.infoEvaluacion.idFaEva).pipe(
                                catchError(error => {
                                    this.toast.error("Algo salio mal, intenta de nuevo", "Mensaje de ERROR");
                                    console.log(error)
                                    return of(error)
                                })
                            );
                        }),
                        map((fasesEvaluacion: any) => {
                            this.evaFasesInfo = fasesEvaluacion;
                            if (this.evaFasesInfo == undefined) {
                                return of()
                            } else {
                                return of(this.evaFasesInfo)
                            }
                        })
                    );
                } else {
                    return of(null);
                }
            }),
            delay(1000)
        );
    }
}
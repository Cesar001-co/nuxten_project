import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, catchError, delay, map, of, switchMap } from "rxjs";
import { UserService } from "../services/auth/user.service";
import { ExpertoData } from "../interfaces/Experto";
import { EvaluacionService } from "../services/gestionar-evaluaciones/evaluacion.service";
import { EvaluacionInfo, EvaluacionJS } from "../interfaces/Evaluaciones";
import { FasesEvaluacionService } from "../services/gestionar-fases/fases-evaluacion.service";
import { ToastrService } from "ngx-toastr";
import { ExpertoService } from "../services/gestionar-experto/experto.service";


@Injectable({
    providedIn: 'root'
})

export class EvaluacionResolver implements Resolve<Observable<any>> {

    infoEvaluacion!: EvaluacionInfo;
    evaFasesInfo!: EvaluacionJS

    constructor(
        private userService: UserService,
        private evaluacionService: EvaluacionService,
        private fasesEvaService: FasesEvaluacionService,
        private toast: ToastrService,
        private expertoService: ExpertoService
    ) {

    }

    resolve() {
        return this.userService.getUserData().pipe(
            switchMap((experto: ExpertoData) => {
                return this.expertoService.getExpertoIdEvaluacion(experto.idUser).pipe(
                    switchMap((evaluacion: any) => {
                        if (evaluacion != null) {
                            return this.evaluacionService.getEvaluacion(evaluacion).pipe(
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
                                    return of(this.evaFasesInfo);
                                })
                            );
                        } else {
                            console.log(evaluacion);
                            return of(null);
                        }
                    })
                );
            }),
            delay(1000)
        );
    }
}
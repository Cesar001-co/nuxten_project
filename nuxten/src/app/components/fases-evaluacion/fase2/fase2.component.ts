import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EvaluacionJS, ProblemaInfo } from 'src/app/interfaces/Evaluaciones';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';
import { WaitingComponent } from '../../dialog-alerts/waiting/waiting.component';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { EvidenciasService } from 'src/app/services/gestionar-fases/evidencias.service';

@Component({
  selector: 'nuxten-fase2',
  templateUrl: './fase2.component.html',
  styleUrls: ['./fase2.component.scss']
})

export class Fase2Component implements OnInit {

  state!: any;
  private subscription!: Subscription;
  private subscriptionEvafases!: Subscription;

  evaFases!: EvaluacionJS;

  private faseEva!: any;
  private idEvaluacion!: any;
  private expertPos!: any;

  dataSource!: MatTableDataSource<ProblemaInfo>;
  problemas: ProblemaInfo[] = [];

  displayedColumns: string[] = ['selec', 'def', 'des', 'principios', 'acciones'];


  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private route: Router,
    private fasesService: FasesService,
    private routeInfo: ActivatedRoute,
    private fasesEvaluacionService: FasesEvaluacionService,
    private evaluacionService: EvaluacionService,
    private evidenciaService: EvidenciasService
  ) {
    this.subscription = this.fasesService.state$.subscribe(state => {
      this.state = state;
    });
    if (this.state == true) {
      this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
    }
    // OBTENER LOS DATOS ENVIADOS POR EL LINK
    this.faseEva = this.routeInfo.snapshot.paramMap.get('faseEva');
    this.idEvaluacion = this.routeInfo.snapshot.paramMap.get('evaluacion');
    this.expertPos = this.routeInfo.snapshot.paramMap.get('pos');
  }

  ngOnInit() {
    this.getFaseEva();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEvafases.unsubscribe();
  }

  //OBTENER LA INFORMACION DE LA EVALUACION
  async getFaseEva() {
    this.subscriptionEvafases = this.fasesEvaluacionService.getFaseEva(this.faseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;
      this.getUserProblemas();
      //VERIFICAR EL ESTADO DE LA FASE
      if (this.evaFases.Fase2.state == false) {
        //VERIFICAR EL ESTADO DEL EXPERTO
        if (this.evaFases.Fase2.expertoSt[this.expertPos] == true) {
          this.estadoDeFase('Fase 2');
        }

      } else {
        this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
      }
    });
  }

  getUserProblemas() {
    this.problemas = this.evaFases.listaProblemas;
    this.dataSource = new MatTableDataSource(this.problemas);
  }

  //FINALIZAR FASE
  finalizarFase() {
    //VALIDAR QUE EXISTAN PROBLEMAS SELECCIONADOS
    if (this.evaFases.listaProblemas.filter(problema => problema.selected == true).length == 0) {
      this.toast.warning("Debes seleccionar problemas para continuar a la siguiente fase.", "Mensaje de Advertenica");
    } else if (this.evaFases.listaProblemas.filter(problema => problema.nombreArchivo != null).length == 0) {
      this.toast.warning("Debes subir una imagen en cada uno de los problemas seleccionados.", "Mensaje de Advertenica");
    } else {
      //GENERAR ADVERTENCIA
      const dialogAv = this.dialog.open(AdvertenciaComponent, {
        data: { selected: 8 },
        disableClose: true
      });
      dialogAv.afterClosed().subscribe(result => {
        if (result == true) {
          this.evaFases.Fase2.expertoSt[this.expertPos] = true;
          //VERIFICAR SI ES EL ULTIMO 
          if (this.fasesEvaluacionService.expertosCount(this.evaFases.Fase2.expertoSt) == this.evaFases.Expertos.length) {
            //ULTIMO: ACTUALIZA TODA LA FASE
            this.evaFases.Fase2.state = true;
            this.evaFases.listaProblemas = this.evaFases.listaProblemas.filter(problema => problema.selected == true);
            //
            for (let i = 0; i < this.evaFases.Expertos.length; i++) {
              let problemas: any[] = []
              for (let j = 0; j < this.evaFases.listaProblemas.length; j++) {
                problemas.push({
                  problema: this.evaFases.listaProblemas[j].defProb,
                  criticidad: 0,
                  frecuencia: 0,
                  severidad: 0
                });
              }
              this.evaFases.Fase3.calificaciones[i].problemas = problemas;
            }
            this.guardarProblemas().then(() => {
              const infoFaseEvaluacion = {
                idEvaluacion: this.idEvaluacion,
                fase: 'Fase 3'
              };
              //UPDATE CAMPO FASE EVALUACION
              this.evaluacionService.updateFaseEvaluacion(infoFaseEvaluacion).subscribe({
                next: () => {
                  //VERIFICAR ESTADO DE LA FASE
                  this.estadoDeFase('Fase 2');
                }
              });
            });
          } else {
            //NO ULTIMO: GUARDA LOS PROBLEMAS Y ACTUALIZA SU ESTADO
            //UPDATE INFO EN FIREBASE
            this.guardarProblemas().then(() => {
              this.estadoDeFase('Fase 2');
            });
          }
        }
      });
    }
  }

  //ALERTA DE ESPERAR CAMBIO DE FASE
  estadoDeFase(fase: any) {
    //VERIFICAR CUANTAS ALERTAS ESTAN ABIERTAS
    if (this.dialog.openDialogs.length == 0) {
      const dialogAv = this.dialog.open(WaitingComponent, {
        data: {
          idFaseEva: this.faseEva,
          fase: fase
        },
        disableClose: true
      });
      dialogAv.afterClosed().subscribe(result => {
        if (result == false) {
          this.evaFases.Fase2.expertoSt[this.expertPos] = false;
          this.guardarProblemas();
        } else {
          this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
        }
      });
    }
  }

  onFileSelected(event: any, problema: any) {
    const file: File = event.target.files[0];
    if (problema.nombreArchivo == null) {
      this.uploadEvidencia(file, problema);
    } else {
      //ADVERTENCIA REEMPLAZAR ARCHIVO
      const dialogAv = this.dialog.open(AdvertenciaComponent, {
        data: {
          selected: 11,
          name: problema.nombreArchivo,
          name2: file.name
        },
        disableClose: true,
      });
      dialogAv.afterClosed().subscribe(result => {
        if (result == true) {
          this.uploadEvidencia(file, problema);
        }
      });
    }
  }

  //GUARDAR LA EVIDENCIA EN LA BASE DE DATOS
  uploadEvidencia(file: File, problema: any) {
    if (file) {
      // Verificar que el tamaño sea menor o igual a 2 MB
      if (file.size <= 2 * 1024 * 1024) {
        console.log("Imagen válida. Tamaño: " + file.size + " bytes");

        this.evidenciaService.fileToBase64(file).then((base64String: any) => {

          //VERIFICAR QUE SI YA EXISTE UNA EVIDENCIA ANEXADA
          if (problema.idEvid != null) {
            //MODIFICAR EVIDENCIA
            const evidencia = {
              idEvidencia: problema.idEvid,
              idEvaluacion: this.idEvaluacion,
              imagen: base64String
            }
            this.evidenciaService.updateEvidencia(evidencia).subscribe({
              next: () => {
                problema.nombreArchivo = file.name;
                //GUARDAR LA EVIDENCIA EN LA BASE DE DATOS
                this.guardarProblemas().then(() => {
                  this.toast.success("Evidencia anexada con exito", "Mensaje de Confirmación");
                });
              },
            });
          } else {
            //GUARDAR EVIDENCIA
            const evidencia = {
              idEvaluacion: this.idEvaluacion,
              imagen: base64String
            }
            console.log(evidencia);
            this.evidenciaService.crearEvidencia(evidencia).subscribe(
              (error) => {
                problema.nombreArchivo = file.name;
                problema.idEvid = error
                //GUARDAR LA EVIDENCIA EN LA BASE DE DATOS
                this.guardarProblemas().then(() => {
                  this.toast.success("Evidencia anexada con exito", "Mensaje de Confirmación");
                });
              }
            );
          }
          
        });

      } else {
        this.toast.warning("La imagen supera el limite de (2 MB)", "Mensaje de Advertenica");
        console.log("La imagen excede el tamaño máximo permitido (2 MB).");
      }
    }
  }

  //GUARDAR DATOS
  guardarProblemas() {
    return this.fasesEvaluacionService.updateFaseEva(this.faseEva, this.evaFases)
  }

  //ELIMINAR EVIDENCIA DE LA BASE DE DATOS
  eliminarEvidencia(problema: any) {
    this.evidenciaService.deleteEvidencia(problema.idEvid).subscribe({
      error: () => {
        problema.nombreArchivo = null;
        problema.idEvid = null;
        this.guardarProblemas().then(() => {
          this.toast.success("Evidencia eliminada con exito", "Mensaje de Confirmación");
        });
      }
    });
  }

  setEstado(problema: any, event: any) {
    this.evaFases.listaProblemas = this.problemas;
    //VERIFICAR SI SE DESELECCIONA UN PROBLEMA TIENE O NO UNA EVIDENCIA
    if (event.checked == false && problema.nombreArchivo != null) {
      //ADVERTENCIA ELIMINAR EVIDENCIA
      const dialogAv = this.dialog.open(AdvertenciaComponent, {
        data: {
          selected: 12,
          name: problema.nombreArchivo
        },
        disableClose: true,
      });
      dialogAv.afterClosed().subscribe(result => {
        if (result == true) {
          this.eliminarEvidencia(problema);
        } else {
          problema.selected = true;
        }
      });
    } else {
      this.guardarProblemas();
    }
  }

  goBack() {
    this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
  }
}

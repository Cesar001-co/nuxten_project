import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { checkedExpert } from 'src/app/interfaces/Experto';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';
import { ExpertoService } from 'src/app/services/gestionar-experto/experto.service';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { GruposService } from 'src/app/services/gestionar-evaluaciones/grupos.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';

@Component({
  selector: 'nuxten-crear-evaluacion',
  templateUrl: './crear-evaluacion.component.html',
  styleUrls: ['./crear-evaluacion.component.scss']
})
export class CrearEvaluacionComponent implements OnInit {

  displayedColumns: string[] = ['action', 'id', 'experto', 'correo'];
  dataSource!: MatTableDataSource<any>;
  listaExpertos: any = 0;
  checkedExpets: any = []
  expertos = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private expertoService: ExpertoService,
    private errorService: ErrorCatchService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<CrearEvaluacionComponent>,
    public dialog: MatDialog,
    private evaluacionService: EvaluacionService,
    private gruposService: GruposService,
    private fasesEvaService: FasesEvaluacionService
  ) {
    this.setExpertos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.setExpertos();
    const idFaseEva = 'JGUfjgE8Ssd2I0I8v9QZ';
    this.fasesEvaService.getFaseEva(idFaseEva)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //OBTENER TODOS LOS EXPETOS DE LA BASE DE DATOS
  setExpertos() {
    this.expertoService.getAllExpertos().subscribe({
      next: (data) => {
        this.listaExpertos = data;
        //FILTRAR LOS EXPERTOS QUE NO TENGAN EVALUACION
        this.listaExpertos = this.listaExpertos.filter((experto: any) => experto.idEvaluacion == null);
        this.listaExpertos.map((re: any) => {
          re.checked = false;
        });
        this.dataSource = new MatTableDataSource(this.listaExpertos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.errorService.catchError(err.status);
        console.log(err);
      }
    })
  }

  checkExperto(completed: boolean, data: any) {
    const expertData: checkedExpert = {
      idUser: data.idUser,
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      checked: true
    };
    if (completed) {
      this.checkedExpets.push(expertData)
    } else {
      data.checked = false
      this.checkedExpets = this.checkedExpets.filter((item: checkedExpert) => item.idUser !== expertData.idUser)
    }
    this.expertos = '';
    for (let i = 0; i < this.checkedExpets.length; i++) {
      this.expertos += this.checkedExpets[i].nombres + ' ' + this.checkedExpets[i].apellidos + ', ';
    }
  }

  crearEvaluacion() {
    if (this.checkedExpets.length == 0) {
      this.toast.warning("Debe ingresar al menos un experto a la evaluación", "Mensaje de ADVERTENCIA");
      console.log('Debe ingresar al menos un experto a la evaluación');
    } else if (this.checkedExpets.length > 5) {
      this.toast.warning("Debe ingresar minimo 5 expertos a la evaluación", "Mensaje de ADVERTENCIA");
      console.log('Debe ingresar minimo 5 expertos a la evaluación');
    } else if (this.checkedExpets.length == 2 || this.checkedExpets.length == 4) {
      this.toast.warning("Debe ingresar un numero impar de expertos a la evaluación", "Mensaje de ADVERTENCIA");
      console.log('Debe ingresar un numero impar de expertos a la evaluación');
    } else {
      const dialogAv = this.dialog.open(AdvertenciaComponent, {
        data: { selected: 6, name: '' },
        disableClose: true
      })
      dialogAv.afterClosed().subscribe(desicion => {
        if (desicion) {
          this.generarEvaluacion();
        }
      });
    }
  }

  getActualDate() {
    const fechaYHoraActual = new Date();

    const anio = fechaYHoraActual.getFullYear();
    const mes = (fechaYHoraActual.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
    const dia = fechaYHoraActual.getDate().toString().padStart(2, '0');
    const hora = fechaYHoraActual.getHours().toString().padStart(2, '0');
    const minuto = fechaYHoraActual.getMinutes().toString().padStart(2, '0');
    const segundo = fechaYHoraActual.getSeconds().toString().padStart(2, '0');
    const milisegundo = fechaYHoraActual.getMilliseconds().toString().padStart(3, '0');

    return `${anio}-${mes}-${dia}T${hora}:${minuto}:${segundo}.${milisegundo}`;
  }

  //GENERAR EVALUACION
  generarEvaluacion() {
    //TRAER LOS USUARIOS QUE FUERON SELECCIONADOS
    const idsChecked: any = []
    for (let index = 0; index < this.checkedExpets.length; index++) {
      idsChecked.push(this.checkedExpets[index].idUser)
    }
    //CREAR GRUPO
    this.gruposService.createGrupo(idsChecked).subscribe((res: any) => {
      //CREAR JSON FASE EVA EN FIREBASE
      this.fasesEvaService.addFaseEva(
        JSON.parse(this.evaluacionService.generateDefaultFase(idsChecked))
      ).then((docRef: any) => {
        //CREAR LOS DATOS DE LA EVALUACION
        const evaluacion: any = {
          fechaCreacion: this.getActualDate(),
          fase: 'Creada',
          idFaseEva: docRef.id,
          idGrupo: res.data.idGrupo
        }
        //CREAR EVALUACION
        this.evaluacionService.crearEvaluacion(evaluacion).subscribe({
          next: () => {
            this.toast.success("Evaluación creada con exito", "Mensaje de Confirmación");
            this.goBack();
          },
          error: (err) => {
            this.errorService.catchError(err.status);
            console.log(err);
          }
        });
      });
    });
  }

  clean() {
    this.checkedExpets = [];
    this.expertos = '';
    this.listaExpertos.forEach((element: any) => element.checked = false);
  }

  goBack() {
    this.dialogRef.close()
  }
}

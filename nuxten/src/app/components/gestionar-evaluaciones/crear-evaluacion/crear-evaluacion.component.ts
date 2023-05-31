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

@Component({
  selector: 'nuxten-crear-evaluacion',
  templateUrl: './crear-evaluacion.component.html',
  styleUrls: ['./crear-evaluacion.component.scss']
})
export class CrearEvaluacionComponent implements OnInit{

  displayedColumns: string[] = ['action', 'id', 'experto', 'correo'];
  dataSource!: MatTableDataSource<any>;
  lists: any = 0;
  checkedExpets: any = []
  expertos = ''
  desicion = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private expertoService: ExpertoService,
    private errorService: ErrorCatchService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<CrearEvaluacionComponent>,
    public dialog: MatDialog
  ) {
    this.setExpertos()
  }

  ngOnInit(): void {
    this.setExpertos()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setExpertos() {
    this.expertoService.getAllExpertos().subscribe({
      next: (res) => {
        this.lists = res
        this.lists.map((re:any) => {
          re.checked = false;
        })
        this.dataSource = new MatTableDataSource(this.lists);
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
    this.expertos =  '';
    for (let i = 0; i < this.checkedExpets.length; i++) {
      this.expertos += this.checkedExpets[i].nombres + ' ' + this.checkedExpets[i].apellidos + ', ';
    }
  }

  crear() {
    if (this.checkedExpets.length == 0) {
      this.toast.warning("Debe ingresar al menos un experto a la evaluación","Mensaje de ADVERTENCIA");
      console.log('Debe ingresar al menos un experto a la evaluación');
    } else if (this.checkedExpets.length > 5) {
      this.toast.warning("Debe ingresar minimo 5 expertos a la evaluación","Mensaje de ADVERTENCIA");
      console.log('Debe ingresar minimo 5 expertos a la evaluación');
    } else if (this.checkedExpets.length == 2 || this.checkedExpets.length == 4 ) {
      this.toast.warning("Debe ingresar un numero impar de expertos a la evaluación","Mensaje de ADVERTENCIA");
      console.log('Debe ingresar un numero impar de expertos a la evaluación');
    } else {
      const dialogAv = this.dialog.open(AdvertenciaComponent, {
        data: { selected: 6, name: ''},
        disableClose: true
      })
      dialogAv.afterClosed().subscribe(result => {
        this.desicion = result;
        this.crearEvaluacion(this.desicion);
      })
      
    }
  }

  crearEvaluacion(des: boolean) {
    if (des) {
      console.log(this.checkedExpets);
      this.goBack();
    }
  }

  clean() {
    this.checkedExpets = [];
    this.expertos =  '';
    this.lists.forEach((element:any) => element.checked = false);
  }

  goBack() {
    this.dialogRef.close()
  }
}

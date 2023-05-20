import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarExpertoComponent } from 'src/app/components/gestionar-expertos/agregar-experto/agregar-experto.component';
import { ExpertoInFo } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'nuxten-gestionar-expertos',
  templateUrl: './gestionar-expertos.component.html',
  styleUrls: ['./gestionar-expertos.component.scss']
})
export class GestionarExpertosComponent implements OnInit {

  displayedColumns: string[] = ['Identificación', 'Nombres', 'Correo', 'Evaluación', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //ejemplo lista de expertos
  listExpertos: ExpertoInFo[] = [
    { nombres: 'Cesar', apellidos: 'Rodriguez', identfi: 1002963019, email: 'crodriguez@unimayor.edu.co', numero: 3112426884, userID: 'g8kv62zFYQNSO60aVWuJQVv4tT83', idEvaluacion: '-' },
    { nombres: 'Cesar', apellidos: 'Rodriguez', identfi: 27187443, email: 'crodriguez@unimayor.edu.co', numero: 3112426884, userID: 'g8kv62zFYQNSO60aVWuJQVv4tT83', idEvaluacion: '1' },
    { nombres: 'Cesar', apellidos: 'Rodriguez', identfi: 27187123, email: 'crodriguez@unimayor.edu.co', numero: 3112426884, userID: 'g8kv62zFYQNSO60aVWuJQVv4tT83', idEvaluacion: '1' },
    { nombres: 'Cesar', apellidos: 'Rodriguez', identfi: 123123233, email: 'crodriguez@unimayor.edu.co', numero: 3112426884, userID: 'g8kv62zFYQNSO60aVWuJQVv4tT83', idEvaluacion: '1' },
    { nombres: 'Cesar', apellidos: 'Rodriguez', identfi: 1232313, email: 'crodriguez@unimayor.edu.co', numero: 3112426884, userID: 'g8kv62zFYQNSO60aVWuJQVv4tT83', idEvaluacion: '2' },
    { nombres: 'Cesar', apellidos: 'Rodriguez', identfi: 12323333, email: 'crodriguez@unimayor.edu.co', numero: 3112426884, userID: 'g8kv62zFYQNSO60aVWuJQVv4tT83', idEvaluacion: '3' },
    { nombres: 'Cesar', apellidos: 'Rodriguez', identfi: 1233123, email: 'crodriguez@unimayor.edu.co', numero: 3112426884, userID: 'g8kv62zFYQNSO60aVWuJQVv4tT83', idEvaluacion: '4' },
    { nombres: 'Cesar', apellidos: 'Rodriguez', identfi: 12323333, email: 'crodriguez@unimayor.edu.co', numero: 3112426884, userID: 'g8kv62zFYQNSO60aVWuJQVv4tT83', idEvaluacion: '5' }
  ]

  constructor(
    private dialog: MatDialog,
    private userService: UserService
    ) {

  }
  ngOnInit(): void {
    this.getExpertos();
  }

  agregarExperto() {
    this.dialog.open(AgregarExpertoComponent);
  }

  getExpertos() {
    //recibir empleados
    this.dataSource = new MatTableDataSource(this.listExpertos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  modifyExperto(expInfo: ExpertoInFo) {
    console.log('experto: ',expInfo);
  }

  deleteExperto(id: number, uID: string) {
    // console.log(id, uID)
    //mensaje de confirmacion?
    this.userService.deleteUser(uID, id);
  }
}

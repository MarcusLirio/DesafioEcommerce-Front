import { Component, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { TabelaModel } from './tabela/tabela.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns: string[] = ['id','produtos', 'equipe', 'placa', 'status', 'dataEntrega','dataCriacao','ACOES'];
  dataSource!: MatTableDataSource<TabelaModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {}


  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '35%'
    })
  }
}





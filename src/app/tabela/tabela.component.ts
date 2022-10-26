import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from '../Services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ModalComponent} from '../modal/modal.component'
import {MatDialog} from '@angular/material/dialog';
import { TabelaModel } from './tabela.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})

export class TabelaComponent implements OnInit {

  constructor(
    public api: ApiService, 
    public dialog: MatDialog,  
    private router: Router,
    private location: Location
    ) { }

  @Input() displayedColumns: string[] = [];
  @Input() dataSource!: MatTableDataSource<TabelaModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pedidoSelecionado!: TabelaModel;

  ngOnInit(): void {
    this.obterPedidos();
    this.pedidoSelecionado = new TabelaModel();
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obterPedidos() {
    this.api.obterPedidos()
    .subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error("Erro ao obter todos os pedidos. - " + err);
      }
    })
  }

  obterPedidoPorId(id: number) {
    this.api.obterPedidoPorId(id)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.pedidoSelecionado = data;
      },
      error: (err) => {
        console.error("Erro ao obter o pedido por Id. - " + err);
      }
    })
  }

  deletarPedido(id: number) {
    this.api.deletarPedido(id)
    .subscribe({
      next:() => {
        alert("Pedido excluído com sucesso.");
        this.router.navigate(['/tabela']);
        location.reload();
      },
      error: (err) => {
        alert("Falha na exclusão do Pedido.");
        console.error("Falha na exclusão do Pedido. - " + err);
      }
    })
  }

  editarPedido(id: number) {
    this.api.obterPedidoPorId(id)
    .subscribe({
      next: (result) => {
        this.dialog.open(ModalComponent, {
          width:'30%',
          data: result
        })
      },
      error: (err) => {
        console.error("Erro ao obter o pedido por Id. - " + err);
      }
    })
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../Services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TabelaModel } from '../tabela/tabela.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface status {
  invalue: string;
  inviewValue: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  produtoForm !: FormGroup ;
  acaoBtn: string = "Salvar";
  constructor(private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editarPedido: any,
    private api: ApiService,
    private dialogRef: MatDialogRef<TabelaModel>,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      descricaoProduto: ['', Validators.required],
      placaVeiculoUtilizado: ['', Validators.required],
      equipe: ['', Validators.required],
      descricaoEquipe: ['', Validators.required],
      valor: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      status: ['', Validators.required],
      DataPic: ['', Validators.required]
    });

    if(this.editarPedido) {
      this.acaoBtn = "Atualizar";
      this.produtoForm.controls['id'].setValue(this.editarPedido.id);
      this.produtoForm.controls['nome'].setValue(this.editarPedido.nome);
      this.produtoForm.controls['descricaoProduto'].setValue(this.editarPedido.descricaoProduto);
      this.produtoForm.controls['placaVeiculoUtilizado'].setValue(this.editarPedido.placaVeiculoUtilizado);
      this.produtoForm.controls['equipe'].setValue(this.editarPedido.equipe);
      this.produtoForm.controls['descricaoEquipe'].setValue(this.editarPedido.descricaoEquipe);
      this.produtoForm.controls['valor'].setValue(this.editarPedido.valor);
      this.produtoForm.controls['cep'].setValue(this.editarPedido.cep);
      this.produtoForm.controls['logradouro'].setValue(this.editarPedido.logradouro);
      this.produtoForm.controls['numero'].setValue(this.editarPedido.numero);
      this.produtoForm.controls['complemento'].setValue(this.editarPedido.complemento);
      this.produtoForm.controls['bairro'].setValue(this.editarPedido.bairro);
      this.produtoForm.controls['cidade'].setValue(this.editarPedido.cidade);
      this.produtoForm.controls['uf'].setValue(this.editarPedido.uf);
      this.produtoForm.controls['status'].setValue(this.editarPedido.status);
      this.produtoForm.controls['DataPic'].setValue(this.editarPedido.DataPic != null ? this.editarPedido.DataPic : this.editarPedido.dataEntrega);
    }
  }

  statu: status[] = [
    {invalue: 'Processando', inviewValue: 'Processando'},
    {invalue: 'A caminho', inviewValue: 'A caminho'},
    {invalue: 'Entregue', inviewValue: 'Entregue'},
  ];

  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>)
  {
    console.log(event)
    this.events.push(`${type}: ${event.value}`);
  }

  salvar() {
    if(!this.editarPedido) {
      if (this.produtoForm.valid) {
        this.api.criarPedido(this.produtoForm.value)
        .subscribe({
          next:(res) => {
            alert("Pedido adicionado com sucesso!");
            this.produtoForm.reset();
            this.dialogRef.close('save');
            location.reload();
          },
          error: (err) => {
            alert("Não foi possível adicionar o pedido. - " + err);
            this.dialogRef.close('save');
          }
        })
      }
    }
    else{
        this.atualizar();
    }
  }

  atualizar() {
    this.api.atualizarPedido(this.produtoForm.value, this.editarPedido.id)
    .subscribe({
      next: (res) => {
        alert("Pedido atualizado com sucesso!");
        this.produtoForm.reset();
        this.dialogRef.close('Atualizar');
        this.router.navigate(['/tabela']);
        location.reload();
      },
      error: (err) => {
        alert("Não foi possível atualizar o pedido. - " + err);
        this.dialogRef.close('Atualizar');
      }
    })
  }
}

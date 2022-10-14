import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { map, Observable } from 'rxjs';
import { ApiService } from '../Services/api.service';
import { TabelaModel } from '../tabela/tabela.model';

@Component({
  selector: 'graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent{

  chart:any = [];
  constructor(private produto: ApiService) { }

  ngOnInit()
  {
    this.produto.getGraficos().subscribe(res =>{

      let graficoProduto = res.map(item => item.produtos)
      let graficoValor = res.map(item => item.valor)
      
      let graficosPie = []
      let grafico = new TabelaModel()
      graficosPie.push(grafico.nome, grafico.valor)
      
      // this.chart = new Chart('canvas', {
      //   type: 'line',
      //   data: {
      //     labels: grafico,
      //     datasets: [
      //       { 
      //         data: graficoProduto,
      //         borderColor: "#3cba9f",
      //         fill: false
      //       },
      //       { 
      //         data: graficoValor,
      //         borderColor: "#ffcc00",
      //         fill: false
      //       },
      //     ]
      //   },
      //   options: {
      //     legend: {
      //       display: false
      //     },
      //     scales: {
      //       xAxes: [{
      //         display: true
      //       }],
      //       yAxes: [{
      //         display: true
      //       }],
      //     }
      //   }
      // });

    });
  }
}
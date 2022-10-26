
import { Component} from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { ApiService } from '../Services/api.service';
import { TabelaModel } from '../tabela/tabela.model';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
Chart.register(...registerables);

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
      debugger
      const ctx: any= document.getElementById('chart');
      let chartDataValues = [
        { "name": "qtdProdutosValorAteTresMil", "value": 0 }, 
        { "name": "qtdProdutosValorMaiorQueTresMil", "value": 0 }
      ];
      
      if (res && res.length) {
          res.filter((item) => { 
              if (item.valor <= 3000)
                  return chartDataValues[0].value++;
              else
                  return chartDataValues[1].value++;
          });    
      }

      const data = {
        labels: [
          'Qtd Produtos Valor Até 3000',
          'Qtd Produtos Valor Maior Que 3000'
        ],
        datasets: [{
          label: 'Qtd de Produtos entregues por valor (Até 3.000,00 ou maior).',
          data: chartDataValues,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: data
      });
    });
  }
}
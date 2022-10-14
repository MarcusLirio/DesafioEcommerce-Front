import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TabelaModel } from "../tabela/tabela.model";
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  httpHeaders: HttpHeaders = new HttpHeaders();
  httpOptions: any = {};

  constructor(private http: HttpClient) {
    this.httpHeaders = this.httpHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IndhLWVjb21tZXJjZS1zeXN0ZW0iLCJuYmYiOjE2NjU0NTA5NDIsImV4cCI6MTk4MTA3MDEzNywiaWF0IjoxNjY1NDUwOTQyfQ.OjzEOBfMCYw8bRC9wLbeSTwNroykPNesOH1edSCdp-c"
    );
    this.httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    this.httpHeaders.append('X-Requested-With','XMLHttpRequest');

    this.httpOptions = { headers: this.httpHeaders };
  }

  getGraficos(): Observable<Array<TabelaModel>>
  {
    const pedidos: Array<TabelaModel> = []
    return this.http.get<any>("https://localhost:5001/api/Pedidos", this.httpOptions)
    .pipe(
      map((data: any) => {
        for (const element of data.items)
          {
            const pedido = element;
            let pedidoModel = new TabelaModel();
            pedidoModel.id = pedido.id;
            pedidoModel.produtos = pedido.produtos[0].nome;
            pedidoModel.valor = pedido.produtos[0].valor;
            pedidos.push(pedidoModel);
          }
          return pedidos;
      })
    );
  }

  obterPedidos(): Observable<Array<TabelaModel>>
  {
    const pedidos: Array<TabelaModel> = [];

    return this.http.get<any>("https://localhost:5001/api/Pedidos", this.httpOptions)
    .pipe(
      map((data: any) => {
        for (const element of data.items)
          {
            const pedido = element;
            let pedidoModel = new TabelaModel();
            pedidoModel.id = pedido.id;
            pedidoModel.produtos = pedido.produtos[0].nome;
            pedidoModel.equipe = pedido.frota.nome;
            pedidoModel.placa = pedido.frota.placaVeiculoUtilizado;
            pedidoModel.status = pedido.status;
            pedidoModel.dataEntrega = pedido.dataEntrega;
            pedidoModel.dataCriacao = pedido.dataCriacao;
            pedidos.push(pedidoModel);
          }

          return pedidos;
      })
    );
  }

  obterPedidoPorId(id: number): Observable<TabelaModel>
  {
    const url = `https://localhost:5001/api/Pedidos/${id}`;

    return this.http.get<any>(url, this.httpOptions)
    .pipe(
      map((response: any) =>
        response != null ? response : { name: "No results" }
      ),
      map((response: any) => {
        if (response != null) {
          return ({
            id: response.id,
            nome: response.produtos[0].nome,
            descricaoProduto: response.produtos[0].descricao,
            valor: response.produtos[0].valor,
            equipe: response.frota.nome,
            descricaoEquipe: response.frota.descricao,
            placaVeiculoUtilizado: response.frota.placaVeiculoUtilizado,
            cep: response.enderecoDeEntrega.cep,
            logradouro: response.enderecoDeEntrega.logradouro,
            numero: response.enderecoDeEntrega.numero,
            complemento: response.enderecoDeEntrega.complemento,
            bairro: response.enderecoDeEntrega.bairro,
            cidade: response.enderecoDeEntrega.cidade,
            uf: response.enderecoDeEntrega.uf,
            status: response.status,
            dataEntrega: response.dataEntrega,
            dataCriacao: response.dataCriacao
          }) as TabelaModel
        }
        else {
          return new TabelaModel();
        }
      })
    );
  }

  criarPedido(data: any): Observable<any>
  {
      const payload: any = {};
      payload.frota =
      {
        nome : data.equipe,
        descricao : data.descricaoEquipe,
        placaVeiculoUtilizado : data.placaVeiculoUtilizado
      };
      payload.produtos =
      [{
        nome : data.nome,
        descricao : data.descricaoProduto,
        valor : data.valor
      }];
      payload.enderecoDeEntrega =
      {
        cep : data.cep,
        logradouro : data.logradouro,
        numero : data.numero,
        complemento : data.complemento,
        bairro : data.bairro,
        cidade : data.cidade,
        uf : data.uf
      };
      payload.status = data.status
      payload.dataEntrega =  data.DataPic

      this.httpOptions.responseType = 'text';
      return this.http.post<any>("https://localhost:5001/api/Pedidos", payload, this.httpOptions);
  }

  atualizarPedido(data: any, id: number): Observable<any>
  {
      const payload: any = {};
      payload.id = (data.id) ? data.id : id;
      payload.frota =
      {
        nome : data.equipe,
        descricao : data.descricaoEquipe,
        placaVeiculoUtilizado : data.placaVeiculoUtilizado
      };
      payload.produtos =
      [{
        nome : data.nome,
        descricao : data.descricaoProduto,
        valor : data.valor
      }];
      payload.enderecoDeEntrega =
      {
        cep : data.cep,
        logradouro : data.logradouro,
        numero : data.numero,
        complemento : data.complemento,
        bairro : data.bairro,
        cidade : data.cidade,
        uf : data.uf
      };

      payload.status = data.status
      payload.dataEntrega =  data.DataPic

      this.httpOptions.responseType = 'text';
      return this.http.put<any>(`https://localhost:5001/api/Pedidos`, payload, this.httpOptions);
  }

  deletarPedido(id: number): Observable<any> {
    this.httpOptions.responseType = 'text';
    return this.http.delete<any>(`https://localhost:5001/api/Pedidos/${id}`, this.httpOptions);
  }
}

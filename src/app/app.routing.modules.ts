import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaComponent } from './tabela/tabela.component';


const routes: Routes = [
    {path:'tabela', component:TabelaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
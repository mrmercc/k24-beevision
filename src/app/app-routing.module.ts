import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ConsignmentsComponent } from './consignments/consignments.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: 'login', title: 'Giriş Yap | K24 (Beevision)', component: LoginComponent },
  { path: 'consignments', title: 'Consignments |  K24 (Beevision)', component: ConsignmentsComponent },
  { path: 'results', title: 'Results | K24 (Beevision)', component: ResultsComponent },
  { path:'**', pathMatch: 'full', redirectTo:'/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

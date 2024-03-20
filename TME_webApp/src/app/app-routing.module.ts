import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import {LoginComponent} from './login/login.component'


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to /login by default
  { path: 'login', component: LoginComponent },
  { path: 'stock', component: SimpleTableComponent },
  { path: 'dashboard', component: MyDashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

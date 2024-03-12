import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';


const routes: Routes = [
  { path: 'stock', component: SimpleTableComponent },
  { path: 'dashboard', component: MyDashboardComponent },
  { path: '', redirectTo: '/stock', pathMatch: 'full' } // Redirect to /stock by default

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

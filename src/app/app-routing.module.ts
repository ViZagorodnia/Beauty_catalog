import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: 'list-of-items', loadChildren: './list-of-items/list-of-items.module#ListOfItemsModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

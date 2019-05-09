import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const dashboard: Routes = [
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(dashboard)],
  exports: [RouterModule],
})
export class DashboardRouting {}

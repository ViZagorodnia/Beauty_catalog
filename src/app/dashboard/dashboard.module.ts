import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRouting} from './dashboard.routing';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [DashboardComponent, TableComponent],
  imports: [
    CommonModule,
    DashboardRouting
  ]
})
export class DashboardModule { }

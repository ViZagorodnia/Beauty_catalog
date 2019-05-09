import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListOfItemsComponent} from './list-of-items.component';

const listOfItems: Routes = [
  { path: '', component: ListOfItemsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(listOfItems)],
  exports: [RouterModule],
})
export class ListOfItemsRouting {}

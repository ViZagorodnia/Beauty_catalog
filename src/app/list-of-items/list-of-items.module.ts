import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfItemsComponent } from './list-of-items.component';
import {ListOfItemsRouting} from './list-of-items.routing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListOfItemsComponent],
  imports: [
    CommonModule,
    ListOfItemsRouting,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ListOfItemsModule {
  }

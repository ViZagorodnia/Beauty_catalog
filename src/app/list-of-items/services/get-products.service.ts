import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(private httpClient: HttpClient) {}

  public getProducts() {
    return this.httpClient.get('../../../assets/json/items.json');
  }
}

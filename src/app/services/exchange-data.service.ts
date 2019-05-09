import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeDataService {

  private subjectOfProductsNumber = new BehaviorSubject<any>(null);
  private subjectOfViewsNumber = new BehaviorSubject<any>(null);

  sendNumberOfProducts(data: number) {
    this.subjectOfProductsNumber.next(data);
  }

  getNumberOfProducts(): Observable<any> {
    return this.subjectOfProductsNumber.asObservable();
  }

  sendNumberOfViews(data: number) {
    this.subjectOfViewsNumber.next(data);
  }

  getNumberOfView(): Observable<any> {
    return this.subjectOfViewsNumber.asObservable();
  }
}

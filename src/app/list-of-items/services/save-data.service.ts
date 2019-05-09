import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Products} from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {

  private subjectOfProductsArray = new BehaviorSubject<any>(null);
  private subjectOfViewsNumber = new BehaviorSubject<any>(null);

  savedProductsArray(data: Products[]) {
    this.subjectOfProductsArray.next(data);
  }

  getSavedProductsArray(): Observable<Products[]> {
    return this.subjectOfProductsArray.asObservable();
  }

  saveViewsNumber(data: number) {
    this.subjectOfViewsNumber.next(data);
  }

  getSavedViewsNumber(): Observable<number> {
    return this.subjectOfViewsNumber.asObservable();
  }
}

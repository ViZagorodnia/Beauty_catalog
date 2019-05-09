import {Component, OnDestroy, OnInit} from '@angular/core';
import {Products} from './models/products';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExchangeDataService} from '../services/exchange-data.service';
import {SaveDataService} from './services/save-data.service';
import {Subscription} from 'rxjs';
import {GetProductsService} from './services/get-products.service';

@Component({
  selector: 'app-list-of-items',
  templateUrl: './list-of-items.component.html',
  styleUrls: ['./list-of-items.component.scss']
})
export class ListOfItemsComponent implements OnInit, OnDestroy {

  public numberOfProducts: number;
  public numberOfViews: number;
  public listOfProducts: Products[];
  public addNewProductForm: FormGroup;
  private savedProductsArraySubscription: Subscription;
  private savedNumberOfViewsSubscription: Subscription;

  constructor(private getProducts: GetProductsService,
              private formBuilder: FormBuilder,
              private exchangeDataService: ExchangeDataService,
              private saveService: SaveDataService) { }

  ngOnInit() {
    this.savedProductsArraySubscription = this.saveService.getSavedProductsArray().subscribe(data => {
      if (!data) {
        this.getProducts.getProducts().subscribe((res: Products[]) => {
          this.listOfProducts = res;
        });
      } else {
        this.listOfProducts = data;
      }
    });

    this.savedNumberOfViewsSubscription = this.saveService.getSavedViewsNumber().subscribe(data => {
      return !data ? this.numberOfViews = 0 : this.numberOfViews = data;
    });

    this.buildForm();
  }

  ngOnDestroy() {
    this.saveService.savedProductsArray(this.listOfProducts);
    this.saveService.saveViewsNumber(this.numberOfViews);
  }

  // ------ Remove and add product -----
  public removeProduct(event) {
    const regexp: RegExp = /(?<=")(.*)(?=")/;
    const itemImage = regexp.exec(event.target.parentElement.childNodes[0].style.backgroundImage)[0];
    const deletedItem = this.findObj(this.listOfProducts, itemImage);
    this.listOfProducts.splice(this.listOfProducts.indexOf(deletedItem), 1);
    this.numberOfProducts = this.listOfProducts.length;
    this.exchangeDataService.sendNumberOfProducts(this.numberOfProducts);
  }

  public addNewProduct() {
    const newProductImage = 'assets/images/4.jpg';
    const newProductName = this.productName.value;
    const newProductPrice = this.productPrice.value;
    const newProduct = {
      img: newProductImage,
      name: newProductName,
      price: newProductPrice
    };
    if (this.productName.value) {
      this.listOfProducts.push(newProduct);
      this.numberOfProducts = this.listOfProducts.length;
      this.exchangeDataService.sendNumberOfProducts(this.numberOfProducts);
    }
    document.getElementById('formAddNewProduct').classList.add('closed');
    document.getElementById('overlay').classList.remove('view');
  }

  // ------- View product -------
  public viewProduct(event) {
    let openedProduct;
    this.numberOfViews += 1;
    this.exchangeDataService.sendNumberOfViews(this.numberOfViews);
    if (event.target.parentElement.nodeName === 'DIV') {
      openedProduct = event.target.parentElement;
    } else {
      openedProduct = event.target.parentElement.parentElement;
    }
    openedProduct.className = 'viewMode';
    document.getElementById('overlay').classList.add('view');
  }

  public productViewCloseButton(event) {
    let closedProduct;
    if (event.target.parentElement.nodeName === 'DIV') {
      closedProduct = event.target.parentElement;
    } else {
      closedProduct = event.target.parentElement.parentElement;
    }
    closedProduct.classList.remove('viewMode');
    closedProduct.classList.add('item', 'borderStyle');
    document.getElementById('overlay').classList.remove('view');
  }

  // ------- Form building ------
  public buildForm() {
    this.addNewProductForm = this.formBuilder.group({
      image: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: [' UAH', Validators.required],
    });
  }

  public get productName(): AbstractControl {
    return this.addNewProductForm.controls.productName;
  }

  public get productPrice(): AbstractControl {
    return this.addNewProductForm.controls.productPrice;
  }

  // ----- Visualisation -------
  public makeListView() {
    document.getElementById('listOfItems').className = 'listView';
  }

  public makeCardView() {
    document.getElementById('listOfItems').className = 'cardView';
  }

  public addProductButton() {
    document.getElementById('formAddNewProduct').classList.remove('closed');
    document.getElementById('overlay').classList.add('view');
  }

  public closeFormButton() {
    document.getElementById('formAddNewProduct').classList.add('closed');
    document.getElementById('overlay').classList.remove('view');
  }

  private findObj(arr, img) {
    return arr.find(item => item.img === img);
  }
}

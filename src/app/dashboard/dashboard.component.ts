import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ExchangeDataService} from '../services/exchange-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public numberOfItems: string;
  public numberOvViews: string;
  private subscriptionItems: Subscription;
  private subscriptionViews: Subscription;

  constructor(private dataService: ExchangeDataService) { }

  ngOnInit() {
    this.subscriptionItems = this.dataService.getNumberOfProducts().subscribe(message => {
      return !message ? this.numberOfItems = '7' : this.numberOfItems = message;
    });
    this.subscriptionViews = this.dataService.getNumberOfView().subscribe(message => {
      return !message ? this.numberOvViews = '0' : this.numberOvViews = message;
    });
  }
}

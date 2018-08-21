import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-health-subscribe',
  templateUrl: 'health-subscribe.html',
})

export class HealthSubscribePage {
  
  _newsSubscriptionLink: any;
  NEWSSUBLINK: string = 'newsletterurl';

  constructor(private apiProvider:ApiProvider) {
  }

  ionViewWillEnter() {

    this._newsSubscriptionLink = this.apiProvider.NEWS_LETTER_URL;
  }

  
}
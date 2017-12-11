import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { LoaderProvider } from '../../providers/loader/loader';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';


@IonicPage()
@Component({
  selector: 'page-health-subscribe',
  templateUrl: 'health-subscribe.html',
})

export class HealthSubscribePage {
  
  _newsSubscriptionLink: any;
  NEWSSUBLINK: string = 'newsletterurl';

  constructor( private hapenningsProvider: HapenningsProvider,
               private loaderProvider:LoaderProvider,
               private expnHandler:ExceptionHandlerProvider) {
  }

  ionViewWillEnter() {

    this.getPromotionsBrochureLink()
  }

  getPromotionsBrochureLink() {

    this.loaderProvider.presentLoadingCustom();

    this.hapenningsProvider.getPromotionsBrochureLink().subscribe(res => {

      let myList = res.data;

      for (let i in myList) {

        if (myList[i].key == this.NEWSSUBLINK) {
          
        this._newsSubscriptionLink = myList[i].value;
        this.loaderProvider.dismissLoader();
        break;
          
        }
      }
    }, err => {
      
      this.loaderProvider.dismissLoader();
      this.expnHandler.excpHandler(err);

      });
    
  }
}
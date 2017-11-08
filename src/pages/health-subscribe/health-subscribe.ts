import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

@IonicPage()
@Component({
  selector: 'page-health-subscribe',
  templateUrl: 'health-subscribe.html',
})

export class HealthSubscribePage {
  //@ViewChild(Slides) slides: Slides;
  _newsSubscriptionLink: any;
  NEWSSUBLINK: string = 'newsletterurl';

  constructor( private navParams: NavParams,
    private hapenningsProvider: HapenningsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthSubscribePage');
  }

  ionViewWillEnter() {
    this.getPromotionsBrochureLink()
  }


  ngAfterViewInit() {

  }

  getPromotionsBrochureLink() {
    this.hapenningsProvider.getPromotionsBrochureLink().subscribe(res => {
      console.log(res);
      for (let i in res.data) {
        if (res.data[i].key == this.NEWSSUBLINK)
          console.log(res.data[i].value);
        this._newsSubscriptionLink = res.data[i].value;
        console.log(this._newsSubscriptionLink);
        break;
      }
    });
  }
}
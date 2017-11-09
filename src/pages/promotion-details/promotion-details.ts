import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-promotion-details',
  templateUrl: 'promotion-details.html',
})
export class PromotionDetailsPage {
  _promotionDetails: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this._promotionDetails = navParams.get('promodetails');
  }

}

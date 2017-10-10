import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PromotionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotion-details',
  templateUrl: 'promotion-details.html',
})
export class PromotionDetailsPage {

  _promotionDetails:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

          this._promotionDetails = navParams.get('promodetails');
          console.log(this._promotionDetails);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionDetailsPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';


// @Directive({
//   selector: '[zoom-pan]'
// })

@IonicPage()
@Component({
  selector: 'page-promotion-details',
  templateUrl: 'promotion-details.html',
  })

export class PromotionDetailsPage {

  _promotionDetails: any = [];

  constructor(public navParams: NavParams,
              public navCtrl:NavController) {
    
    this._promotionDetails = navParams.get('promodetails');
   
  }


  zoomArea(url) {
    this.navCtrl.push('ImageViewPage', {imgsource:url})
  }

}

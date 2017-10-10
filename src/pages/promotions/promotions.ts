import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

/**
 * Generated class for the PromotionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {


_promotionList:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public hapenningsProvider:HapenningsProvider) {

               
  }

  ionViewDidEnter(){

     this.getPromotions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');
  }

  getPromotions(){

      this.hapenningsProvider.getPromotions()

          .subscribe(res => {

              this._promotionList = res.data;

          })
      

  }


  goto(value){

    this.navCtrl.push('PromotionDetailsPage', { promodetails:value });
  }

}

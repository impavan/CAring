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
_brochureLinks:any;
CATELOGLINK:string =  'promotionscatalogurl';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public hapenningsProvider:HapenningsProvider) {

               
  }

  ionViewDidEnter(){

     this.getPromotions();
       this.getPromotionsBrochureLink();
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


  getPromotionsBrochureLink(){

      this.hapenningsProvider.getPromotionsBrochureLink()

            .subscribe(res => {

                console.log(res);
                for(let i in  res.data ){
                    if(res.data[i].key == this.CATELOGLINK)
                      this._brochureLinks = res.data[i].value;
                      break;
                }

            });

  }


  goto(value){

    this.navCtrl.push('PromotionDetailsPage', { promodetails:value });
  }

}

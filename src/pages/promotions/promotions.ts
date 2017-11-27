import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {


  _promotionList: any = [];
  _brochureLinks: any;
  CATELOGLINK: string = 'promotionscatalogurl';
  constructor(public navCtrl: NavController,
              public hapenningsProvider: HapenningsProvider,
              private loaderProvider: LoaderProvider) {
    
  }

  ionViewWillEnter() {
    if(this._promotionList.length <=0){
    this.loaderProvider.presentLoadingCustom();
    this.getPromotions();
    this.getPromotionsBrochureLink();
    }
  }


  getPromotions() {
    this.hapenningsProvider.getPromotions().subscribe(res => {
      this._promotionList = res.data.filter(promote=>promote.active == true);
      this.loaderProvider.dismissLoader();
    });
  }

  getPromotionsBrochureLink() {
    this.hapenningsProvider.getPromotionsBrochureLink().subscribe(res => {
      for (let i in res.data) {
        if (res.data[i].key == this.CATELOGLINK)
          this._brochureLinks = res.data[i].value;
        break;
      }
    });
  }

  gotoPromotionDetails(value) {
    this.navCtrl.push('PromotionDetailsPage', { promodetails: value });
  }
}
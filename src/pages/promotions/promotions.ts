import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { LoaderProvider } from '../../providers/loader/loader';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {


  _promotionList: any = [];
  _brochureLinks: any;
  navToId: any;
  constructor(private navParams:NavParams,
              public navCtrl: NavController,
              public apiProvider:ApiProvider,  
              public hapenningsProvider: HapenningsProvider,
              private loaderProvider: LoaderProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
    
            this.navToId = navParams.get('id');
    
  }

  ionViewWillEnter() {
    if(this._promotionList.length <=0){
    this.loaderProvider.presentLoadingCustom();
    this.getPromotions();
    }
    this._brochureLinks = this.apiProvider.PROMOTION_URL;
  }


  getPromotions() {
    this.hapenningsProvider.getPromotions().subscribe(res => {
      this._promotionList = res.data.filter(promote => {
        if (promote.publishingstartdate && promote.publishingenddate) {

          let psDate = moment(promote.publishingstartdate).format('YYYY-MM-DD');
          let peDate = moment(promote.publishingenddate).format('YYYY-MM-DD');
          let psMoment = moment(psDate);
          let peMoment = moment(peDate);
          let currentMoment = moment().format('YYYY-MM-DD');
          // console.log()
          // console.log(promote.publishingstartdate,"pro")
          // console.log(this.apiProvider.currentDate,"current date")
          // console.log(moment(promote.publishingstartdate).isSameOrBefore(this.apiProvider.currentDate), "publishing start date");
          // console.log(moment(promote.publishingenddate).isSameOrAfter(this.apiProvider.currentDate), "publishing end date");

          if (moment(psMoment).isSameOrBefore(currentMoment) && moment(peMoment).isSameOrAfter(currentMoment)) {
            return promote;
          }
        } else {
          return promote;
        }
      });
      this.loaderProvider.dismissLoader();

      if (this.navToId) {
        let item = this._promotionList.find(d => d.deeplinkingidentifier == this.navToId)
        if (item) {
          this.gotoPromotionDetails(item);
        }
      }  

    }, err => {
      
      this.loaderProvider.dismissLoader();
      this.exceptionProvider.excpHandler(err);

    });
  }



  gotoPromotionDetails(value) {
    this.navCtrl.push('PromotionDetailsPage', { promodetails: value });
  }
}
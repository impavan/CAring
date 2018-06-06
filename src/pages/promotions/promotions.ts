import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
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
              private exceptionProvider: ExceptionHandlerProvider) {
    
            this.navToId = navParams.get('id');
    
  }

  ionViewWillEnter() {
    if(this._promotionList.length <=0){
    this.getPromotions();
    }
    this._brochureLinks = this.apiProvider.PROMOTION_URL;
  }


  getPromotions() {
    this.hapenningsProvider.getPromotions().subscribe(res => {
      this._promotionList = res.data.filter(promote => {

        if (promote.publishingstartdate && promote.publishingenddate) {

          // moment for checking start date and end date for posting article //

          let psDate = moment(promote.publishingstartdate).format('YYYY-MM-DD');
          let peDate =  moment(promote.publishingenddate).format('YYYY-MM-DD');
          let psMoment = moment(psDate);
          let peMoment =  moment(peDate)
          let currenMoment  =  moment().format('YYYY-MM-DD');
          if (moment(psMoment).isSameOrBefore(currenMoment) && moment(peMoment).isSameOrAfter(currenMoment)) {
            return promote;
          }
        } else {
          return promote;
        }
      });

      if (this.navToId) {
        let item = this._promotionList.find(d => d.deeplinkingidentifier == this.navToId)
        if (item) {
          this.gotoPromotionDetails(item);
        }
      }  

    }, err => {
      
      this.exceptionProvider.excpHandler(err);

    });
  }



  gotoPromotionDetails(value) {
    this.navCtrl.push('PromotionDetailsPage', { promodetails: value });
  }
}
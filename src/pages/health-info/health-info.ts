import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { ApiProvider } from '../../providers/api/api';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-health-info',
  templateUrl: 'health-info.html',
})
export class HealthInfoPage {
  _healthInfoList: any = [];
  navToId: any;

  constructor(private navParams:NavParams,
              private navCtrl: NavController,
              private hapenningsProvider: HapenningsProvider,
              private apiProvider:ApiProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
    
              this.navToId = navParams.get('id');
              console.log(this.navToId,"this.navToId")
            
    
  }

  ionViewWillEnter() {
    
    if (this._healthInfoList.length <= 0) {
      
     this.getHealthInfo();
    }

  }

  navToHealthDetails(health) {

    this.navCtrl.push("HealthDetailsPage", { id: health.deeplinkingidentifier });
    
  }

  navToHealthSubscribe() {

    this.navCtrl.push("HealthSubscribePage");

  }

  getHealthInfo() {

    this.hapenningsProvider.getHealthInfo().subscribe(res => {
      this._healthInfoList = res.data.filter(health => {

   // moment for checking the start date and end date for posting //
       
        let psDate = moment(health.publishingstartdate).format('YYYY-MM-DD');
        let peDate =  moment(health.publishingenddate).format('YYYY-MM-DD');
        let psMoment = moment(psDate);
        let peMoment =  moment(peDate)
        let currenMoment  =  moment().format('YYYY-MM-DD');

       if (health.publishingstartdate && health.publishingenddate) {
          if (moment(psMoment).isSameOrBefore(currenMoment) && moment(peMoment).isSameOrAfter(currenMoment)) {
            return health;
          }
        } else {
          return health;
        }
          
      });

         if (this.navToId) {
        let item = this._healthInfoList.find(d => d.deeplinkingidentifier == this.navToId)
        if (item) {
          this.navToHealthDetails(item);
        }
      }  

    }, err => {
      
      this.exceptionProvider.excpHandler(err);

    });
  }
  
}
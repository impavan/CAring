import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { LoaderProvider } from '../../providers/loader/loader';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';


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
              private loaderProvider: LoaderProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
    
              this.navToId = navParams.get('id');
    
  }

  ionViewWillEnter() {
    
    if (this._healthInfoList.length <= 0) {
      
     this.loaderProvider.presentLoadingCustom();
     this.getHealthInfo();
    }

  }

  navToHealthDetails(health) {

    this.navCtrl.push("HealthDetailsPage", { data: health });
    
  }

  navToHealthSubscribe() {

    this.navCtrl.push("HealthSubscribePage");

  }

  getHealthInfo() {

    this.hapenningsProvider.getHealthInfo().subscribe(res => {
      this._healthInfoList = res.data.filter(health=>health.isactive == true);
      this.loaderProvider.dismissLoader();

         if (this.navToId) {
        let item = this._healthInfoList.find(d => d.deeplinkingidentifier == this.navToId)
        if (item) {
          this.navToHealthDetails(item);
        }
      }  

    }, err => {
      
      this.loaderProvider.dismissLoader();
      this.exceptionProvider.excpHandler(err);

    });
  }
  
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-health-info',
  templateUrl: 'health-info.html',
})
export class HealthInfoPage {
  _healthInfoList: any = [];

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private hapenningsProvider: HapenningsProvider, private loaderProvider:LoaderProvider) {
  }

  ionViewDidEnter() {
   
  }

  ionViewWillEnter(){
    this.loaderProvider.presentLoadingCustom();
     this.getHealthInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthInfoPage');
  }

  navToHealthDetails(health) {
    this.navCtrl.push("HealthDetailsPage", {data:health});
  }

  navToHealthSubscribe() {
    this.navCtrl.push("HealthSubscribePage");
  }

  getHealthInfo() {
    this.hapenningsProvider.getHealthInfo().subscribe(res => {
      this._healthInfoList = res.data;
      this.loaderProvider.dismissLoader();
      console.log(this._healthInfoList);
    });
  }
}
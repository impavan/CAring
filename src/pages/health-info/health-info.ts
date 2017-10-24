import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

@IonicPage()
@Component({
  selector: 'page-health-info',
  templateUrl: 'health-info.html',
})
export class HealthInfoPage {
  _healthInfoList: any = [];

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private hapenningsProvider: HapenningsProvider) {
  }

  ionViewDidEnter() {
    this.getHealthInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthInfoPage');
  }

  navToHealthDetails() {
    this.navCtrl.push("HealthDetailsPage");
  }

  navToHealthSubscribe() {
    this.navCtrl.push("HealthSubscribePage");
  }

  getHealthInfo() {
    this.hapenningsProvider.getHealthInfo().subscribe(res => {
      this._healthInfoList = res.data;
      console.log(this._healthInfoList);
    });
  }
}
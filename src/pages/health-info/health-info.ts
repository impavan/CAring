import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

/**
 * Generated class for the HealthInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-health-info',
  templateUrl: 'health-info.html',
})
export class HealthInfoPage {

  _healthInfoList:any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public hapenningsProvider:HapenningsProvider) {
  }

  ionViewDidEnter(){

      this.getHealthInfo();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthInfoPage');
  }

  navToHealthDetails(){
    this.navCtrl.push("HealthDetailsPage");
  }
  navToHealthSubscribe(){
    this.navCtrl.push("HealthSubscribePage");
  }


  getHealthInfo(){

        this.hapenningsProvider.getHealthInfo()

              .subscribe(res => {

                    this._healthInfoList = res.data;
                    console.log(this._healthInfoList);

              })

  }




  }






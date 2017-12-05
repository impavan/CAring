import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

/**
 * Generated class for the ConditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conditions',
  templateUrl: 'conditions.html',
})
export class ConditionsPage {

  conditions: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public happeningProviders : HapenningsProvider) {
  }

 

  ionViewWillEnter() {
    this.getConditions();
  }

  getConditions() {
    this.happeningProviders.getTermsandConditions()
      .subscribe(res => {
        this.conditions = res.data[0];
        console.log(this.conditions);
        console.log(res);
    })
  }

}

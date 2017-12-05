import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

/**
 * Generated class for the PrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  policy: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public hapenningsProvider: HapenningsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPage');
  }

  ionViewWillEnter() {
    this.getPrivacyPolicy();
  }

  getPrivacyPolicy() {
    this.hapenningsProvider.getPrivacyPolicy()
      .subscribe(res => {
        this.policy = res.data[0];
        console.log(this.policy);
        console.log(res);
    })
  }

}

import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';



@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  policy: any;

  constructor(public hapenningsProvider: HapenningsProvider) {
  }



  ionViewWillEnter() {
    this.getPrivacyPolicy();
  }

  getPrivacyPolicy() {
    this.hapenningsProvider.getPrivacyPolicy()
      .subscribe(res => {
        this.policy = res.data[0];
    })
  }

}

import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';



@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  policy: any;

  constructor(private apiProvider:ApiProvider) {
  }



  ionViewWillEnter() {

    this.policy = this.apiProvider.privacyPolicy;
  }

  

}

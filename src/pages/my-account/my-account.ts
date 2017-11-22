import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';


@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertProvider:AlertProvider) {
          }


  comingSoon() {
    this.alertProvider.presentToast('coming soon..')
    return;
  }
  

}

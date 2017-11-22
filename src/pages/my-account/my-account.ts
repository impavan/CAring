import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events  } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';




@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  _auth:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertProvider:AlertProvider) {
          }


          ionViewWillEnter(){
            this._auth = localStorage.getItem('auth_token');
          }


  comingSoon() {
    this.alertProvider.presentToast('coming soon..')
    return;
  }

  gotoLogin() {
    
    this.navCtrl.setRoot("LoginPage");
    
  }
  logout() {
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('phoneNum');
    this.events.publish('user:login', false);
    this.alertProvider.presentToast("You have been logged out..!")
    this.navCtrl.setRoot("LoginPage");

  }
  

}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events, Platform } from 'ionic-angular';

import { ConnectAuthProvider } from '../../providers/connect-auth/connect-auth';
import { AlertProvider } from '../../providers/alert/alert';
import { PushProvider } from '../../providers/push/push';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})

export class MyAccountPage {
  _auth: any;

  constructor(public navCtrl: NavController,
    public events: Events,
    private connectAuthProvider: ConnectAuthProvider,
    public pushProvider: PushProvider,
    public alertProvider: AlertProvider,
    public platform: Platform) {
      console.log()
  }

  ionViewWillEnter() {
    this._auth = localStorage.getItem('auth_token') || '';
  }

  comingSoon() {
    this.alertProvider.presentToast('Coming soon..')
    return;
  }

  goTo(page) {
    if (page === 'LoginPage')
      this.navCtrl.setRoot(page);
    else
      this.navCtrl.push(page);
  }

  logout() {
    this.connectAuthProvider.logoutCustomer().subscribe(logoutData => {
      if(logoutData.code == 200) {
        
        this.navCtrl.setRoot("LoginPage").then(() => {
          localStorage.clear();
          if (this.platform.is('cordova')) {
            this.pushProvider.logoutWebengage();
          }
          this.events.publish('user:login', false);
          this.alertProvider.presentToast(logoutData.result);
        })
      } else {
        this.alertProvider.presentToast(logoutData.message)
      }
    })
  }
}
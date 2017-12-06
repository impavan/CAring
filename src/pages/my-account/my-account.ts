import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events  } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { PushProvider } from '../../providers/push/push';




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
              public pushProvider:PushProvider,
              public alertProvider:AlertProvider) {
          }


          ionViewWillEnter(){
            this._auth = localStorage.getItem('auth_token') || '';
          }


  comingSoon() {
    this.alertProvider.presentToast('Coming soon..')
    return;
  }

  goTo(page) {
    
    if(page === 'LoginPage')
      this.navCtrl.setRoot(page);
    else
    this.navCtrl.push(page);
    
  }

  
  
  logout() {
    

    this.navCtrl.setRoot("LoginPage").then(() => {

        localStorage.removeItem('favouriteList');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('phoneNum');
        // this.pushProvider.logoutWebengage();
        this.events.publish('user:login', false);
        this.alertProvider.presentToast("You have been logged out..!")  
  
    })
      
  }
  

}

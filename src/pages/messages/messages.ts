import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { PushProvider } from '../../providers/push/push';
import { AlertProvider } from '../../providers/alert/alert';
import { LoaderProvider } from '../../providers/loader/loader';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';




@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  myMessages: any = [];
  _auth: any = localStorage.getItem('auth_token');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authProvider: AuthProvider,
              private pushProvider: PushProvider,
              private alertProvider:AlertProvider,
              private loaderProvider: LoaderProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
    
  }

  ionViewDidLoad() {
   
  }

  ionViewWillEnter() {
    if (this._auth) {

          this.authProvider.setHeader();      
          this.getAllMessages();  
    }

  }


  getAllMessages() {

    this.loaderProvider.presentLoadingCustom()
  
    let phone = this.authProvider.getUserMobileNo();

    this.pushProvider.getAllMessages(phone).subscribe(res => {
      
      this.loaderProvider.dismissLoader();
      
      if (res[0].code == 200) {

        this.myMessages = res[0].referalcodedata;

      } else {
        
        // this.alertProvider.presentToast(res[0].message);

      }

    }, err => {
      
      this.loaderProvider.dismissLoader();
      // this.exceptionProvider.excpHandler(err);

    });

  }

  gotoLogin() {
    
    this.navCtrl.setRoot('LoginPage');
  }

}

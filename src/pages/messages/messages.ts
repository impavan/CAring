import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PushProvider } from '../../providers/push/push';
import { AlertProvider } from '../../providers/alert/alert';
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
    private authProvider: AuthProvider,
    private pushProvider: PushProvider,
    private alertProvider: AlertProvider,
    private exceptionProvider: ExceptionHandlerProvider) {

  }

  ionViewWillEnter() {
    if (this._auth) {
      this.authProvider.setHeader();
      this.getAllMessages();
    }
  }

  getAllMessages() {
    let phone = this.authProvider.getUserMobileNo();
    this.pushProvider.getAllMessages(phone).subscribe(res => {
      if (res[0].code == 200) {
        this.myMessages = res[0].referalcodedata;
      } else {
        // this.alertProvider.presentToast(res[0].message);
      }
    }, err => {
      this.exceptionProvider.excpHandler(err);
    });
  }

  gotoLogin() {
    this.navCtrl.setRoot('LoginPage');
  }
}
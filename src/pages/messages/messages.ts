import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { ConnectAuthProvider } from '../../providers/connect-auth/connect-auth';
import { LoaderProvider } from '../../providers/loader/loader';


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
    private userdataProvider: UserdataProvider,
    private alertProvider: AlertProvider,
    private loaderProvider: LoaderProvider,
    private connectAuthProvider: ConnectAuthProvider,
    private exceptionProvider: ExceptionHandlerProvider) {

  }

  ionViewWillEnter() {
    if (this._auth) {
      this.authProvider.setHeader();
      this.getAllMessages();
    }
  }

  getAllMessages() {
    this.loaderProvider.presentLoadingCustom();
    this.connectAuthProvider.validateToken(this.authProvider.getAuthToken()).then(isValid => {
      if (isValid) {
        this.userdataProvider.getAllMessages().subscribe(res => {
          this.loaderProvider.dismissLoader();
          if (res.code == 200 && res.result.messages.code == 200) {
            this.myMessages = res.result.messages.referalcodedata;
          } else {
            this.alertProvider.presentToast(res.result.messages.message);
          }
        }, err => {
          this.exceptionProvider.excpHandler(err);
        });
      } else {
        this.loaderProvider.dismissLoader();
        this.alertProvider.presentToast('Invalid Token');
      }
    })
  }

  gotoLogin() {
    this.navCtrl.setRoot('LoginPage');
  }
}
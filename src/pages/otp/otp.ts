import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { EMPTY, SPECIAL_CHARACTER, NO_CHAR } from '../../validator';
import { Component, ViewChild, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CONTENT_ID } from '../../config';
import { ABOUT_US } from '../../url';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})

export class OtpPage {
  @ViewChild('connection') connectionModal;
  phoneNum: any;
  regData: any;
  otp: string;
  type: string;
  from: any;

  constructor(private exceptionProvider: ExceptionHandlerProvider,
    private loaderProvider: LoaderProvider,
    private userProvider: UserdataProvider,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private navParams: NavParams,
    private menu: MenuController,
    private navCtrl: NavController,
    private events: Events,
    private zone: NgZone,
    private http: Http) {

    this.otp = '';
    this.from = navParams.get('from');
    this.zone.run(() => {
      this.phoneNum = navParams.get('phone');
      console.log(this.phoneNum, "=====================Phnum==========================");
      this.regData = navParams.get('data');
    });
    this.events.subscribe('noconnection', (value) => {
      if (value)
        this.openConnectionModal();
    });
  }

  ionViewDidLoad() {
    this.loaderProvider.presentBackOptions();
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, "leftMenu");
    this.loaderProvider.presentBackOptions();
  }

  userOTP() {
    if (this.otp == EMPTY) {
      this.alertProvider.presentToast('OTP cannot be empty');
      return;
    } else if (this.otp.match(NO_CHAR)) {
      this.alertProvider.presentToast('OTP cannot contain characters');
      return;
    } else if (!SPECIAL_CHARACTER.test(this.otp)) {
      this.alertProvider.presentToast('OTP cannot contain special characters');
      return;
    } else {
      this.loaderProvider.presentLoadingCustom();
      let otp = this.otp;
      if (this.from == "registration") {
        this.type = '1';
      } else {
        this.type = '0';
      }
      this.userProvider.userOTP(otp, this.phoneNum, this.type)
        .subscribe(data => {
          this.loaderProvider.dismissLoader();
          if (data[0].code == 200) {
            if (this.from == "registration") {
              this.navCtrl.push("RegistrationPage", { 'phone': this.phoneNum, 'otp': this.otp });
            } else {
              this.loginOTPSucess(data);
              // let custom = data[0].customerdata.customer[0].custom_fields;
              // for (let i = 0; i < custom.field.length; i++) {
              //   if (custom.field[i].name == 'wifiid') {
              //     if (custom.field[i].value == "" || custom.field[i].value == null)
              //       this.navCtrl.push("FreewifiPage");
              //     else
                    this.navCtrl.setRoot("HomePage");
              //   }
              // }
            }
          } else if (data[0].code == 201) {
            this.clearOTPBox();
            this.alertProvider.presentToast(data[0].message);
          } else if (data[0].code == 202) {
            this.clearOTPBox();
            this.alertProvider.presentToast(data[0].message);
          } else {
          }
        }, err => {
          this.loaderProvider.dismissLoader();
          this.exceptionProvider.excpHandler(err);
        });
    }
  }

  //otp suces handler for login
  loginOTPSucess(data) {
    this.authProvider.setUser(data[0].customerdata);
    this.authProvider.setAuthToken(data[0].auth_key);
    localStorage.setItem('phone', data[0].customerdata.customer[0].mobile);
    localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
    this.authProvider.setUserLoggedIn(true);
    this.authProvider.setHeader();
    this.clearOTPBox();
    this.events.publish('user:login', true);
  }

  //resend OTP
  resendOTP() {
    this.loaderProvider.presentLoadingCustom();
    this.userProvider.userLogin(localStorage.getItem('phonenumber'))
      .subscribe(data => {
        this.loaderProvider.dismissLoader();
        if (data[0].code == 200) {
          this.alertProvider.presentToast('OTP sent');
        } else {
        }
      }, err => {
        this.loaderProvider.dismissLoader();
        this.exceptionProvider.excpHandler(err);
      });
  }

  //go to back page
  goBack() {
    this.navCtrl.pop();
  }

  clearOTPBox() {
    this.otp = '';
  }

  openConnectionModal() {
    this.connectionModal.open();
  }

  closeConnectionModal() {
    this.connectionModal.close();
  }
}
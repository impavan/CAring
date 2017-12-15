import { IonicPage, NavController, NavParams, MenuController, Events, Platform } from 'ionic-angular';
import { EMPTY, SPECIAL_CHARACTER, NO_CHAR } from '../../validator';
import { Component, ViewChild } from '@angular/core';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { LoaderProvider } from '../../providers/loader/loader';
import { PushProvider } from '../../providers/push/push'
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})

export class OtpPage {

  phoneNum: any;
  otp: string;
  from: any;
  _existingCustomerData:any = [];
  MOBILE_VALIDATED = "mobile_validated";
  YES="Yes";
  NO="No";


  constructor(
              private exceptionProvider: ExceptionHandlerProvider,
              private loaderProvider: LoaderProvider,
              private userProvider: UserdataProvider,
              private alertProvider: AlertProvider,
              private authProvider: AuthProvider,
              private pushProvider:PushProvider,
              private navCtrl: NavController,
              private navParams: NavParams,
              private menu: MenuController,
              private platform:Platform,
              private events: Events) {

              this.otp = '';
              this.phoneNum = navParams.get('phone');
              this.from = navParams.get('from');

            }

  
  ionViewDidLoad() {

    this.loaderProvider.dismissLoader();
  }

  ionViewDidEnter() {

    this.menu.swipeEnable(false, "leftMenu");
    
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
    
      this.userProvider.userOTP(otp, this.phoneNum, this.from).subscribe(data => {

        console.log(data);

        this.loaderProvider.dismissLoader();
        if (data[0].code == 200) {

          if (data[0].customerdata) {

            this._existingCustomerData = data;
            let custom_data = data[0].customerdata.customer[0].custom_fields.field;
            let mobile_validated = custom_data.filter(res => res.name === this.MOBILE_VALIDATED);
            
            if(mobile_validated[0] && mobile_validated[0].value == this.YES){
                this.loginOTPSucess(data);
                this.navCtrl.setRoot("HomePage");
            }

            else {
            this.navCtrl.push("RegistrationPage", { 'phone': this.phoneNum, 'otp': this.otp , 'from':this.from, custExistingData:this._existingCustomerData});
            }
            
          } else {
            
             this.navCtrl.push("RegistrationPage", { 'phone': this.phoneNum, 'otp': this.otp , 'from':this.from});
          }
        } else {
          this.clearOTPBox();
          this.alertProvider.presentToast(data[0].message);
        } 
      }, err => {
        this.loaderProvider.dismissLoader();
        this.exceptionProvider.excpHandler(err);
      });
    }
  }

  //otp success handler for login
  loginOTPSucess(data) {
    console.log(data);
    this.authProvider.setUser(data[0].customerdata);
    this.authProvider.setAuthToken(data[0].auth_key);
    if (this.platform.is('cordova')) {
      this.pushProvider.loginToWebengage(data[0].customerdata.customer[0].mobile);
      this.pushProvider.saveCustomerInfoToWebengage(data[0].customerdata);
    }  
    localStorage.setItem('phone', data[0].customerdata.customer[0].mobile);
    localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
    this.authProvider.setUserLoggedIn(true);
    this.authProvider.setHeader();
    this.clearOTPBox();
    this.events.publish('user:login', true);

  }

 

  clearOTPBox() {
    this.otp = '';
  }

}
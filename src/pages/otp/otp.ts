import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { EMPTY, SPECIAL_CHARACTER, NO_CHAR } from '../../validator';
import { Component, ViewChild, NgZone } from '@angular/core';
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

  phoneNum: any;
  regData: any;
  otp: string;
  type: string;
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
              private navCtrl: NavController,
              private navParams: NavParams,
              private menu: MenuController,
              private events: Events,
              private zone: NgZone) {

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

}
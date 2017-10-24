import { EMPTY, PATTERN, SPECIAL_CHARACTER, NO_CHAR, MOBILE_NO_LIMIT, NO_NUMBERS } from '../../validator';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Component } from '@angular/core';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { LoaderProvider } from '../../providers/loader/loader';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-new-account',
  templateUrl: 'registration.html',
})

export class RegistrationPage {
  public regData: any = {};
  public profileImage: any;
  public registerData: any;
  public phoneNum: any;
  public otp: any;
  public from: any;
  type: string;

  constructor(private exceptionProvider: ExceptionHandlerProvider,
    private navCtrl: NavController,
    private navParams: NavParams,
    private menu: MenuController,
    private loaderProvider: LoaderProvider,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private userProvider: UserdataProvider,
    private events: Events) {
    this.from = navParams.get('from');
    this.phoneNum = navParams.get('phone');
    this.otp = navParams.get('otp');
    this.registerData = {
      fname: '',
      lname: '',
      email: '',
      gender: 'Male',
      mobile: this.phoneNum,
      dob: '',
      profilePic: ''
    }
    this.profileImage = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewAccountPage');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, "leftMenu");
    this.loaderProvider.presentBackOptions();
  }

  uploadProfilePic() {
    this.authProvider.uploadProfile().then(data => {
      this.profileImage = data;
      this.registerData.profilePic = this.profileImage;
    });
  }

  otpCheck() {
    if (this.registerData.fname == EMPTY || this.registerData.mobile == EMPTY) {
      this.alertProvider.presentToast("Fill all the required fields");
      return;
    } else if (this.registerData.fname.trim() == "") {
      this.alertProvider.presentToast("First name cannot be empty");
      return;
    } else if (this.registerData.fname != EMPTY && !SPECIAL_CHARACTER.test(this.registerData.fname)) {
      this.alertProvider.presentToast("First name cannot contain special characters");
      return;
    } else if (this.registerData.fname.match(NO_NUMBERS) || this.registerData.lname.match(NO_NUMBERS)) {
      this.alertProvider.presentToast("Name cannot contain numbers");
      return;
    } else if (this.registerData.lname != EMPTY && !SPECIAL_CHARACTER.test(this.registerData.lname)) {
      this.alertProvider.presentToast("Last name cannot contain special characters");
      return;
    } else if (this.registerData.email != EMPTY && !this.registerData.email.match('@')) {
      this.alertProvider.presentToast("Email Id must contain @ symbol");
      return;
    } else if (this.registerData.mobile.length != MOBILE_NO_LIMIT) {
      this.alertProvider.presentToast('Mobile number should be' + MOBILE_NO_LIMIT + 'digits');
      return;
    } else if (this.registerData.mobile.match(NO_CHAR)) {
      this.alertProvider.presentToast('Mobile number cannot contain characters');
      return;
    } else if (!SPECIAL_CHARACTER.test(this.registerData.mobile)) {
      this.alertProvider.presentToast('Mobile number cannot contain special characters');
      return;
    } else {
      this.registerOTPSucess(this.registerData);
      // this.navCtrl.push('OtpPage', { from: 'registration', phone: this.phoneNum, data: this.registerData });
    }
  }

  registerOTPSucess(data) {
    this.loaderProvider.presentLoadingCustom();
    if (this.from == "registration") {
      this.type = '1';
    } else {
      this.type = '0';
    }
    this.userProvider.userOTP(this.otp, this.phoneNum, this.type).subscribe(data => {
      this.loaderProvider.dismissLoader();
      if (data[0].code == 200) {
        console.log(this.registerData,'==================register data==================')
        this.userProvider.userRegistration(this.registerData).subscribe(data => {
          this.loaderProvider.dismissLoader();
          if (data[0].code == 200) {
            this.authProvider.setUser(data[0].customerdata);
            localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
            this.authProvider.setAuthToken(data[0].auth_key);
            localStorage.setItem('phone', data[0].customerdata.customer[0].mobile);
            this.authProvider.setUserLoggedIn(true);
            this.authProvider.setHeader();
            this.events.publish('user:login', true);
            this.navCtrl.setRoot("HomePage");
          } else if (data[0].code == 201) {
            this.alertProvider.presentToast(data[0].message);
          } else if (data[0].code == 202) {
            this.alertProvider.presentToast(data[0].message);
          } else {
          }
        }, err => {
          this.loaderProvider.dismissLoader();
          this.exceptionProvider.excpHandler(err);
        });
        // if (this.from == "registration") {
        //   this.navCtrl.push("RegistrationPage", { 'phone': this.phoneNum, 'otp': this.otp });
        // } else {
        //   this.loginOTPSucess(data);
        //   this.navCtrl.setRoot("HomePage");
        // }
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

  clearOTPBox() {
    this.otp = '';
  }
}

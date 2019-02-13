import { EMPTY, SPECIAL_CHARACTER, NO_NUMBERS, EMAIL_REGEXP, NAME_REGEXP } from '../../validator';
import { IonicPage, NavController, NavParams, MenuController, Events, Platform } from 'ionic-angular';
import { Component } from '@angular/core';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { ConnectAuthProvider } from '../../providers/connect-auth/connect-auth';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { LoaderProvider } from '../../providers/loader/loader';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { PushProvider } from '../../providers/push/push'

@IonicPage()
@Component({
  selector: 'page-new-account',
  templateUrl: 'registration.html',
})

export class RegistrationPage {
  public registerData: any;
  public phoneNum: any;
  public otp: any;
  public from: any;
  _existingCustomerData: any = [];

  constructor(private exceptionProvider: ExceptionHandlerProvider,
    private navCtrl: NavController,
    private navParams: NavParams,
    private menu: MenuController,
    private platform: Platform,
    private loaderProvider: LoaderProvider,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private pushProvider: PushProvider,
    private userProvider: UserdataProvider,
    private connectAuthProvider: ConnectAuthProvider,
    private events: Events) {

    this.from = navParams.get('from');
    this.phoneNum = navParams.get('phone');
    this._existingCustomerData = navParams.get('custExistingData');
    // console.log(this._existingCustomerData.customer,'::::::::::::::Existing')
    if (this._existingCustomerData) {
      this.registerData = {
        fname: this._existingCustomerData.customer[0].firstname || '',
        lname: this._existingCustomerData.customer[0].lastname || '',
        email: this._existingCustomerData.customer[0].email || '',
        mobile: this.phoneNum
      }
    } else {
      this.registerData = {
        fname: '',
        lname: '',
        email: '',
        mobile: this.phoneNum
      }
    }
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, "leftMenu");
    // this.loaderProvider.presentBackOptions();
  }

  otpCheck() {
    if (this.registerData.fname == EMPTY || this.registerData.mobile == EMPTY) {
      this.alertProvider.presentToast("Fill all the required fields");
      return;
    } else if (this.registerData.fname.trim() == "") {
      this.alertProvider.presentToast("First name cannot be empty");
      return;
    } else if (!NAME_REGEXP.test(this.registerData.fname)) {
      this.alertProvider.presentToast("Enter valid First Name");
      return;
    } else if (this.registerData.fname != EMPTY && !SPECIAL_CHARACTER.test(this.registerData.fname)) {
      this.alertProvider.presentToast("First name cannot contain special characters");
      return;
    } else if (this.registerData.fname.match(NO_NUMBERS)) {
      this.alertProvider.presentToast("Name cannot contain numbers");
      return;
    } else if (this.registerData.email != EMPTY && !EMAIL_REGEXP.test(this.registerData.email)) {
      this.alertProvider.presentToast("Enter valid Email-Id");
      return;
    } else if (this.registerData.lname && !NAME_REGEXP.test(this.registerData.lname)) {
      this.alertProvider.presentToast("Enter valid Last Name");
      return;
    } else {
      this.registerOTPSucess(this.registerData);
    }
  }

  registerOTPSucess(data) {
    if (this._existingCustomerData) {
      this.connectAuthProvider.validateToken(this.authProvider.getAuthToken()).then(isTokenValid => {
        if (isTokenValid) {
          this.authProvider.setAuthToken(this.authProvider.getAuthToken());
          this.userProvider.updateCustomerDetails(this.registerData, true).subscribe(updateCustomerData => {
            if (updateCustomerData.code == 200) {
              this.userProvider.getCustomerDetails().subscribe(customerdetails => {
                console.log(':::::::::::::::::::::Customer Data::::::::::::::::::::::;', customerdetails)
                if (customerdetails.code === 200 && customerdetails.result.response && customerdetails.result.response.customers.customer) {
                  let customerData = customerdetails.result.response.customers;
                  this.loginOTPSucess(customerData)
                } else {
                  this.alertProvider.presentToast(data.message);
                }
              }, err => {
                this.exceptionProvider.excpHandler(err);
              })
            }
          }, err => {
            this.exceptionProvider.excpHandler(err);
          })
        } else {
          this.alertProvider.presentToast("Invalid Auth Token");
        }
      });
    } else {
      this.connectAuthProvider.validateToken(this.authProvider.getAuthToken()).then(isTokenValid => {
      if (isTokenValid) {
        this.authProvider.setAuthToken(this.authProvider.getAuthToken());
        this.userProvider.registerCustomer(this.registerData).subscribe(registerData => {
          if(registerData.code == 200){
            let customerData = registerData.result.response.customers;
            this.loginOTPSucess(customerData).then(d => {
              let registerData = {
                fname: customerData.customer[0].firstname,
                lname: customerData.customer[0].lastname,
                email: customerData.customer[0].email,
                mobile: customerData.customer[0].mobile
              }
              this.userProvider.updateCustomerDetails(registerData, true).subscribe(data => {
                if(data.code == 200){
                  this.alertProvider.presentToast("Registration was successful");
                } else {
                  this.alertProvider.presentToast(data.message);
                }
                console.log("updated profile after registration success")
              }, err => {
                this.exceptionProvider.excpHandler(err);
              });
          })
          } else {
            this.alertProvider.presentToast(data.message)
          }
        }, err => {
          this.exceptionProvider.excpHandler(err);
        });
      } else {
        this.alertProvider.presentToast("Invalid Auth Token");
      }
    }, err => {
      this.exceptionProvider.excpHandler(err);
    });
    }
  }

  loginOTPSucess(data) {
    return new Promise((resolve) => {
      this.authProvider.setUser(data);
      if (this.platform.is('cordova')) {
        this.pushProvider.loginToWebengage(data.customer[0].mobile);
        this.pushProvider.saveCustomerInfoToWebengage(data);
      }
      localStorage.setItem('phone', data.customer[0].mobile);
      localStorage.setItem('userdetails', JSON.stringify(data));
      this.authProvider.setUserLoggedIn(true);
      this.authProvider.setHeader();
      this.events.publish('user:login', true);
      this.navCtrl.setRoot("HomePage");
      this.clearOTPBox();
      resolve(true);
    });
  }

  clearOTPBox() {
    this.otp = '';
  }
}
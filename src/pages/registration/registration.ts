import { EMPTY, PATTERN, SPECIAL_CHARACTER, NO_CHAR, MOBILE_NO_LIMIT_1, MOBILE_NO_LIMIT_2, NO_NUMBERS } from '../../validator';
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
  _existingCustomerData:any = [];
  type: string;

  constructor(
              private exceptionProvider: ExceptionHandlerProvider,
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
                        this._existingCustomerData = navParams.get('custExistingData');
                        console.log(this._existingCustomerData);

                        if (this._existingCustomerData) {
                          
                          this.registerData = {
                              
                              fname: this._existingCustomerData[0].customerdata.customer[0].firstname || '',
                              email: this._existingCustomerData[0].customerdata.customer[0].email || '',
                              mobile: this.phoneNum,
                              externalId: this._existingCustomerData[0].customerdata.customer[0].external_id || '',
                              
                          }
                          
                        } else {
                          
                          this.registerData = {
                            
                              fname:'',
                              email:'',
                              mobile: this.phoneNum,
                              externalId:'',
                              
                          }
                          
                        }
    
                        this.profileImage = [];
    
        }


  ionViewDidEnter() {

    this.menu.swipeEnable(false, "leftMenu");
    this.loaderProvider.presentBackOptions();
  }

  ionViewDidLoad() {

    this.loaderProvider.dismissLoader();

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

    } else if (this.registerData.fname.match(NO_NUMBERS)) {

      this.alertProvider.presentToast("Name cannot contain numbers");
      return;
    
    } else if (this.registerData.email != EMPTY && !this.registerData.email.match('@')) {

      this.alertProvider.presentToast("Email Id must contain @ symbol");
      return;  
    } else {
      this.registerOTPSucess(this.registerData);
    }
  }

  registerOTPSucess(data) {

    this.loaderProvider.presentLoadingCustom();

    if (this._existingCustomerData) {
          
      this.authProvider.setUser(this._existingCustomerData[0].customerdata);
      
      this.authProvider.setAuthToken(this._existingCustomerData[0].auth_key);
      
      this.authProvider.setHeader();
      
      this.registerData.mobile = this._existingCustomerData[0].customerdata.customer[0].mobile;
      
      this.userProvider.updateProfile(this.registerData).subscribe(data => {
              
        this.loaderProvider.presentLoadingCustom();
        this.authProvider.setHeader();

        if (data[0].code == 200) {

          localStorage.setItem('phone', data[0].customerdata.customer[0].mobile);

          this.userProvider.getMyProfile().subscribe(data => {

            this.loaderProvider.dismissLoader();
            
            if (data[0].code == 200) 
              
              this.loginOTPSucess(data);

            else 

              this.alertProvider.presentToast(data[0].message);

          }, err => {

              this.loaderProvider.dismissLoader();
              this.exceptionProvider.excpHandler(err);
                
            })
                
        } else {

              this.loaderProvider.dismissLoader();
              this.alertProvider.presentToast(data[0].message);
                
        } 
      }, err => {

          this.loaderProvider.dismissLoader();
          this.exceptionProvider.excpHandler(err);
        
      });

    }

    else {
      
      this.loaderProvider.presentLoadingCustom();
      
      this.userProvider.userRegistration(this.registerData).subscribe(data => {
              
        this.loaderProvider.dismissLoader();
        
        if (data[0].code == 200) 
            
          this.loginOTPSucess(data);
          
         else 
          
          this.alertProvider.presentToast(data[0].message);
          
          
      }, err => {
          
          this.loaderProvider.dismissLoader();
          this.exceptionProvider.excpHandler(err);
        
      });
      
      }
  
  }

  loginOTPSucess(data) {

    this.authProvider.setUser(data[0].customerdata);
    this.authProvider.setAuthToken(data[0].auth_key);
    localStorage.setItem('phone', data[0].customerdata.customer[0].mobile);
    localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
    this.authProvider.setUserLoggedIn(true);
    this.authProvider.setHeader();
    this.events.publish('user:login', true);
    this.navCtrl.setRoot("HomePage");
    this.clearOTPBox();

  }

  clearOTPBox() {

    this.otp = '';

  }
}

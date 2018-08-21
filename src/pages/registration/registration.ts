import { EMPTY, PATTERN, SPECIAL_CHARACTER, NO_CHAR, MOBILE_NO_LIMIT_1, MOBILE_NO_LIMIT_2, NO_NUMBERS, EMAIL_REGEXP,NAME_REGEXP } from '../../validator';
import { IonicPage, NavController, NavParams, MenuController, Events,Platform } from 'ionic-angular';
import { Component } from '@angular/core';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
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
  _existingCustomerData:any = [];

  constructor(
              private exceptionProvider: ExceptionHandlerProvider,
              private navCtrl: NavController,
              private navParams: NavParams,
              private menu: MenuController,
              private platform:Platform,
              private loaderProvider: LoaderProvider,
              private authProvider: AuthProvider,
              private alertProvider: AlertProvider,
              private pushProvider:PushProvider,
              private userProvider: UserdataProvider,
              private events: Events) {
    
                        this.from = navParams.get('from');
                        this.phoneNum = navParams.get('phone');
                        this._existingCustomerData = navParams.get('custExistingData');

                        if (this._existingCustomerData) {
                          
                          this.registerData = {
                              
                              fname: this._existingCustomerData[0].customerdata.customer[0].firstname || '',
                              lname: this._existingCustomerData[0].customerdata.customer[0].lastname || '',
                              email: this._existingCustomerData[0].customerdata.customer[0].email || '',
                              mobile: this.phoneNum,
                              externalId: this._existingCustomerData[0].customerdata.customer[0].external_id || '',
                              
                          }
                          
                        } else {
                          
                          this.registerData = {
                            
                              fname:'',
                              lname:'',
                              email:'',
                              mobile: this.phoneNum,
                              externalId:'',
                              
                          }
                          
                        }
        
        }


  ionViewDidEnter() {

    this.menu.swipeEnable(false, "leftMenu");
    this.loaderProvider.presentBackOptions();
  }


  

  otpCheck() {

    if (this.registerData.fname == EMPTY || this.registerData.mobile == EMPTY) {

      this.alertProvider.presentToast("Fill all the required fields");
      return;

    } else if (this.registerData.fname.trim() == "") {

      this.alertProvider.presentToast("First name cannot be empty");
      return;

    }
    else if (!NAME_REGEXP.test(this.registerData.fname) ){
      
            this.alertProvider.presentToast("Enter valid First Name");
            return;
      
    } else if (this.registerData.fname != EMPTY && !SPECIAL_CHARACTER.test(this.registerData.fname)) {

      this.alertProvider.presentToast("First name cannot contain special characters");
      return;

    } else if (this.registerData.fname.match(NO_NUMBERS)) {

      this.alertProvider.presentToast("Name cannot contain numbers");
      return;
      
      }
    else if (this.registerData.email != EMPTY && !EMAIL_REGEXP.test(this.registerData.email))  {

      this.alertProvider.presentToast("Enter valid Email-Id");
      return;  
    } 
    else if (this.registerData.lname && !NAME_REGEXP.test(this.registerData.lname)  ) {
      
            this.alertProvider.presentToast("Enter valid Last Name");
          return;
            
    }else {
      this.registerOTPSucess(this.registerData);
    }
  }

  registerOTPSucess(data) {


    if (this._existingCustomerData) {
          
      this.authProvider.setUser(this._existingCustomerData[0].customerdata);
      
      this.authProvider.setAuthToken(this._existingCustomerData[0].auth_key);
      
      this.authProvider.setHeader();
      
      this.registerData.mobile = this._existingCustomerData[0].customerdata.customer[0].mobile;
      
      this.userProvider.updateProfile(this.registerData,true).subscribe(data => {
              
        this.authProvider.setHeader();

        if (data[0].code == 200) {

          localStorage.setItem('phone', data[0].customerdata.customer[0].mobile);

          this.userProvider.getMyProfile().subscribe(data => {

            
            if (data[0].code == 200) 
              
              this.loginOTPSucess(data);

            else 

              this.alertProvider.presentToast(data[0].message);

          }, err => {

              this.exceptionProvider.excpHandler(err);
                
            })
                
        } else {

              this.alertProvider.presentToast(data[0].message);
                
        } 
      }, err => {

          this.exceptionProvider.excpHandler(err);
        
      });

    }

    else {
      
      
      this.userProvider.userRegistration(this.registerData).subscribe(data => {
              
        
        if (data[0].code == 200) 
            
          this.loginOTPSucess(data).then(d => {
            let registerData = {
                            
              fname: data[0].customerdata.customer[0].firstname,
              lname: data[0].customerdata.customer[0].lastname,
              email: data[0].customerdata.customer[0].email,
              mobile: data[0].customerdata.customer[0].mobile,
              externalId: data[0].customerdata.customer[0].external_id,
                              
            }
            this.userProvider.updateProfile(registerData, true).subscribe(data => {
              console.log("updated profile after registration success")

            });
          });
          
         else 
          
          this.alertProvider.presentToast(data[0].message);
          
          
      }, err => {
          
          this.exceptionProvider.excpHandler(err);
        
      });
      
      }
  
  }

  loginOTPSucess(data) {

    return new Promise((resolve) => {
      
    this.authProvider.setUser(data[0].customerdata);
    this.authProvider.setAuthToken(data[0].auth_key);
    localStorage.setItem('phone', data[0].customerdata.customer[0].mobile);
    localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
    if (this.platform.is('cordova')) {
      this.pushProvider.loginToWebengage(data[0].customerdata.customer[0].mobile);
      this.pushProvider.saveCustomerInfoToWebengage(data[0].customerdata);
    }      
    this.authProvider.setUserLoggedIn(true);
    this.authProvider.setHeader();
    this.events.publish('user:login', true);
    this.navCtrl.setRoot("HomePage");
    this.clearOTPBox();
    resolve(true);  
    })    
    

  }

  clearOTPBox() {

    this.otp = '';

  }
}


import { IonicPage, NavController, NavParams, MenuController, Events, Platform } from 'ionic-angular';
import { EMPTY, SPECIAL_CHARACTER, NO_CHAR } from '../../validator';
import { Component, ViewChild } from '@angular/core';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';

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
  @ViewChild("ResendOTP")ResendOTPModal

  OTPcount : any;
  phoneNum: any;
  otp: string;
  from: any;
  _existingCustomerData:any = [];
  MOBILE_VALIDATED = "mobile_validated";
  YES="Yes";
  NO="No";
  disabledFlag:boolean;
  count:any;
  countDown : any;


  constructor(
              private exceptionProvider: ExceptionHandlerProvider,
              private loaderProvider: LoaderProvider,
              private userProvider: UserdataProvider,
              private alertProvider: AlertProvider,
              private socialSharing:SocialSharing,
              private authProvider: AuthProvider,
              private pushProvider: PushProvider,
              private navCtrl: NavController,
              private navParams: NavParams,
              private menu: MenuController,
              private platform: Platform,
              private events: Events,
              private sms: SMS) {

              this.otp = '';
              this.phoneNum = navParams.get('phone');
              this.from = navParams.get('from');
              this.OTPcount = 0;
              this.disabledFlag = false;
              this.count = 30
            

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
              this.loginOTPSucess(data).then(d => {
                let registerData = {
                            
                              fname:data[0].customerdata.customer[0].firstname,
                              lname:data[0].customerdata.customer[0].lastname,
                              email:data[0].customerdata.customer[0].email,
                              mobile:data[0].customerdata.customer[0].mobile,
                              externalId:data[0].customerdata.customer[0].external_id,
                              
                          }
                this.userProvider.updateProfile(registerData, true).subscribe(data => {
                  console.log("updated after login");
                })
              })
              this.userProvider.OTPCount = 0;
                this.navCtrl.setRoot("HomePage");
            }

            else {
              this.userProvider.OTPCount = 0;
            this.navCtrl.push("RegistrationPage", { 'phone': this.phoneNum, 'otp': this.otp , 'from':this.from, custExistingData:this._existingCustomerData});
            }
            
          } else {
            this.userProvider.OTPCount = 0;
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
    return new Promise((resolve) => {
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
    resolve(true);  
    });
  }

 

  clearOTPBox() {
    this.otp = '';
  }

  openResendOTPModal(){
    this.ResendOTPModal.open();
  }

  closeOTPModal(){
    this.ResendOTPModal.close();
  }

  //sending OTP-SMS to User //
  sendSMSOtp()
  {
    var options: {
      replaceLineBreaks : true,
      android : {
        intent : ''
      }
    }
    this.sms.send('+917406997140', 'Hey Please Send me OTP for Login!',options).then(()=>{
      console.log("sms worked");
    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
    
  }


  // Resend OTP to User //

  resendOtp(){
    this.loaderProvider.presentLoadingCustom();
    
    if(this.userProvider.OTPCount < 3){
      this.disabledFlag = true
      this.userProvider.userLogin(this.phoneNum)
      .subscribe(data => {

         this.loaderProvider.dismissLoader();
        if (data[0].code == 200) {
                
          this.alertProvider.presentToast("OTP sent successfully to the entered mobile number");
         
          this.countDown = 60; 
          
          var timer = setInterval(()=>
          {
            this.countDown--;
       
          if(this.countDown == 0){
            this.disabledFlag = false
            this.userProvider.OTPCount +=  1
            clearInterval(timer);
          }
          
          console.log("countdown strt")},1000); }​​
          // setTimeout(()=>
          // {
            
          //   this.userProvider.OTPCount +=  1
          //   //---------- Enable resend button ------------ //
          //   this.disabledFlag = false
          // },10000)
          
         else if (data[0].code == 202) {

          this.alertProvider.presentToast("OTP sent successfully to the entered mobile number");
          
          this.from = 1
          this.countDown = 60; 
          
          
          var timer = setInterval(()=>
          {
            this.countDown--;
         
          if(this.countDown == 0){
            this.disabledFlag = false
            this.userProvider.OTPCount +=  1
          clearInterval(timer);
          }
          
          console.log("countdown strt")},1000); }​​
          // setTimeout(()=>
          // {
            
          //   this.userProvider.OTPCount +=  1
          //   this.disabledFlag = false
            
          //   //---------- Enable resend button ------------ //
          // },10000)

         
         else 
          
           this.alertProvider.presentToast(data[0].message);
          
      }, err => {

        this.loaderProvider.dismissLoader();
        this.exceptionProvider.excpHandler(err);


      }
    )
 }else{
  this.loaderProvider.dismissLoader();
  this.openResendOTPModal();
 }
  }

  
  shareViaSMS() {

    let msg = "Plz send me otp";
    let no = "+917406997140";
    this.socialSharing.shareViaSMS(msg, no).then(() => {
      console.log("shared successfully");

    }, err => {
      console.log(err, "Problem in sending sms");
    })
    
  }


  shareViaWhatsApp() {
    let recieverNo = '+919844496336';
    let msg = "Plz send otp for login";
    this.socialSharing.shareViaWhatsAppToReceiver(recieverNo, msg).then(() => {
      console.log("console whatsapp working");
    }, err => {
      console.log(err, "problem in sending via whatsApp");
    })
  }
}

    
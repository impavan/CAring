
import { IonicPage, NavController, NavParams, MenuController, Events, Platform } from 'ionic-angular';
import { EMPTY, SPECIAL_CHARACTER, NO_CHAR } from '../../validator';
import { Component, ViewChild } from '@angular/core';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { PushProvider } from '../../providers/push/push'
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ConnectAuthProvider } from '../../providers/connect-auth/connect-auth';



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
              private connectAuthProvider:ConnectAuthProvider,
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

      let otp = this.otp;
    
      this.connectAuthProvider.OTPCheckCaringConnect(this.phoneNum,otp).subscribe(data=>{
        if(data.code === 200){
          this.connectAuthProvider.validateToken(data.result).then(isTokenValid=>{
            if(isTokenValid){
              this.authProvider.setAuthToken(data.result);

              this.connectAuthProvider.getCustomerDetails().subscribe(customerdetails => {
                if(customerdetails.code === 200 && customerdetails.result.response && customerdetails.result.response.customers.customer){
                  this.loginOTPSucess(customerdetails.result.response.customers).then(()=>{
                    this.navCtrl.setRoot('HomePage');
                  });
                }
              },err=> {
                console.log(err,"customerdetails err");
              })
              
            }else{
              this.alertProvider.presentToast("Something went wrong");
            }
          })
        }else if(data.code === 204){
          this.navCtrl.push("RegistrationPage", { 'phone': this.phoneNum, 'otp': this.otp });
        }else{
          console.log("coming to else");
        }

      },error=>{
        console.error(error);
        console.log("error in otp validate");
      })

    }
  }


 
  //otp success handler for login
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
    
    if(this.userProvider.OTPCount < 3){
      this.disabledFlag = true
      this.userProvider.userLogin(this.phoneNum)
      .subscribe(data => {

        if (data[0].code == 200) {
                
          this.alertProvider.presentToast("OTP sent successfully to the entered mobile number");
         
          this.countDown = 60; 
          
          let timer = setInterval(()=>
          {
            this.countDown--;
       
          if(this.countDown == 0){
            this.disabledFlag = false
            this.userProvider.OTPCount += 1;
            console.log(this.countDown,"dss"); 
            clearInterval(timer);
          }
          
          console.log("countdown strt")},1000); }​​
          
         else if (data[0].code == 202) {

          this.alertProvider.presentToast("OTP sent successfully to the entered mobile number");
          
          this.from = 1
          this.countDown = 60; 
          
          
          let timer = setInterval(()=>
          {
            this.countDown--;
         
          if(this.countDown == 0){
            this.disabledFlag = false
            this.userProvider.OTPCount += 1;
            clearInterval(timer);
            console.log(this.countDown,"sss"); 
          }
          
          console.log("countdown strt")},1000); }​​
           
         else 
          
           this.alertProvider.presentToast(data[0].message);
          
      }, err => {

        this.exceptionProvider.excpHandler(err);


      }
    )
 }else{
  this.openResendOTPModal();
 }
  }

  
  shareViaSMS() {

    let msg = "Please share me the OTP for Login";
    let no = "+60174252988";
    this.socialSharing.shareViaSMS(msg, no).then(() => {

    }, err => {
      console.log(err, "Problem in sending sms");
    })
    
  }


  shareViaWhatsApp() {
    let recieverNo = '+60174252988';
    let msg = "Please share me the OTP for Login";
    this.socialSharing.shareViaWhatsAppToReceiver(recieverNo, msg).then(() => {
    }, err => {
      console.log(err, "problem in sending via whatsApp");
    })
  }
}

    
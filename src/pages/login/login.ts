import { EMPTY, SPECIAL_CHAR, NO_CHAR, MOBILE_NO_LIMIT_1, MOBILE_NO_LIMIT_2 } from '../../validator';
import { IonicPage, NavController, MenuController, Events } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

declare var $:any;

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('connection') connectionModal;
  phoneNum: string;
  mobilevalidated: any;
  mobileCode:any = '60';
  selectOptions:any = {

    title: 'Country Code'
  }
 
  constructor(
              private events: Events,
              private menu: MenuController,
              private navCtrl: NavController,
              private alertProvider: AlertProvider,
              private userProvider: UserdataProvider,
              private loaderProvider: LoaderProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
    
                  this.mobilevalidated = false;
                  this.phoneNum = '';
                  this.events.subscribe('noconnection', (value) => {

                    if (value)
                      this.openConnectionModal();
                    
                  });
  }

  ionViewDidEnter() {

    this.menu.swipeEnable(false, "leftMenu");
    this.loaderProvider.presentBackOptions();

    if( /iPad/i.test(navigator.userAgent) ) {
      $('body').addClass('home');
      
    }

  }

  //User login function
  userLogin() {

    let phoneNo = this.phoneNum.charAt(0) == '0' ? this.phoneNum.slice(1) : this.phoneNum;
    
    phoneNo = this.mobileCode + phoneNo;


    if (phoneNo== EMPTY) {

      this.alertProvider.presentToast('Please enter valid mobile number');
      return;

    } else if (phoneNo.trim() == EMPTY) {

      this.alertProvider.presentToast('Please enter valid mobile number');
      return;

    } else if (phoneNo.length < MOBILE_NO_LIMIT_1 || phoneNo.length > MOBILE_NO_LIMIT_2) {

      this.alertProvider.presentToast('Please enter valid mobile number');
      return;

    } else if (phoneNo.match(NO_CHAR)) {

      this.alertProvider.presentToast('Mobile number cannot contain characters');
      return;

    } else if (!SPECIAL_CHAR.test(phoneNo)) {

      this.alertProvider.presentToast('Mobile number cannot contain special characters');
      return;

    } else {

      

      this.loaderProvider.presentLoadingCustom();
      this.userProvider.userLogin(phoneNo)
        .subscribe(data => {

           this.loaderProvider.dismissLoader();
          
          if (data[0].code == 200) {
                  
              this.navCtrl.push("OtpPage", { from: '0', phone: phoneNo});
              
            
          } else if (data[0].code == 202) 

              this.navCtrl.push("OtpPage", { from: '1', phone: phoneNo });
            
           else 
            
            this.alertProvider.presentToast(data[0].message);

          

        }, err => {

          this.loaderProvider.dismissLoader();
          this.exceptionProvider.excpHandler(err);

        });
    }
  }

  //skipLogin
  skipLogin() {

    this.navCtrl.setRoot("HomePage");

  }

  openConnectionModal() {

    this.connectionModal.open();

  }

  closeConnectionModal() {

    this.connectionModal.close();

  }

}

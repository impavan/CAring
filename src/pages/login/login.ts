import { EMPTY, SPECIAL_CHAR, NO_CHAR, MOBILE_NO_LIMIT } from '../../validator';
import { IonicPage, NavController, NavParams, Platform, App, MenuController, Events } from 'ionic-angular';
import { Component, ViewChild, NgZone } from '@angular/core';

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
  navigation: string;
  mobilevalidated: any;
  MOBILE_VALIDATED = "mobile_validated";
  YES="Yes";
  NO="No";

  constructor(private exceptionProvider: ExceptionHandlerProvider,
    private userProvider: UserdataProvider,
    private loaderProvider: LoaderProvider,
    private alertProvider: AlertProvider,
    private navParams: NavParams,
    private menu: MenuController,
    private navCtrl: NavController,
    private events: Events) {
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
  }

  //User login function
  userLogin() {
    if (this.phoneNum == EMPTY) {
      this.alertProvider.presentToast('Please enter valid 8 digit mobile number');
      return;
    } else if (this.phoneNum.trim() == EMPTY) {
      this.alertProvider.presentToast('Please enter valid 8 digit mobile number');
      return;

    } else if (this.phoneNum.length != MOBILE_NO_LIMIT) {
      this.alertProvider.presentToast('Mobile number should be ' + MOBILE_NO_LIMIT + 'digits');
      return;
    } else if (this.phoneNum.match(NO_CHAR)) {

    } 
    else if (this.phoneNum.match(NO_CHAR)) {
      this.alertProvider.presentToast('Mobile number cannot contain characters');
      return;
    } else if (!SPECIAL_CHAR.test(this.phoneNum)) {
      this.alertProvider.presentToast('Mobile number cannot contain special characters');
      return;
    } else {
      this.loaderProvider.presentLoadingCustom();
      this.userProvider.userLogin(this.phoneNum)
        .subscribe(data => {
          if (data[0].code == 200 ) {

            let custom_data = data[0].customerdata.customer[0].custom_fields.field;
            let mobile_validated  = custom_data.filter(res=> res.name === this.MOBILE_VALIDATED);
            console.log(mobile_validated,"-----------------------");
            if(mobile_validated[0] && mobile_validated[0].value == this.YES)
            this.navCtrl.push("OtpPage", { from: 'login', phone: this.phoneNum });
            else
            this.navCtrl.push("RegistrationPage", { from: 'registration', phone: this.phoneNum, "custExistingData":data[0].customerdata});
          } else if (data[0].code == 202) {
            this.navCtrl.push("RegistrationPage", { from: 'registration', phone: this.phoneNum });
          } else {
            this.alertProvider.presentToast("Something went wrong. Please try after some time.");
          }
        }, err => {
          this.loaderProvider.dismissLoader();
          this.exceptionProvider.excpHandler(err);
        });
    }
  }

  //skipLogin
  skipLogin() {
    this.navCtrl.push("TabsPage");
  }

  openConnectionModal() {
    this.connectionModal.open();
  }

  closeConnectionModal() {
    this.connectionModal.close();
  }
}

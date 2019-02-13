import { EMPTY, SPECIAL_CHAR, NO_CHAR, MOBILE_NO_LIMIT_1, MOBILE_NO_LIMIT_2 } from '../../validator';
import { IonicPage, NavController, MenuController, Events } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

// Import Providers.
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';
import { ConnectAuthProvider } from '../../providers/connect-auth/connect-auth';
import { UserdataProvider } from '../../providers/userdata/userdata';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  @ViewChild('connection') connectionModal;
  phoneNum: string;
  mobilevalidated: any;
  mobileCode: any = '60';
  selectOptions: any = {
    title: 'Country Code'
  }

  constructor(private menu: MenuController,
    private navCtrl: NavController,
    private userdataProvider: UserdataProvider,
    private alertProvider: AlertProvider,
    private loaderProvider: LoaderProvider,
    private connectAuthProvider: ConnectAuthProvider,) {
    this.mobilevalidated = false;
    this.phoneNum = '';
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, "leftMenu");
    //this.loaderProvider.presentBackOptions();
  }

  //User login function
  userLogin() {
    let phoneNo = this.phoneNum.charAt(0) == '0' ? this.phoneNum.slice(1) : this.phoneNum;
    phoneNo = this.mobileCode + phoneNo;
    if (phoneNo == EMPTY) {
      this.alertProvider.presentToast('Please enter mobile number');
      return;
    } else if (phoneNo.trim() == EMPTY) {
      this.alertProvider.presentToast('Please enter mobile number');
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
      this.userdataProvider.loginToCaringConnect(phoneNo).subscribe((data) => {
        if (data.code === 200) {
          this.navCtrl.push("OtpPage", { phone: phoneNo });
          this.alertProvider.presentToast(data.result.message);
        } else {
          this.alertProvider.presentToast(data.result.message);
        }
      }, error => {
        console.error(error, "error in login");
      })
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
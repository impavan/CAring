import { EMPTY, PATTERN, SPECIAL_CHARACTER, NO_CHAR, MOBILE_NO_LIMIT, NO_NUMBERS } from '../../validator';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { Component, ViewChild, NgZone } from '@angular/core';
import { BRAND_ID } from '../../config';

// Import Providers.
import { UserdataProvider } from '../../providers/userdata/userdata';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})

export class FeedbackPage {
  userData: any = {};

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private loaderCtrl: LoaderProvider,
    private userProvider: UserdataProvider,
    private alertProvider: AlertProvider) {
  }

  ionViewDidEnter() {
    this.loaderCtrl.presentBackOptions();
  }

  sendFeedBack() {
    if ((this.userData.userName || this.userData.mobileNo || this.userData.message) == EMPTY) {
      this.alertProvider.presentToast("Fill all the required fields");
      return;
    } else if (!SPECIAL_CHARACTER.test(this.userData.userName)) {
      this.alertProvider.presentToast("Name/Message cannot contain special characters");
      return;
    } else if (this.userData.userName.match(NO_NUMBERS)) {
      this.alertProvider.presentToast("Name cannot contain numbers");
      return;
    }
    //  else if (this.userData.mobileNo.length != MOBILE_NO_LIMIT) {
    //   this.alertProvider.presentToast('Mobile number should be 8 digits');
    //   return;
    // }
    else if (this.userData.mobileNo.match(NO_CHAR)) {
      this.alertProvider.presentToast('Mobile number cannot contain characters');
      return;
    } else if (!SPECIAL_CHARACTER.test(this.userData.mobileNo)) {
      this.alertProvider.presentToast('Mobile number cannot contain special characters');
      return;
    } else {
      this.loaderCtrl.presentLoadingCustom();
      var userdata = {
        username: this.userData.userName,
        mobile_number: this.userData.mobileNo,
        message: this.userData.message,
        BrandURLID: BRAND_ID
      };
      var that = this;
      this.userProvider.sendMail(userdata).subscribe(result => {
        if (result[0].code == 200) {
          this.userData.userName = '';
          this.userData.mobileNo = '';
          this.userData.message = '';
          this.loaderCtrl.dismissLoader();
          that.alertProvider.presentToast(result[0].message);
        }
      });
    }
  }
}
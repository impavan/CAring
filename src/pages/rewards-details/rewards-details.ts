import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BASE_URL, BRAND_ID, IMAGE_URL } from '../../config';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { AuthProvider } from '../../providers/auth/auth';
import { RewardsProvider } from '../../providers/rewards/rewards';
import { ProfileProvider } from '../../providers/profile/profile';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-rewards-details',
  templateUrl: 'rewards-details.html',
})

export class RewardsDetailsPage {
  @ViewChild('reward') rewardModal;
  @ViewChild('redeemPointsWarning') redeemPointsModal;
  @ViewChild('noPointsWarning') noPointsModal;
  IMG_URL: any = IMAGE_URL;
  offerdata: any;
  _auth: any;
  _currentPoint: any;
  remainder: any;
  flag: any;
  constructor(private exceptionProvider: ExceptionHandlerProvider,
    private navCtrl: NavController,
    private navParams: NavParams,
    private authProvider: AuthProvider,
    private loaderProvider: LoaderProvider,
    private alertProvider: AlertProvider,
    private rewardsProvider: RewardsProvider) {
    this.offerdata = this.navParams.get('data');
    console.log(this.offerdata, '==================offerdata===================')
    this._auth = localStorage.getItem('auth_token');
  }

  ionViewDidEnter() {
    if (this._auth) {
      this._currentPoint = this.authProvider.getMyCurrentPoints();
      this.remainder = this._currentPoint - this.offerdata.BrandPointRedeemValue;
      // this.remainder = 0;
      if (this.remainder >= 0) {
        this.flag = true;
      }
    }
  }

  navToPurchaseRewards() {
    this.redeemPointsModal.open();
  }

  confirmRedeemVoucher() {
    this.loaderProvider.presentLoadingCustom();
    let redeemData = {
      points: this.offerdata.BrandPointRedeemValue,
      experience_id: this.offerdata.ExperienceID,
    }
    this.rewardsProvider.redeemVoucher(redeemData).subscribe(data => {
      this.loaderProvider.dismissLoader();
      this.closeRedeemPointsModal();
      if (data[0].code == 200) {
        this.alertProvider.presentToast(data[0].message);
        this.navCtrl.push("PurchaseRewardsPage", { 'offerData': this.offerdata, 'currentpoints': this._currentPoint, 'remainder': this.remainder });
      } else {
        this.alertProvider.presentToast(data[0].message);
      }
    }, err => {
      this.closeRedeemPointsModal();
      this.loaderProvider.dismissLoader();
      this.exceptionProvider.excpHandler(err)
    });
  }

  closeRedeemPointsModal() {
    this.redeemPointsModal.close();
  }
}

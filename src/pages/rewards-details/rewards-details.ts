import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { ConnectAuthProvider } from '../../providers/connect-auth/connect-auth';
import { AuthProvider } from '../../providers/auth/auth';
import { RewardsProvider } from '../../providers/rewards/rewards';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage({
  segment: 'rewards-details:/id'
})

@Component({
  selector: 'page-rewards-details',
  templateUrl: 'rewards-details.html',
})

export class RewardsDetailsPage {
  @ViewChild('reward') rewardModal;
  @ViewChild('redeemPointsWarning') redeemPointsModal;
  @ViewChild('noPointsWarning') noPointsModal;
  offerdata: any;
  _auth: any;
  _currentPoint: any;
  remainder: any;
  flag: any;

  constructor(private exceptionProvider: ExceptionHandlerProvider,
    private navCtrl: NavController,
    private navParams: NavParams,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private userdataProvider: UserdataProvider,
    private connectAuthProvider: ConnectAuthProvider,
    private rewardsProvider: RewardsProvider) {
    this.offerdata = this.navParams.get('data');
    this._auth = localStorage.getItem('auth_token');
  }

  ionViewWillEnter() {
    if (this._auth) {
      this.getCurrentPoints();
      this.authProvider.setHeader();
      if (this.remainder >= 0) {
        this.flag = true;
      }
    }
  }

  navToPurchaseRewards() {
    this.redeemPointsModal.open();
  }

  confirmRedeemVoucher() {
    let redeemData = {
      points: this.offerdata.BrandPointRedeemValue,
      experience_id: this.offerdata.ExperienceID,
    };
    console.log('::::::::::::::::Test1::::::::::::::', redeemData)
    this.closeRedeemPointsModal();
    this.connectAuthProvider.validateToken(this.authProvider.getAuthToken()).then(isTokenValid => {
      if (isTokenValid) {
        this.rewardsProvider.purchaseExperience(redeemData).subscribe(data => {
          console.log('::::::::::::::::Test2::::::::::::::', data.result.exp.message)
          if (data.code == 200 &&data.result.exp.code && data.result.exp.code == 200) {
            // this.alertProvider.presentToast(data[0].message);
            this.userdataProvider.getCustomerDetails().subscribe(customerdetails => {
              console.log(':::::::::::::::::::::Customer Data::::::::::::::::::::::;', customerdetails)
              if (customerdetails.code === 200 && customerdetails.result.response && customerdetails.result.response.customers.customer) {
                console.log(':::::::::::::::::::::Customer Data IF::::::::::::::::::::::;')
                let existingCustomerData = customerdetails.result.response.customers;
                this.authProvider.setUser(existingCustomerData);
                localStorage.setItem('userdetails', JSON.stringify(existingCustomerData));
                this.authProvider.setHeader();
                this.navCtrl.push("PurchaseRewardsPage", { 'offerData': this.offerdata });
              } else {
                this.alertProvider.presentToast(customerdetails.message);
              }
            }, err => {
              this.exceptionProvider.excpHandler(err);
            });
          } else {
            this.alertProvider.presentToast(JSON.stringify(data.result.exp.message));
          }
        }, err => {
          this.closeRedeemPointsModal();
          this.exceptionProvider.excpHandler(err)
        });
      } else {
        this.alertProvider.presentToast("Invalid Auth Token");
      }
    });
  }

  closeRedeemPointsModal() {
    this.redeemPointsModal.close();
  }

  getCurrentPoints() {
    this._currentPoint = this.authProvider.getMyCurrentPoints();
    this.remainder = this._currentPoint - this.offerdata.BrandPointRedeemValue;
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-purchase-rewards',
  templateUrl: 'purchase-rewards.html',
})
export class PurchaseRewardsPage {
  offerData: any;
  currentPoints: any;
  remainder: any;
  redeemValue: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authProvider: AuthProvider) {
    
                this.offerData = navParams.get('offerData');
                this.redeemValue = this.offerData.BrandPointRedeemValue;
                this.currentPoints = this.authProvider.getMyCurrentPoints();
                this.remainder = this.currentPoints - this.redeemValue;
  }


  navToOffers() {
    
    this.navCtrl.setRoot("RewardsPage",{deeplink:'myrewards'});

  }

  navToWallet() {
    
    this.navCtrl.setRoot("MemberPage", { 'from': 'purchase' });
    
  }
}

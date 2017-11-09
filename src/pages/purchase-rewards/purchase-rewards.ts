import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-purchase-rewards',
  templateUrl: 'purchase-rewards.html',
})
export class PurchaseRewardsPage {
  offerData: any;
  currentPoints: any;
  remainder: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.offerData = navParams.get('offerData');
    this.currentPoints = navParams.get('currentpoints');
    this.remainder = navParams.get('remainder');
  }


  navToOffers(){
    this.navCtrl.setRoot("RewardsPage");
  }

  navToWallet(){
    this.navCtrl.setRoot("MemberPage", {'from': 'purchase'});
  }
}

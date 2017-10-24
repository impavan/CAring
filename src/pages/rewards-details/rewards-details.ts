import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rewards-details',
  templateUrl: 'rewards-details.html',
})
export class RewardsDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardsDetailsPage');
  }
  navToPurchaseRewards(){
  	this.navCtrl.push("PurchaseRewardsPage");
  }
}

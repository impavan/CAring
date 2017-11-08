import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-redeem',
  templateUrl: 'redeem.html',
})
export class RedeemPage {

  redeemList:any = [];
  selectedTab:any ='New';
  currentDate:any = moment().format('YYYY-MM-DD');

 
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data = navParams.get('redeemData');
    if(data){
      this.redeemList = data.Vouchers;
     console.log(this.redeemList);
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedeemPage');
  }

}

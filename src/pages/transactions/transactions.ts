import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RewardsProvider } from '../../providers/rewards/rewards';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  _transactionList: any;
  _auth: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private rewardsProvider: RewardsProvider, private authProvider: AuthProvider) {
    this._auth = this.authProvider.getAuthToken();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    this.getUserTransaction();
  }

  getUserTransaction() {
    this.rewardsProvider.getUserTransactions().subscribe(data => {
      this._transactionList = data.result.response.customer.transactions.transaction;
    }, err => {
      // this.exceptionProvider.excpHandler(err);
    })
  }

}

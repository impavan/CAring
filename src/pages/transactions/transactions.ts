import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RewardsProvider } from '../../providers/rewards/rewards';

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  _transactionList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private rewardsProvider: RewardsProvider) {
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

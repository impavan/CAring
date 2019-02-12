import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  _transactionList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    this.getUserTransaction();
  }

  getUserTransaction() {
    this.profileProvider.getUserTransaction().subscribe(data => {
      this._transactionList = data[0].customer_transaction_info;
    }, err => {
      // this.exceptionProvider.excpHandler(err);
    })
  }

}

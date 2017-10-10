import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InstoredetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instoredetails',
  templateUrl: 'instoredetails.html',
})
export class InstoredetailsPage {

  storeDetail:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.storeDetail = navParams.get('instoredata');
      console.log(this.storeDetail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstoredetailsPage');
  }

}

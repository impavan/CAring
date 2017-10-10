import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HappenDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-happen-details',
  templateUrl: 'happen-details.html',
})
export class HappenDetailsPage {

  _happenList:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

        this._happenList = navParams.get('happendata');
        console.log(this._happenList);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappenDetailsPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-happen-details',
  templateUrl: 'happen-details.html',
})
export class HappenDetailsPage {

  _happenList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this._happenList = navParams.get('happendata');
    
  }

  ionViewDidLoad() {
    
  }
}

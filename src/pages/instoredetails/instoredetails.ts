import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-instoredetails',
  templateUrl: 'instoredetails.html',
})

export class InstoredetailsPage {
  storeDetail: any = [];
  _locationList:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.storeDetail = navParams.get('instoredata');
    this._locationList  = this.storeDetail.storeeventtimings?this.storeDetail.storeeventtimings:[];
  }

  gotoEventLocation(loc){
    this.navCtrl.push('EventLocationPage', { lat: loc.storelocation.x, lng:loc.storelocation.y});
  }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PharmacistDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pharmacist-detail',
  templateUrl: 'pharmacist-detail.html',
})
export class PharmacistDetailPage {
  pharmacistList: any;
  _locationList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.pharmacistList = navParams.get('pharmacistdata');
    console.log(this.pharmacistList,"phramacist data")
      
    //this._locationList = this.pharmacistList.storesassociated ? this.pharmacistList.storesassociated : [];
    this._locationList = this.pharmacistList.storeeventtimings ? this.pharmacistList.storeeventtimings : [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PharmacistDetailPage');
  }

  gotoLocationPage(storename) {

    this.navCtrl.push('StoreLocatorPage', { instore: storename});
    
  }
  zoomArea(url) {
    this.navCtrl.push('ImageViewPage', {imgsource:url})
  }


}

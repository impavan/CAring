import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

/**
 * Generated class for the PharmacistDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment : 'pharmacist-details/:id'
})
@Component({
  selector: 'page-pharmacist-detail',
  templateUrl: 'pharmacist-detail.html',
})
export class PharmacistDetailPage {
  pharmacistList: any;
  _locationList: any = [];
  _id:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hapenningsProvider:HapenningsProvider) {

    //this.pharmacistList = navParams.get('pharmacistdata');
    //this._locationList = this.pharmacistList.storesassociated ? this.pharmacistList.storesassociated : [];
    this._id = this.navParams.get('id');
    console.log(this._id,"this._id")
    if (this._id!=null) {
      this.getpharmacistServiceById(this._id);
    }
    else {
      console.log("no id")
      this.pharmacistList = navParams.get('pharmacistdata');
      this._locationList = this.pharmacistList.storeeventtimings ? this.pharmacistList.storeeventtimings : [];
    }
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

  getpharmacistServiceById(id){
    this.hapenningsProvider.getpharmacistServiceById(id).subscribe(res => {
      if(res.status ==200){
        this.pharmacistList = res.data[0];
        this._locationList = this.pharmacistList.storeeventtimings ? this.pharmacistList.storeeventtimings : [];
      }
    })

  }


}

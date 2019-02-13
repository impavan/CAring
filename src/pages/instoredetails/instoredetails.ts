import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

@IonicPage({
  segment: 'instoredetails/:id'
})
@Component({
  selector: 'page-instoredetails',
  templateUrl: 'instoredetails.html',
})

export class InstoredetailsPage {
  storeDetail: any = [];
  _locationList: any = [];
  eventDate: any = [];
  eventTime: any = [];
  _id: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private launchNavigator: LaunchNavigator,
    private hapenningsProvider: HapenningsProvider) {
    this.storeDetail = navParams.get('instoredata');
    console.log(this.storeDetail, "storeDetail");
    this._id = this.navParams.get('id');
    console.log(this._id, "this._id")
    if (this._id != null) {
      console.log("id")
      this.getInStoreActivitiesById(this._id);
    } else {
      console.log("no id")
      this._locationList = this.storeDetail.storeeventtimings ? this.storeDetail.storeeventtimings : [];
    }
    //this.eventDate =  this.storeDetail.eventdate ? this.storeDetail.eventdate : [];
    //this.eventTime =  this.storeDetail.eventtime ? this.storeDetail.eventtime : [];
    //this._locationList = this.storeDetail.storesassociated ? this.storeDetail.storesassociated : [];
    //this._locationList = this.storeDetail.storeeventtimings ? this.storeDetail.storeeventtimings : [];
  }

  gotoEventLocation(loc) {
    this.launchNavigator.navigate([loc.storelocation.x, loc.storelocation.y]).then(success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error));
  }

  gotoLocationPage(storename) {
    console.log(storename, "storenamestorenamestorename")
    this.navCtrl.push('StoreLocatorPage', { instore: storename });
  }

  zoomArea(url) {
    this.navCtrl.push('ImageViewPage', { imgsource: url })
  }

  getInStoreActivitiesById(id) {
    this.hapenningsProvider.getInStoreActivitiesById(id).subscribe(res => {
      if (res.status == 200) {
        this.storeDetail = res.data[0];
        this._locationList = this.storeDetail.storeeventtimings ? this.storeDetail.storeeventtimings : [];
      }
    })
  }
}
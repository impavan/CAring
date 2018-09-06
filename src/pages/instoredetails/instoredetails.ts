import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';




@IonicPage()
@Component({
  selector: 'page-instoredetails',
  templateUrl: 'instoredetails.html',
})

export class InstoredetailsPage {

  storeDetail: any = [];
  _locationList: any = [];
  eventDate: any = [];
  eventTime: any = [];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private launchNavigator: LaunchNavigator) {
    
    this.storeDetail = navParams.get('instoredata');
  
    //this.eventDate =  this.storeDetail.eventdate ? this.storeDetail.eventdate : [];
    //this.eventTime =  this.storeDetail.eventtime ? this.storeDetail.eventtime : [];
    //this._locationList = this.storeDetail.storesassociated ? this.storeDetail.storesassociated : [];
    this._locationList = this.storeDetail.storeeventtimings ? this.storeDetail.storeeventtimings : [];
  }

  gotoEventLocation(loc) {


    this.launchNavigator.navigate([loc.storelocation.x, loc.storelocation.y])
      .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );       
  }


  gotoLocationPage(storename) {

    console.log(storename,"storenamestorenamestorename")

    this.navCtrl.push('StoreLocatorPage', { instore: storename});
    
  }

  zoomArea(url) {
    this.navCtrl.push('ImageViewPage', {imgsource:url})
  }





}
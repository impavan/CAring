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
  _locationList:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private launchNavigator: LaunchNavigator) {
    
    this.storeDetail = navParams.get('instoredata');
    this._locationList = this.storeDetail.storeeventtimings ? this.storeDetail.storeeventtimings : [];
    console.log(this._locationList);
  }

  gotoEventLocation(loc) {
    
    // this.navCtrl.push('EventLocationPage', { lat: loc.storelocation.x, lng: loc.storelocation.y });
//     let options: LaunchNavigatorOptions = {
//   start: 'London, ON',
//   app: LaunchNavigator.APPS.UBER
// };

this.launchNavigator.navigate([loc.storelocation.x, loc.storelocation.y])
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );    


    
}
  gotoLocationPage(storename,storeId) {
    console.log(storeId);
    console.log(storename);
    this.navCtrl.push('StoreLocatorPage', { instore: storename,storeId: storeId});
    
}



}
import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-health-details',
  templateUrl: 'health-details.html',
})
export class HealthDetailsPage {


    healthData: any = [];


  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private socialSharing : SocialSharing) {

    this.healthData = navParams.get('data');
  }


   zoomArea(url) {
     this.navCtrl.push('ImageViewPage', { imgsource: url });
   }
  
  
  //function for sharing helth info details via social media //

  shareViaSocialMedia() {
    let message = this.healthData.title ? this.healthData.title : null;
    // let subject = "";
    let file = this.healthData.bannerimage ? this.healthData.bannerimage : null;
    let url = this.healthData.bannerimage ? this.healthData.bannerimage : null;
    this.socialSharing.share(message, "",file,url).then(() => {
      console.log("social media sharing");
    }, err => {
      console.log(err, "Something went wrong");
    })
  }

  

  
}

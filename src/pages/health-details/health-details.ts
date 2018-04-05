import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoaderProvider } from '../../providers/loader/loader';


@IonicPage()
@Component({
  selector: 'page-health-details',
  templateUrl: 'health-details.html',
})
export class HealthDetailsPage {


    healthData: any = [];


  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private socialSharing : SocialSharing,
              private loaderProvider : LoaderProvider) {

    this.healthData = navParams.get('data');
  }


   zoomArea(url) {
     this.navCtrl.push('ImageViewPage', { imgsource: url });
   }
  
  
  //function for sharing helth info details via social media //

  shareViaSocialMedia() {
    this.loaderProvider.presentLoadingCustom();
    let message = this.healthData.title ? this.healthData.title : null;
    // let subject = "";
    // let file = "";
    let url = this.healthData.additionalinfo ? this.healthData.additionalinfo : null;
    this.socialSharing.share(message, "","",url).then(() => {
      this.loaderProvider.dismissLoader();

    }, err => {
      console.log(err, "Something went wrong");
    })
  }

  

  
}

import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoaderProvider } from '../../providers/loader/loader';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

@IonicPage({
  segment: 'health-details/:id'
})
@Component({
  selector: 'page-health-details',
  templateUrl: 'health-details.html',
})

export class HealthDetailsPage {
  healthData: any = [];
  _id: string;

  constructor(public navParams: NavParams,
    public navCtrl: NavController,
    private socialSharing: SocialSharing,
    private loaderProvider: LoaderProvider,
    private hapenningsProvider: HapenningsProvider) {
    //this.healthData = navParams.get('data');
    this._id = this.navParams.get('id');
    console.log(this._id, "this._id")
    if (this._id != null) {
      this.getHealthInfoById(this._id);
    } else {
      console.log("no id")
      this.healthData = navParams.get('data');
    }
  }

  zoomArea(url) {
    this.navCtrl.push('ImageViewPage', { imgsource: url });
  }

  //function for sharing helth info details via social media //
  shareViaSocialMedia() {
    this.loaderProvider.presentLoadingCustom();
    let message = this.healthData.title ? this.healthData.title : null;
    let url = this.healthData.additionalinfo ? this.healthData.additionalinfo : null;
    this.socialSharing.share(message, "", "", url).then(() => {
      this.loaderProvider.dismissLoader();
    }, err => {
      console.log(err, "Something went wrong");
    })
  }

  getHealthInfoById(id) {
    this.hapenningsProvider.getHealthInfoById(id).subscribe(res => {
      if (res.status == 200) {
        this.healthData = res.data[0];
      }
    })
  }
}
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { BASE_URL, BRAND_ID, IMAGE_URL } from '../../config';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { RewardsProvider } from '../../providers/rewards/rewards';
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})

export class RewardsPage {
  @ViewChild('login') rewardModal;
  IMG_URL = IMAGE_URL;
  title: string;
  auth: any;
  offerdata: any = [];

  constructor(public events:Events,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private loaderProvider: LoaderProvider, 
              private rewardsProvider: RewardsProvider, 
              private exceptionProvider: ExceptionHandlerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardsPage');

  }

  ionViewDidEnter() {
    this.fetchAllExperiences();
    this.auth = localStorage.getItem('auth_token')
    this.events.publish('changeIcon',"RewardsPage");
  }

  //List all the experiences / offers
  fetchAllExperiences() {
    this.offerdata = [];
    this.loaderProvider.presentLoadingCustom();
    this.rewardsProvider.fetchAllExperiences().subscribe(data => {
      this.loaderProvider.dismissLoader();
      for (let res of data[0].response) {
        if (res.is_digital == 0)
          this.offerdata.push(res);
      }
    }, err => {
      this.loaderProvider.dismissLoader();
      this.exceptionProvider.excpHandler(err);
    });
  }

  navToLogin() {
    this.rewardModal.close();
    this.navCtrl.setRoot("LoginPage");
  }

  cancelRedeem() {
    this.rewardModal.close();
  }

  navToRedeem(offerData) {
    if (this.auth) {
      this.navCtrl.push("RewardsDetailsPage", { data: offerData });
    } else {
      this.rewardModal.open();
    }
  }
}

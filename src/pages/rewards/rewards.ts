import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  @ViewChild('reward') rewardModal;
  // IMG_URL = this.apiProvider.IMAGEURL;
  title: string;
  offerdata: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loaderProvider: LoaderProvider, private rewardsProvider: RewardsProvider, private exceptionProvider: ExceptionHandlerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardsPage');
 
  }
  navToDesc(){
  	this.navCtrl.push("RewardsDetailsPage");
  }

  ionViewDidEnter(){
    this.fetchAllExperiences();
      //  this.rewardModal.open();
  }

    //List all the experiences / offers
    fetchAllExperiences() {
      this.offerdata = [];
      this.loaderProvider.presentLoadingCustom();
      this.rewardsProvider.fetchAllExperiences()
        .subscribe(data => {
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

  redeemOffer(){
    this.rewardModal.close();
  }

  cancelRedeem(){
    this.rewardModal.close();
  }
}

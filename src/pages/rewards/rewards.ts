import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { BASE_URL, BRAND_ID, IMAGE_URL } from '../../config';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { AlertProvider } from '../../providers/alert/alert';
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
  auth: any;
  offerdata: any = [];
  isDataLoaded: boolean = false;

  constructor(public events:Events,
              public navCtrl: NavController,  
              private loaderProvider: LoaderProvider, 
              private rewardsProvider: RewardsProvider, 
              private alertProvider:AlertProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
  }



  ionViewDidEnter() {
    if(!this.isDataLoaded)
    this.fetchAllExperiences();
    this.auth = localStorage.getItem('auth_token')
    this.events.publish('changeIcon', "RewardsPage");
    
  }

  //List all the experiences / offers
  fetchAllExperiences() {

    this.offerdata = [];

    this.loaderProvider.presentLoadingCustom();

    this.rewardsProvider.fetchAllExperiences().subscribe(data => {

      this.loaderProvider.dismissLoader();

      if (data[0].code == 200) {

        this.isDataLoaded = true;
        
        for (let res of data[0].response) {

          if (res.is_digital == 0)
            this.offerdata.push(res);
        
        }
      } else {
        
        this.alertProvider.presentToast(data[0].message);

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

    this.auth?this.navCtrl.push("RewardsDetailsPage", { data: offerData }):this.rewardModal.open();
    
  }
}

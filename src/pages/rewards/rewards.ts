import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Events, NavParams } from 'ionic-angular';
import { BASE_URL, BRAND_ID } from '../../config';
import JsBarcode from 'jsbarcode';
import moment from 'moment';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { AlertProvider } from '../../providers/alert/alert';
import { RewardsProvider } from '../../providers/rewards/rewards';
import { LoaderProvider } from '../../providers/loader/loader';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})

export class RewardsPage {
  @ViewChild('login') rewardModal;
  @ViewChild('barcode') barcode: ElementRef;
  auth: any;
  selectTab: any;
  offerdata: any = [];
  isDataLoaded: boolean = false;
  member: any = "Rewards";
  memberDetails:any="New"
  redeemedRewards: any = [];
  _newRedeemedList: any = [];
  _newReward: any = [];
  _usedReward: any = [];
  _expiredReward: any = [];
  isWalletLoaded: boolean = false;
  currentDate: any = moment().format('YYYY-MM-DD');
  from: any;

  constructor(public events: Events,
              public navParams:NavParams,  
              public navCtrl: NavController,  
              private loaderProvider: LoaderProvider, 
              private rewardsProvider: RewardsProvider, 
              private alertProvider: AlertProvider,
              private profileProvider: ProfileProvider,
              private authProvider:AuthProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
    
                
              this.selectTab = navParams.get('selectTab') || '';
              this.from = navParams.get('deeplink');
              if (this.from =='newrewards' || this.from == 'myrewards') {
                  this.member = 'Rewards';
                  this.fetchAllExperiences();
                }
              if (this.selectTab) {
                this.member = this.selectTab;
                this.fetchAllExperiences();
              }
              
  }



  ionViewWillEnter() {
    // this.loadMyWallet();
    console.log("**********");
    this.auth = localStorage.getItem('auth_token')
    console.log(this.auth);
    if (this.auth) {
  
      this.authProvider.setHeader();
      this.events.publish('changeIcon', "RewardsPage");
        this.getRedeemedVouchers();
  
    }
  }

  //List all the experiences / offers
  fetchAllExperiences() {

    this.offerdata = [];

    this.loaderProvider.presentLoadingCustom();

    this.rewardsProvider.fetchAllExperiences().subscribe(data => {

      console.log(data);
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
      console.log("In error of experiences");
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


  //my wallet all fuction goes here

  loadMyWallet() {

    if (this.auth) {
      this.getRedeemedVouchers();
      console.log("**********");
    }
      
    

  }

   getRedeemedVouchers() {
    console.log("**********");
    this.loaderProvider.presentLoadingCustom();

    this.profileProvider.getAllRedeemedVouchers()

      .subscribe(res => {


        console.log(res);        
        this.redeemedRewards = res[0].customer_vouchers;

        this.loaderProvider.dismissLoader();

        this.isWalletLoaded = true;

        if (this.redeemedRewards.length > 0) {

          this.getNewRewardsList();
          this.getUsedRewardList();
          this.getExpiredList();

                this._newRedeemedList = [];

                for (let i = 0; i < this.redeemedRewards.length; i++) {

                        let exp = this.redeemedRewards[i].ExperienceId;

                        if (this._newRedeemedList[exp]) {

                            this._newRedeemedList[exp]['Vouchers'].push(this.redeemedRewards[i]);
                        }
                        else {

                            this._newRedeemedList[exp] = {};

                            this._newRedeemedList[exp]['Vouchers'] = [];

                            this._newRedeemedList[exp]['Vouchers'].push(this.redeemedRewards[i]);
                        }

                }

          }
      },

      err => {

            console.log("In error in redeemed vouchers");
            this.loaderProvider.dismissLoader();

            this.exceptionProvider.excpHandler(err);

          });

   }
  
   getNewRewardsList() {
    
    this._newReward = this.redeemedRewards.filter(data => data.Cap_RedeemStatus == 0 && this.currentDate <= data.ExpiryDate );

  }

  getUsedRewardList() {
    
    this._usedReward = this.redeemedRewards.filter(data => data.Cap_RedeemStatus == 1);

  }

  getExpiredList() {
    
    this._expiredReward = this.redeemedRewards.filter(data => data.Cap_RedeemStatus == 0 && this.currentDate > data.ExpiryDate)

  }

    getRedeemed(exp) {
   
    return this._newReward.filter(e => e.ExperienceId == exp && e.Cap_RedeemStatus == 0 && this.currentDate <= e.ExpiryDate).length;

  }

   getUsedVouchersCount(exp) {

    return this._usedReward.filter(e => e.ExperienceId == exp && e.Cap_RedeemStatus == 1).length;

   }
  
   getExpiredVoucherCount(exp) {
    return this._expiredReward.filter(e => e.ExperienceId == exp && e.Cap_RedeemStatus == 0 && this.currentDate > e.ExpiryDate).length;
   }
  
    goto(page, exp) {

    this.navCtrl.push(page, { redeemData: this._newRedeemedList[exp] });

    }
  
    gotoLogin() {
    
      this.navCtrl.setRoot('LoginPage');  
  }
}

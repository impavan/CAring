import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Events, NavParams } from 'ionic-angular';
import JsBarcode from 'jsbarcode';
import moment from 'moment';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { AlertProvider } from '../../providers/alert/alert';
import { RewardsProvider } from '../../providers/rewards/rewards';
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
  // member: any = "Rewards";
  member :any = "promotions";
  memberDetails:any="New"
  redeemedRewards: any = [];
  _newRedeemedList: any = [];
  _newReward: any = [];
  _usedReward: any = [];
  _expiredReward: any = [];
  _promotions: Array<any>;
  isWalletLoaded: boolean = false;
  currentDate: any = moment().format('YYYY-MM-DD');
  from: any;
  navToId: any;
  fromPage: string;

  constructor(public events: Events,
              public navParams:NavParams,  
              public navCtrl: NavController,  
              private rewardsProvider: RewardsProvider, 
              private alertProvider: AlertProvider,
              private profileProvider: ProfileProvider,
              private authProvider:AuthProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
    
                
              this.selectTab = navParams.get('selectTab') || '';
              console.log(this.selectTab,":::::::::::::::::::selectab:::::::::::::::::")
              this.from = navParams.get('deeplink');
              this.fromPage = this.navParams.get('fromProfile')
              this.navToId = navParams.get('id');
              if (this.from == 'myrewards') {
                  this.member = 'Rewards';
                  console.log("form rewards");
                  this.fetchAllExperiences();
              } else if (this.from == 'newrewards' || this.fromPage =='profileRedemption') {
                console.log("form Redemption");
                this.member = 'Redemption';
                this.fetchAllExperiencesWith();
              } else {
                console.log('coming to else');
              }
    
              if (this.selectTab) {
                this.member = this.selectTab;
                console.log(this.selectTab,":::::::::::::::::::pagwe:::::::::::::::::")
                 this.fetchAllExperiences();
              }
              
  }



  ionViewWillEnter() {
 
      this.events.publish('changeIcon', "RewardsPage");
      this.auth = localStorage.getItem('auth_token')

    if (this.auth) {
      this.authProvider.setHeader();
      console.log(":::::::::::::::::::coupon:::::::::::::::::")
       // this.getRedeemedVouchers();
       this.getPromotions();
    }
  }

  //List all the experiences / offers
  fetchAllExperiences() {

    this.offerdata = [];
    this.rewardsProvider.fetchAllExperiences().subscribe(data => {
      if (data[0].code == 200) {
        this.isDataLoaded = true; 
        for (let res of data[0].response) {
          if (res.is_digital == 0)
            this.offerdata.push(res);
        }
        if (this.offerdata && this.navToId && this.from =='newrewards') {
          let item = this.offerdata.find(d => d.ExperienceID == this.navToId);
          if (item) {
            this.navToRedeem(item);
          }
        }
      } else {
        this.alertProvider.presentToast(data[0].message);
      }  
    }, err => {
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

    //List all the experiences / offers
    fetchAllExperiencesWith() {

      this.offerdata = [];
      this.rewardsProvider.fetchAllExperiencesWith().subscribe(data => {
        if (data[0].code == 200) {
          this.isDataLoaded = true; 
          for (let res of data[0].response) {
            if (res.is_digital == 0)
              this.offerdata.push(res);
          }
          if (this.offerdata && this.navToId && this.from =='newrewards') {
            let item = this.offerdata.find(d => d.ExperienceID == this.navToId);
            if (item) {
              this.navToRedeem(item);
            }
          }
        } else {
          this.alertProvider.presentToast(data[0].message);
        }  
      }, err => {
        this.exceptionProvider.excpHandler(err);
        });
    }


  //my wallet all fuction goes here

  // loadMyWallet() {

  //   if (this.auth) {
  //     this.getRedeemedVouchers();
  //   }
  // }

   getRedeemedVouchers() {
     if(this.auth){

    this.profileProvider.getAllRedeemedVouchers()
      .subscribe(res => {
        this.redeemedRewards = res[0].customer_vouchers;
        this.isWalletLoaded = true;
        if (this.redeemedRewards && this.redeemedRewards.length > 0) {

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
                if (this._newRedeemedList && this.navToId && this.from == 'myrewards') {

                  if (this._newRedeemedList[this.navToId]['Vouchers'].length > 0)
                    this.goto('RedeemPage', this.navToId);
                }
          }
      },
      err => {
            this.exceptionProvider.excpHandler(err);
          });
        }

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
  
  private getPromotions() {
    this.rewardsProvider.getAllPromotions().subscribe(res => {
      
      this._promotions =  res.data.filter(promote => {

        if (promote.publishingstartdate && promote.publishingenddate) {

          // moment for checking start date and end date for posting article //

          let psDate = moment(promote.publishingstartdate).format('YYYY-MM-DD');
          let peDate =  moment(promote.publishingenddate).format('YYYY-MM-DD');
          let psMoment = moment(psDate);
          let peMoment =  moment(peDate)
          let currenMoment  =  moment().format('YYYY-MM-DD');
          if (moment(psMoment).isSameOrBefore(currenMoment) && moment(peMoment).isSameOrAfter(currenMoment)) {
            return promote;
          }
        } else {
          return promote;
        }
      });

      if (this.navToId) {
        let item = this._promotions.find(d => d.deeplinkingidentifier == this.navToId)
        if (item) {
          this.gotoPromotionVoucherDetails(item);
        }
      } 

      })
  }
  
  gotoPromotionVoucherDetails(voucher) {
    this.navCtrl.push("PromotionVoucherDetailsPage",{ id:voucher.deeplinkingidentifier,voucherdata:voucher})
  }
}

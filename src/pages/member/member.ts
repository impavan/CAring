import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import moment from 'moment';
import JsBarcode from 'jsbarcode';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { UserdataProvider } from '../../providers/userdata/userdata';


@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {

  @ViewChild('barcode') barcode: ElementRef;
  @ViewChild('name') nameTextBox;

 
  from: any;
  member: any = "My Points";
  memberDetails: any = "New";
  _auth: any;
  _userName: any;
  _lastName: any;
  _emailId: any;
  _birthday: any;
  _oldemailId: any;
  _mobileNum: any;
  _pointOpen: boolean = false;
  _totalAvailablePoints: number;
  _totalRedeemedPoints: number;
  _externalId:any;
  loadedProfile: boolean = false;
  redeemedRewards: any = [];
  _transactionList: any = [];
  _newRedeemedList: any = [];
  _newReward: any = [];
  _usedReward: any = [];
  _expiredReward: any = [];
  currentDate: any = moment().format('YYYY-MM-DD');
  isWalletLoaded: boolean = false;
  isProfileLoaded: boolean = false;
  isCancel: boolean = false;


  constructor(
              private events: Events,  
              private navParams: NavParams,
              private navCtrl: NavController,
              private authProvider: AuthProvider,
              private alertProvider: AlertProvider,
              private userProvider: UserdataProvider,
              private profileProvider: ProfileProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
   
              this.from = this.navParams.get('deeplink');
              if (this.from == 'profile')
                this.member = 'My Profile'; 

    

  }

  ionViewWillEnter(){
     this._auth = localStorage.getItem('auth_token');
    if (this._auth) {

          this.authProvider.setHeader();
          this.loadMyPoints();
    }
    this.events.publish('changeIcon',"MemberPage");

    
  }


 


  loadMyProfile() {

    if (this._auth) 
      this.getMyProfileDetails();
    
  }

  loadMyPoints() {

    if (this._auth) {

      this.getMyPoints();
      this.getUserTransaction();

    } else {

    }
  }

  loadMyWallet() {

    if (this._auth)
      this.getRedeemedVouchers();

  }

  navToRedeemVoucher(voucher) {

    this.navCtrl.push("VoucherRedeemPage", { data: voucher });

  }

  //gets user profile details
  getMyProfileDetails() {

    this._userName = this.authProvider.getUserFirstName();
    this._lastName = this.authProvider.getUserLastName();
    this._emailId = this.authProvider.getUserEmailId();
    this._birthday = this.authProvider.getUserBirthday();
    this._oldemailId = this.authProvider.getUserEmailId();
    this._mobileNum = this.authProvider.getUserMobileNo();
    this._externalId = this.authProvider.getExternalId();
    JsBarcode(this.barcode.nativeElement, localStorage.getItem('phone'));

  }

  getMyPoints() {

    this.userProvider.getMyProfile().subscribe(data => {

      if (data[0].code == 200) {

        this.authProvider.setUser(data[0].customerdata);
        localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
        this._totalAvailablePoints = this.authProvider.getMyCurrentPoints();
        this._totalRedeemedPoints = this.authProvider.getTotalRedeemedPoints();
        this.loadedProfile = true;
        this.loadMyProfile();

      }
    }, err => {
      this.getMyProfileDetails();
      this.exceptionProvider.excpHandler(err);

    });
  }



  getRedeemedVouchers() {
    

    this.profileProvider.getAllRedeemedVouchers()

      .subscribe(res => {

        this.redeemedRewards = res[0].customer_vouchers;


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


            this.exceptionProvider.excpHandler(err);

          });

  }

  getUserTransaction() {

    this.profileProvider.getUserTransaction()


      .subscribe(data => {

                  this._transactionList = data[0].customer_transaction_info;

      }, err => {
        this.exceptionProvider.excpHandler(err);
      })

  }

  ionViewCanEnter() {

    if (this.authProvider.getAuthToken())

        return true;

    return false;

  }



  updateData() {

    this.navCtrl.push("MyAccountPage");

  }

  emptywallet() {

    this.navCtrl.setRoot("RewardsPage");

  }

  backtologin() {

    this.navCtrl.setRoot("LoginPage");
  }

  togglePoint() {

    this._pointOpen = this._pointOpen ? false : true;

  }


  

  getRedeemed(exp) {
   
    return this._newReward.filter(e => e.ExperienceId == exp && e.RedeemStatus == 0 && this.currentDate <= e.ExpiryDate).length;

  }

   getUsedVouchersCount(exp) {

    return this._usedReward.filter(e => e.ExperienceId == exp && e.RedeemStatus == 1).length;

   }
  
   getExpiredVoucherCount(exp) {
    return this._expiredReward.filter(e => e.ExperienceId == exp && e.RedeemStatus == 0 && this.currentDate > e.ExpiryDate).length;
  }


  goto(page, exp) {

    this.navCtrl.push(page, { redeemData: this._newRedeemedList[exp] });

  }


  getNewRewardsList() {
    
    this._newReward = this.redeemedRewards.filter(data => data.RedeemStatus == 0 && this.currentDate <= data.ExpiryDate );

  }

  getUsedRewardList() {
    
    this._usedReward = this.redeemedRewards.filter(data => data.RedeemStatus == 1);

  }

  getExpiredList() {
    
    this._expiredReward = this.redeemedRewards.filter(data => data.RedeemStatus == 0 && this.currentDate > data.ExpiryDate)

  }

  memberEdit() {
  
      this.navCtrl.push('EditProfilePage');
    
  }  



  gotoRewards(){
    this.navCtrl.setRoot("RewardsPage",{selectTab:'Redemption'});
  }
}
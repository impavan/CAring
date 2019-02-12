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
import { ConnectAuthProvider } from '../../providers/connect-auth/connect-auth';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})

export class MemberPage {
  @ViewChild('barcode') barcode: ElementRef;
  @ViewChild('name') nameTextBox;
  @ViewChild('expiryPoints') expiryPointsModal;
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
  _externalId: any;
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
  expirySchedule: any;
  expiryPointsLatest: any

  constructor(private events: Events,
    private navParams: NavParams,
    private navCtrl: NavController,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private userProvider: UserdataProvider,
    private profileProvider: ProfileProvider,
    private exceptionProvider: ExceptionHandlerProvider,
    private connectAuthProvider: ConnectAuthProvider) {

    this.from = this.navParams.get('deeplink');
    if (this.from == 'profile')
      this.member = 'My Profile';
  }

  ionViewWillEnter() {
    this._auth = localStorage.getItem('auth_token');
    if (this._auth) {
      this.authProvider.setHeader();
      this.loadMyPoints();
    }
    this.events.publish('changeIcon', "MemberPage");
  }

  loadMyProfile() {
    if (this._auth)
      this.getMyProfileDetails();
  }

  loadMyPoints() {
    if (this._auth) {
      this.getMyPoints();
      // this.getUserTransaction();
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
    console.log(":::::::::::::::::Some Log::::::::::::::::")
    this._userName = this.authProvider.getUserFirstName();
    this._lastName = this.authProvider.getUserLastName();
    this._emailId = this.authProvider.getUserEmailId();
    this._birthday = this.authProvider.getUserBirthday();
    this._oldemailId = this.authProvider.getUserEmailId();
    this._mobileNum = this.authProvider.getUserMobileNo();
    this._externalId = this.authProvider.getExternalId();
    console.log(":::::::::::::::::Some Log::::::::::::::::", localStorage.getItem('phone'))
    JsBarcode(this.barcode.nativeElement, localStorage.getItem('phone'));
  }

  navTo(page) {
    this.navCtrl.push(page);
  }

  getMyPoints() {
    // this.userProvider.getMyProfile().subscribe(data => {
    //   console.log('":::::::::::::::::CRM data Customer Data:::::::::::::',data)
    //   console.log('":::::::::::::::::CRM data Customer Data:::::::::::::',data[0].customerData)
    //   if (data[0].code == 200) {
    //     console.log('":::::::::::::::::CRM data Customer Data:::::::::::::',data[0].customerData)
    //     this.authProvider.setUser(data[0].customerdata);
    //     localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
    //     this._totalAvailablePoints = this.authProvider.getMyCurrentPoints();
    //     this._totalRedeemedPoints = this.authProvider.getTotalRedeemedPoints();
    //     var schedule = this.authProvider.getexpirySchedule();
    //     console.log(schedule, "expirySchedule");
    //     this.expirySchedule = _.sortBy(schedule, 'expiry_date');
    //     this.expiryPointsLatest = this.expirySchedule[0].points
    //     console.log(this.expirySchedule, "sortdata");
    //     this.loadedProfile = true;
    //     this.loadMyProfile();
    //   }
    // }, err => {
    //   this.getMyProfileDetails();
    //   this.exceptionProvider.excpHandler(err);
    // });
    this.connectAuthProvider.validateToken(localStorage.getItem('auth_token')).then(isTokenValid => {
      if (isTokenValid) {
        this.connectAuthProvider.getCustomerDetails().subscribe(customerdetails => {
          console.log(':::::::::::::::::::::Customer Details::::::::::::::::::::::;', customerdetails)
          if (customerdetails.code === 200 && customerdetails.result.response && customerdetails.result.response.customers.customer) {
            let customerData = customerdetails.result.response;
            // console.log('":::::::::::::::::Customer Data:::::::::::::',customerData)
            this.authProvider.setUser(customerData.customers);
            localStorage.setItem('userdetails', JSON.stringify(customerData.customers));
            console.log('":::::::::::::::::Customer Data:::::::::::::',this._totalAvailablePoints)
            console.log('":::::::::::::::::Customer Data:::::::::::::',this._totalRedeemedPoints)
            this._totalAvailablePoints = this.authProvider.getMyCurrentPoints();
            this._totalRedeemedPoints = this.authProvider.getTotalRedeemedPoints();
            var schedule = this.authProvider.getexpirySchedule();
            console.log(schedule, "expirySchedule");
            this.expirySchedule = _.sortBy(schedule, 'expiry_date');
            this.expiryPointsLatest = this.expirySchedule[0].points
            console.log(this.expirySchedule, "sortdata");
            this.loadedProfile = true;
            this.getMyProfileDetails();
          } else {
            this.alertProvider.presentToast(customerdetails.message);
          }
        }, err => {
          this.getMyProfileDetails();
          console.log(err, "customerdetails err");
        })
      } else {
        this.alertProvider.presentToast("Invalid Auth Token");
      }
    })
  }

  expiryScheduleModal() {
    this.expiryPointsModal.open();
  }

  getRedeemedVouchers() {
    this.profileProvider.getAllRedeemedVouchers().subscribe(res => {
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
          } else {
            this._newRedeemedList[exp] = {};
            this._newRedeemedList[exp]['Vouchers'] = [];
            this._newRedeemedList[exp]['Vouchers'].push(this.redeemedRewards[i]);
          }
        }
      }
    }, err => {
      this.exceptionProvider.excpHandler(err);
    });
  }

  getUserTransaction() {
   this.navCtrl.push('TransactionsPage');
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
    this._newReward = this.redeemedRewards.filter(data => data.RedeemStatus == 0 && this.currentDate <= data.ExpiryDate);
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

  gotoRewards() {
    this.navCtrl.setRoot("RewardsPage", { selectTab: 'Redemption' });
  }

  goToRewards(section) {
    this.navCtrl.setRoot("RewardsPage", { selectTab: section });
  }
}
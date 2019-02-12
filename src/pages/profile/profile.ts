import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import moment from 'moment';

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
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
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
  }

  ionViewDidEnter() {
    this._auth = localStorage.getItem('auth_token');
    console.log('ionViewDidLoad ProfilePage');
    this.getCustomerDetails();
  }

  getMyProfileDetails() {
    console.log(":::::::::::::::::Some Log::::::::::::::::")
    this._userName = this.authProvider.getUserFirstName();
    this._lastName = this.authProvider.getUserLastName();
    this._emailId = this.authProvider.getUserEmailId();
    this._birthday = this.authProvider.getUserBirthday();
    this._mobileNum = this.authProvider.getUserMobileNo();
  }

  getCustomerDetails() {
    this.connectAuthProvider.validateToken(localStorage.getItem('auth_token')).then(isTokenValid => {
      if (isTokenValid) {
        this.connectAuthProvider.getCustomerDetails().subscribe(customerdetails => {
          console.log(':::::::::::::::::::::Customer Details::::::::::::::::::::::;', customerdetails)
          if (customerdetails.code === 200 && customerdetails.result.response && customerdetails.result.response.customers.customer) {
            let customerData = customerdetails.result.response;
            // console.log('":::::::::::::::::Customer Data:::::::::::::',customerData)
            this.authProvider.setUser(customerData.customers);
            localStorage.setItem('userdetails', JSON.stringify(customerData.customers));
            // console.log('":::::::::::::::::Customer Data:::::::::::::', this._totalAvailablePoints)
            // console.log('":::::::::::::::::Customer Data:::::::::::::', this._totalRedeemedPoints)
            // this._totalAvailablePoints = this.authProvider.getMyCurrentPoints();
            // this._totalRedeemedPoints = this.authProvider.getTotalRedeemedPoints();
            // var schedule = this.authProvider.getexpirySchedule();
            // console.log(schedule, "expirySchedule");
            // this.expirySchedule = _.sortBy(schedule, 'expiry_date');
            // this.expiryPointsLatest = this.expirySchedule[0].points
            // console.log(this.expirySchedule, "sortdata");
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

  memberEdit() {
    this.navCtrl.push('EditProfilePage');
  }

}

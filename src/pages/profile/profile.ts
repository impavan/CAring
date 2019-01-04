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
import * as _ from 'lodash';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild('barcode') barcode: ElementRef;

  _auth: any;
  _totalAvailablePoints: number;
  _totalRedeemedPoints: number;
  expirySchedule: any;
  expiryPointsLatest: any
  _userName: any;
  _lastName: any;
  _emailId: any;
  _birthday: any;
  _oldemailId: any;
  _mobileNum: any;
  _externalId: any;
  loadedProfile: boolean = false;

  constructor(   private events: Events,
    private navParams: NavParams,
    private navCtrl: NavController,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private userProvider: UserdataProvider,
    private profileProvider: ProfileProvider,
    private exceptionProvider: ExceptionHandlerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
    this._auth = localStorage.getItem('auth_token');
    if (this._auth) {

      this.authProvider.setHeader();
      this.loadMyPoints();
    }
  //  this.events.publish('changeIcon', "MemberPage");


  }

  loadMyPoints() {

    if (this._auth) {

      this.getMyPoints();

    } else {
      console.log("No authorization")
    }
  }

  getMyPoints() {

    this.userProvider.getMyProfile().subscribe(data => {

      if (data[0].code == 200) {

        this.authProvider.setUser(data[0].customerdata);
        localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
        this.loadedProfile = true;
        this.loadMyProfile();

      }
    }, err => {
      this.getMyProfileDetails();
      this.exceptionProvider.excpHandler(err);

    });
  }

  loadMyProfile() {

    if (this._auth)
      this.getMyProfileDetails();

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
      console.log("getting==>",localStorage.getItem('phone'))
     // JsBarcode(this.barcode.nativeElement, localStorage.getItem('phone'));
  
    }

    memberEdit() {

      this.navCtrl.push('EditProfilePage');
  
    }


}

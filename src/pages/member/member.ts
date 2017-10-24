import { Component } from '@angular/core';
import { IMAGE_BASE_URL } from '../../config';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';


@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {
  IMG_URL = IMAGE_BASE_URL;

  public member: any = "My Points";
  public memberDetails: any = "New";
  public _auth: any;
  public _userName: any;
  public _emailId: any;
  public _mobileNum: any;
  public _profilePic: any;
  _totalAvailablePoints: number;
  _totalRedeemedPoints: number;

  constructor(private navCtrl: NavController, private navParams: NavParams, private authProvider: AuthProvider,
    private exceptionProvider: ExceptionHandlerProvider, private events: Events,
    private profileProvider: ProfileProvider,
    private alertProvider: AlertProvider) {
    this._auth = localStorage.getItem('auth_token');
    this.loadMyProfile();
    this.loadMyPoints();
    console.log('image--- url', this.IMG_URL);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }


  loadMyProfile() {
    if (this._auth) {
      this.getMyProfileDetails();
    }
  }

  loadMyPoints() {
    if (this._auth) {
      this.getMyPoints();
    }
  }

  navToRedeemVoucher(voucher) {
    this.navCtrl.push("VoucherRedeemPage", { data: voucher });
  }

  //gets user profile details
  getMyProfileDetails() {
    this._userName = this.authProvider.getUserFirstName();
    this._emailId = this.authProvider.getUserEmailId();
    this._mobileNum = this.authProvider.getUserMobileNo();
    this._profilePic = this.authProvider.getUserProfilePic();
    console.log(this._userName);
    console.log(this._emailId);
    console.log(this._mobileNum);
    console.log(this._profilePic);
  }

  getMyPoints() {
    this.profileProvider.getMyProfile().subscribe(data => {
      if (data[0].code == 200) {
        this.authProvider.setUser(data[0].customerdata);
        localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
        this._totalAvailablePoints = this.authProvider.getMyCurrentPoints();
        this._totalRedeemedPoints = this.authProvider.getTotalRedeemedPoints();
        console.log("totttttttttttttttttttttttt poiiiiiiiiiintttttttsssssssssss");
        console.log(this._totalAvailablePoints);
        console.log(this._totalRedeemedPoints);
      }
    }, err => {
      this.exceptionProvider.excpHandler(err);
    });
  }

  updateData() {
    this.navCtrl.push("MyAccountPage");
  }
}

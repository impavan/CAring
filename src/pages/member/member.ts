import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {
  IMG_URL = this.apiProvider.IMAGEURL;
	public member: any="My Points";
  public memberDetails: any= "New";
  public _auth: any;
  public _userName: any;
  public _emailId: any;
  public _mobileNum: any;
  public _profilePic: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private authProvider: AuthProvider, private apiProvider: ApiProvider,
    private exceptionProvider: ExceptionHandlerProvider, private events: Events,
    private profileProvider: ProfileProvider,
    private alertProvider: AlertProvider) {
    this._auth = localStorage.getItem('auth_token');
    this.loadMyProfile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }

  loadMyProfile() {
    if (this._auth) {
      // this.profileProvider.getMyProfile().subscribe(res => {
      //   if (res[0].code == 200) {
      //     localStorage.setItem('userdetails', JSON.stringify(res[0].customerdata));
      //     this.authProvider.setUser(res[0].customerdata);
      //     localStorage.setItem('phone', res[0].customerdata.customer[0].mobile);
      //     this.authProvider.setHeader();
      //     this.alertProvider.presentToast("User Profile successfully updated");
      //     this.events.publish('user:login', true);
      //     this.getMyProfileDetails();
      //   } else {
      //     this.alertProvider.presentToast(res[0].message);
      //   }
      // }, error => {
      //   this.exceptionProvider.excpHandler(error);
      // });
      this.getMyProfileDetails();
    }
  }

  navToRedeemVoucher(voucher) {
    this.navCtrl.push("VoucherRedeemPage", { data: voucher });
  }

  //gets user profile details
  getMyProfileDetails() {
    this._userName = this.authProvider.getUserFirstName();
    // this._userLastName = this.authProvider.getUserLastName();
    this._emailId = this.authProvider.getUserEmailId();
    // this._gender = this.authProvider.getUserGender();
    // this._oldemail = this.authProvider.getUserEmailId();
    this._mobileNum = this.authProvider.getUserMobileNo();
    // this._IUNumber = this.authProvider.getUserIUNo();
    // this._dob = this.authProvider.getUserDob();
    // this._wifiId = this.authProvider.getUserWifiID();
    this._profilePic = this.authProvider.getUserProfilePic();
    console.log(this._userName, "=======================username====================");
    console.log(this._emailId, "=======================username====================");
    console.log(this._mobileNum, "=======================username====================");
    console.log(this._profilePic, "=======================username====================");
  }

  updateData() {
    this.navCtrl.push("MyAccountPage");
  }
}

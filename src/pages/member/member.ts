import { Component, ViewChild, ElementRef } from '@angular/core';
import { IMAGE_URL } from '../../config';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import moment from 'moment';
import JsBarcode from 'jsbarcode';

// Import Providers.
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { LoaderProvider } from '../../providers/loader/loader';
import { UserdataProvider } from '../../providers/userdata/userdata';


@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {

  @ViewChild('barcode') barcode: ElementRef;

  IMG_URL = IMAGE_URL;
  from: any;
  member: any = "My Points";
  memberDetails: any = "New";
  _auth: any;
  _userName: any;
  _emailId: any;
  _oldemailId: any;
  _mobileNum: any;
  _profilePic: any;
  _pointOpen: boolean = false;
  _totalAvailablePoints: number;
  _totalRedeemedPoints: number;
  loadedWallet: boolean = false;
  loadedProfile: boolean = false;
  redeemedRewards: any = [];
  _transactionList: any = [];
  _newRedeemedList: any = [];
  redeemdRewards: any = [];
  userData: any = {};
  currentDate: any = moment().format('YYYY-MM-DD');
  isWalletLoaded: boolean = false;
  isProfileLoaded: boolean = false;


  constructor(private navCtrl: NavController, private navParams: NavParams, private authProvider: AuthProvider,
    private exceptionProvider: ExceptionHandlerProvider, private events: Events,
    private profileProvider: ProfileProvider, private loaderProvider: LoaderProvider, private userProvider: UserdataProvider,
    private alertProvider: AlertProvider) {
    this._auth = localStorage.getItem('auth_token');
    if (this._auth) {

          this.authProvider.setHeader();
    }

    this.loadMyPoints();

    this.from = navParams.get('from');

    if (this.from == 'purchase') {

          this.member = 'My Wallet';
    }

  }

 


  loadMyProfile() {
    if (this._auth) {
      this.getMyProfileDetails();
    }
  }

  loadMyPoints() {
    if (this._auth && !this.loadedProfile) {
      this.loaderProvider.presentLoadingCustom();
      this.getMyPoints();
      this.getUserTransaction();
    } else {
      this.loaderProvider.dismissLoader();
    }
  }

  loadMyWallet() {
    if (this._auth && !this.isWalletLoaded)

      this.getRedeemedVouchers();

  }

  navToRedeemVoucher(voucher) {
    this.navCtrl.push("VoucherRedeemPage", { data: voucher });
  }

  //gets user profile details
  getMyProfileDetails() {

    this._userName = this.authProvider.getUserFirstName();
    this._emailId = this.authProvider.getUserEmailId();
    this._oldemailId = this.authProvider.getUserEmailId();
    this._mobileNum = this.authProvider.getUserMobileNo();
    this._profilePic = this.authProvider.getUserProfilePic();
    JsBarcode(this.barcode.nativeElement, this._mobileNum);

  }

  getMyPoints() {

    this.userProvider.getMyProfile().subscribe(data => {

      if (data[0].code == 200) {

        this.authProvider.setUser(data[0].customerdata);
        localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
        this.loaderProvider.dismissLoader();
        this._totalAvailablePoints = this.authProvider.getMyCurrentPoints();
        this._totalRedeemedPoints = this.authProvider.getTotalRedeemedPoints();
        this.loadedProfile = true;
        console.log(this._totalAvailablePoints);
        console.log(this._totalRedeemedPoints);
        this.loadMyProfile();

      }
    }, err => {

      this.exceptionProvider.excpHandler(err);

    });
  }


  getRedeemedVouchers() {
    
    this.loaderProvider.presentLoadingCustom();

    this.profileProvider.getAllRedeemedVouchers()

      .subscribe(res => {

        this.redeemedRewards = res[0].customer_vouchers;

        this.loaderProvider.dismissLoader();

        this.isWalletLoaded = true;

        if (this.redeemedRewards.length > 0) {

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

            this.loaderProvider.dismissLoader();

            this.exceptionProvider.excpHandler(err);

          });

  }

  getUserTransaction() {

    this.profileProvider.getUserTransaction()

      .subscribe(data => {

        this._transactionList = data[0].customer_transaction_info;

        console.log(this._transactionList);

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


  updateProfile() {
 
    this.userData =
      {
        fname: this._userName,
        email: this._emailId,
        old_email: this._oldemailId,
        mobile: this._mobileNum,
        externalId: ''
      }

     this.userProvider.updateProfile(this.userData).subscribe(data => {

      this.loaderProvider.presentLoadingCustom();

      if (data[0].code == 200) {

        this.userProvider.getMyProfile().subscribe(data => {

          if (data[0].code == 200) {

            this.loaderProvider.dismissLoader();
            this._userName = data[0].customerdata.customer[0].firstname;
            this._emailId = data[0].customerdata.customer[0].email;
            this.authProvider.setUser(data[0].customerdata);
            localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
            this.authProvider.setHeader();
            this.events.publish('user:login', true);

          }
          else if (data[0].code == 201) {

            this.loaderProvider.dismissLoader();
            this.alertProvider.presentToast(data[0].message);

          } else if (data[0].code == 202) {

            this.loaderProvider.dismissLoader();
            this.alertProvider.presentToast(data[0].message);

          } else {
          }

        }, err => {

          this.loaderProvider.dismissLoader();
          this.exceptionProvider.excpHandler(err);

        })
      } else if (data[0].code == 201) {

        this.alertProvider.presentToast(data[0].message);

      } else if (data[0].code == 202) {

        this.alertProvider.presentToast(data[0].message);

      } else {
      }

    }, err => {

      this.loaderProvider.dismissLoader();
      this.exceptionProvider.excpHandler(err);
    });
  }

  getRedeemed(exp) {

    return this._newRedeemedList[exp]['Vouchers'].filter(e => e.ActivateStatus == 0 && e.ExpiryDate >= moment().format('YYYY-MM-DD')).length;

  }

  goto(page, exp) {

    this.navCtrl.push(page, { redeemData: this._newRedeemedList[exp] });
  }
}

import { Component } from '@angular/core';
import { IMAGE_URL } from '../../config';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

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
  IMG_URL = IMAGE_URL;
  from: any;
   member: any = "My Points";
   memberDetails: any = "New";
   _auth: any;
   _userName: any;
   _emailId: any;
   _mobileNum: any;
   _profilePic: any;
   _pointOpen:boolean = false;
  _totalAvailablePoints: number;
  _totalRedeemedPoints: number;
  loadedWallet:boolean = false;
  loadedProfile:boolean = false;
  redeemedRewards:any = [];
  _transactionList:any = [];

  constructor(private navCtrl: NavController, private navParams: NavParams, private authProvider: AuthProvider,
    private exceptionProvider: ExceptionHandlerProvider, private events: Events,
    private profileProvider: ProfileProvider,private loaderProvider:LoaderProvider,private userProvider:UserdataProvider,
    private alertProvider: AlertProvider) {
    this._auth = localStorage.getItem('auth_token');
    if(this._auth){
      this.authProvider.setHeader();
    }
   
    this.loadMyPoints();
    console.log('image--- url', this.IMG_URL);
    this.from = navParams.get('from');
    if(this.from == 'purchase'){
      this.member = 'My Wallet';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }

  ionViewWillEnter(){
      if (this._auth) {
      this.loaderProvider.presentLoadingCustom();
      }
  }


  loadMyProfile() {
    if (this._auth && this.loadedProfile) {
      this.getMyProfileDetails();
    }
  }

  loadMyPoints() {
    if (this._auth) {
      this.getMyPoints();
      this.getUserTransaction();
    }else{
      this.loaderProvider.dismissLoader();
    }
  }

  loadMyWallet(){
    if(this._auth)

        this.getRedeemedVouchers();

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


  getRedeemedVouchers(){
      this.loaderProvider.presentLoadingCustom();
        this.profileProvider.getAllRedeemedVouchers()
              .subscribe(res => {
                  this.redeemedRewards = res[0].customer_vouchers;
                  console.log(this.redeemedRewards);
                  // this.loadedWallet = true;
                  this.loaderProvider.dismissLoader();
              },

               err => {
                 this.loaderProvider.dismissLoader();
                this.exceptionProvider.excpHandler(err);
             });

  }

  getUserTransaction(){

      this.profileProvider.getUserTransaction()
            
            .subscribe(data=>{

                  this._transactionList = data[0].customer_transaction_info;
                  console.log(this._transactionList);

          })

  }



  updateData() {
    this.navCtrl.push("MyAccountPage");
  }
  emptywallet(){
    this.navCtrl.setRoot("RewardsPage");
  }
  backtologin(){
    this.navCtrl.setRoot("LoginPage");
  }

  togglePoint(){

    this._pointOpen = this._pointOpen?false:true;

  }
}

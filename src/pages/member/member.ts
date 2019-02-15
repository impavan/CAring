import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import JsBarcode from 'jsbarcode';
import * as _ from 'lodash';

// Import Providers.
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { LoaderProvider } from '../../providers/loader/loader';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { ConnectAuthProvider } from '../../providers/connect-auth/connect-auth';

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})

export class MemberPage {
  @ViewChild('barcode') barcode: ElementRef;
  @ViewChild('expiryPoints') expiryPointsModal;
  _auth: any;
  _totalAvailablePoints: number;
  _totalRedeemedPoints: number;
  loadedProfile: boolean = false;
  expirySchedule: any;
  expiryPointsLatest: any

  constructor(private events: Events,
    private navCtrl: NavController,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private loaderProvider: LoaderProvider,
    private userProvider: UserdataProvider,
    private connectAuthProvider: ConnectAuthProvider) {
      this._auth = localStorage.getItem('auth_token');
  }

  ionViewWillEnter() {
    if (this._auth) {
      JsBarcode(this.barcode.nativeElement, localStorage.getItem('phone'));
      this.getMyProfile();
    }
    this.events.publish('changeIcon', "MemberPage");
  }

  navTo(page) {
    this.navCtrl.push(page);
  }

  ionViewCanEnter() {
    if (this.authProvider.getAuthToken())
      return true;
    return false;
  }

  getMyProfile() {
    this.loaderProvider.presentLoadingCustom();
    this.connectAuthProvider.validateToken(localStorage.getItem('auth_token')).then(isTokenValid => {
      if (isTokenValid) {
        this.userProvider.getCustomerDetails().subscribe(customerdetails => {
          this.loaderProvider.dismissLoader();
          if (customerdetails.code === 200 && customerdetails.result.response && customerdetails.result.response.customers.customer) {
            let customerData = customerdetails.result.response;
            this.authProvider.setUser(customerData.customers);
            localStorage.setItem('userdetails', JSON.stringify(customerData.customers));
            this._totalAvailablePoints = this.authProvider.getMyCurrentPoints();
            this._totalRedeemedPoints = this.authProvider.getTotalRedeemedPoints();
            var schedule = this.authProvider.getexpirySchedule();
            console.log(schedule, "expirySchedule");
            if (schedule) {
              this.expirySchedule = _.sortBy(schedule, 'expiry_date');
              this.expiryPointsLatest = this.expirySchedule[0].points
              console.log(this.expirySchedule, "sortdata");
            }
            this.loadedProfile = true;
          } else {
            this.alertProvider.presentToast(customerdetails.message);
          }
        }, err => {
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

  goToRewards(section) {
    this.navCtrl.setRoot("RewardsPage", { selectTab: section });
  }
}
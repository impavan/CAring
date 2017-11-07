import { ACTIVATE_VOUCHER, UPDATE_PROFILE } from '../../url';
import { BASE_URL, BRAND_ID } from '../../config';
import { Platform, Events } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class ProfileProvider {
    profileSegment: any;
    

    constructor(private authProvider: AuthProvider,
        public platform: Platform,
        private events: Events,
        private http: Http) {
    }



    // claim a voucher
    claimMyVoucher(userdata) {
        let userData = new FormData();
        userData.append('BrandURLID', BRAND_ID);
        userData.append('mobile', localStorage.getItem('phone'));
        userData.append('email', this.authProvider.getUserEmailId());
        userData.append('voucher_id', userdata);
        let body = userData;
        return this.http.post(BASE_URL + ACTIVATE_VOUCHER, body, { headers: this.authProvider.getHeader() })
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }

    getUserTransaction() {
        let GET_TRANSACTION = "/mobile/transactionsummary?mobile=" + localStorage.getItem('phone') + "&BrandURLID=" + BRAND_ID;
        return this.http.get(BASE_URL + GET_TRANSACTION, { headers: this.authProvider.getHeader() })
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }

    UserLoggedIn() {
        this.events.publish('user:login', );
    }

    getAllRedeemedVouchers() {
    const VOUCHERS = "/mobile/customervouchers?mobile=" + this.authProvider.getUserMobileNo() + "&lang_code=" + "en";
    return this.http.get(BASE_URL + VOUCHERS, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

    //App rating 
    // RateMyApp() {
    //     this.appRate.preferences.storeAppURL = {
    //         ios: '3RGFD99U34.com.capillarytech.breadtalkihq',
    //         android: 'market://details?id=com.capillarytech.breadtalkihq',
    //     };
    //     this.appRate.navigateToAppStore();
    // }


    
}
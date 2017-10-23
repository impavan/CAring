import { ACTIVATE_VOUCHER, UPDATE_PROFILE } from '../../url';
import { Platform, Events } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Import Providers.
import { ApiProvider } from '../api/api';

@Injectable()
export class ProfileProvider {
    profileSegment: any;

    constructor(private authProvider: AuthProvider,
        private apiProvider: ApiProvider,
        public platform: Platform,
        private events: Events,
        private http: Http) {
    }

    // get a user details
    getMyProfile() {
        const PROFILE = "/mobile/myprofile?mobile=" + localStorage.getItem('phone') + "&BrandURLID=" + this.apiProvider.BRANDID;
        return this.http.get(this.apiProvider.BASEURL + PROFILE, { headers: this.authProvider.getHeader() })
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }

    // claim a voucher
    claimMyVoucher(userdata) {
        let userData = new FormData();
        userData.append('BrandURLID', this.apiProvider.BRANDID);
        userData.append('mobile', localStorage.getItem('phone'));
        userData.append('email', this.authProvider.getUserEmailId());
        userData.append('voucher_id', userdata);
        let body = userData;
        return this.http.post(this.apiProvider.BASEURL + ACTIVATE_VOUCHER, body, { headers: this.authProvider.getHeader() })
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }

    getUserTransaction() {
        let GET_TRANSACTION = "/mobile/transactionsummary?mobile=" + localStorage.getItem('phone') + "&BrandURLID=" + this.apiProvider.BRANDID;
        return this.http.get(this.apiProvider.BASEURL + GET_TRANSACTION, { headers: this.authProvider.getHeader() })
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }

    UserLoggedIn() {
        this.events.publish('user:login', );
    }

    //App rating 
    // RateMyApp() {
    //     this.appRate.preferences.storeAppURL = {
    //         ios: '3RGFD99U34.com.capillarytech.breadtalkihq',
    //         android: 'market://details?id=com.capillarytech.breadtalkihq',
    //     };
    //     this.appRate.navigateToAppStore();
    // }

    enrollToWifi() {
        let WIFI = "/mobile/enrollWifi?email=" + this.authProvider.getUserWifiID();
        return this.http.get(this.apiProvider.BASEURL + WIFI, { headers: this.authProvider.getHeader() })
            .do((res: Response) => res)
            .map((res: Response) => {
            });
    }
}
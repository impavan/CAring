import { ACTIVATE_VOUCHER, UPDATE_PROFILE} from '../../url';
import { BASE_URL, BRAND_ID } from '../../config';
import { Platform, Events } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { ApiProvider } from '../api/api';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class ProfileProvider {
    profileSegment: any;
    

    constructor(private authProvider: AuthProvider,
                private apiProvider:ApiProvider,    
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
        return this.http.post(this.apiProvider.BASE_URL + ACTIVATE_VOUCHER, body, { headers: this.authProvider.getHeader() })
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }

    getUserTransaction() {
        let GET_TRANSACTION = "mobile/transactionsummary?mobile=" + localStorage.getItem('phone') + "&BrandURLID=" + this.apiProvider.BRAND_ID;
        return this.http.get(this.apiProvider.BASE_URL + GET_TRANSACTION, { headers: this.authProvider.getHeader() })
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }

    UserLoggedIn() {
        this.events.publish('user:login', );
    }

    getAllRedeemedVouchers() {
        const VOUCHERS = "mobile/customervouchers?mobile=" + this.authProvider.getUserMobileNo() + "&BrandURLID=" + this.apiProvider.BRAND_ID +
            "&lang_code=" + "en";
    return this.http.get(this.apiProvider.BASE_URL + VOUCHERS, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
    }

    updateProfile(userdata) {
    
      let data = {
      first_name: userdata.firstname,  
      last_name:userdata.lastname,    
      email:userdata.email,
      old_email:userdata.old_email?userdata.old_email:userdata.email,
      mobile:userdata.mobile,
      BrandURLID:this.apiProvider.BRAND_ID,
      externalId:userdata.externalId,
      custom_fields: []
      
      }
      
    data.custom_fields = userdata.customFields[0];
    //   let body = data;
      return this.http
      .post(this.apiProvider.BASE_URL + UPDATE_PROFILE, data, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }  




    
}
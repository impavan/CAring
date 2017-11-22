import { EXPERIENCES, REDEEM_VOUCHERS, ACTIVATE_VOUCHER } from '../../url';
import { BASE_URL, BRAND_ID } from '../../config';
import { Http, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import { EN } from '../../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RewardsProvider {

  constructor(private authProvider: AuthProvider,
    private http: Http) {
  }

  // returns list of experiences or vouchers
  fetchAllExperiences() {
    return this.http.get(BASE_URL + EXPERIENCES + BRAND_ID, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
  }

  //redeem a voucher
  redeemVoucher(userdata) {
    let userData = new FormData();
    userData.append('mobile', localStorage.getItem('phone'));
    userData.append('points', userdata.points);
    userData.append('experience_id', userdata.experience_id);
    userData.append('BrandURLID', BRAND_ID);
    let body = userData;
    return this.http.post(BASE_URL + REDEEM_VOUCHERS, body, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //get all redeemed vouchers
  getAllRedeemedVouchers() {
    const VOUCHERS = "mobile/customervouchers?mobile=" + this.authProvider.getUserMobileNo() + "&lang_code=" + EN;
    return this.http.get(BASE_URL + VOUCHERS, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }


    claimMyVoucher(voucher_code) {
        let userData = {
            BrandURLID:BRAND_ID,
            mobile:localStorage.getItem('phone'),
            email:this.authProvider.getUserEmailId(),
            vouchers_id:voucher_code
        }
     
        return this.http.post(BASE_URL + ACTIVATE_VOUCHER, userData, { headers: this.authProvider.getHeader()})
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }
}
import { EXPERIENCES, REDEEM_VOUCHERS } from '../../url';
import { Http, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import { EN } from '../../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Import Providers.
import { ApiProvider } from '../api/api';

@Injectable()
export class RewardsProvider {

  constructor(private authProvider: AuthProvider,
    private apiProvider: ApiProvider,
    private http: Http) {
  }

  // returns list of experiences or vouchers
  fetchAllExperiences() {
    return this.http.get(this.apiProvider.BASEURL + EXPERIENCES + this.apiProvider.BRANDID, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
  }

  //redeem a voucher
  redeemVoucher(userdata) {
    let userData = new FormData();
    userData.append('mobile', localStorage.getItem('phone'));
    userData.append('points', userdata.points);
    userData.append('experience_id', userdata.experience_id);
    userData.append('BrandURLID', this.apiProvider.BRANDID);
    let body = userData;
    return this.http.post(this.apiProvider.BASEURL + REDEEM_VOUCHERS, body, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //get all redeemed vouchers
  getAllRedeemedVouchers() {
    const VOUCHERS = "/mobile/customervouchers?mobile=" + this.authProvider.getUserMobileNo() + "&lang_code=" + EN;
    return this.http.get(this.apiProvider.BASEURL + VOUCHERS, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }
}
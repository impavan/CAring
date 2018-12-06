import { EXPERIENCES, REDEEM_VOUCHERS, ACTIVATE_VOUCHER } from '../../url';
import { BASE_URL,STTARTER_BASE_URL, BRAND_ID } from '../../config';
import { Http, Response } from '@angular/http';
import { ApiProvider } from '../api/api';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import { EN } from '../../config';
import { PROMOTIONAL_VOUCHERS } from '../../url';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RewardsProvider {

  constructor(private authProvider: AuthProvider,
              private apiProvider:ApiProvider, 
    private http: Http) {
  }

  // returns list of experiences or vouchers
  fetchAllExperiences() {
    return this.http.get(this.apiProvider.BASE_URL + EXPERIENCES + this.apiProvider.BRAND_ID, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
  }
    
    getAllPromotions() {
    return this.http.get(STTARTER_BASE_URL + PROMOTIONAL_VOUCHERS + 'en')
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }

  //redeem a voucher
  redeemVoucher(userdata) {
    let userData = new FormData();
    userData.append('mobile', localStorage.getItem('phone'));
    userData.append('points', userdata.points);
    userData.append('experience_id', userdata.experience_id);
    userData.append('BrandURLID', this.apiProvider.BRAND_ID);
    let body = userData;
    return this.http.post(this.apiProvider.BASE_URL + REDEEM_VOUCHERS, body, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //get all redeemed vouchers
  getAllRedeemedVouchers() {
    const VOUCHERS = "mobile/customervouchers?mobile=" + this.authProvider.getUserMobileNo() + "&BrandURLID=" + this.apiProvider.BRAND_ID + "&lang_code=" + EN;
    return this.http.get(this.apiProvider.BASE_URL + VOUCHERS, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }


    claimMyVoucher(voucher_code) {
        let userData = {
            BrandURLID:this.apiProvider.BRAND_ID,
            mobile:localStorage.getItem('phone'),
            email:this.authProvider.getUserEmailId(),
            vouchers_id:voucher_code
        }
     
        return this.http.post(this.apiProvider.BASE_URL + ACTIVATE_VOUCHER, userData, { headers: this.authProvider.getHeader()})
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }
}
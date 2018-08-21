import { EXPERIENCES, REDEEM_VOUCHERS, ACTIVATE_VOUCHER } from '../../url';
import { BASE_URL,STTARTER_BASE_URL, BRAND_ID } from '../../config';
import { Http, Response } from '@angular/http';
import { ApiProvider } from '../api/api';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import { EN } from '../../config';
import { PROMOTIONAL_VOUCHERS } from '../../url';
import { LoaderProvider } from '../loader/loader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';


@Injectable()
export class RewardsProvider {

  constructor(private authProvider: AuthProvider,
              private apiProvider:ApiProvider, 
              private http: Http,private loader:LoaderProvider) {
  }

  // returns list of experiences or vouchers
  fetchAllExperiences() {
    this.loader.presentLoadingCustom();
    return this.http.get(this.apiProvider.BASE_URL + EXPERIENCES + this.apiProvider.BRAND_ID, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

  //redeem a voucher
  redeemVoucher(userdata) {
    this.loader.presentLoadingCustom();
    let userData = new FormData();
    userData.append('mobile', localStorage.getItem('phone'));
    userData.append('points', userdata.points);
    userData.append('experience_id', userdata.experience_id);
    userData.append('BrandURLID', this.apiProvider.BRAND_ID);
    let body = userData;
    return this.http.post(this.apiProvider.BASE_URL + REDEEM_VOUCHERS, body,
      { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

  //get all redeemed vouchers
  getAllRedeemedVouchers() {
    this.loader.presentLoadingCustom();
    const VOUCHERS = "mobile/customervouchers?mobile=" + this.authProvider.getUserMobileNo() + "&BrandURLID=" + this.apiProvider.BRAND_ID + "&lang_code=" + EN;
    return this.http.get(this.apiProvider.BASE_URL + VOUCHERS, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }


  claimMyVoucher(voucher_code) {
    this.loader.presentLoadingCustom();
        let userData = {
            BrandURLID:this.apiProvider.BRAND_ID,
            mobile:localStorage.getItem('phone'),
            email:this.authProvider.getUserEmailId(),
            vouchers_id:voucher_code
        }
     
        return this.http.post(this.apiProvider.BASE_URL + ACTIVATE_VOUCHER, userData, { headers: this.authProvider.getHeader()})
            .do((res: Response) => res)
            .map((res: Response) => res.json())
            .catch((err: Error) => Observable.throw(err))
            .finally(()=>this.loader.dismissLoader())
  }
  
  getAllPromotions() {
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + PROMOTIONAL_VOUCHERS + 'en')
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }
}
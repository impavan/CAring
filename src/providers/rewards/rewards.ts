import { CUSTOMER_VOUCHERS, CUSTOMER_EXPERIENCES, PURCHASE_EXPERIENCE, PROMOTIONAL_VOUCHERS, REDEEM_EXPERIENCE, CUSTOMER_TRANSACTIONS } from '../../url';
import { STTARTER_BASE_URL, BRAND_ID, CLIENT_KEY, CARING_CONNECT_BASE_URL } from '../../config';
import { Http, Response, Headers } from '@angular/http';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import moment from 'moment';

// Import all Providers.
import { AuthProvider } from '../auth/auth';
import { LoaderProvider } from '../loader/loader';

@Injectable()
export class RewardsProvider {
  public deviceId: string = null;
  public devicePlatform: string = null;
  public _headers: Headers = new Headers();
  public refreshKey: string = null;
  public retryCount: number = 0;

  constructor(public http: Http, private device: Device, private platform: Platform,
    private loader: LoaderProvider, private authProvider: AuthProvider) {
    this.platform.ready().then(() => {
      this.deviceId = (this.device.uuid) ? this.device.uuid : '';
      this.devicePlatform = (this.device.platform) ? this.device.platform : '';
      this._headers.append('Content-Type', 'application/json');
      this._headers.append('Accept', 'application/json');
    })
  }

  // Fetch the Experiences data using Caring Connect GetExperiences API.
  getExperiencesData() {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    const URL = `${CARING_CONNECT_BASE_URL}${CUSTOMER_EXPERIENCES}` + BRAND_ID;
    return this.http.get(URL, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  // API to Purchase an Experience using Caring Connect customer/purchaseexperience API.
  purchaseExperience(expData) {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    const URL = `${CARING_CONNECT_BASE_URL}${PURCHASE_EXPERIENCE}`;
    let data = {
      "points": expData.points,
      "experience_id": expData.experience_id,
      "BrandURLID": BRAND_ID
    };
    return this.http.post(URL, data, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  // API to Redeem an Experience using Caring Connect customer/activatevoucher API.
  redeemExperience(expData) {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    const URL = `${CARING_CONNECT_BASE_URL}${REDEEM_EXPERIENCE}`;
    let data = {
      "email": this.authProvider.getUserEmailId(),
      "voucher_id": expData.voucher_id,
      "BrandURLID": BRAND_ID
    }
    return this.http.post(URL, data, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  // Fetch all Customer Vouchers using Caring Connect customer/vouchers API.
  getCustomerVouchers() {
    console.log("::::::::::::::::::::Get Customer Vouchers::::::::::::::;;")
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    const URL = `${CARING_CONNECT_BASE_URL}${CUSTOMER_VOUCHERS}` + BRAND_ID;
    console.log(URL,':::::::::::::::::::::::::URL:::::::::::::::::::::::::')
    return this.http.get(URL, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  getUserTransactions() {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    const URL = `${CARING_CONNECT_BASE_URL}${CUSTOMER_TRANSACTIONS}`;
    return this.http.get(URL, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  // claimMyVoucher(voucher_code) {
  //   let userData = {
  //     BrandURLID: this.apiProvider.BRAND_ID,
  //     mobile: localStorage.getItem('phone'),
  //     email: this.authProvider.getUserEmailId(),
  //     vouchers_id: voucher_code
  //   }
  //   return this.http.post(this.apiProvider.BASE_URL + ACTIVATE_VOUCHER, userData, { headers: this.authProvider.getHeader() })
  //     .do((res: Response) => res)
  //     .map((res: Response) => res.json())
  //     .catch((err: Error) => Observable.throw(err))
  //     .finally(() => this.loader.dismissLoader())
  // }

  getAllPromotions() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    return this.http.get(STTARTER_BASE_URL + PROMOTIONAL_VOUCHERS + '&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, 'en')
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  getAllPromotionsById(id) {
    return this.http.get(STTARTER_BASE_URL + PROMOTIONAL_VOUCHERS + 'en' + '&deeplinkingidentifier=$eq:' + id)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }
}
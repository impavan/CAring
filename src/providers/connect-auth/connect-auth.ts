import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CLIENT_KEY, CARING_CONNECT_BASE_URL, PRIVATE_KEY } from '../../config';
import { Observable } from 'rxjs/Observable';
import { SEND_OTP, VALIDATE_OTP, REFRESH_TOKEN, GET_CUSTOMER, UPDATE_CUSTOMER, LOGOUT_CUSTOMER, REGISTER_CUSTOMER, 
  CUSTOMER_VOUCHERS,CUSTOMER_EXPERIENCES, PURCHASE_EXPERIENCE } from '../../url';
import { Device } from '@ionic-native/device';
import { LoaderProvider } from '../loader/loader';
import { AuthProvider } from '../auth/auth';
import NODERSA from 'node-rsa';
import * as jwe from 'node-webtokens';
import { BRAND_ID } from '../../config';

@Injectable()
export class ConnectAuthProvider {
  public deviceId: string = null;
  public devicePlatform: string = null;
  public _headers: Headers = new Headers();
  public refreshKey: string = null;
  public retryCount: number = 0;

  constructor(public http: Http, private device: Device, private platform: Platform, private loader: LoaderProvider, private authProvider: AuthProvider) {
    console.log('Hello ConnectAuthProvider Provider');
    this.platform.ready().then(() => {
      this.deviceId = (this.device.uuid) ? this.device.uuid : '';
      this.devicePlatform = (this.device.platform) ? this.device.platform : '';
      console.log(this.deviceId, "this.deviceId");
      console.log(this.device.platform, " this.device.platform");
      this._headers.append('Content-Type', 'application/json');
      this._headers.append('Accept', 'application/json');
    })
  }

  /**
   * Caring connect login
   * @param mobile 
   * 
   */
  // API for getting the OTP to login into the Application.
  public loginToCaringConnect(mobile): Observable<any> {
    this.loader.presentLoadingCustom();
    console.log(this.deviceId, "this.deviceId");
    const URL = `${CARING_CONNECT_BASE_URL}${SEND_OTP}`;
    let body = {
      phonenumber: mobile,
      deviceId: this.deviceId,
      client_code: CLIENT_KEY
    }
    return this.http.post(URL, body, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  // API for validating the OTP using Caring Connect Validate OTP API.
  public OTPCheckCaringConnect(mobile, otp): Observable<any> {
    this.loader.presentLoadingCustom();
    const URL = `${CARING_CONNECT_BASE_URL}${VALIDATE_OTP}`;
    let body = {
      phonenumber: mobile,
      otp: otp,
      deviceId: this.deviceId,
      client_code: CLIENT_KEY,
      device_os: this.devicePlatform
    }
    return this.http.post(URL, body, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  // Method to Validate the Token.
  public async validateToken(token) {
    if (token) {
      let parsedToken = await this.getUserParsedToken(token);
      console.log(parsedToken, "parsedToken")
      if (parsedToken.valid) {
        this.retryCount = 0;
        return true;
      } else {
        this.retryCount++;
        if (this.retryCount < 3) {
          let res = await this.checkToken(parsedToken);
          await res.subscribe(refreshedToken => {
            this.validateToken(refreshedToken);
            return;
          }, err => {
            return false
          })
        } else {
          console.log("false from count");
          return false;
        }
      }
    } else {
      return false;
    }
  }


  private async checkToken(parsedToken) {
    const refreshKey = parsedToken.payload.refresh_key;
    let refreshData = await this.refreshToken(refreshKey);
    return refreshData;
  }

  // API to fetch the Refresh Token by using Refresh Token API of Caring Connect.
  private refreshToken(refreshKey): Observable<any> {
    let URL = `${CARING_CONNECT_BASE_URL}${REFRESH_TOKEN}`;
    let body = {
      refresh_key: refreshKey,
      deviceid: this.deviceId
    }
    this._headers.append('x-user-token', this.authProvider.getAuthToken());
    this._headers.append('client_code', CLIENT_KEY);
    return this.http.post(URL, body, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  /**
   * To get mobile no from token
   * @param token - Token contains payload
   */
  public async getUserMobileNo(token) {
    let parsedToken = await this.getUserParsedToken(token);
    return parsedToken.payload.phonenumber;
  }

  /**
   * To decrypt a raw token
   * @param token - Raw Token
   */
  private async getUserParsedToken(token) {
    let keys = new NODERSA(PRIVATE_KEY);
    let pKey = await keys.exportKey('pkcs1-private-pem');
    let parsedToken = await jwe.parse(token).verify(pKey);
    return parsedToken;
  }

  // Fetch Customer Details for Caring Connect.
  getCustomerDetails() {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    const URL = `${CARING_CONNECT_BASE_URL}${GET_CUSTOMER}`;
    return this.http.get(URL, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
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

  // Fetch all Customer Vouchers using Caring Connect customer/vouchers API.
  getCustomerVouchers() {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    const URL = `${CARING_CONNECT_BASE_URL}${CUSTOMER_VOUCHERS}`;
    return this.http.get(URL, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  logoutCustomer() {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    this._headers.set('session_id', this.authProvider.getSession());
    const URL = `${CARING_CONNECT_BASE_URL}${LOGOUT_CUSTOMER}`;
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

  // Registration API for Caring Connect.
  registerCustomer(userData) {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    const URL = `${CARING_CONNECT_BASE_URL}${REGISTER_CUSTOMER}`;
    let regData = {
      "first_name": userData.fname,
      "last_name": userData.lname,
      "phonenumber": userData.mobile,
      "email": userData.email,
      "deviceId": this.deviceId,
      "device_os": this.devicePlatform
    };
    return this.http.post(URL, regData, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  // Update Customer Details for Caring Connect.
  updateCustomerDetails(customerDetails, isCustomUpdate) {
    let token = this.authProvider.getAuthToken();
    this._headers.set('x-user-token', token);
    this._headers.set('client_code', CLIENT_KEY);
    let data = {
      first_name: customerDetails.fname,
      last_name: customerDetails.lname,
      phonenumber: customerDetails.mobile,
      custom_fields: []
    }
    console.log(customerDetails.customFields,':::::::::::::::::::::::::;')
    if(customerDetails.customFields.length > 0) {
      data.custom_fields = customerDetails.customFields[0];
    } else {
      data.custom_fields.push({ name: "mobile_validated", value: "Yes" });
    if (isCustomUpdate)
      data.custom_fields.push({ name: "app_login", value: "1" });
    }
    let body = data;
    const URL = `${CARING_CONNECT_BASE_URL}${UPDATE_CUSTOMER}`;
    return this.http.post(URL, body, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }
}

import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoaderProvider } from '../loader/loader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import { Platform } from 'ionic-angular';
import { CLIENT_KEY, CARING_CONNECT_BASE_URL } from '../../config';
import { SEND_OTP, VALIDATE_OTP, GET_CUSTOMER, UPDATE_CUSTOMER, LOGOUT_CUSTOMER, REGISTER_CUSTOMER } from '../../url';
import { Device } from '@ionic-native/device';
import { AuthProvider } from '../auth/auth';

@Injectable()

export class UserdataProvider {
  public OTPCount: number = 0;
  public deviceId: string = null;
  public devicePlatform: string = null;
  public _headers: Headers = new Headers();
  public refreshKey: string = null;
  public retryCount: number = 0;

  constructor(public http: Http, private device: Device, private platform: Platform, private loader: LoaderProvider, private authProvider: AuthProvider) {
    this.platform.ready().then(() => {
      this.deviceId = (this.device.uuid) ? this.device.uuid : '';
      this.devicePlatform = (this.device.platform) ? this.device.platform : '';
      console.log(this.deviceId, "this.deviceId");
      console.log(this.device.platform, " this.device.platform");
      this._headers.append('Content-Type', 'application/json');
      this._headers.append('Accept', 'application/json');
    })
  }

  // API for getting the OTP to login into the Application.
  public loginToCaringConnect(mobile): Observable<any> {
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
    console.log(customerDetails.customFields, ':::::::::::::::::::::::::;')
    if (customerDetails.customFields.length > 0) {
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
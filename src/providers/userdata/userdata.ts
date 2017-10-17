import { LOGIN, OTP, REGISTRATION, FEEDBACK } from '../../url';
import { Http, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Import Providers.
import { ApiProvider } from '../api/api';

@Injectable()
export class UserdataProvider {

  constructor(private apiProvider: ApiProvider,
    private auth: AuthProvider,
    private http: Http) {
  }

  //Login user
  userLogin(phoneNum: string) {
    let userData = new FormData();
    userData.append('BrandURLID', this.apiProvider.BRANDID);
    userData.append('external_id', phoneNum);
    userData.append('lang_code', 'en');
    userData.append('device_id', localStorage.getItem('push_token'));
    userData.append('device_type', localStorage.getItem('model'));
    userData.append('device_version', localStorage.getItem('version'));
    let body = userData;
    return this.http
      .post(this.apiProvider.BASEURL + LOGIN, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //send Otp
  userOTP(otp: string, phoneNum: any, isRegistration: string) {
    let userData = new FormData();
    userData.append('BrandURLID', this.apiProvider.BRANDID);
    userData.append('external_id', phoneNum);
    userData.append('is_social', '0');
    userData.append('otp', otp);
    userData.append('is_registration', isRegistration);
    let body = userData;
    return this.http
      .post(this.apiProvider.BASEURL + OTP, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //Register user
  userRegistration(userdata) {
    let userData = new FormData();
    userData.append('first_name', userdata.fname);
    userData.append('last_name', userdata.lname);
    userData.append('gender', userdata.gender);
    userData.append('email', userdata.email);
    userData.append('mobile', userdata.mobile);
    userData.append('BrandURLID', this.apiProvider.BRANDID);
    userData.append('dob', userdata.dob);
    userData.append('device_id', localStorage.getItem('push_token'));
    userData.append('device_type', localStorage.getItem('model'));
    userData.append('device_version', localStorage.getItem('version'));
    if (userdata.profilePic.length > 0)
      userData.append('profile_image', JSON.stringify(userdata.profilePic));
    let body = userData;
    return this.http
      .post(this.apiProvider.BASEURL + REGISTRATION, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  sendMail(userdata) {
    let userData = new FormData();
    userData.append('username', userdata.username);
    userData.append('mobile_number', userdata.mobile_number);
    userData.append('message', userdata.message);
    userData.append('BrandURLID', this.apiProvider.BRANDID);
    return this.http
      .post(this.apiProvider.BASEURL + FEEDBACK, userData, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }
}
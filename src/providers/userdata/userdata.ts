import { LOGIN, OTP, REGISTRATION, FEEDBACK } from '../../url';
import { BASE_URL, BRAND_ID } from '../../config';
import { Http, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserdataProvider {

  constructor(private auth: AuthProvider,
    private http: Http) {
  }

  //Login user
  userLogin(phoneNum: string) {
    let userData = new FormData();
    userData.append('BrandURLID', BRAND_ID);
    userData.append('external_id', phoneNum);
    userData.append('lang_code', 'en');
    // userData.append('device_id', localStorage.getItem('push_token'));
    // userData.append('device_type', localStorage.getItem('model'));
    // userData.append('device_version', localStorage.getItem('version'));
    let body = userData;
    return this.http
      .post(BASE_URL + LOGIN, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //send Otp
  userOTP(otp: string, phoneNum: any, isRegistration: string) {
    let userData = new FormData();
    userData.append('BrandURLID', BRAND_ID);
    userData.append('external_id', phoneNum);
    userData.append('is_social', '0');
    userData.append('otp', otp);
    userData.append('is_registration', isRegistration);
    let body = userData;
    return this.http
      .post(BASE_URL + OTP, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //Register user
  userRegistration(userdata) {
    console.log(userdata,'===================userdata=========================')

    let data = {
      first_name:userdata.fname,
      email:userdata.email,
      mobile:userdata.mobile,
      BrandURLID:BRAND_ID,
      externalId:userdata.externalId,
      custom_field:[]
    }

    if(userdata.profilePic){
      data.custom_field.push({ profile_image:userdata.profilePic})
    }
    // let userData = new FormData();
    // userData.append('first_name', userdata.fname);
    // userData.append('last_name', userdata.lname);
    // // userData.append('gender', userdata.gender);
    // userData.append('email', userdata.email);
    // userData.append('mobile', userdata.mobile);
    // userData.append('BrandURLID', BRAND_ID);
    // userData.append('dob', userdata.dob);
    // userData.append('device_id', localStorage.getItem('push_token'));
    // userData.append('device_type', localStorage.getItem('model'));
    // userData.append('device_version', localStorage.getItem('version'));

   

    
    // if (userdata.profilePic.length > 0)
    //   userData.append('profile_image', JSON.stringify(userdata.profilePic));
    let body = data;
    return this.http
      .post(BASE_URL + REGISTRATION, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  sendMail(userdata) {
    let userData = new FormData();
    userData.append('username', userdata.username);
    userData.append('mobile_number', userdata.mobile_number);
    userData.append('message', userdata.message);
    userData.append('BrandURLID', BRAND_ID);
    return this.http
      .post(BASE_URL + FEEDBACK, userData, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }
}
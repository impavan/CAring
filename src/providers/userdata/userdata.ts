import { LOGIN, OTP, REGISTRATION, UPDATE_PROFILE } from '../../url';
import { BASE_URL, BRAND_ID } from '../../config';
import { Http, Response } from '@angular/http';
import { ApiProvider } from '../api/api';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserdataProvider {

  constructor(private auth: AuthProvider,
              private apiProvider:ApiProvider,  
              private http: Http) {
  }

  //Login user
  userLogin(phoneNum: string) {
    let userData = new FormData();
    userData.append('BrandURLID', this.apiProvider.BRAND_ID);
    userData.append('IdetentifierKey', 'mobile');
    userData.append('IdetentifierValue', phoneNum);
    userData.append('NotificationType', 'mobile');
    userData.append('lang_code', 'en');
    let body = userData;
    return this.http
      .post(this.apiProvider.BASE_URL + LOGIN, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //send Otp
  userOTP(otp: string, phoneNum: any, isRegistration: string) {
    let userData = new FormData();
    userData.append('BrandURLID', this.apiProvider.BRAND_ID);
    userData.append('IdetentifierKey', 'mobile');
    userData.append('IdetentifierValue', phoneNum);
    userData.append('is_social', '0');
    userData.append('otp', otp);
    userData.append('is_registration', isRegistration);
    let body = userData;
    return this.http
      .post(this.apiProvider.BASE_URL + OTP, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }

  //Register user
  userRegistration(userdata) {

    let data = {
      first_name:userdata.fname,
      last_name:userdata.lname,
      email:userdata.email,
      mobile:userdata.mobile,
      BrandURLID:this.apiProvider.BRAND_ID,
      externalId:userdata.externalId,
      custom_fields:[]
    }
     data.custom_fields.push({name:"mobile_validated", value:"Yes", type:"string"});
    let body = data;
    return this.http
      .post(this.apiProvider.BASE_URL + REGISTRATION, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }


      // get a user details
    getMyProfile() {
        const PROFILE = "/mobile/myprofile?mobile=" + localStorage.getItem('phone') + "&BrandURLID=" + this.apiProvider.BRAND_ID;
        return this.http.get(this.apiProvider.BASE_URL + PROFILE, { headers: this.auth.getHeader()})
            .do((res: Response) => res)
            .map((res: Response) => res.json());
    }


  // update user details
    updateProfile(userdata) {

      let data = {
      
      first_name:userdata.fname,
      lastname:userdata.lname,
      email:userdata.email,
      old_email:userdata.old_email?userdata.old_email:userdata.email,
      mobile:userdata.mobile,
      BrandURLID:this.apiProvider.BRAND_ID,
      externalId:userdata.externalId,
      custom_fields: []
      
      }
      
    data.custom_fields.push({name:"mobile_validated", value:"Yes", type:"string"});
      let body = data;
      return this.http
      .post(this.apiProvider.BASE_URL + UPDATE_PROFILE, body, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }


}
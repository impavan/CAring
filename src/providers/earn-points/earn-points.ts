import { STORES, EARN_POINTS } from '../../url';
import { BASE_URL, BRAND_ID } from '../../config';
import { Http, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class EarnPointsProvider {
  headers_map = {};
  _auth: any;

  constructor(private auth: AuthProvider,
    private http: Http) {
    this._auth = localStorage.getItem('auth_token')
    if (this._auth) {
      this.auth.setHeader();
    }
  }

  // API call for fetching the Store data tobe displayed in Earn Points screen.
  fetchStoreData() {
    return this.http.get(BASE_URL + STORES)
      .map((res: Response) => res.json());
  }

  // API call for earning the points by submitting the Receipt Details.
  fetchEarnPointsData(userdata) {
    let formData = new FormData();
    formData.append('store_id', userdata.store_id);
    formData.append('bill_number', userdata.bill_number);
    formData.append('bill_amount', userdata.bill_amount);
    formData.append('bill_date', userdata.bill_date);
    formData.append('BrandURLID', BRAND_ID);
    formData.append('username', (this.auth.getUserFirstName() + ' ' + this.auth.getUserLastName()));
    formData.append('mobile', localStorage.getItem('phone'));
    formData.append('bill_images', JSON.stringify(userdata.bill_images));
    return this.http.post(BASE_URL + EARN_POINTS, formData, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }
}
import { STORES, EARN_POINTS } from '../../url';
import { Http, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Import Providers.
import { ApiProvider } from '../api/api';

@Injectable()
export class EarnPointsProvider {
  headers_map = {};
  _auth: any;

  constructor(private apiProvider: ApiProvider,
    private auth: AuthProvider,
    private http: Http) {
    this._auth = localStorage.getItem('auth_token')
    if (this._auth) {
      this.auth.setHeader();
    }
  }

  // API call for fetching the Store data tobe displayed in Earn Points screen.
  fetchStoreData() {
    return this.http.get(this.apiProvider.BASEURL + STORES)
      .map((res: Response) => res.json());
  }

  // API call for earning the points by submitting the Receipt Details.
  fetchEarnPointsData(userdata) {
    let formData = new FormData();
    formData.append('store_id', userdata.store_id);
    formData.append('bill_number', userdata.bill_number);
    formData.append('bill_amount', userdata.bill_amount);
    formData.append('bill_date', userdata.bill_date);
    formData.append('BrandURLID', this.apiProvider.BRANDID);
    formData.append('username', (this.auth.getUserFirstName() + ' ' + this.auth.getUserLastName()));
    formData.append('mobile', localStorage.getItem('phone'));
    formData.append('bill_images', JSON.stringify(userdata.bill_images));
    return this.http.post(this.apiProvider.BASEURL + EARN_POINTS, formData, { headers: this.auth.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json());
  }
}
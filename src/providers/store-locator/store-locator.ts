import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

//All providers goes here
import { STORE_BASE_URL } from '../../config';
import { LoaderProvider } from '../loader/loader';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StoreLocatorProvider {
  contentHeaders: any;
  lang = 'en';
  authorization: any = 'eyJtb2IiOjkxODAwMDAwMDAwLCJkZXYiOiIxMTExMTExMSIsIm9yZyI6IkNBUklORyIsImFsZyI6IkhTMjU2In0.eyJ1aWQiOiI0NDYiLCJpc3MiOiJDQVBJTExBUlkgVEVDSE5PTE9HSUVTIiwiaXNjIjoidHJ1ZSIsImlhdCI6MTUxMTI2MzIxNiwicm9sIjoiVklFVyJ9.-nJHVD4zkCMzUYAjt9bP_bgsrqdbGUBs6Uhsb2UUAXI';
  deviceId: any = '11111111';
  brand: any = 'CARING';
  mobile: any = 91800000000;

  constructor(public http: Http, private loader: LoaderProvider) {
    this.contentHeaders = new Headers();
    this.contentHeaders = new Headers();
    this.contentHeaders.set('Access-Control-Allow-Origin', '*');
    this.contentHeaders.set('cap_authorization', this.authorization);
    this.contentHeaders.set('cap_device_id', this.deviceId);
    this.contentHeaders.set('cap_brand', this.brand);
    this.contentHeaders.set('cap_mobile', this.mobile);
    this.contentHeaders.set('Content-Type', 'application/json');
  }


  getAllStoreLocation(lat, lng, limit) {
    this.loader.presentLoadingCustom();
    return this.http.get(STORE_BASE_URL + 'latitude=' + lat + '&longitude=' + lng + '&distance=5000000&size=50000', { headers: this.contentHeaders })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }
}
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//All providers goes here
import { STORE_BASE_URL} from '../../config';
import { stores } from '../../url';

@Injectable()
export class StoreLocatorProvider {
  contentHeaders: any;
  lang = 'en';

  authorization: any = 'eyJtb2IiOjkxODAwMDAwMDAwLCJkZXYiOiIxMTExMTExMSIsIm9yZyI6IkNBUklORyIsImFsZyI6IkhTMjU2In0.eyJ1aWQiOiI0NDYiLCJpc3MiOiJDQVBJTExBUlkgVEVDSE5PTE9HSUVTIiwiaXNjIjoidHJ1ZSIsImlhdCI6MTUxMTI2MzIxNiwicm9sIjoiVklFVyJ9.-nJHVD4zkCMzUYAjt9bP_bgsrqdbGUBs6Uhsb2UUAXI';
  deviceId:any='11111111';
  brand:any = 'CARING';
  mobile: any = 91800000000;

  constructor(public http: Http) {
    this.contentHeaders = new Headers();
    this.contentHeaders = new Headers();
    this.contentHeaders.set('Access-Control-Allow-Origin','*');
    this.contentHeaders.set('cap_authorization', this.authorization);
    this.contentHeaders.set('cap_device_id', this.deviceId);
    this.contentHeaders.set('cap_brand', this.brand);
    this.contentHeaders.set('cap_mobile', this.mobile);
    this.contentHeaders.set('Content-Type', 'application/json'); 
  }

  // getStores() {
  //   return this.http.get(STTARTER_BASE_URL + stores + this.lang, this.contentHeaders)
  //     .map((res: Response) => res)
  //     .do((res: Response) => res.json())
  //     .map((res: Response) => res.json())
  // }



  getAllStoreLocation(lat, lng,limit){
      
      return this.http.get(STORE_BASE_URL + 'latitude=' + lat + '&longitude=' + lng + '&distance=5000000&size=50000',{ headers:this.contentHeaders })
            .do((res: Response) => res)
            .map((res: Response)=> res.json());

  }



}
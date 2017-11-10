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

  authorization:any = 'eyJtb2IiOjkxODAwMDAwMDAwMCwiZGV2IjoiMTExMTExMTEiLCJvcmciOiJBUFBMRSIsImFsZyI6IkhTMjU2In0.eyJ1aWQiOiI0NDYiLCJpc3MiOiJDQVBJTExBUlkgVEVDSE5PTE9HSUVTIiwiaXNjIjoidHJ1ZSIsIm9nYyI6WyIxNTA2MTV8dGVzdC5kZW1vLjEiXSwiZXhwIjoxNTEwNjczNzc3LCJpYXQiOjE1MDk5NTM3NzcsInJvbCI6IlZJRVcifQ.nFtdPHNqsMf3L-8rzmgqBIG5zmHO29rVgMxXVSa0pEo';
  deviceId:any='11111111';
  brand:any = 'APPLE';
  mobile:any = 918000000000

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



  getAllStoreLocation(lat, lng){
      
      return this.http.get(STORE_BASE_URL + 'latitude=' + lat + '&longitude=' + lng,{ headers:this.contentHeaders })
            .do((res: Response) => res)
            .map((res: Response)=> res.json());

  }



}
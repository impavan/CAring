import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//All providers goes here
import { ConfigProvider } from '../../providers/config/config';
import { stores, happenings, instoreactivities } from '../../url';

@Injectable()
export class StoreLocatorProvider {
  contentHeader: any;
  lang = 'en';

  constructor(public http: Http, private configProvider: ConfigProvider) {
    console.log('Hello StoreLocatorProvider Provider');
    this.contentHeader = new Headers();
    this.contentHeader.set('Content-Type', 'application/json');
  }

  getStores() {
    return this.http.get(this.configProvider.sttarterBaseUrl + stores + this.lang, this.contentHeader)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }
}
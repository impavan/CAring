import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//All providers goes here
import { STTARTER_BASE_URL } from '../../config';
import { stores } from '../../url';

@Injectable()
export class StoreLocatorProvider {
  contentHeader: any;
  lang = 'en';

  constructor(public http: Http) {
    this.contentHeader = new Headers();
    this.contentHeader.set('Content-Type', 'application/json');
  }

  getStores() {
    return this.http.get(STTARTER_BASE_URL + stores + this.lang, this.contentHeader)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }
}
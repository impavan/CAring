import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class StoresProvider {
  CONTENT_BASE_URL: any = "https://app.sttarter.com:9443/contentsystem/e4e009abf54577f493010e8274557e52/storedirectory/?lang=en";
  contentHeaders: any;

  constructor(private http: Http) {
    this.contentHeaders = new Headers();
  }

  getAllStores() {
    this.contentHeaders.set('Content-Type', 'application/json');
    return this.http.get(this.CONTENT_BASE_URL, { headers: this.contentHeaders })
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res) => res.json())
  }
}
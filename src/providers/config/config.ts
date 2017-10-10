import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  sttarterBaseUrl:string;
  constructor(public http: Http) {
    console.log('Hello ConfigProvider Provider');
   this.sttarterBaseUrl  = "http://dev.sttarter.com:9000/contentsystem/61b8b3ec861330a06e92d162f507d273/";
  }

}

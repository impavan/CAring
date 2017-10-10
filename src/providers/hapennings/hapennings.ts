import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

//All providers goes here
import { ConfigProvider } from '../../providers/config/config';
import { stores, happenings, instoreactivities } from '../../url';

/*
  Generated class for the HapenningsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HapenningsProvider {

  contentType: any;
  lang = 'en';
  constructor(public http: Http, private configProvider: ConfigProvider) {
    console.log('Hello HapenningsProvider Provider');
    this.contentType = new Headers();
    this.contentType.set('Content-Type', 'application/json');
  }


  getStores() {

    return this.http.get(this.configProvider.sttarterBaseUrl + stores + this.lang  , this.contentType)

   
        .map((res:Response) => res)

        .do((res:Response)=> res.json())

        .map((res:Response) => res.json())
  }



  getHappenings(){

      return this.http.get(this.configProvider.sttarterBaseUrl + happenings + this.lang, this.contentType)

        .map((res:Response) => res)

        .do((res:Response)=> res.json())

        .map((res:Response) => res.json())

      

  }



   public getInStoreActivities(){

      return this.http.get(this.configProvider.sttarterBaseUrl + 'instoreactivities?lang=' + this.lang, this.contentType)

        .map((res:Response) => res)

        .do((res:Response)=> res.json())

        .map((res:Response) => res.json())

      

  }



}

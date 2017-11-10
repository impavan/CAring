import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

//All providers goes here

import { STTARTER_BASE_URL } from '../../config';
import { stores, happenings, instoreactivities } from '../../url';

@Injectable()
export class HapenningsProvider {
  contentType: any;
  lang = 'en';

  constructor(public http: Http) {

    this.contentType = new Headers();
    this.contentType.set('Content-Type', 'application/json');
  }


//get home page banner image
getHomeBanner(){

    return this.http.get( STTARTER_BASE_URL + 'homebanners?lang=' + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())

}
  //Get all the happenings
  getHappenings() {
    return this.http.get(STTARTER_BASE_URL + happenings + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }

  //Get all Instore Activities
  public getInStoreActivities() {
    return this.http.get(STTARTER_BASE_URL + 'instoreactivities?lang=' + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }

  //Get all promotions
  public getPromotions() {
    return this.http.get(STTARTER_BASE_URL + 'promotions?lang=' + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }

  public getPromotionsBrochureLink() {
    return this.http.get(STTARTER_BASE_URL + 'links?lang=' + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }

  //Get all health info
  public getHealthInfo() {
    return this.http.get(STTARTER_BASE_URL + 'healthinfo?lang=' + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }

    //Get the data of About Us.
    getAboutUsData() {
      return this.http.get(STTARTER_BASE_URL + 'aboutus?lang=' + this.lang, this.contentType)
        .map((res: Response) => res)
        .do((res: Response) => res.json())
        .map((res: Response) => res.json())
    }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

//All providers goes here

import { STTARTER_BASE_URL } from '../../config';
import { HAPPENINGS, HOME_BANNER, INSTORE, PROMOTIONS, HEALTH_INFO, FAQ } from '../../url';

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

    return this.http.get( STTARTER_BASE_URL + HOME_BANNER + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())

}
  //Get all the happenings
  getHappenings() {
    return this.http.get(STTARTER_BASE_URL + HAPPENINGS + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }

  //Get all Instore Activities
  public getInStoreActivities() {
    return this.http.get(STTARTER_BASE_URL + INSTORE + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }

  //Get all promotions
  public getPromotions() {
    return this.http.get(STTARTER_BASE_URL + PROMOTIONS + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }



  //Get all health info
  public getHealthInfo() {
    return this.http.get(STTARTER_BASE_URL + HEALTH_INFO + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
  }


    //Get FAQ.
    getFAQ() {
      return this.http.get(STTARTER_BASE_URL + FAQ + this.lang, this.contentType)
        .map((res: Response) => res)
        .do((res: Response) => res.json())
        .map((res: Response)=> res.json())
      }
    
}

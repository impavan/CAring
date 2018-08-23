import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';


//All providers goes here

import { STTARTER_BASE_URL } from '../../config';
import { HAPPENINGS, HOME_BANNER, INSTORE, PHARMACIST, PROMOTIONS, HEALTH_INFO, FAQ } from '../../url';
import { LoaderProvider } from '../loader/loader';

@Injectable()
export class HapenningsProvider {
  contentType: any;
  lang = 'en';

  constructor(public http: Http,private loader:LoaderProvider) {

    this.contentType = new Headers();
    this.contentType.set('Content-Type', 'application/json');
  }


//get home page banner image
getHomeBanner(){
  this.loader.presentLoadingCustom();
    return this.http.get( STTARTER_BASE_URL + HOME_BANNER + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  

}
  //Get all the happenings
  getHappenings() {
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + HAPPENINGS + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

  //Get all Instore Activities
  public getInStoreActivities() {
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + INSTORE + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

  public getpharmacistService(){
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + PHARMACIST + this.lang, this.contentType)
    .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

  //Get all promotions
  public getPromotions() {
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + PROMOTIONS + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }



  //Get all health info
  public getHealthInfo() {
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + HEALTH_INFO + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }


    //Get FAQ.
  getFAQ() {
    this.loader.presentLoadingCustom();
      return this.http.get(STTARTER_BASE_URL + FAQ + this.lang, this.contentType)
        .map((res: Response) => res)
        .do((res: Response) => res.json())
        .map((res: Response) => res.json())
        .catch((err: Error) => Observable.throw(err))
        .finally(()=>this.loader.dismissLoader())
      }
    
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import moment from 'moment';


//All providers goes here

import { STTARTER_BASE_URL } from '../../config';
import { HAPPENINGS, HOME_BANNER, INSTORE, PHARMACIST, PROMOTIONS, HEALTH_INFO, FAQ, QUICK_ACCESS, STORE_BANNERS, HOT_DEALS } from '../../url';
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
  let currentDate = moment().format('YYYY-MM-DD 00:00:00');
  console.log(currentDate,"currentdate in banners")
  this.loader.presentLoadingCustom();
    return this.http.get( STTARTER_BASE_URL + HOME_BANNER + this.lang +'&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  

}
  //Get all the happenings
  getHappenings() {

    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + HAPPENINGS + this.lang + '&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate , this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

  getHappeningsById(id) {
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + HAPPENINGS + this.lang + '&deeplinkingidentifier=$eq:'  + id , this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

  //Get all Instore Activities
  public getInStoreActivities() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    //  this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + INSTORE + this.lang +'&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      // .finally(()=>this.loader.dismissLoader())
  }

    //Get all Instore Activities By Id
    public getInStoreActivitiesById(id) {
      
      //  this.loader.presentLoadingCustom();
      return this.http.get(STTARTER_BASE_URL + INSTORE + this.lang + '&deeplinkingidentifier=$eq:' + id , this.contentType)
        .map((res: Response) => res)
        .do((res: Response) => res.json())
        .map((res: Response) => res.json())
        .catch((err: Error) => Observable.throw(err))
        // .finally(()=>this.loader.dismissLoader())
    }

  public getpharmacistService(){
    //  this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + PHARMACIST + this.lang, this.contentType)
    .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      //  .finally(()=>this.loader.dismissLoader())
  }

  public getpharmacistServiceById(id){
    //  this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + PHARMACIST + this.lang + '&deeplinkingidentifier=$eq:' + id , this.contentType)
    .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      //  .finally(()=>this.loader.dismissLoader())
  }

  //Get all promotions
  public getPromotions() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + PROMOTIONS + this.lang + '&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

    //Get promotion by Id
    public getPromotionById(id) {
      this.loader.presentLoadingCustom();
      return this.http.get(STTARTER_BASE_URL + PROMOTIONS + this.lang + '&deeplinkingidentifier=$eq:' + id , this.contentType)
        .map((res: Response) => res)
        .do((res: Response) => res.json())
        .map((res: Response) => res.json())
        .catch((err: Error) => Observable.throw(err))
        .finally(()=>this.loader.dismissLoader())
    }
  



  //Get all health info
  public getHealthInfo() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + HEALTH_INFO + this.lang + '&publishingstartdate=$lte:' + currentDate +  '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(()=>this.loader.dismissLoader())
  }

   //Get all health info by id
   public getHealthInfoById(id) {
    this.loader.presentLoadingCustom();
    return this.http.get(STTARTER_BASE_URL + HEALTH_INFO + this.lang + '&deeplinkingidentifier=$eq:'  + id , this.contentType)
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
      // http://experiences.capillarytech.com/api/mobileapi/customer/get?identifier_key=mobile&brand_identifier=CARINGLIVE&identifier_value=60126183270


      getQuickAccess(){

      return this.http.get(STTARTER_BASE_URL + QUICK_ACCESS, this.contentType)
        .map((res: Response) => res)
        .do((res: Response) => res.json())
        .map((res: Response) => res.json())
        .catch((err: Error) => Observable.throw(err))
        .finally(()=>console.log("done"));
      }


      getStoreBanners(){

        return this.http.get(STTARTER_BASE_URL + STORE_BANNERS, this.contentType)
          .map((res: Response) => res)
          .do((res: Response) => res.json())
          .map((res: Response) => res.json())
          .catch((err: Error) => Observable.throw(err))
          .finally(()=>console.log("done"));
        }

        getHotDeals(){

          return this.http.get(STTARTER_BASE_URL + HOT_DEALS, this.contentType)
            .map((res: Response) => res)
            .do((res: Response) => res.json())
            .map((res: Response) => res.json())
            .catch((err: Error) => Observable.throw(err))
            .finally(()=>console.log("done"));
          }

      }


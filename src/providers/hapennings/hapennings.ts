import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import moment from 'moment';
import OAuths from 'oauth-signature';

//All providers goes here
import { STTARTER_BASE_URL } from '../../config';
import { HAPPENINGS, HOME_BANNER, INSTORE, PHARMACIST, PROMOTIONS, HEALTH_INFO, FAQ, QUICK_ACCESS, STORE_BANNERS, HOT_DEALS, STORE_QUICK_ACCESS } from '../../url';
import { LoaderProvider } from '../loader/loader';

import { maninUrl, oauthConsumerKey, outhSignMethod, authTimeStamp, } from '../../url'


@Injectable()
export class HapenningsProvider {
  contentType: any;
  lang = 'en';

  constructor(public http: Http, private loader: LoaderProvider) {
    this.contentType = new Headers();
    this.contentType.set('Content-Type', 'application/json');
  }

  //get home page banner image
  getHomeBanner() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    console.log(currentDate, "currentdate in banners")
    return this.http.get(STTARTER_BASE_URL + HOME_BANNER + this.lang + '&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  //Get all the happenings
  getHappenings() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    return this.http.get(STTARTER_BASE_URL + HAPPENINGS + this.lang + '&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  getHappeningsById(id) {
    return this.http.get(STTARTER_BASE_URL + HAPPENINGS + this.lang + '&deeplinkingidentifier=$eq:' + id, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  //Get all Instore Activities
  public getInStoreActivities() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    return this.http.get(STTARTER_BASE_URL + INSTORE + this.lang + '&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
    // .finally(()=>this.loader.dismissLoader())
  }

  //Get all Instore Activities By Id
  public getInStoreActivitiesById(id) {
    return this.http.get(STTARTER_BASE_URL + INSTORE + this.lang + '&deeplinkingidentifier=$eq:' + id, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
    // .finally(()=>this.loader.dismissLoader())
  }

  public getpharmacistService() {
    return this.http.get(STTARTER_BASE_URL + PHARMACIST + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
    //  .finally(()=>this.loader.dismissLoader())
  }

  public getpharmacistServiceById(id) {
    return this.http.get(STTARTER_BASE_URL + PHARMACIST + this.lang + '&deeplinkingidentifier=$eq:' + id, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
    //  .finally(()=>this.loader.dismissLoader())
  }

  //Get all promotions
  public getPromotions() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    return this.http.get(STTARTER_BASE_URL + PROMOTIONS + this.lang + '&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  //Get promotion by Id
  public getPromotionById(id) {
    return this.http.get(STTARTER_BASE_URL + PROMOTIONS + this.lang + '&deeplinkingidentifier=$eq:' + id, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  //Get all health info
  public getHealthInfo() {
    let currentDate = moment().format('YYYY-MM-DD 00:00:00');
    return this.http.get(STTARTER_BASE_URL + HEALTH_INFO + this.lang + '&publishingstartdate=$lte:' + currentDate + '&publishingenddate=$gte:' + currentDate, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  //Get all health info by id
  public getHealthInfoById(id) {
    return this.http.get(STTARTER_BASE_URL + HEALTH_INFO + this.lang + '&deeplinkingidentifier=$eq:' + id, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  //Get FAQ.
  getFAQ() {
    return this.http.get(STTARTER_BASE_URL + FAQ + this.lang, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }
  // http://experiences.capillarytech.com/api/mobileapi/customer/get?identifier_key=mobile&brand_identifier=CARINGLIVE&identifier_value=60126183270


  getQuickAccess() {
    return this.http.get(STTARTER_BASE_URL + QUICK_ACCESS, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => console.log("done"));
  }

  getStoreQuickAccess() {

    return this.http.get(STTARTER_BASE_URL + STORE_QUICK_ACCESS, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => console.log("done"));
  }


  getStoreBanners() {

    return this.http.get(STTARTER_BASE_URL + STORE_BANNERS, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => console.log("done"));
  }

  getHotDeals() {
    return this.http.get(STTARTER_BASE_URL + HOT_DEALS, this.contentType)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => console.log("done"));
  }

  public getNounce(length):string {
    let nonce = '';
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return nonce;
}

  public getOuthSignature(requestType: string,): string {
    let finalURL
    const time = new Date().getTime();
    const oAuthData = {
        oauth_consumer_key: oauthConsumerKey,
        oauth_signature_method: outhSignMethod,
        oauth_timestamp: time,
        oauth_nonce: this.getNounce(6),
        oauth_version: '1.0',
    }
    const signature = OAuths.generate(requestType, oAuthData);
    return finalURL =  '?oauth_consumer_key=' + oAuthData.oauth_consumer_key + '&oauth_token' + '&' + 'oauth_signature_method=' + oAuthData.oauth_signature_method + '&' + 'oauth_timestamp=' + oAuthData.oauth_timestamp + '&oauth_nonce=' + oAuthData.oauth_nonce + '&oauth_version=' + oAuthData.oauth_version + '&oauth_signature=' + signature;

  }


 validateToken(){
  //console.log(token, "token recieved");
  //const url = `Customer/${env.merchantId}/${token}/ValidateToken`;
  const urlWithOAuthSign = `${maninUrl}${this.getOuthSignature('GET')}`;
  return this.http.get(urlWithOAuthSign + `&searchCriteria[filter_groups][0][filters][0][field]=news_from_date&searchCriteria[filter_groups][0][filters][0][value]={{$timestamp}}&searchCriteria[filter_groups][0][filters][0][condition_type]=gt&searchCriteria[filter_groups][0][filters][1][field]=news_to_Date&searchCriteria[filter_groups][0][filters][1][value]={{$timestamp}}&searchCriteria[filter_groups][0][filters][1][condition_type]=lt&searchCriteria[pageSize]=10&searchCriteria[currentPage]=1&searchCriteria[sortOrders][0][field]=news_from_date&searchCriteria[sortOrders][0][direction]=asc&searchCriteria[sortOrders][1][field]=news_to_date`);
}

//&searchCriteria[filter_groups][0][filters][0][field]=news_from_date&searchCriteria[filter_groups][0][filters][0][value]={{$timestamp}}&searchCriteria[filter_groups][0][filters][0][condition_type]=gt&searchCriteria[filter_groups][0][filters][1][field]=news_to_Date&searchCriteria[filter_groups][0][filters][1][value]={{$timestamp}}&searchCriteria[filter_groups][0][filters][1][condition_type]=lt&searchCriteria[pageSize]=10&searchCriteria[currentPage]=1&searchCriteria[sortOrders][0][field]=news_from_date&searchCriteria[sortOrders][0][direction]=asc&searchCriteria[sortOrders][1][field]=news_to_date

}
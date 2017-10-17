import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

//All providers goes here
import { ConfigProvider } from '../../providers/config/config';
import { stores, happenings, instoreactivities } from '../../url';


@Injectable()
export class HapenningsProvider {

  contentType: any;
  lang = 'en';

  
  constructor(public http: Http, private configProvider: ConfigProvider) {
    console.log('Hello HapenningsProvider Provider');
    this.contentType = new Headers();
    this.contentType.set('Content-Type', 'application/json');
  }




//Get all the happenings
  getHappenings(){

      return this.http.get(this.configProvider.sttarterBaseUrl + happenings + this.lang, this.contentType)

        .map((res:Response) => res)

        .do((res:Response)=> res.json())

        .map((res:Response) => res.json())

      

  }



//Get all Instore Activities
   public getInStoreActivities(){

      return this.http.get(this.configProvider.sttarterBaseUrl + 'instoreactivities?lang=' + this.lang, this.contentType)

        .map((res:Response) => res)

        .do((res:Response)=> res.json())

        .map((res:Response) => res.json())

      

  }


//Get all promotions
  public getPromotions(){

      return this.http.get(this.configProvider.sttarterBaseUrl + 'promotions?lang=' + this.lang, this.contentType)

        .map((res:Response) => res)

        .do((res:Response)=> res.json())

        .map((res:Response) => res.json())

      

  }

  public getPromotionsBrochureLink(){

          return this.http.get(this.configProvider.sttarterBaseUrl + 'links?lang=' + this.lang, this.contentType)

        .map((res:Response) => res)

        .do((res:Response)=> res.json())

        .map((res:Response) => res.json())


  }



//Get all health info
   public getHealthInfo(){

      return this.http.get(this.configProvider.sttarterBaseUrl + 'healthinfo?lang=' + this.lang, this.contentType)

        .map((res:Response) => res)

        .do((res:Response)=> res.json())

        .map((res:Response) => res.json())

      

  }




}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Platform, Events } from 'ionic-angular';
import { STTARTER_BASE_URL } from '../../config';
import { SETTINGS } from '../../url';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AlertProvider } from '../alert/alert';
import { ExceptionHandlerProvider } from '../exception-handler/exception-handler';
import moment from 'moment';

@Injectable()
export class ApiProvider {
  public BASE_URL: any;
  public BRAND_ID: any;
  public ACCOUNT_ID: any;
  public isLive: boolean;
  public WEBENGAGE_ID: any;
  // make enviroment true for live build and false for dev build
  public environment: boolean = false;
  public NEWS_LETTER_URL: any;
  public PROMOTION_URL: any;
  public privacyPolicy: any = [];
  public termsAndConditions: any = [];
  public eshop_client_code: string;
  public currentDate = moment().format('YYYY-MM-DD');

  constructor(public http: Http,
    private platform: Platform,
    private events: Events,
    private alertProvider: AlertProvider,
    private exceptionProvider: ExceptionHandlerProvider) {

    console.log(this.currentDate, "currentDate is here");
    this.platform.ready().then(() => {
      this.settingsData();
      this.events.subscribe('noconnection', (connectiondata) => {
        console.log("connection event", connectiondata);
        if (connectiondata == false)
          this.settingsData();
      })
    });
  }

  getSettings() {
    return this.http.get(STTARTER_BASE_URL + SETTINGS)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json());
  }

  settingsData() {
    this.getSettings().subscribe(res => {
      if (res.status == 200) {
        let baseUrl = res.data.find(r => r.key == 'serverurl');
        let brandId = res.data.find(r => r.key == 'brandid');
        let webengageId = res.data.find(r => r.key == 'webengageid');
        let promotionsurl = res.data.find(r => r.key == 'promotionscatalogurl');
        let newsurl = res.data.find(r => r.key == 'newsletterurl');
        let privacy = res.data.find(r => r.key == 'privacypolicy');
        let terms = res.data.find(r => r.key == 'termsandconditions');
        let eshop_code = res.data.find(r => r.key == 'eshop_client_code')
        this.BASE_URL = baseUrl.value;
        this.BRAND_ID = brandId.value;
        this.WEBENGAGE_ID = webengageId.value;
        this.PROMOTION_URL = promotionsurl.value;
        this.NEWS_LETTER_URL = newsurl.value;
        this.privacyPolicy = privacy.value;
        this.termsAndConditions = terms.value;
        this.eshop_client_code = eshop_code.value;
      } else {
        this.alertProvider.presentToast('Something went wrong');
      }
    }, err => {
      this.exceptionProvider.excpHandler(err);
    });
  }
}
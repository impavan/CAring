import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { MESSAGE_HISTORY } from '../../url';
import { Http, Response } from '@angular/http';
import { ApiProvider } from '../api/api';
import { AuthProvider } from '../auth/auth';
import { LoaderProvider } from '../loader/loader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
declare var webengage;

@Injectable()
export class PushProvider {
  deepRoute: any;

  constructor(private http: Http,
    private platform: Platform,
    private apiProvider: ApiProvider,
    private authProvider: AuthProvider, private loader: LoaderProvider) {
    this.deepRoute = [
      { route: 'profile', component: 'MemberPage' },
      { route: 'newrewards', component: 'RewardsPage' },
      { route: 'happenings', component: 'HappeningsPage' },
      { route: 'promotions', component: 'PromotionsPage' },
      { route: 'healthinfo', component: 'HealthInfoPage' },
      { route: 'instoreactivity', component: 'InStorePage' },
      { route: 'pointssummary', component: 'MemberPage' },
      { route: 'myrewards', component: 'RewardsPage' },
      { route: 'stores', component: 'StoreLocatorPage' },
      { route: 'promotion-details', component: 'PromotionDetailsPage' },
      { route: 'pharmacist-details', component: 'PharmacistDetailPage' },
      { route: 'happen-details', component: 'HappenDetailsPage' },
      { route: 'health-details', component: 'HealthDetailsPage' },
      { route: 'instoredetails', component: 'InstoredetailsPage' },
      { route: 'promotion-voucher-details', component: 'PromotionVoucherDetailsPage' }
    ];
  }

  //login to webengage  
  loginToWebengage(phoneNum) {
    webengage.user.login(phoneNum);
  }

  //logout from webengage
  logoutWebengage() {
    webengage.user.logout();
  }

  // save customer basic information to webengage  
  saveCustomerInfoToWebengage(data) {
    setTimeout(() => {
      if (data.customer[0].firstname)
        webengage.user.setAttribute('we_first_name', data.customer[0].firstname);
      if (data.customer[0].lastName)
        webengage.user.setAttribute('we_last_name', data.customer[0].lastName);
      if (data.customer[0].email)
        webengage.user.setAttribute('we_email', data.customer[0].email);
      if (data.customer[0].mobile)
        webengage.user.setAttribute('we_phone', data.customer[0].mobile);
    }, 2000)
  }

  // get all push message
  getAllMessages(phone: string) {
    this.loader.presentLoadingCustom();
    let platform = this.platform.is('android') ? 'android' : 'ios';
    return this.http.get(this.apiProvider.BASE_URL + MESSAGE_HISTORY + phone + '&accountID=~134105201&BrandURLID=' + this.apiProvider.BRAND_ID + '&commChannelType=' + platform, { headers: this.authProvider.getHeader() })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }


  //returns deep link path

  getDeepLinkPath(deeplink) {
    console.log(deeplink, "deeplink in push")
    return new Promise(resolve => {
      if (deeplink.includes(':')) {
        let deepArray = deeplink.split(':');
        console.log("deeparray", deepArray)
        let page = this.deepRoute.filter(data => data.route == deepArray[0]);
        console.log("page", page)
        let returndata = {
          page: page[0].component,
          route: page[0].route,
          value: deepArray[1]
        };
        console.log(returndata, ":::::::::::::::returndata")
        resolve(returndata);
      }
      else {
        let page = this.deepRoute.filter(data => data.route == deeplink);
        console.log(page, "page")
        // let returndata = page;
        let returndata = {
          page: page[0].component,
          route: page[0].route,
          value: ''
        }
        resolve(returndata);
      }
    })
  }

  // getDeepLinkPath(deeplink) {
  //   console.log(deeplink,"deeplink in push")
  //   let deeplink_data = deeplink.destination.substr(1);
  //   return new Promise(resolve => {


  //     if (deeplink_data.includes(':')) { 

  //           let deepArray = deeplink_data.split(':');
  //           console.log("deeparray",deepArray)
  //           let page = this.deepRoute.filter(data => data.route == deepArray[0]);
  //           console.log("page",page)

  //           let returndata = {

  //                 page: page[0].component,
  //                 route: page[0].route,
  //                 value: deepArray[1],
  //                 id:deeplink._id
  //           };
  //           console.log(returndata,":::::::::::::::returndata")
  //           resolve(returndata);

  //       } 
  //     else {

  //       let page = this.deepRoute.filter(data => data.route == deeplink_data);
  //       console.log(page,"page")
  //      // let returndata = page;

  //         let returndata = {
  //           page: page[0].component,
  //           route: page[0].route,
  //           value:'',
  //           id:deeplink._id
  //         }
  //         resolve (returndata);
  //     }

  //   })  

  // }
}
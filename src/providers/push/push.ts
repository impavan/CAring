import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { MESSAGE_HISTORY } from '../../url';
import { Http, Response } from '@angular/http';
import { ApiProvider } from '../api/api';
import { AuthProvider } from '../auth/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';





declare var webengage;

@Injectable()
export class PushProvider {

  deepRoute: any;  

  constructor(private http: Http,
              private platform:Platform,  
              private apiProvider: ApiProvider,
              private authProvider: AuthProvider) {
    
  this.deepRoute = [
    
      { route: 'profile', component: 'MemberPage' },
      { route: 'newrewards', component: 'RewardsPage' },
      { route: 'happenings', component: 'HappeningsPage' },
      { route: 'promotions', component: 'PromotionsPage' },
      { route: 'healthinfo', component: 'HealthInfoPage' },
      { route: 'instoreactivity', component: 'InStorePage' },
      { route: 'pointssummary', component: 'MemberPage' },
      { route: 'myrewards', component: 'RewardsPage' },
      { route: 'stores', component: 'StoreLocatorPage' }

    ];

              }



//login to webengage  
  loginToWebengage(phoneNum){
    webengage.user.login(phoneNum);
  }

  //logout from webengage
  logoutWebengage(){
    webengage.user.logout();
  }

// save customer basic information to webengage  
  saveCustomerInfoToWebengage(data){
    
    setTimeout(() => {

      if(data.customer[0].firstname)
            webengage.user.setAttribute('we_first_name', data.customer[0].firstname)
      if(data.customer[0].lastName)
            webengage.user.setAttribute('we_last_name', data.customer[0].lastName)
      if(data.customer[0].email)
            webengage.user.setAttribute('we_email', data.customer[0].email)
      if(data.customer[0].mobile)
            webengage.user.setAttribute('we_phone', data.customer[0].mobile)
      
    },2000)
     
  }



// get all push message
  getAllMessages(phone: string) {
    let platform = this.platform.is('android') ? 'android' : 'ios';
    console.log(platform);
    return this.http.get(this.apiProvider.BASE_URL + MESSAGE_HISTORY + phone + '&accountID=' + this.apiProvider.WEBENGAGE_ID +
        '&BrandURLID=' + this.apiProvider.BRAND_ID + '&commChannelType='+ platform, { headers:this.authProvider.getHeader() })
        .do((res: Response) => res)
        .map((res: Response) => res.json());
    
  }


  //returns deep link path

  getDeepLinkPath(deeplink) {
    
    return new Promise(resolve => {

      if (deeplink.includes(':')) { 
          
            let deepArray = deeplink.split(':');
            let page = this.deepRoute.filter(data => data.route == deepArray[0]);
          
            let returndata = {

                  page: page[0].component,
                  route: page[0].route,
                  value: deepArray[1]
            };
      
            resolve(returndata);

        } 
      else {
        
        let page = this.deepRoute.filter(data => data.route == deeplink);
        
          let returndata = {
            page: page[0].component,
            route: page[0].route,
            value:''
          }
          resolve (returndata);
      }
      
    })  
    
  }





}

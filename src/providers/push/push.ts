import { Injectable } from '@angular/core';
declare var webengage;

@Injectable()
export class PushProvider {
  deepRoute: any;

  constructor() {
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

  //returns deep link path
  getDeepLinkPath(deeplink) {
    console.log(deeplink, "deeplink in push")
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
      } else {
        let page = this.deepRoute.filter(data => data.route == deeplink);
        let returndata = {
          page: page[0].component,
          route: page[0].route,
          value: ''
        }
        resolve(returndata);
      }
    })
  }
}
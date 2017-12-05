import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Deeplinks } from '@ionic-native/deeplinks';

/*
  Generated class for the PushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var webengage;

@Injectable()
export class PushProvider {

  constructor(public http: Http, public platform: Platform,
              public deeplinks: Deeplinks) {
    console.log('Hello PushProvider Provider');
  }

  // pushEvent() {
  //   if (!this.platform.is('cordova')) {
  //     console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
  //     return;
  //   }

  //   webengage.push.onClick((deeplink, customData)=> {
  //   console.log("push clicked");
  //   console.log(deeplink);
  //   console.log(customData);
  // });
  //   webengage.engage();

  //   this.deeplinks.routeWithNavController(this.nav, {
  //         '/profile': 'MemberPage',
  //         '/newrewards': 'RewardsPage',
  //         '/happenings': 'HappeningsPage',
  //         '/promotions': 'PromotionsPage',
  //         '/healthinfo': 'HealthInfoPage',
  //         '/instoreactivity': 'InStorePage',
  //         '/pointssummary': 'MemberPage',
  //         '/myrewards': 'RewardsPage',
  //       }).subscribe((match) => {
  //       // match.$route - the route we matched, which is the matched entry from the arguments to route()
  //       // match.$args - the args passed in the link
  //       // match.$link - the full link data
  //   console.log('Successfully matched route', match);
  // }, (nomatch) => {
  //   // nomatch.$link - the full link data
  //   console.error('Got a deeplink that didn\'t match', nomatch);
  // });
  // }

  loginToWebengage(phoneNum){
    webengage.user.login(phoneNum);
  }

  saveCustomerInfoToWebengage(data){
    
    setTimeout(() => {

       webengage.user.setAttribute('we_first_name', data.customer[0].firstname);
       webengage.user.setAttribute('we_last_name', data.customer[0].lastName); 
       webengage.user.setAttribute('we_email', data.customer[0].email);
       webengage.user.setAttribute('we_phone', data.customer[0].mobile);
      
    },2000)
     
  }


  logoutWebengage(){
    webengage.user.logout();
  }

}

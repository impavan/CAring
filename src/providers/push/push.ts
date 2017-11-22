import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var webengage;

@Injectable()
export class PushProvider {

  constructor(public http: Http, public platform:Platform) {
    console.log('Hello PushProvider Provider');
  }

  pushEvent() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }

    webengage.push.onClick((deeplink, customData)=> {
    console.log("push clicked");
    console.log(deeplink);
    console.log(customData);
  });
    webengage.engage();
  }

  loginToWebengage(phoneNum){
    webengage.user.login(phoneNum);
  }

  saveCustomerInfoToWebengage(data){
     let userInfo = {
       firstName:data.customer[0].firstname,
       lastName:data.customer[0].lastname,

     }

     setTimeout(()=>{

       webengage.user.setAttribute(userInfo)

     },3000);
  }


  logoutWebengage(){
    webengage.user.logout();
  }

}

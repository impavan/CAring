import { Injectable } from '@angular/core';





declare var webengage;

@Injectable()
export class PushProvider {

  constructor() {
  }



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

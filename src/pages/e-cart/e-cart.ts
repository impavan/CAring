import { Component } from '@angular/core';
import { IonicPage, NavController,Events } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-e-cart',
  templateUrl: 'e-cart.html',
})
export class ECartPage {

  constructor(
              private events: Events,
              public navCtrl: NavController, 
    private inAppBrowser: InAppBrowser) {
    
      let inAppOpt:InAppBrowserOptions = {
        clearcache: 'yes',
        hardwareback:'yes'
      }
  
      let browser = this.inAppBrowser.create('http://estore.caring2u.com/','_self',inAppOpt);
      
      let closebrowser = browser.on('exit').subscribe(() => {
        
        browser.close();
         closebrowser.unsubscribe();
        this.navCtrl.setRoot('HomePage');
    
      });
     
  
      this.events.publish('changeIcon',"ECartPage");
    
  }



  ionViewWillEnter() {
    

    
  }

}

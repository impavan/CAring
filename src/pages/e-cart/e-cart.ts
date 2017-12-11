import { Component } from '@angular/core';
import { IonicPage, NavController,Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';


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
    
  }



  ionViewWillEnter(){

    let browser = this.inAppBrowser.create('http://estore.caring2u.com/');
    
    browser.on('exit').subscribe(() => {
      
      this.navCtrl.setRoot('HomePage');

    })

    this.events.publish('changeIcon',"ECartPage");
    
  }

}

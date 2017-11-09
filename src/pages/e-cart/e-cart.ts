import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ECartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-e-cart',
  templateUrl: 'e-cart.html',
})
export class ECartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private inAppBrowser:InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ECartPage');
  }

  ionViewWillEnter(){

    let browser = this.inAppBrowser.create('http://estore.caring2u.com/');
    browser.on('exit').subscribe(()=>{
      this.navCtrl.setRoot('HomePage');

    })
    
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {


  tab1Root = "PromotionsPage";
  tab2Root = "PromotionsPage";
  tab3Root = "PromotionsPage";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private inAppBrowser:InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  goto(page) {
    this.navCtrl.setRoot(page);
  }

  gotoEcart(){

      this.inAppBrowser.create('http://estore.caring2u.com/');

  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {


  isClicked:boolean=false;
  constructor(public navCtrl: NavController, 

              private inAppBrowser:InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  goto(page,event:any) {
    this.isClicked = true;
    this.navCtrl.setRoot(page);
    console.log(page);
    console.log(event);


  }

  gotoEcart(){
    
      this.inAppBrowser.create('http://estore.caring2u.com/');

  }
}

import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

// @ViewChild('myTabs')tabs:Tabs;
  index:number;
  tab1Root = "HomePage";
  tab2Root = "StoreLocatorPage";
  tab3Root = "RewardsPage";
  tab4Root = "MemberPage";
  tab5Root = "ECartPage";
   
    



  isClicked:boolean=false;
  constructor(public navCtrl: NavController, 
              private navParams:NavParams,
              private inAppBrowser:InAppBrowser) {

                


      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
  ionViewDidEnter(){
    
      // this.index = this.navParams.get('index');
      //           console.log(this.index);
      //           if(this.index == 4){
      //             this.navCtrl.setRoot("HappeningsPage");
      //           }else{
      //               this.tabs.select(this.index + 0);
      //           }

                
               

  }

  goto(page,event:any) {
    this.isClicked = true;
    this.navCtrl.setRoot(page);
    console.log(page);
    console.log(event);


  }
   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }


  gotoEcart(){
    
      this.inAppBrowser.create('http://estore.caring2u.com/');

  }
}

import { Component, ViewChild,} from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs,Events} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

 @ViewChild('login')LoginModal;
  index:number;
isActivePage:any;

myTabs:Array<{label:string,icon:string,component:any,active:boolean}>
   
    



  isClicked:boolean=false;
  constructor(public navCtrl: NavController, 
              private navParams:NavParams,
              private inAppBrowser:InAppBrowser,
              private events:Events) { 


                this.myTabs = [
                  {label:'Home',icon:'iconc-home',component:"HomePage", active:false},
                  {label:'Location',icon:'iconc-map',component:"StoreLocatorPage", active:false},
                  {label:'Rewards',icon:'iconc-gift',component:"RewardsPage", active:false},
                  {label:'Member',icon:'iconc-id-card',component:"MemberPage",active:false},
                  {label:'eStore',icon:'iconc-cart',component:"ECartPage", active:false}

                  ]

                 this.isActivePage = this.myTabs[0];
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
   this.isActivePage=page;
    this.navCtrl.setRoot(page.component).then(canEnter=>{
      if(canEnter == false)
      this.events.publish('login', false);
    })
    


  }
   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }

 

  gotoEcart(){
    
      this.inAppBrowser.create('http://estore.caring2u.com/');

  }

  checkActive(page) {
   return page == this.isActivePage;
  }
}

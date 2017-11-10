import { Component, ViewChild,} from '@angular/core';
import { IonicPage, NavController, Events} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

 @ViewChild('login')LoginModal;
  index:number;


  myTabs:Array<{label:string,icon:string,component:any,active:boolean}>
 

  constructor(public navCtrl: NavController,
              private inAppBrowser:InAppBrowser,
              private events:Events) { 


                this.myTabs = [
                  {label:'Home',icon:'iconc-home',component:"HomePage", active:false},
                  {label:'Location',icon:'iconc-map',component:"StoreLocatorPage", active:false},
                  {label:'Rewards',icon:'iconc-gift',component:"RewardsPage", active:false},
                  {label:'Member',icon:'iconc-id-card',component:"MemberPage",active:false},
                  {label:'eStore',icon:'iconc-cart',component:"ECartPage", active:false}

                  ]

                 this.activePage();
  }

 
 

  goto(page,event:any) {
  
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



  activePage(){

        this.events.subscribe('changeIcon',component=>{
          console.log("in side event", component)
          this.myTabs.map(data=>{
            if(data.component == component)
              data.active = true;
              else
              data.active = false;
          })
        });

  }
}

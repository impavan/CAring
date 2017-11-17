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
  myTabs:Array<{label:string,icon:string,component:any,active:boolean}>
 

  constructor(public navCtrl: NavController,
              private inAppBrowser:InAppBrowser,
              private events:Events) { 


              this.myTabs = [
                
                  {label:'Home',icon:'tabiconc-home',component:"HomePage", active:false},
                  {label:'Location',icon:'tabiconc-location',component:"StoreLocatorPage", active:false},
                  {label:'Vouchers',icon:'tabiconc-rewards',component:"RewardsPage", active:false},
                  {label:'Member',icon:'tabiconc-members',component:"MemberPage",active:false},
                  {label:'eStore',icon:'tabiconc-estore',component:"ECartPage", active:false}

              ]

                 this.activePage();
  }

 
 

  goto(page,event:any) {
  
    this.navCtrl.setRoot(page.component).then(canEnter => {
      
      if(canEnter == false)
        this.events.publish('login', false);
      
    })
     
  }


 

  gotoEcart(){
    
      this.inAppBrowser.create('http://estore.caring2u.com/');

  }



  activePage(){

        this.events.subscribe('changeIcon',component=>{
          
          this.myTabs.map(data=>{ data.component == component?data.active = true: data.active = false
            
          })
        });

  }
}

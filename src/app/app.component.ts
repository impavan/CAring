import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';





// Import Providers.
import { ApiProvider } from '../providers/api/api';
import { AuthProvider } from '../providers/auth/auth';
import { AlertProvider } from '../providers/alert/alert';
import { PushProvider } from '../providers/push/push';
import { NetworkProvider } from '../providers/network/network';

declare var webengage;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('nointernet')NoInternetModal;
  @ViewChild('login')LoginModal;
  _auth = localStorage.getItem("auth_token");
  
  rootPage: any =  this._auth?"HomePage":"LoginPage";
  _userName:any="";
  pages: Array<{ title: string, component: any, index: number, icon:string, ionicon:string }>;

  constructor(private platform: Platform, 
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private alertProvider:AlertProvider,
    private screenOrientation: ScreenOrientation,
    public events: Events,
    public pushProvider: PushProvider,
    public apiProvider:ApiProvider,
    public networkprovider: NetworkProvider) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', index:0, icon:"iconc-home",ionicon:'' },
      { title: 'Member', component: 'MemberPage', index:3,icon:"iconc-id-card",ionicon:'' },
      { title: 'Vouchers', component: 'RewardsPage', index:2,icon:"iconc-gift",ionicon:''},
      { title: 'Promotions', component: 'PromotionsPage' , index:3,icon:"iconc-bag",ionicon:''},
      { title: 'Happenings', component: 'HappeningsPage', index: 4, icon: "iconc-megaphone", ionicon: '' },
      { title: 'Health Info', component: 'HealthInfoPage', index:6, icon:"iconc-book",ionicon:''},
      { title: 'Location', component: 'StoreLocatorPage', index:1 ,icon:"iconc-map",ionicon:''},
      
      // { title: 'Message', component: 'MessagesPage', index:7,icon:"iconc-chat",ionicon:''},
    ];

    if (this._auth) {
        
        this.getUser();
    }


    this.events.subscribe('user:login', (user) => {

      if (user) {
        this.getUser();

      } else{
           this._auth = '';
      }
   
    })

        
  }
      
 
  initializeApp() {

    this.platform.ready().then(() => {
      if(this.platform.is('cordova'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      
      if (this._auth) {
        let userdata = localStorage.getItem('userdetails');
        this.authProvider.setUser(JSON.parse(userdata));
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.noConnectionEvent();
      this.notLoggedIn();
      this.pushEvent();
 
    });
  }

  openPage(page) {

    this.nav.setRoot(page.component, { index: page.index }).then(canEnter => {
      
          if(canEnter==false)
          this.events.publish('login', false);
    })
  }

  getUserDetails() {
     
    this._userName = this.authProvider.getUserFirstName();
    
  }

  getUser() {
    
         this._auth = localStorage.getItem("auth_token");
         let customerData = localStorage.getItem('userdetails');
         let data = JSON.parse(customerData);
         this.authProvider.setUser(data);
         this.getUserDetails();
  }

 

  openSettings() {
    
    this.nav.setRoot('MyAccountPage');

  }



  gotoLogin() {
    this.nav.setRoot("LoginPage");
    this.LoginModal.close();
    
  }  
  
  noConnectionEvent(){

    this.events.subscribe("noconnection", data => {
      
      if(data== true)
      this.NoInternetModal.open();

    });

  }

  notLoggedIn() {
    
    this.events.subscribe('login', data => {
       
                  this.openLoginModal();
    })

  }




  closeNoInternetModal() {

      this.NoInternetModal.close();
  }

//opens modal if user has not logged In and trying to access members page and redemption  
  openLoginModal() {
    
    this.LoginModal.open();
  }

//close login modal  
  closeLoginModal() {
    
    this.LoginModal.close();
  }


  pushEvent() {

    // let deepRoute = [
    
    //   { route: 'profile', component: 'MemberPage' },
    //   { route: 'newrewards', component: 'RewardsPage' },
    //   { route: 'happenings', component: 'HappeningsPage' },
    //   { route: 'promotions', component: 'PromotionsPage' },
    //   { route: 'healthinfo', component: 'HealthInfoPage' },
    //   { route: 'instoreactivity', component: 'InStorePage' },
    //   { route: 'pointssummary', component: 'MemberPage' },
    //   { route: 'myrewards', component: 'RewardsPage' },
    //   { route: 'stores', component: 'StoreLocatorPage' }

    // ];

    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }

    webengage.push.onClick((deeplink, customData) => {

      this.pushProvider.getDeepLinkPath(deeplink).then((navdata) => {
        console.log(navdata);
          this.nav.setRoot(navdata['page'],{deeplink:navdata['route'], id:navdata['value']});
      })
        
  });
    webengage.engage();
 
  }
}

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';




// Import Providers.
import { AuthProvider } from '../providers/auth/auth';
import { AlertProvider } from '../providers/alert/alert';
import { PushProvider } from '../providers/push/push';
import { NetworkProvider } from '../providers/network/network';

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
    public pushProvider:PushProvider,
    public networkprovider: NetworkProvider) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', index:0, icon:"iconc-home",ionicon:'' },
      { title: 'Member', component: 'MemberPage', index:3,icon:"iconc-id-card",ionicon:'' },
      { title: 'Vouchers', component: 'RewardsPage', index:2,icon:"iconc-gift",ionicon:''},
      { title: 'Promotions', component: 'PromotionsPage' , index:3,icon:"iconc-bag",ionicon:''},
      { title: 'Happenings', component: 'HappeningsPage', index:4 ,icon:"iconc-megaphone",ionicon:''},
      { title: 'Store Locator', component: 'StoreLocatorPage', index:1 ,icon:"iconc-map",ionicon:''},
      { title: 'Health Info', component: 'HealthInfoPage', index:6, icon:"iconc-book",ionicon:''},
      { title: 'Message', component: 'MessagesPage', index:7,icon:"iconc-chat",ionicon:''},
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

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      
      if (this._auth) {
        let userdata = localStorage.getItem('userdetails');
        this.authProvider.setUser(JSON.parse(userdata));
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.noConnectionEvent();
      this.notLoggedIn();
    });
    this.pushProvider.pushEvent();

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

  // gotoLogin() {
    
  //   this.nav.setRoot("LoginPage");
    
  // }

  openSettings() {
    
    this.nav.setRoot('MyAccountPage');

  }

  // logout() {
    
  //   localStorage.removeItem('auth_token');
  //   localStorage.removeItem('phoneNum');
  //   this.events.publish('user:login', false);
  //   this.alertProvider.presentToast("You have been logged out..!")
  //   this.nav.setRoot("LoginPage");

  // }

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

  openLoginModal() {
    
    this.LoginModal.open();
  }

  closeLoginModal() {
    
    this.LoginModal.close();
  }
}

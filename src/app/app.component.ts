import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Events } from 'ionic-angular';


// Import Providers.
import { AuthProvider } from '../providers/auth/auth';
import { AlertProvider } from '../providers/alert/alert';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  _auth = localStorage.getItem("auth_token");
  rootPage: any =  this._auth?"HomePage":"LoginPage";
  // isUserLoggedIn:any =this._auth?true:false;
  pages: Array<{ title: string, component: any, index: number }>;

  constructor(private platform: Platform, 
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private alertProvider:AlertProvider,
    private screenOrientation: ScreenOrientation,
    public events:Events) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', index:0 },
      { title: 'Member', component: 'MemberPage', index:3 },
      { title: 'Rewards', component: 'RewardsPage', index:2},
      { title: 'Promotions', component: 'PromotionsPage' , index:3},
      { title: 'Happenings', component: 'HappeningsPage', index:4 },
      { title: 'Store Locator', component: 'StoreLocatorPage', index:1 },
      { title: 'Health Info', component: 'HealthInfoPage', index:6 },
      { title: 'Feedback', component: 'FeedbackPage', index:7 },
      { title: 'About', component: 'AboutPage', index:8 },
    ];



        this.events.subscribe('user:login', (user) => {
      if (user) {
         this._auth = localStorage.getItem("auth_token");
      
        }else{
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {index:page.index});
  }

  gotoLogin()
  {
    this.nav.setRoot("LoginPage");
    
  }

  logout(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('phoneNum');
    this.events.publish('user:login', false);
    this.alertProvider.presentToast("You have been logged out..!")
    this.nav.setRoot("LoginPage");
  }
}

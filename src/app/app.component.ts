import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import Providers.
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  _auth = localStorage.getItem("auth_token");
  rootPage: any = this._auth ? "HomePage" : "LoginPage";
  pages: Array<{ title: string, component: any }>;

  constructor(private platform: Platform, private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authProvider: AuthProvider) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Member', component: 'MemberPage' },
      { title: 'Rewards', component: 'RewardsPage' },
      { title: 'Promotions', component: 'PromotionsPage' },
      { title: 'Happenings', component: 'HappeningsPage' },
      { title: 'Store Locator', component: 'StoreLocatorPage' },
      { title: 'Health Info', component: 'HealthInfoPage' },
      { title: 'Feedback', component: 'FeedbackPage' },
      { title: 'About', component: 'AboutPage' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
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
    this.nav.setRoot(page.component);
  }
}

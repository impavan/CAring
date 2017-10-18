import { Injectable } from '@angular/core';
import { LoadingController, Platform, App } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Import Providers.
import { AlertProvider } from '../alert/alert';

@Injectable()
export class LoaderProvider {
  public loading: any;
  public backPressed: any = false;
  constructor(private http: Http, private loadingCtrl: LoadingController, private platform: Platform, private appCtrl: App, private alertCtrl: AlertProvider) {
    console.log('Hello LoaderProvider Provider');
  }

  //loader
  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: `<div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 10000,
    });
    this.loading.present();
  }

  //dismiss loader 
  dismissLoader() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  presentBackOptions() {
    this.platform.registerBackButtonAction(() => {
      let nav = this.appCtrl.getActiveNav();
      if (nav.canGoBack()) { //Can we go back?
        nav.pop();
      } else {
        if (!this.backPressed) {
          this.backPressed = true;
          this.alertCtrl.presentToast('Double Tap to exit')
          setTimeout(() => this.backPressed = false, 2000)
          return;
        } else {
          this.platform.exitApp();
        }
      }
    });
  }
}

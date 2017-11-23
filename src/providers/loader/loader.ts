import { Injectable } from '@angular/core';
import { LoadingController, Platform, App } from 'ionic-angular';
import 'rxjs/add/operator/map';

// Import Providers.
import { AlertProvider } from '../alert/alert';

@Injectable()
export class LoaderProvider {
  public loading: any;
  public backPressed: any = false;
  constructor(private loadingCtrl: LoadingController, 
    private platform: Platform, 
    private appCtrl: App, 
    private alertCtrl: AlertProvider) {
    
  }

  //loader
  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
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
      console.log(nav);
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

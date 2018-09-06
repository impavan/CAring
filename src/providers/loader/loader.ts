import { Injectable } from '@angular/core';
import { LoadingController, Platform, AlertController,App } from 'ionic-angular';

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
              private alertCtrl: AlertProvider,
              private alert:AlertController) {
    
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

  presentLoadingCustomDup() {
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: `<div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 400,
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

        let exitalert  = this.alert.create({
            title: 'Exit App?',
            enableBackdropDismiss: false,
            cssClass: '',
            message: 'Are you sure you want to exit the app?',
            buttons: [{
              text: 'Cancel',
              cssClass: '',
              handler: () => {
                exitalert.dismiss();
              }
            }, {
              text: 'Ok',
              cssClass: '',
              handler: () => {
                exitalert.dismiss().then(() => {
                  this.platform.exitApp();
                });
              }
            }]
          });
          exitalert.present();
      }
    });
  }

}

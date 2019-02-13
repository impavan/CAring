import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CLIENT_KEY, CARING_ESHOP_LINK, REDIRECT_URL } from '../../config';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-e-cart',
  templateUrl: 'e-cart.html',
})

export class ECartPage {
  URL: string;

  constructor(private events: Events,
    private authProvider: AuthProvider,
    private iab: InAppBrowser,
    private apiProvider: ApiProvider,
    public navCtrl: NavController) {
  }

  ionViewDidEnter() {
    let inAppOpt: InAppBrowserOptions = {
      clearcache: 'yes',
      hardwareback: 'yes',
      location: 'no'
    }
    let destination = CARING_ESHOP_LINK;
    let link = REDIRECT_URL + this.authProvider.getSession() + '&target_client_code=' + this.apiProvider.eshop_client_code + '&is_staff=0&token=' + this.authProvider.getAuthToken() + '&client_code=' + CLIENT_KEY + '&redirect_url=' + destination;
  
    const browser = this.iab.create(link, '_blank', inAppOpt);
    // this.events.publish('changeIcon', "ECartPage");
  }
}
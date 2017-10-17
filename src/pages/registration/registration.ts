import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

// Import Providers.
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-new-account',
  templateUrl: 'registration.html',
})

export class RegistrationPage {
  public regData: any = {};
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private menu: MenuController, private loaderProvider: LoaderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewAccountPage');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, "leftMenu");
    this.loaderProvider.presentBackOptions();
  }
}

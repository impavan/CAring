import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//All providers goes here
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

@IonicPage()
@Component({
  selector: 'page-in-store',
  templateUrl: 'in-store.html',
})

export class InStorePage {
  storeActivityList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private hapenningsProvider: HapenningsProvider) {
  }

  ionViewWillEnter() {
    this.getInStoreActivities();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InStorePage');
  }

  getInStoreActivities() {
    this.hapenningsProvider.getInStoreActivities().subscribe(res => {
      this.storeActivityList = res.data;
    });
  }

  gotoInstoredetailsPage(data) {
    this.navCtrl.push('InstoredetailsPage', { instoredata: data });
  }
}
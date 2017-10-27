import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//All providers goes here
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-happenings',
  templateUrl: 'happenings.html',
})

export class HappeningsPage {
  happenList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private hapenningsProvider: HapenningsProvider, private loaderProvider:LoaderProvider) {
    this.getHappenings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappeningsPage');
  }

  ionViewWillEnter(){
    this.loaderProvider.presentLoadingCustom();
  }

  getHappenings() {
    this.hapenningsProvider.getHappenings().subscribe(res => {
      this.happenList = res.data;
      this.loaderProvider.dismissLoader();
      console.log(this.happenList);
    });
  }

  goto(page) {
    this.navCtrl.push(page);
  }

  gotoHappenDetail(value) {
    this.navCtrl.push('HappenDetailsPage', { happendata: value });
  }
}

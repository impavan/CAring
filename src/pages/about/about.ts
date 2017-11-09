import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//All providers goes here
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  about: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hapenningsProvider: HapenningsProvider, private loaderProvider: LoaderProvider) {
    this.getData();
  }

 

  getData() {
    this.loaderProvider.presentLoadingCustom();
    this.hapenningsProvider.getAboutUsData().subscribe(res => {
      this.loaderProvider.dismissLoader();
      
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].aboutus) {
          this.about = res.data[i].aboutus;
        } else {
          this.about = "There is no data to display at this moment. Sorry for the inconvenience";
        }
      }
    });
  }
}
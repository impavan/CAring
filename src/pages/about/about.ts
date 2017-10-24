import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//All providers goes here
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  about: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hapenningsProvider: HapenningsProvider) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  getData() {
    this.hapenningsProvider.getAboutUsData().subscribe(res => {
      console.log(res, 'res from about us page');
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
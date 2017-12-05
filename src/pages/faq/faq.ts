import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  faq: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public happeningProviders : HapenningsProvider ) {
  }

  

  ionViewWillEnter() {
    this.getFAQ();
  }


  getFAQ() {
    this.happeningProviders.getFAQ()
      .subscribe(res => {
        this.faq = res.data;
        console.log(this.faq);
        console.log(res);
  
      })
  }  

}

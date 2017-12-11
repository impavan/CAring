import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';



@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  faq: any;

  constructor(public happeningProviders : HapenningsProvider ) {
  }

  

  ionViewWillEnter() {
    this.getFAQ();
  }


  getFAQ() {
    this.happeningProviders.getFAQ()
      .subscribe(res => {
        this.faq = res.data;
  
      })
  }  

}

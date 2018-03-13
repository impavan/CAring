import { Component, NgZone } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';



@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  faq: any;
  faqCategory: any = [];
  myCat: any;
  faqKeys: any = [];
  constructor(public happeningProviders: HapenningsProvider,
              public zone:NgZone) {
  }

  

  ionViewWillEnter() {
    this.getFAQ();
  }


  getFAQ() {
    this.happeningProviders.getFAQ()
      .subscribe(res => {
        this.faq = res.data;
        if (this.faq) {
          this.zone.runOutsideAngular(() => {

            this.myCat = this.groupIntoCategories(this.faq);
            console.log(this.myCat, "myCat--------------");
          });
        }
  
      })
  }  

//group according to the faqcategories  
  groupIntoCategories(faq) {

   
    for (let i in faq) {
      
      let cat = faq[i].faqcategory;
      if (this.faqCategory[cat]) {
        this.faqCategory[cat]['category'].push(faq[i]);

      } else {
        
        this.faqCategory[cat] = {};
        this.faqCategory[cat]['category'] = [];
        this.faqCategory[cat]['category'].push(faq[i]);

      }

    }

    console.log(this.faqCategory);
    this.faqKeys = Object.keys(this.faqCategory);
    return this.faqCategory;

  }

}

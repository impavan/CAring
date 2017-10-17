import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides} from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

/**
 * Generated class for the HealthSubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-health-subscribe',
  templateUrl: 'health-subscribe.html',
})
export class HealthSubscribePage {


    @ViewChild(Slides) slides: Slides;

   _newsSubscriptionLink:any;
  NEWSSUBLINK:string = 'newsletterurl';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public hapenningsProvider:HapenningsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthSubscribePage');
  }

  ionViewWillEnter(){

      this.getPromotionsBrochureLink()

  }


  ngAfterViewInit() {
    this.slides.freeMode = true;
    this.slides.loop = true;
    this.slides.speed = 1000;
    this.slides.autoplay = 3000;
    this.slides.paginationType = 'bullets';
    this.slides.effect = "coverflow";
  }

  


   getPromotionsBrochureLink(){

      this.hapenningsProvider.getPromotionsBrochureLink()

            .subscribe(res => {

                console.log(res);
                for(let i in  res.data ){
                    if(res.data[i].key == this.NEWSSUBLINK)
                      console.log(res.data[i].value);
                      this._newsSubscriptionLink = res.data[i].value;
                      console.log(this._newsSubscriptionLink);
                      break;
                }

            });

    }

}

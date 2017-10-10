import { Component, ViewChild} from '@angular/core';
import { NavController, Slides, IonicPage } from 'ionic-angular';


/**
 * Generated class for the HomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomepagePage {

  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController) {

    
    

  }

  // ionViewDidLoad(){
  //   this.slides.startAutoplay();
  // }

  ngAfterViewInit() {
    this.slides.freeMode = true;
    this.slides.loop = true;
    this.slides.speed = 1000;
    this.slides.autoplay = 3000;
  }



  // slideChanged() {
  //   let currentIndex = this.slides.getActiveIndex();
  //  this.slides.slideTo(currentIndex, 500);
  // }

    goto(page:string){
      this.navCtrl.push(page);
    }

}

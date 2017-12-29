import { Component,ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ZoomProvider } from '../../providers/zoom/zoom';

/**
 * Generated class for the ImageViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-view',
  templateUrl: 'image-view.html',
})
export class ImageViewPage {
@ViewChild('imgzoom') imgzoom: ElementRef;
    img: any;  
    element: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public zoom:ZoomProvider) {

    this.img = navParams.get('imgsource');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageViewPage');
  }

    ngAfterViewInit() {

    this.element = this.imgzoom.nativeElement;
    this.zoom.setZoomed(false,this.element);
    this.zoom.hammerIt(this.element);
  }

}

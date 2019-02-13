import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ZoomProvider } from '../../providers/zoom/zoom';

@IonicPage()
@Component({
  selector: 'page-image-view',
  templateUrl: 'image-view.html',
})

export class ImageViewPage {
  @ViewChild('imgzoom') imgzoom: ElementRef;
  img: any = [];
  element: any;
  width: any;
  height: any;
  windowHeight: any = this.platform.height();
  windowWidth: any = this.platform.width();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public zoom: ZoomProvider,
    public platform: Platform) {
    var imgs = new Image();
    imgs.src = navParams.get('imgsource');
    imgs.onload = () => {
      imgs.height = this.windowHeight;
      imgs.width = this.windowWidth;
      console.log(imgs.height, imgs.width);
    }
    this.img.push(imgs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageViewPage');
  }

  ngAfterViewInit() {
    this.element = this.imgzoom.nativeElement;
    this.zoom.setZoomed(false, this.element);
    this.zoom.hammerIt(this.element);
    console.log(this.windowHeight);
    console.log(this.windowWidth);
  }
}
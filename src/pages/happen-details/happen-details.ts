import { Component } from '@angular/core';
import { IonicPage, NavParams,NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-happen-details',
  templateUrl: 'happen-details.html',
})
export class HappenDetailsPage {

 _happenList: any = [];

  constructor( public navParams: NavParams,public navCtrl:NavController) {

    this._happenList = navParams.get('happendata');
    console.log(this._happenList,"happenList")
    
  }


zoomArea(url) {
    this.navCtrl.push('ImageViewPage', {imgsource:url})
  }
 
}

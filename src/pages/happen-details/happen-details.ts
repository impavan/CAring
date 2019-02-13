import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

@IonicPage({
  segment: 'happen-details/:id'
})

@Component({
  selector: 'page-happen-details',
  templateUrl: 'happen-details.html',
})

export class HappenDetailsPage {
  _happenList: any = [];
  _id: string;

  constructor(public navParams: NavParams, public navCtrl: NavController, private hapenningsProvider: HapenningsProvider) {
    //  this._happenList = navParams.get('happendata');
    this._happenList = this.navParams.get('id');
    console.log(this._happenList, "happenList");
    this._id = this.navParams.get('id');
    console.log(this._id, "this._id")
    if (this._id != null) {
      this.getHappeningsById(this._id);
    } else {
      console.log("no id")
      this._happenList = navParams.get('happendata');
    }
  }

  zoomArea(url) {
    this.navCtrl.push('ImageViewPage', { imgsource: url })
  }

  getHappeningsById(id) {
    console.log(id, "id")
    this.hapenningsProvider.getHappeningsById(id).subscribe(res => {
      console.log(res, "happenings")
      if (res.status == 200) {
        this._happenList = res.data[0];
      }
    })
  }
}

import { Component } from '@angular/core';
import { IonicPage , NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-happen-details',
  templateUrl: 'happen-details.html',
})
export class HappenDetailsPage {

  _happenList: any = [];
  constructor( public navParams: NavParams) {

    this._happenList = navParams.get('happendata');
    
  }

 
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-health-details',
  templateUrl: 'health-details.html',
})
export class HealthDetailsPage {

  healthData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.healthData = navParams.get('data');
  }
  
}

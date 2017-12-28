import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-health-details',
  templateUrl: 'health-details.html',
})
export class HealthDetailsPage {


    healthData: any = [];


  constructor(public navParams: NavParams, public navCtrl:NavController) {

    this.healthData = navParams.get('data');
  }


   zoomArea(url) {
     this.navCtrl.push('ImageViewPage', { imgsource: url });
  }

  
}

import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

@Component({
  selector: 'subheader',
  templateUrl: 'subheader.html'
})
export class SubheaderComponent {

  text: string;

  constructor( private navCtrl: NavController) {
   
  }

  navTo(page) {
    this.navCtrl.push(page);
  }

  goToRewards(section) {
    this.navCtrl.setRoot("RewardsPage", { selectTab: section });
  }

}

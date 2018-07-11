import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { Badge } from '@ionic-native/badge';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  text: string;

  constructor(public navCtrl:NavController,public badge: Badge) {
    this.text = 'Hello World';
  }

  goTo(page) {
    if(!(this.navCtrl.getActive().id == "MessagesPage"))
    this.navCtrl.push(page);
    this.badge.increase(1);
  }

}

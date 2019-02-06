import { Component } from '@angular/core';

/**
 * Generated class for the HotdealsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hotdeals',
  templateUrl: 'hotdeals.html'
})
export class HotdealsComponent {

  text: string;

  constructor() {
    console.log('Hello HotdealsComponent Component');
    this.text = 'Hello World';
  }

}

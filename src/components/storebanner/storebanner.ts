import { Component } from '@angular/core';

/**
 * Generated class for the StorebannerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'storebanner',
  templateUrl: 'storebanner.html'
})
export class StorebannerComponent {

  text: string;

  constructor() {
    console.log('Hello StorebannerComponent Component');
    this.text = 'Hello World';
  }

}

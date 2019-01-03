import { Component } from '@angular/core';

/**
 * Generated class for the FooterButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer-button',
  templateUrl: 'footer-button.html'
})
export class FooterButtonComponent {

  text: string;

  constructor() {
    console.log('Hello FooterButtonComponent Component');
    this.text = 'Hello World';
  }

  goto(page){
    
  }

}

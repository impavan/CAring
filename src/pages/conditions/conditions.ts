import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';



@IonicPage()
@Component({
  selector: 'page-conditions',
  templateUrl: 'conditions.html',
})
export class ConditionsPage {

  conditions: any;

  constructor(private apiProvider:ApiProvider) {
  }

 

  ionViewWillEnter() {

    this.conditions = this.apiProvider.termsAndConditions;
  }



}

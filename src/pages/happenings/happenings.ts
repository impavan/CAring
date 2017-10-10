import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//All providers goes here
import { HapenningsProvider } from '../../providers/hapennings/hapennings';

/**
 * Generated class for the HappeningsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-happenings',
  templateUrl: 'happenings.html',
})
export class HappeningsPage {


  happenList:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private hapenningsProvider:HapenningsProvider) {

                this.getHappenings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappeningsPage');
  }

    getHappenings() {

    this.hapenningsProvider.getHappenings()

      .subscribe(res => {
          
        this.happenList = res.data;
        console.log(this.happenList);

      });

  }

  goto(page){
    this.navCtrl.push(page);
  }



}

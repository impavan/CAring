import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//All providers goes here
import { LoaderProvider } from '../../providers/loader/loader';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';


@IonicPage()
@Component({
  selector: 'page-in-store',
  templateUrl: 'in-store.html',
})

export class InStorePage {
  storeActivityList: any = [];
  navId: any;

  constructor(private navParams:NavParams,
              public navCtrl: NavController,
              private hapenningsProvider: HapenningsProvider,
              private exceptionProvider: ExceptionHandlerProvider,
              private loaderProvider: LoaderProvider) {
    
    this.navId = navParams.get('id');
    

  }

  ionViewWillEnter() {

    if (this.storeActivityList.length <= 0) {
      this.loaderProvider.presentLoadingCustom();
      this.getInStoreActivities();
    }
  }

  getInStoreActivities() {

      this.hapenningsProvider.getInStoreActivities().subscribe(res => {
        this.storeActivityList = res.data.filter(store => store.isactive == true);
        this.loaderProvider.dismissLoader(); 
        if (this.navId) {
          let item = this.storeActivityList.find(d => d.deeplinkingidentifier == this.navId);
          if (item) {
            this.gotoInstoredetailsPage(item);
          }
        }
      
    }, err => {

      this.loaderProvider.dismissLoader();
      this.exceptionProvider.excpHandler(err);

    });
  }

  gotoInstoredetailsPage(data) {
    this.navCtrl.push('InstoredetailsPage', { instoredata: data });
  }
}
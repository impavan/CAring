import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//All providers goes here
import { LoaderProvider } from '../../providers/loader/loader';
import { ApiProvider } from '../../providers/api/api';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import moment from 'moment';


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
              private apiProvider:ApiProvider,
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
        this.storeActivityList = res.data.filter(store => {
          if (store.publishingstartdate && store.publishingenddate) {
          if (moment(store.publishingstartdate).isSameOrBefore(this.apiProvider.currentDate) && moment(store.publishingenddate).isSameOrAfter(this.apiProvider.currentDate)) {
            return store;
          }
        } else {
          return store;
        }
        });
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
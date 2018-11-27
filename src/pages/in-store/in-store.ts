import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//All providers goes here
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
              private exceptionProvider: ExceptionHandlerProvider) {
    
    this.navId = navParams.get('id');
    

  }

  ionViewWillEnter() {

    if (this.storeActivityList.length <= 0) {
      this.getInStoreActivities();
    }
  }

  getInStoreActivities() {

      this.hapenningsProvider.getInStoreActivities().subscribe(res => {
        this.storeActivityList = res.data.filter(store => {
          if (store.publishingstartdate && store.publishingenddate) {

            let psDate = moment(store.publishingstartdate).format('YYYY-MM-DD');
            let peDate =  moment(store.publishingenddate).format('YYYY-MM-DD');
            let psMoment = moment(psDate);
            let peMoment =  moment(peDate)
            let currenMoment  =  moment().format('YYYY-MM-DD');

          if (moment(psMoment).isSameOrBefore(currenMoment) && moment(peMoment).isSameOrAfter(currenMoment)) {
            return store;
          }
        } else {
          return store;
        }
        });
        if (this.navId) {
          let item = this.storeActivityList.find(d => d.deeplinkingidentifier == this.navId);
          if (item) {
            this.gotoInstoredetailsPage(item);
          }
        }
      
    }, err => {

      this.exceptionProvider.excpHandler(err);

    });
  }

  gotoInstoredetailsPage(data) {
    this.navCtrl.push('InstoredetailsPage', { id: data.deeplinkingidentifier, instoredata:data  });
  }
}
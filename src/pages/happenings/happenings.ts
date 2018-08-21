import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import moment from 'moment';



//All providers goes here
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-happenings',
  templateUrl: 'happenings.html',
})

export class HappeningsPage {
  happenList: any = [];
  routeLink: any = '';
  navToId: any;
  happeningsSegment:any = 'happenings';
  storeActivityList: any = [];
 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider:ApiProvider,
              private hapenningsProvider: HapenningsProvider,
              private exceptionProvider:ExceptionHandlerProvider) {
    
                      
                  this.routeLink = navParams.get('routeData');
                  this.navToId = navParams.get('id');
                
    
    
    
  }

  ionViewWillEnter() {
    
    if (this.happenList.length <= 0) {
      this.getHappenings();
    }
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
      // return store
    });
      if (this.navToId) {
        let item = this.storeActivityList.filter(d => d.deeplinkingidentifier == this.navToId);
        if (item.length > 0) {
          this.gotoInstoredetailsPage(item[0]);
        }
      }
    
  }, err => {

    this.exceptionProvider.excpHandler(err);

  });
}

  getHappenings() {

    this.hapenningsProvider.getHappenings().subscribe(res => {

      this.happenList = res.data.filter(r => {

        //moment for checking start date and end date for posting article //

        let psDate = moment(r.publishingstartdate).format('YYYY-MM-DD');
        let peDate =  moment(r.publishingenddate).format('YYYY-MM-DD');
        let psMoment = moment(psDate);
        let peMoment =  moment(peDate)
        let currenMoment  =  moment().format('YYYY-MM-DD');

        if (r.publishingstartdate && r.publishingenddate) {
          if (moment(psMoment).isSameOrBefore(currenMoment) && moment(peMoment).isSameOrAfter(currenMoment)) {
            return r;
          }
        } else {
          return r;
        }
          
       
      });
      
      if (this.navToId) {
        let item = this.happenList.filter(d => d.deeplinkingidentifier == this.navToId)
        if (item.length > 0) {
          this.gotoHappenDetail(item[0]);
        }
      }
    

    }, err => {
            this.exceptionProvider.excpHandler(err);

    });
  }

  goto(page) {

    this.navCtrl.push(page);
    
  }

  gotoHappenDetail(value) {

    this.navCtrl.push('HappenDetailsPage', { happendata: value });

  }

  gotoInstoredetailsPage(data) {
    this.navCtrl.push('InstoredetailsPage', { instoredata: data });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import moment from 'moment';

//All providers goes here
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { ApiProvider } from '../../providers/api/api';
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-happenings',
  templateUrl: 'happenings.html',
})

export class HappeningsPage {
  happenList: any = [];
  routeLink: any = '';
  navToId: any;
  happeningsSegment: any = 'happenings';
  storeActivityList: any = [];
  pharmacistServiceList: any = [];
  // storeExpired: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    private hapenningsProvider: HapenningsProvider,
    private exceptionProvider: ExceptionHandlerProvider,
    private loaderProvider: LoaderProvider) {
    this.routeLink = navParams.get('routeData');
    if (navParams.get('from'))
      this.happeningsSegment = navParams.get('from');
    this.navToId = navParams.get('id');
    console.log(this.navToId, "navtoid")
    if(this.happeningsSegment == "happenings")
      this.getHappenings();
  }

  segmentChange(event) {
    if(event._value == "happenings")
      this.getHappenings();
    else if(event._value == 'inStoreActivities')
      this.getInStoreActivities();
    else if(event._value == 'pharmacistService')
      this.getpharmacistService();
  }

  getpharmacistService() {
    this.loaderProvider.presentLoadingCustom();
    this.hapenningsProvider.getpharmacistService().subscribe(res => {
      this.loaderProvider.dismissLoader();
      if (res.status == 200) {
        this.pharmacistServiceList = res.data.filter(store => {
          // if (store.publishingstartdate && store.publishingenddate) {
          //   let psDate = moment(store.publishingstartdate).format('YYYY-MM-DD');
          //   let peDate =  moment(store.publishingenddate).format('YYYY-MM-DD');
          //   let psMoment = moment(psDate);
          //   let peMoment =  moment(peDate)
          //   let currenMoment  =  moment().format('YYYY-MM-DD');

          // if (moment(psMoment).isSameOrBefore(currenMoment) && moment(peMoment).isSameOrAfter(currenMoment)) {
          //   console.log("after22 store")
          //   return store;
          // }
          // }
          //  else {
          return store;
          // }
        });
      } else {
        this.pharmacistServiceList = [];
      }
      if (this.navToId) {
        if(this.pharmacistServiceList.length > 0){
          let item = this.pharmacistServiceList.filter(d => d.deeplinkingidentifier == this.navToId);
          if (item.length > 0) {
            this.gotoPharmacistDetail(item[0]);
          }
        }
      }
    }, err => {
      this.exceptionProvider.excpHandler(err);
    });
  }

  getInStoreActivities() {
    this.loaderProvider.presentLoadingCustom();
    this.hapenningsProvider.getInStoreActivities().subscribe(res => {
      this.loaderProvider.dismissLoader();
      this.storeActivityList = res.data.filter(store => {
        if (store.publishingstartdate && store.publishingenddate) {
          let psDate = moment(store.publishingstartdate).format('YYYY-MM-DD');
          let peDate = moment(store.publishingenddate).format('YYYY-MM-DD');
          let psMoment = moment(psDate);
          let peMoment = moment(peDate)
          let currenMoment = moment().format('YYYY-MM-DD');
          if (moment(psMoment).isSameOrBefore(currenMoment) && moment(peMoment).isSameOrAfter(currenMoment)) {
            // this.storeExpired = false;
            return store;
          }
        } else {
          return store;
        }
        // this.storeExpired = true;
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
    this.loaderProvider.presentLoadingCustom();
    this.hapenningsProvider.getHappenings().subscribe(res => {
      this.loaderProvider.dismissLoader();
      console.log("happenings")
      this.happenList = res.data.filter(r => {
        //moment for checking start date and end date for posting article //
        let psDate = moment(r.publishingstartdate).format('YYYY-MM-DD');
        let peDate = moment(r.publishingenddate).format('YYYY-MM-DD');
        let psMoment = moment(psDate);
        let peMoment = moment(peDate)
        let currenMoment = moment().format('YYYY-MM-DD');
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
        console.log(item, "::::::::;;;item in happenings:::::::::")
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

  gotoPharmacistDetail(value) {
    console.log(value, "pharmacist")
    // this.navCtrl.push('PharmacistDetailPage', { id: value._id })
    this.navCtrl.push('PharmacistDetailPage', { id: value.deeplinkingidentifier, pharmacistdata: value })
  }

  gotoHappenDetail(value) {
    console.log(value, "happendata in happemning")
    this.navCtrl.push('HappenDetailsPage', { id: value.deeplinkingidentifier, happendata: value });
  }

  gotoInstoredetailsPage(data) {
    console.log(data, "instoredata")
    this.navCtrl.push('InstoredetailsPage', { id: data.deeplinkingidentifier, instoredata: data });
  }
}
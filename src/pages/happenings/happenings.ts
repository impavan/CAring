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
  happeningsSegment:any = 'happenings';
  storeActivityList: any = [];
  pharmacistServiceList :any =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider:ApiProvider,
              private hapenningsProvider: HapenningsProvider,
              private loaderProvider: LoaderProvider,
              private exceptionProvider:ExceptionHandlerProvider) {
    
                      
                  this.routeLink = navParams.get('routeData');
                  this.navToId = navParams.get('id');
    
    
    
  }

  ionViewWillEnter() {
    
    if (this.happenList.length <= 0) {
      this.loaderProvider.presentLoadingCustom();
      this.getHappenings();
    }

    if (this.storeActivityList.length <= 0) {
      this.getInStoreActivities();
    }

      if (this.pharmacistServiceList.length <= 0) {
        this.getpharmacistService();
      }
   
    
  }

  getpharmacistService(){
    this.hapenningsProvider.getpharmacistService().subscribe(res => {
      console.log(res,"pharmacist data")
      this.pharmacistServiceList = res.data.filter(store => {
        return store;
      });
      if (this.navToId) {
        let item = this.pharmacistServiceList.filter(d => d.deeplinkingidentifier == this.navToId);
        if (item.length > 0) {
          this.gotoPharmacistDetail(item[0]);
        }
      }
    }, err => {
      this.exceptionProvider.excpHandler(err);
    });
  }

  getInStoreActivities() {

    this.hapenningsProvider.getInStoreActivities().subscribe(res => {
      console.log(res,"storeee")
      this.storeActivityList = res.data.filter(store => {
        if (store.publishingstartdate && store.publishingenddate) {

          let psDate = moment(store.publishingstartdate).format('YYYY-MM-DD');
          let peDate =  moment(store.publishingenddate).format('YYYY-MM-DD');
          let psMoment = moment(psDate);
          let peMoment =  moment(peDate)
          let currenMoment  =  moment().format('YYYY-MM-DD');

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

    this.hapenningsProvider.getHappenings().subscribe(res => {

      this.loaderProvider.dismissLoader();
      this.happenList = res.data.filter(r => {
   
        if (r.publishingstartdate && r.publishingenddate) {

          let happenstartDate = moment(r.publishingstartdate).format('YYYY-MM-DD');
          let happenendDate = moment(r.publishingenddate).format('YYYY-MM-DD');
          let happenstartMoment = moment(happenstartDate);
          let happenendMoment = moment(happenendDate);
          let currentMoment = moment().format('YYYY-MM-DD');

          if (moment(happenstartMoment).isSameOrBefore(currentMoment) && moment(happenendMoment).isSameOrAfter(currentMoment)) {
            return r;
          }
        } else {
          return r;
        }
          
       
      });
      
      if (this.navToId) {
        let item = this.happenList.find(d => d.deeplinkingidentifier == this.navToId)
        if (item) {
          this.gotoHappenDetail(item);
        }
      }
    

    }, err => {
      
      this.loaderProvider.dismissLoader();
      this.exceptionProvider.excpHandler(err);

    });
  }

  goto(page) {

    this.navCtrl.push(page);
    
  }

  gotoHappenDetail(value) {

    this.navCtrl.push('HappenDetailsPage', { happendata: value });

  }
    gotoPharmacistDetail(value){
    console.log(value,"pharmacist")
    this.navCtrl.push('PharmacistDetailPage', { pharmacistdata : value})

  }
  
  gotoInstoredetailsPage(data) {
    console.log(data,"instoredata")
    this.navCtrl.push('InstoredetailsPage', { instoredata: data });
  }
}

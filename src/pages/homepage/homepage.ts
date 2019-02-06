import { Component, ViewChild,  } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { PushProvider } from '../../providers/push/push';
import { ApiProvider } from '../../providers/api/api';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser'

@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomePage {
  pages: Array<{ title: string, component: any }>;
  isSlidesLoaded: boolean = false;
  bannerData: any = [];
  INAPPLINK = 'InAppLink';
  WEBLINK = 'WebLink';
  showEvents:boolean = false;
  quickAccessData:any = [];
  storeBanners:any = [];
  weblinkurl:any = null;
  hotdeals:any = [];

  constructor(private events: Events,
    public navCtrl: NavController,
    private domSanitizer:DomSanitizer,
    private apiProvider: ApiProvider,
    private pushProvider: PushProvider,
    private inAppBrowser: InAppBrowser,
    private hapenningsProvider: HapenningsProvider,
    private exceptionProvider: ExceptionHandlerProvider) {

      this.getQuickAccess();
      this.getStoreBanners();
      this.getHotDeals();
      
  }

  ionViewWillEnter() {
    if (!this.isSlidesLoaded) {
      this.hapenningsProvider.getHomeBanner().subscribe(res => {
        this.bannerData = res.data.filter(d => {
          if (d.publishingstartdate && d.publishingenddate) {
            if (moment(d.publishingstartdate).isSameOrBefore(this.apiProvider.currentDate) && moment(d.publishingenddate).isSameOrAfter(this.apiProvider.currentDate)) {
              return d;
            }
          } else {
            return d;
          }
        });
        this.isSlidesLoaded = true;
      }, err => {
        this.exceptionProvider.excpHandler(err);
      })
    }
    this.events.publish('changeIcon', "HomePage");
  }

  goto(data: any) {

    if(data.linktype === 'WebLink'){

      this.showEvents = true;
      this.weblinkurl = data.destination;


    }else if(data.linktype === 'InAppLink'){
     this.navCtrl.setRoot(data.destination).then((canEnter) => {
      if (canEnter == false)
         this.events.publish('login', false);
    });
    }
    
  }

  gotoLink(bannerdata) {
    if (bannerdata.linktype === this.INAPPLINK) {
       this.route(bannerdata.destination);
      //this.route(bannerdata._id);
    } else if (bannerdata.linktype === this.WEBLINK) {
      this.inAppBrowser.create(bannerdata.destination);
    } else { }
  }

  route(deeplink) {

    //  let deepRoute = [

    //   { route: '/profile', component: 'MemberPage' },
    //   { route: '/newrewards', component: 'RewardsPage' },
    //   { route: '/happenings', component: 'HappeningsPage' },
    //   { route: '/promotions', component: 'PromotionsPage' },
    //   { route: '/healthinfo', component: 'HealthInfoPage' },
    //   { route: '/instoreactivity', component: 'InStorePage' },
    //   { route: '/pointssummary', component: 'MemberPage' },
    //   { route: '/myrewards', component: 'RewardsPage' },
    //   { route: '/stores', component: 'StoreLocatorPage' }
  
    // ]; 
   // console.log(deeplink.substr(1),"deeplinksubstr(1)");
    //  let navdata = deepRoute.filter(data => data.route === deeplink);
    this.pushProvider.getDeepLinkPath(deeplink.substr(1)).then((navdata) => {
      this.navCtrl.setRoot(navdata['page'], { deeplink: navdata['route'], id: navdata['value'] });
    })
  }

  showEvent(){
    this.showEvents = true;
  }

  getQuickAccess(){
      this.hapenningsProvider.getQuickAccess().subscribe(quickaccessdata =>{
        this.quickAccessData = quickaccessdata.data.filter(quick=> quick.isactive);
      },err=>{
        console.log("inside err", err);
      })
  }


  getStoreBanners(){
    this.hapenningsProvider.getStoreBanners().subscribe(storebannerdata =>{
      this.storeBanners = storebannerdata.data
    },err=>{
      console.log("inside store banner err", err);
    })
  }


  getHotDeals(){
    this.hapenningsProvider.getHotDeals().subscribe(hotdeals =>{
      this.hotdeals = hotdeals.data;
    },err=>{
      console.log("inside hot deals err", err);
    })
  }

  gotoCart(deal){
    this.showEvents = true;
    this.weblinkurl = deal.productlink;

  }

}

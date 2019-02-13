import { Component, ViewChild, } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { PushProvider } from '../../providers/push/push';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser'
import { CLIENT_KEY, REDIRECT_URL } from '../../config';

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
  showEvents: boolean = false;
  quickAccessData: any = [];
  storeBanners: any = [];
  weblinkurl: any = null;
  hotdeals: any = [];
  _healthInfoList: any;
  healthInfo: any;
  storeQuickAccessData: any = [];

  constructor(private events: Events,
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private apiProvider: ApiProvider,
    private pushProvider: PushProvider,
    private inAppBrowser: InAppBrowser,
    private authProvider: AuthProvider,
    private hapenningsProvider: HapenningsProvider,
    private exceptionProvider: ExceptionHandlerProvider) {
    this.getQuickAccess();
    this.getStoreQuickAccess();
    this.getStoreBanners();
    this.getHotDeals();
    this.getHealthInfo();
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

  iframeLoad() {
    console.log("in loadeddddd")
  }

  goto(data: any) {
    console.log(data, "::::::::::::")
    if (data.linktype === 'WebLink') {
      if (data.destination == 'http://caringevents.spurtreetech.com') {
        let link = REDIRECT_URL + this.authProvider.getSession() + '&target_client_code=ZhtsQLBxA3yy&is_staff=0&token=' + this.authProvider.getAuthToken() + '&client_code=' + CLIENT_KEY + '&redirect_url=' + data.destination;
        this.showEvents = true;
        this.weblinkurl = link;
      } else {
        this.showEvents = true;
        this.weblinkurl = data.destination;
      }
    } else if (data.linktype === 'InAppLink') {
      if (data.destination == 'http://caringevents.spurtreetech.com') {
        let link = REDIRECT_URL + this.authProvider.getSession() + '&target_client_code=ZhtsQLBxA3yy&is_staff=0&token=' + this.authProvider.getAuthToken() + '&client_code=' + CLIENT_KEY + '&redirect_url=' + data.destination;
        this.navCtrl.setRoot(link).then((canEnter) => {
          if (canEnter == false)
            this.events.publish('login', false);
            
        });
      } else {
        console.log(data.destination,':::::::::::::::::::::::')
        this.navCtrl.setRoot(data.destination).then((canEnter) => {
          if (canEnter == false)
            this.events.publish('login', false);
        });
      }
    } 
    // else {
    //   let inAppOpt: InAppBrowserOptions = {
    //     clearcache: 'yes',
    //     hardwareback: 'yes',
    //     location: 'no'
    //   }
    //   let destination = data.url;
    //   let link = REDIRECT_URL + this.authProvider.getSession() + '&target_client_code=' + this.apiProvider.eshop_client_code + '&is_staff=0&token=' + this.authProvider.getAuthToken() + '&client_code=' + CLIENT_KEY + '&redirect_url=' + destination;
    //   const browser = this.inAppBrowser.create(link, '_blank', inAppOpt);
    // }
  }

  goToInappBrowser(url: string) {
    console.log(url,':::::::::::::::::::::::::URL::::::::::::::::::::::::::')
    let inAppOpt: InAppBrowserOptions = {
      clearcache: 'yes',
      hardwareback: 'yes',
      location: 'no'
    }
    let destination = url;
    let link = REDIRECT_URL + this.authProvider.getSession() + '&target_client_code=' + this.apiProvider.eshop_client_code + '&is_staff=0&token=' + this.authProvider.getAuthToken() + '&client_code=' + CLIENT_KEY + '&redirect_url=' + destination;
    const browser = this.inAppBrowser.create(link, '_blank', inAppOpt);
  }

  getHealthInfo() {
    this.hapenningsProvider.getHealthInfo().subscribe(res => {
      this._healthInfoList = res.data.filter(health => {
        // moment for checking the start date and end date for posting //
        let psDate = moment(health.publishingstartdate).format('YYYY-MM-DD');
        let peDate = moment(health.publishingenddate).format('YYYY-MM-DD');
        let psMoment = moment(psDate);
        let peMoment = moment(peDate)
        let currenMoment = moment().format('YYYY-MM-DD');
        if (health.publishingstartdate && health.publishingenddate) {
          if (moment(psMoment).isSameOrBefore(currenMoment) && moment(peMoment).isSameOrAfter(currenMoment)) {
            return health;
          }
        } else {
          return health;
        }
      });
      console.log(this._healthInfoList, '::::::::::::::::::::::::::::::;;;')
      this.healthInfo = {
        title: this._healthInfoList[0].title,
        subtitle: this._healthInfoList[0].subtitle,
        thumbnailimage: this._healthInfoList[0].thumbnailimage
      }
      console.log(this.healthInfo, '::::::::::::::::healthInfo:::::::::::::::;;;')
    }, err => {
      this.exceptionProvider.excpHandler(err);
    });
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

  showEvent() {
    this.showEvents = true;
  }

  getQuickAccess() {
    this.hapenningsProvider.getQuickAccess().subscribe(quickaccessdata => {
      this.quickAccessData = quickaccessdata.data.filter(quick => quick.isactive);
    }, err => {
      console.log("inside err", err);
    })
  }

  getStoreQuickAccess() {
    this.hapenningsProvider.getStoreQuickAccess().subscribe(quickaccessdata => {
      this.storeQuickAccessData = quickaccessdata.data;
    }, err => {
      console.log("inside err", err);
    })
  }

  getStoreBanners() {
    this.hapenningsProvider.getStoreBanners().subscribe(storebannerdata => {
      this.storeBanners = storebannerdata.data
    }, err => {
      console.log("inside store banner err", err);
    })
  }

  getHotDeals() {
    this.hapenningsProvider.getHotDeals().subscribe(hotdeals => {
      this.hotdeals = hotdeals.data;
    }, err => {
      console.log("inside hot deals err", err);
    })
  }

  gotoCart(deal) {
    this.showEvents = true;
    this.weblinkurl = deal.productlink;
  }

  navTo(page) {
    if(page == 'HappeningsPage')
      this.navCtrl.setRoot(page, { 'from': 'pharmacistService'});
    else
      this.navCtrl.setRoot(page)
  }
}

import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { PushProvider } from '../../providers/push/push';
import { ApiProvider } from '../../providers/api/api';
import { LoaderProvider } from '../../providers/loader/loader';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomePage {
  pages: Array<{ title: string, component: any }>;
  isSlidesLoaded:boolean = false;
  bannerData:any = [];
  INAPPLINK = 'InAppLink';
  WEBLINK = 'WebLink';

  constructor(private events: Events,
              public navCtrl: NavController,
              private apiProvider:ApiProvider,
              private pushProvider:PushProvider,
              private inAppBrowser: InAppBrowser, 
              private loaderProvider:LoaderProvider, 
              private hapenningsProvider: HapenningsProvider,
              private exceptionProvider:ExceptionHandlerProvider) {

               
                
  }

  

  ionViewWillEnter(){
    if(!this.isSlidesLoaded){
      this.loaderProvider.presentLoadingCustom();
      this.hapenningsProvider.getHomeBanner()
            .subscribe(res => {

              this.bannerData = res.data.filter(d => {
                
        if (d.publishingstartdate && d.publishingenddate) {
          if (moment(d.publishingstartdate).isSameOrBefore(this.apiProvider.currentDate) && moment(d.publishingenddate).isSameOrAfter(this.apiProvider.currentDate)) {
            return d;
          }
        } else {
          return d;
        }
                

              });
               this.loaderProvider.dismissLoader();
               this.isSlidesLoaded = true;

        }, err => {
              
               this.exceptionProvider.excpHandler(err);
          
            })

    }

    this.events.publish('changeIcon',"HomePage");
  }




 

  goto(page: string) {
     this.navCtrl.setRoot(page).then((canEnter)=>{
        if(canEnter==false)
         this.events.publish('login', false);
     });
  }






  gotoLink(bannerdata){

    if(bannerdata.linktype === this.INAPPLINK){

      this.route(bannerdata.destination);
      
    }else if(bannerdata.linktype === this.WEBLINK){

        this.inAppBrowser.create(bannerdata.destination);

    }else{
        
    }
    

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

    console.log(deeplink);




    //  let navdata = deepRoute.filter(data => data.route === deeplink);
    this.pushProvider.getDeepLinkPath(deeplink.substr(1)).then((navdata) => {
      
      console.log(navdata);
      this.navCtrl.setRoot(navdata['page'], { deeplink: navdata['route'], id: navdata['value'] });
      
    })
    
     

  }
}

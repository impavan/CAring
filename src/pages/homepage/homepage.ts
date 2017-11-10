import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, IonicPage, Events } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';
import { LoaderProvider } from '../../providers/loader/loader';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomePage {
  @ViewChild('login')LoginModal;
  @ViewChild(Slides) slides: Slides;
  pages: Array<{ title: string, component: any }>;
  isSlidesLoaded:boolean = false;
  bannerData:any = [];
  INAPPLINK = 'InAppLink';
  WEBLINK = 'WebLink';

  constructor(private events:Events,
              public navCtrl: NavController,
              private inAppBrowser:InAppBrowser, 
              private loaderProvider:LoaderProvider, 
              private hapenningsProvider:HapenningsProvider) {

               
                
  }

  

  ionViewWillEnter(){
    if(!this.isSlidesLoaded){
      this.loaderProvider.presentLoadingCustom();
      this.hapenningsProvider.getHomeBanner()
            .subscribe(res => {

                this.bannerData = res.data;
               this.loaderProvider.dismissLoader();
               this.isSlidesLoaded = true;

            })

    }

    this.events.publish('changeIcon',"HomePage");
  }

  ngAfterViewInit() {
    // this.slides.freeMode = true;
    // this.slides.loop = true;
    // this.slides.speed = 300;
    // this.slides.autoplay = 8000;
    // this.slides.paginationType = 'bullets';
  }



 

  goto(page: string) {
     this.navCtrl.setRoot(page).then((canEnter)=>{
        if(canEnter==false)
         this.events.publish('login', false);
     });
  }






  gotoLink(bannerdata){

    if(bannerdata.linktype === this.INAPPLINK){

      // this.route(bannerdata.destination);

    }else if(bannerdata.linktype === this.WEBLINK){

        this.inAppBrowser.create(bannerdata.destination);

    }else{
        
    }
    

  }


  route(data){

    let page = data.split(":");
    if(page){
    let event = page[1].split("/");
    }
    if(page[1] == "Store")
    this.navCtrl.push("StoreLocatorPage");
    if(event[0] == "Happening")
    this.navCtrl.setRoot("HappeningsPage",{routeData:page[2]});

  }
}

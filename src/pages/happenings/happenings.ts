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
    
  }

  getHappenings() {

    this.hapenningsProvider.getHappenings().subscribe(res => {

      this.loaderProvider.dismissLoader();
      this.happenList = res.data.filter(r => {
   
        if (r.publishingstartdate && r.publishingenddate) {
          if (moment(r.publishingstartdate).isSameOrBefore(this.apiProvider.currentDate) && moment(r.publishingenddate).isSameOrAfter(this.apiProvider.currentDate)) {
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
}

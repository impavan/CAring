import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HapenningsProvider } from '../../providers/hapennings/hapennings';


// @Directive({
//   selector: '[zoom-pan]'
// })

@IonicPage({
  segment:'promotion-details/:id'
})
@Component({
  selector: 'page-promotion-details',
  templateUrl: 'promotion-details.html',
  })

export class PromotionDetailsPage {

  _promotionDetails: any = [];
  _id:string;

  constructor(public navParams: NavParams,
              public navCtrl:NavController,private hapenningsProvider:HapenningsProvider ) {

    
    //this._promotionDetails = navParams.get('promodetails');
    this._id = this.navParams.get('id');
    console.log(this._id,"this._id")
    if(this._id!=null){
      this.getPromotionById(this._id);
    }
    else {
      console.log("no id")
      this._promotionDetails = navParams.get('promodetails');
    }
       

    console.log(":::::::promodetails::::::::::",this._promotionDetails)
   
  }


  zoomArea(url) {
    this.navCtrl.push('ImageViewPage', {imgsource:url})
  }


  getPromotionById(id){

    this.hapenningsProvider.getPromotionById(id).subscribe(res=>{
      console.log(res);
      if(res.status == 200)
      this._promotionDetails = res.data[0];
    })

  }

}

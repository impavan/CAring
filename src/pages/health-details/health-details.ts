import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-health-details',
  templateUrl: 'health-details.html',
})
export class HealthDetailsPage {


    healthData: any = [];


  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private socialSharing : SocialSharing) {

    this.healthData = navParams.get('data');
  }


   zoomArea(url) {
     this.navCtrl.push('ImageViewPage', { imgsource: url });
   }
  
  
  //function for sharing helth info details via social media //

  shareViaSocialMedia() {
    let message = this.healthData.title ? this.healthData.title : null;
    // let subject = "";
    // let file = "";
    let link = this.healthData.bannerimage ? this.healthData.bannerimage : null;
    this.socialSharing.share(message, "","", link).then(() => {
      console.log("social media sharing");
    }, err => {
      console.log(err, "Something went wrong");
    })
  }

  shareViaFacebook(){
    let message = this.healthData.title ? this.healthData.title : null;
    let image = "";
    let url = this.healthData.bannerimage ? this.healthData.bannerimage : null;
      this.socialSharing.shareViaFacebookWithPasteMessageHint(message,image,url).then(()=>{
      console.log("Facebook sharing is working");
      },err =>{
      console.log(err,"problem in sharing Via Facebook");
      })
      }

      shareViaWhatsApp(){
        let message = this.healthData.title ? this.healthData.title : null;
        let url = this.healthData.bannerimage ? this.healthData.bannerimage : null;
        this.socialSharing.shareViaWhatsApp(message,url).then(()=>{
          console.log("Whatsapp sharing is working");
        },err=>{
          console.log("whatsapp sharing not working")
        })
      }

      shareViaEmail(){
        let message = this.healthData.title ? this.healthData.title : null;
        let subject = "";
        let to = null;
        let cc = null;
        let bcc = null;
        let file = this.healthData.bannerimage ? this.healthData.bannerimage : null;
        this.socialSharing.shareViaEmail(message,"",to,cc,bcc,file).then(()=>{
          console.log("email sharing is working");
        },err=>{
          console.log("email sharing not working");
        })
      }
      shareViaInstgram(){
        let message = this.healthData.title ? this.healthData.title : null;
        let url = this.healthData.bannerimage ? this.healthData.bannerimage : null;
        this.socialSharing.shareViaInstagram(message, url).then(()=>{
          console.log("Instagram sharing working");
        },err=>{
          console.log("Insta not working");
        })
      }

  
}

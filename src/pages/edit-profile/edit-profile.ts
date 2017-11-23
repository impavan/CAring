import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { LoaderProvider } from '../../providers/loader/loader';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profileData: any = {
    customFields: []
  };
  customFields: any = {};
  userData: any = {};
  countries: any = ['Australia', 'Bhutan', 'China', 'Denmark', 'Hong Kong', 'India', 'Indonesia', 'Malaysia', 'Maldives', 'Myanmar','Namibia','Nepal','North Korea','Philippines','Singapore','Thailand','Turkey','United States of America','Others'];
  incomeslab: any = ['0-2.5K', '2.5K-5K', '5K-7.5K', '7.5K-10K', '10K and above'];
  language: any = ['Bahasa Malaysia', 'Chinese', 'English'];
  occupation: any = ['Entrepreneur / Own business', 'Homemaker', 'Permanent employment', 'Unemployed / Contract', 'Others'];
  race: any = ['Chinese', 'Malay', 'Indian', 'Others'];
  ageGroup: any = ['Below 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', 'Above 60'];
  


  constructor(public events:Events,
              public navCtrl: NavController,
              public navParams: NavParams,
              private alertProvider: AlertProvider,
              private loaderProvider: LoaderProvider,
              private userProvider:UserdataProvider,
              private authProvider: AuthProvider,
              private exceptionProvider:ExceptionHandlerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  ionViewWillEnter() {
    this.getMyBasicDetails();
    
  }

  upadateProfiles() {
    
    console.log(this.profileData);
    console.log(this.customFields);

  }


  getMyBasicDetails() {
    
    this.profileData.firstname = this.authProvider.getUserFirstName();
    this.profileData.lastname = this.authProvider.getUserLastName();
    this.profileData.mobile = this.authProvider.getUserMobileNo();
    this.profileData.email = this.authProvider.getUserEmailId();

  }

  updateProfile(){

    this.userData =
      {
        // fname: this._userName,
        // email: this._emailId,
        // old_email: this._oldemailId,
        // mobile: this._mobileNum,
        // externalId: this._externalId || ''
      }

       this.loaderProvider.presentLoadingCustom();

     this.userProvider.updateProfile(this.userData).subscribe(data => {

    
      if (data[0].code == 200) {

        this.alertProvider.presentToast(data[0].message);

        this.userProvider.getMyProfile().subscribe(data => {

          if (data[0].code == 200) {

            this.loaderProvider.dismissLoader();
            // this._userName = data[0].customerdata.customer[0].firstname;
            // this._emailId = data[0].customerdata.customer[0].email;
            this.authProvider.setUser(data[0].customerdata);
            localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
            this.authProvider.setHeader();
            this.events.publish('user:login', true);

          }
         else {

            this.loaderProvider.dismissLoader();
            this.alertProvider.presentToast(data[0].message);
          }

        }, err => {

          this.loaderProvider.dismissLoader();
          this.exceptionProvider.excpHandler(err);

        })
      }  else {
        this.loaderProvider.dismissLoader();
        this.alertProvider.presentToast(data[0].message);
        // this.cancelEdit();
      }

    }, err => {

      this.loaderProvider.dismissLoader();
      this.exceptionProvider.excpHandler(err);
    });
  }



}

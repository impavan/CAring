import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EMPTY } from '../../validator';
import { AlertProvider } from '../../providers/alert/alert';
import { ProfileProvider } from '../../providers/profile/profile';
import { LoaderProvider } from '../../providers/loader/loader';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  new_email: any;
  profileData: any = {
    customFields: []
  };
  customFields: any = {
    mobile_validated:'Yes'
  };
  userData: any = {};
  countries: any = ['Australia', 'Bhutan', 'China', 'Denmark', 'Hong Kong', 'India', 'Indonesia', 'Malaysia', 'Maldives', 'Myanmar','Namibia','Nepal','North Korea','Philippines','Singapore','Thailand','Turkey','United States of America','Others'];
  incomeslab: any = ['0-2.5K', '2.5K-5K', '5K-7.5K', '7.5K-10K', '10K and above'];
  language: any = ['Bahasa Malaysia', 'Chinese', 'English'];
  occupation: any = ['Entrepreneur / Own business', 'Homemaker', 'Permanent employment', 'Unemployed / Contract', 'Others'];
  race: any = ['Chinese', 'Malay', 'Indian', 'Others'];
  ageGroup: any = ['Below 20', '21-30', '31-40', '41-50', '51-60', 'Above 60'];
  


  constructor(public  events:Events,
              public  navCtrl: NavController,
              private authProvider: AuthProvider,
              private alertProvider: AlertProvider,
              private loaderProvider: LoaderProvider,
              private userProvider: UserdataProvider,
              private profileProvider:ProfileProvider,
              private exceptionProvider: ExceptionHandlerProvider) {
    
            this.authProvider.setHeader();
  }

 

  ionViewWillEnter() {
    this.getMyBasicDetails();
    
  }

  


  getMyBasicDetails() {
    
    this.profileData.firstname = this.authProvider.getUserFirstName();
    this.profileData.lastname = this.authProvider.getUserLastName() || '';
    this.profileData.mobile = this.authProvider.getUserMobileNo();
    this.profileData.email = this.authProvider.getUserEmailId();
    
    this.profileData.externalId = this.authProvider.getExternalId() || '';
    this.customFields.ic_number = this.authProvider.getUserNRIC();
    this.customFields.birthday = this.authProvider.getUserBirthday() || '';
    this.customFields.gender = this.authProvider.getUserGender();
    this.customFields.age_group = this.authProvider.getUserAgeGroup();
    this.customFields.address = this.authProvider.getUserAddress();
    this.customFields.city = this.authProvider.getUserCity();
    this.customFields.pincode = this.authProvider.getUserPostcode();
    this.customFields.other_contact_number = this.authProvider.getOtherContactNo();
    this.customFields.countryof_origin = this.authProvider.getUserCountryOfOrigin();
    this.customFields.incomeslab = this.authProvider.getUserHouseholdIncome();
    this.customFields.race = this.authProvider.getUserRace();
    this.customFields.working = this.authProvider.getUserWorkingStatus();
    this.customFields.occupation = this.authProvider.getUserOccupation();
    this.customFields.preferred_language = this.authProvider.getUserLanguage();
    this.customFields.socialupdate = 1;
   
    
    
    
  }

  updateProfile() {
    
    if( this.profileData.firstname == EMPTY) {
      this.alertProvider.presentToast('Enter First name');
      return;
    }
     else if( this.profileData.lastname == EMPTY) {
      this.alertProvider.presentToast('Enter Last name');
      return;
     } 
    else if( this.customFields.birthday== EMPTY) {
      this.alertProvider.presentToast('Enter Date of Birth');
      return;
    } 
    else if (this.customFields.gender == EMPTY){
      this.alertProvider.presentToast('Enter Gender');
      return;
    } 
    else if (this.customFields.city == EMPTY ){
      this.alertProvider.presentToast("Enter City");
      return;
    } 
    else if (this.customFields.pincode == EMPTY){
      this.alertProvider.presentToast("Enter Pincode");
      return;
    }
    else if (this.customFields.race == EMPTY){
      this.alertProvider.presentToast("Enter Race");
    }
    
    else {
      
      let customfield = this.formCustomField(this.customFields);
      this.profileData.email = this.new_email;
      
      this.profileData.customFields.push(customfield);
     
      this.loaderProvider.presentLoadingCustom();
      console.log("this.profileData",this.profileData);

      this.profileProvider.updateProfile(this.profileData).subscribe(data => {

    
        if (data[0].code == 200) {

          this.alertProvider.presentToast(data[0].message);

          this.userProvider.getMyProfile().subscribe(data => {

            if (data[0].code == 200) {
              this.loaderProvider.dismissLoader();
              this.authProvider.setUser(data[0].customerdata);
              localStorage.setItem('userdetails', JSON.stringify(data[0].customerdata));
              this.authProvider.setHeader();
              this.events.publish('user:login', true);
              this.getMyBasicDetails();
              this.alertProvider.presentToast("Profile Updated successfully");
              this.navCtrl.setRoot("MemberPage",{deeplink:'profile'});

            }
            else {

              this.loaderProvider.dismissLoader();
              this.alertProvider.presentToast(data[0].message);
            }

          }, err => {

            this.loaderProvider.dismissLoader();
            this.exceptionProvider.excpHandler(err);

          })
        } else {
          this.loaderProvider.dismissLoader();
          this.alertProvider.presentToast(data[0].message);
         
        }

      }, err => {

        this.loaderProvider.dismissLoader();
        this.exceptionProvider.excpHandler(err);
      });
    }  
  }


  formCustomField(customField) {
   

    return Object.keys(customField).map((key) => {
      let obj = {
        name: key,
        value: customField[key],
        type:'string'
      }
      return obj;
    });    
  }  
 



}

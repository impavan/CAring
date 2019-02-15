import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EMPTY, EMAIL_REGEXP, NAME_REGEXP, ADDRESS_PATTERN, ALPHA_NUM, PINCODE_PATTERN } from '../../validator';
import moment from 'moment';

// Import all Providers.
import { AlertProvider } from '../../providers/alert/alert';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { LoaderProvider } from '../../providers/loader/loader';
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
    mobile_validated: 'Yes'
  };
  userData: any = {};
  countries: any = ['Australia', 'Bhutan', 'China', 'Denmark', 'Hong Kong', 'India', 'Indonesia', 'Malaysia', 'Maldives', 'Myanmar', 'Namibia', 'Nepal', 'North Korea', 'Philippines', 'Singapore', 'Thailand', 'Turkey', 'United States of America', 'Others'];
  incomeslab: any = ['0-2.5K', '2.5K-5K', '5K-7.5K', '7.5K-10K', '10K and above'];
  language: any = ['Bahasa Malaysia', 'Chinese', 'English'];
  occupation: any = ['Entrepreneur / Own business', 'Homemaker', 'Permanent employment', 'Unemployed / Contract', 'Others'];
  race: any = ['Chinese', 'Malay', 'Indian', 'Others'];
  ageGroup: any = ['Below 20', '21-30', '31-40', '41-50', '51-60', 'Above 60'];
  currentDate: any = moment().format('YYYY-MM-DD');

  constructor(public events: Events,
    public navCtrl: NavController,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private userProvider: UserdataProvider,
    private loaderProvider: LoaderProvider,
    private exceptionProvider: ExceptionHandlerProvider) {

  }

  ionViewWillEnter() {
    this.getMyBasicDetails();
    this.authProvider.setHeader();
  }

  getMyBasicDetails() {
    this.profileData.fname = this.authProvider.getUserFirstName();
    this.profileData.lname = this.authProvider.getUserLastName() || '';
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
    this.customFields.socialupdate = "1";
  }

  updateProfile() {
    if (this.profileData.fname.trim() == EMPTY) {
      this.alertProvider.presentToast('Enter First name');
      return;
    } else if (!NAME_REGEXP.test(this.profileData.fname)) {
      this.alertProvider.presentToast('Enter valid First Name');
      return;
    } else if (this.profileData.lname.trim() == EMPTY) {
      this.alertProvider.presentToast('Enter Last name');
      return;
    } else if (!NAME_REGEXP.test(this.profileData.lname)) {
      this.alertProvider.presentToast('Enter valid Last Name');
      return;
    } else if (this.new_email && this.new_email != EMPTY && !EMAIL_REGEXP.test(this.new_email)) {
      this.alertProvider.presentToast('Enter valid email');
      return;
    } else if (this.customFields.ic_number && !ALPHA_NUM.test(this.customFields.ic_number)) {
      this.alertProvider.presentToast('Enter valid NRIC');
      return;
    } else if (this.customFields.birthday == EMPTY) {
      this.alertProvider.presentToast('Enter Date of Birth');
      return;
    } else if (this.customFields.gender == EMPTY) {
      this.alertProvider.presentToast('Enter Gender');
      return;
    } else if (this.customFields.address && !ADDRESS_PATTERN.test(this.customFields.address)) {
      this.alertProvider.presentToast('Enter valid address');
      return;
    } else if (this.customFields.city.trim() == EMPTY) {
      this.alertProvider.presentToast("Enter City");
      return;
    } else if (!NAME_REGEXP.test(this.customFields.city)) {
      this.alertProvider.presentToast('Enter valid City');
      return;
    } else if (this.customFields.pincode.trim() == EMPTY) {
      this.alertProvider.presentToast("Enter Postcode");
      return;
    } else if (!PINCODE_PATTERN.test(this.customFields.pincode)) {
      this.alertProvider.presentToast("Enter valid Postcode");
      return;
    } else if (this.customFields.other_contact_number && !PINCODE_PATTERN.test(this.customFields.other_contact_number)) {
      this.alertProvider.presentToast("Enter valid alternate number");
      return;
    } else if (this.customFields.race == EMPTY) {
      this.alertProvider.presentToast("Enter Race");
    } else {
      this.loaderProvider.presentLoadingCustom();
      let customfield = this.formCustomField(this.customFields);
      this.profileData.customFields.push(customfield);
      console.log("this.profileData", this.profileData);
      this.userProvider.updateCustomerDetails(this.profileData, false).subscribe(data => {
        if (data.code == 200) {
          this.loaderProvider.dismissLoader();
          this.userProvider.getCustomerDetails().subscribe(data => {
            if (data.code == 200) {
              let customerData = data.result.response;
              this.authProvider.setUser(customerData.customers);
              localStorage.setItem('userdetails', JSON.stringify(customerData.customers));
              this.events.publish('user:login', true);
              this.getMyBasicDetails();
              this.alertProvider.presentToast("Profile Updated successfully");
              // this.navCtrl.setRoot("MemberPage", { deeplink: 'profile' });
              this.navCtrl.pop();
            } else {
              this.alertProvider.presentToast(data[0].message);
            }
          }, err => {
            this.exceptionProvider.excpHandler(err);
          })
        } else {
          this.loaderProvider.dismissLoader();
          this.alertProvider.presentToast(data.message);
        }
      }, err => {
        this.exceptionProvider.excpHandler(err);
      });
    }
  }

  formCustomField(customField) {
    return Object.keys(customField).map((key) => {
      let obj = {
        name: key,
        value: customField[key]
      }
      return obj;
    });
  }
}
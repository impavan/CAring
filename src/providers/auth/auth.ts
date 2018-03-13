
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Import Providers.

@Injectable()
export class AuthProvider {


  userLoggedIn: boolean = false;
  userObj: any;
  contentHeaders: any;
  DOB = 'dob';
  _auth: any;
  _userName: string = '';
  _profilePic: any = '';
  fileData: any;
  profileData: any;

  constructor() {
    
    this.userObj = "";
    this.contentHeaders = new Headers();
    this._auth = this.getAuthToken();
  }

  //sets the user details object;
  setUser(user) {
    this.userObj = user;
  }

  sideMenuUserDetails() {
    this._userName = this.getUserFirstName() + ' ' + this.getUserLastName();
  }

  // return the header
  getHeader() {
    return this.contentHeaders;
  }

  // sets the header with access-token
  setHeader() {
    this.contentHeaders.set('Authorization', this.getAuthToken());
  }

  //sets the auth- token
  setAuthToken(authToken) {
    localStorage.setItem('auth_token', authToken);
  }

  // returns auth-Token
  getAuthToken() {
    return localStorage.getItem('auth_token');
  }


  //set true if user logged In
  setUserLoggedIn(userLoggedIn) {
    this.userLoggedIn = userLoggedIn;
  }

  // returns true if user logged In else false;
  getUserLoggedIn() {
    return this.userLoggedIn;
  }

  //returns user firstname 
  getUserFirstName() {
    return this.userObj.customer[0].firstname;
  }



    // returns externalId
  getExternalId(){
    return this.userObj.customer[0].external_id;
  }




  //returns user gender
  getUserGender() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let gender = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'gender')
      if (gender && gender.value != null)
        return gender.value;
      else
        return '';
    } else
      return '';
  }

  //returns user lastname
  getUserLastName() {
    if (this.userObj.customer[0].lastname != null)
      return this.userObj.customer[0].lastname;
    else
      return '';
  }

  //returns user NRIC
  getUserNRIC() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let nric = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'ic_number')
      if (nric && nric.value != null)
        return nric.value;
      else
        return '';
    } else
      return '';
  }

    //returns user Birthday
  getUserBirthday() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let birthday = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'birthday')
      if (birthday && birthday.value != null)
        return birthday.value;
      else
        return '';
    } else
      return '';
  }

  //returns user Age Group
  getUserAgeGroup() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let age = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'age_group')
      if (age && age.value != null)
        return age.value;
      else
        return '';
    } else
      return '';
  }

  //returns user Address
  getUserAddress() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let address = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'address')
      if (address && address.value != null)
        return address.value;
      else
        return '';
    } else
      return '';
  }

  //returns user Postcode
  getUserPostcode() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let postcode = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'pincode')
      if (postcode && postcode.value != null)
        return postcode.value;
      else
        return '';
    } else
      return '';
  }

  //returns user City
  getUserCity() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let city = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'city')
      if (city && city.value != null)
        return city.value;
      else
        return '';
    } else
      return '';
  }


//returns user Country of Origin
  getUserCountryOfOrigin() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let country = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'countryof_origin')
      if (country && country.value != null)
        return country.value;
      else
        return '';
    } else
      return '';
  } 
  
  //returns user other contact number
  getOtherContactNo() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let otherContact = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'other_contact_number')
      if (otherContact && otherContact.value != null)
        return otherContact.value;
      else
        return '';
    } else
      return '';
    
  }

  //returns user Household Income
  getUserHouseholdIncome() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let income = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'incomeslab')
      if (income && income.value != null)
        return income.value;
      else
        return '';
    } else
      return '';
  }

  //returns Working Status
  getUserWorkingStatus() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let status = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'working')
      if (status && status.value != null)
        return status.value;
      else
        return '';
    } else
      return '';
  }


  //returns User Race
  getUserRace() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let race = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'race')
      if (race && race.value != null)
        return race.value;
      else
        return '';
    } else
      return '';
  }

  //return User SMS Subscription //

  getUserSMSSubscribtion() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let sms = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'sms')
      if (sms && sms.value != null)
        return sms.value;
      else
        return '';
    } else
      return '';
  }

   //return User SMS Subscription //

   getUserEmailSubscribtion() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let email = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'email')
      if (email && email.value != null)
        return email.value;
      else
        return '';
    } else
      return '';
  }

  //return User (Return Customer) Detail //

  getUserReturn() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let return_customer = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'return_customer')
      if (return_customer && return_customer.value != null)
        return return_customer.value;
      else
        return '';
    } else
      return '';
  }


  //returns User Occupation
  getUserOccupation() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let occup = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'occupation')
      if (occup && occup.value != null)
        return occup.value;
      else
        return '';
    } else
      return '';
  }


  //returns User Preferred Language
  getUserLanguage() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let lang = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'preferred_language')
      if (lang && lang.value != null)
        return lang.value;
      else
        return '';
    } else
      return '';
  }
  



  //returns user email id
  getUserId() {
    return this.userObj.customer[0].user_id;
  }

  //returns user email id
  getUserEmailId() {
    if (this.userObj.customer[0].email != null)
      return this.userObj.customer[0].email;
    else
      return '';
  }

  //returns user mobile number
  getUserMobileNo() {
    return this.userObj.customer[0].mobile;
  }

  //returns user date-of-birth
  getUserDob() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let dob = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'dob')
      if (dob && dob.value != null)
        return dob.value;
      else
        return '';
    } else
      return '';
  }


  //returns current points of a user
  getMyCurrentPoints() {
    return this.userObj.customer[0].loyalty_points;
  }

  //set my current point
  setMyCurrentPoints(points) {
    this.userObj.customer[0].loyalty_points = points;
  }

  //returns lifetime points
  getMyLifeTimePoints() {
    return this.userObj.customer[0].lifetime_points;
  }

  //returns lifetime redeemed points of the user   
  getTotalRedeemedPoints() {
    if (this.getMyLifeTimePoints() > 0) {
      return (this.getMyLifeTimePoints() - this.getMyCurrentPoints());
    } else {
      return 0;
    }
  }

}
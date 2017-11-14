
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
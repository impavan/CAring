import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { CUSTOM_FIELDS } from '../../config';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Import Providers.
import { AlertProvider } from '../alert/alert';

@Injectable()
export class AuthProvider {
  PROFILE_IMG = 'profile_picture';
  userLoggedIn: boolean = false;
  PARKING_ID = 'parkingid';
  userObj: any;
  contentHeaders: any;
  profilePic: String;
  WIFI_ID = 'wifiid';
  DOB = 'dob';
  _auth: any;
  _userName: string = '';
  _profilePic: any = '';
  fileData: any;
  profileData: any;

  constructor(private actionSheetCtrl: ActionSheetController,
    private alertProvider: AlertProvider,
    private camera: Camera,
    private http: Http) {
    this.userObj = "";
    this.profilePic = "";
    this.contentHeaders = new Headers();
    this._auth = this.getAuthToken();
  }

  //sets the user details object;
  setUser(user) {
    this.userObj = user;
  }

  sideMenuUserDetails() {
    this._userName = this.getUserFirstName() + ' ' + this.getUserLastName();
    this._profilePic = this.getUserProfilePic();
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

  //returns user profile pic
  getUserProfilePic() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let pic = this.userObj.customer[0].custom_fields.field.find(data => data.name == this.PROFILE_IMG)
      if (pic && pic.value != null) {
        return pic.value;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  //returns user IU number --(Parking Id)
  getUserIUNo() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let parking = this.userObj.customer[0].custom_fields.field.find(data => data.name == this.PARKING_ID)
      if (parking && parking.value != null)
        return parking.value;
      else
        return '';
    } else {
      return '';
    }
  }

  //returns a wifi id
  getUserWifiID() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let wifi_Id = this.userObj.customer[0].custom_fields.field.find(data => data.name == 'wifiid')
      if (wifi_Id && wifi_Id.value != null)
        return wifi_Id.value;
      else
        return '';
    }
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

  //check wheather there is both parking Id and wifi id in custom field
  customFieldExist() {
    if (this.userObj.customer[0].custom_fields.field != null && this.userObj.customer[0].custom_fields.field.length > 0) {
      let flag = 0;
      for (let i = 0; i < this.userObj.customer[0].custom_fields.field.length; i++) {
        if (CUSTOM_FIELDS.hasOwnProperty(this.userObj.customer[0].custom_fields.field[i].name)) {
          flag++;
        }
      }
      if (flag == 2) {
        return 1
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  uploadPoints() {
    return new Promise((resolve, reject) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: "Choose Image from",
        buttons: [
          {
            text: "Camera",
            role: "Open Camera",
            handler: () => {
              let options: CameraOptions = {
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.CAMERA,
                saveToPhotoAlbum: true,
                correctOrientation: true,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                cameraDirection: this.camera.Direction.BACK
              }
              this.camera.getPicture(options).then((imageData) => {
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                this.fileData = base64Image;
                resolve(this.fileData);
              }, (err) => {
                this.alertProvider.presentToast("Something went wrong");
              });
            }
          },
          {
            text: "Gallery",
            role: "Open Gallery",
            handler: () => {
              let options: CameraOptions = {
                quality: 50,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                allowEdit: true,
                saveToPhotoAlbum: true,
                correctOrientation: true
              }
              this.camera.getPicture(options).then((imageData) => {
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                this.fileData = base64Image;
                resolve(this.fileData);
              }, (err) => {
                this.alertProvider.presentToast("Something went wrong");
              });
            }
          },
        ]
      });
      actionSheet.present();
    });
  }

  uploadProfile() {
    return new Promise((resolve, reject) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: "Choose Image from",
        buttons: [
          {
            text: "Camera",
            role: "Open Camera",
            handler: () => {
              let options: CameraOptions = {
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.CAMERA,
                targetWidth: 1000,
                targetHeight: 1000,
                allowEdit: true,
                saveToPhotoAlbum: true,
                correctOrientation: true,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                cameraDirection: this.camera.Direction.BACK
              }
              this.camera.getPicture(options).then((imageData) => {
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                this.profileData = base64Image;
                resolve(this.profileData);
              }, (err) => {
                this.alertProvider.presentToast("Something went wrong");
              });
            }
          },
          {
            text: "Gallery",
            role: "Open Gallery",
            handler: () => {
              let options: CameraOptions = {
                quality: 50,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 1000,
                targetHeight: 1000,
                allowEdit: true,
                saveToPhotoAlbum: true,
                correctOrientation: true
              }
              this.camera.getPicture(options).then((imageData) => {
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                this.profileData = base64Image;
                resolve(this.profileData);
              }, (err) => {
                this.alertProvider.presentToast("Something went wrong");
              });
            }
          }
        ]
      });
      actionSheet.present();
    });
  }
}
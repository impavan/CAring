import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform } from 'ionic-angular';

//All providers goes here
import { StoreLocatorProvider } from '../../providers/store-locator/store-locator';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';


declare var google;
@IonicPage()
@Component({
  selector: 'page-store-locator',
  templateUrl: 'store-locator.html',
})

export class StoreLocatorPage {
  @ViewChild('myMap') mapElement;
  @ViewChild('locBtn') locbutton;
  @ViewChild('location') locationModal;
  map: any;
  locationList: any = [];
  updatedLocationList: any = [];
  favouriteList: any = [];
  _favIdList: any = [];
  marker: any;
  _filterList:any = [];
  _myCurrentLocation:any = {};
  _newFilteredList:any = [];
  locationState = 'near_you';
  _searchKey:any = '';
  _creteria:any = {
    "storename": '',
  };

  instoreData: any;
  storeId: any;
  navToId: any;
  

  constructor(public events: Events,
              public platform: Platform , 
              public navCtrl: NavController, 
              public navParams: NavParams,
              public storeLocatorProvider: StoreLocatorProvider, 
              private loaderProvider:LoaderProvider,
              private geolocation: Geolocation,
              private diagnostic: Diagnostic,
              private keyboard:Keyboard,
              private alertProvider:AlertProvider,
              private launchNavigator: LaunchNavigator, private elRef: ElementRef) {
    
            this.instoreData = navParams.get('instore') || '';
            this.storeId = navParams.get('storeId');
            this.navToId = navParams.get('id') || '';
            
    
   
            
  }


  ionViewWillEnter() {
    this.loaderProvider.presentLoadingCustom();
    this._favIdList = this.getFavList();
    this.events.publish('changeIcon',"StoreLocatorPage");
  }


  ngAfterViewInit() {

    // console.log("in ngafterViewinit");
    //     this.locationModal.close();
    this.diagnostic.isLocationAuthorized().then(res => {
      if (!res) {
        console.log("location is NOT authorised. Ask for authorization");
        this.diagnostic.requestLocationAuthorization('always').then(resp => {
          this.loadMap();
        }, err => {
          this.loadMap();
          })
      } else{
        console.log("location is Authorised"); 
        this.loadMap();  
      }
    })  
    
  }



  loadMap() {

    
    console.log("going to call get current position");  

    this.platform.ready().then((readySource) => {
      this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
          console.log('Is available? ' + isAvailable);
          // Display map here
          if (isAvailable) {
            this.geolocation.getCurrentPosition().then((resp) => {
              console.log("Inside loadmap with current coordinates");
              this.getAllStores(resp.coords.latitude, resp.coords.longitude, 50);
              // this.getAllStores(lat,lng, 50);
     
              this._myCurrentLocation = {
                lat: resp.coords.latitude,
                lng: resp.coords.longitude,
              }
              let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        
              let mapOptions = {
                center: latLng,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
     
              this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
            }).catch((error) => {
              console.log("Error getting current location. Use dummy location");
              // console.log('Error getting location', error);
              let lat = "3.1390";
              let lng = "101.6869";
              let latLng = new google.maps.LatLng(lat, lng);

      
              let mapOptions = {
                center: latLng,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
     
              this.getAllStores(lat, lng, 50);
              this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
              this.alertProvider.presentToast("Error in accessing your current location. Please provide permission to access location");
     
            });
          }
          else { 

            this.locationModal.open();
          
            //alert("Please enable your location in order to view the store listing");
          }
    }).catch( (e) => {
      console.log(e);
      alert("Please enable your location in order to view the store listing");
    });


    });    


      
     
  }

  loadFavList(locationList) {

    for (let i in locationList) {

      locationList[i].favourite = this._favIdList.includes(locationList[i].storeId);
      if (locationList[i].favourite) {
        this.favouriteList.push(locationList[i]);
        console.log(this.favouriteList);
      }
    }

  }
  closeLocationModal() { 
    this.locationModal.close();
  }

  openLocationModel() { 
        this.locationModal.close();
    console.log("pelase close adn work");
        this.ngAfterViewInit();
  }
  addMarkers(map, locationList) {

   
      var infowindow = new google.maps.InfoWindow();
    for (let i in locationList) {

        let latLng = new google.maps.LatLng(locationList[i].latitude, locationList[i].longitude);
        let marker = new google.maps.Marker({
         title: locationList[i].storeName,
         map: map,
         animation: 'DROP',
         position: latLng,
         mobile: locationList[i].mobile,
         lat:locationList[i].latitude,
         lng:locationList[i].longitude,
         address:locationList[i].storeDescription
        })
      
        
        marker.addListener('click', () => {

           let contentString = '<div id="content" style="width:150px !important;">' +
            '<div id="siteNotice">' +
             '<p><b>' + marker.title + '<br /></b>' + marker.address  +
             '<p *ngIf="' +marker.mobile + '">' + marker.mobile  + '</p>'       
          '</div>' + '</div>';
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
          // console.log("element",this.elRef.nativeElement.querySelector('.store'))
          // this.elRef.nativeElement.querySelector('.store').addEventListener('click', this.gotoStoreDirection2.bind(this,marker.lat,marker.lng));

        });  

     
    }
  
  }

  



  

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }


  

  setFav(location) {

    location.favourite = true;
    this.favouriteList.push(location);
    this.addFavList(location.storeId);

  }

  removeFav(location) {

    location.favourite = false;
    let index = this.favouriteList.findIndex(loc => loc.storeId == location.storeId);
    this.favouriteList.splice(index, 1);
    this.removeFavList(location.storeId);

  }

  getFavList() {

    let list: any = localStorage.getItem('favouriteList');
    let list2: any = list == null ? [] : JSON.parse(list);
    console.log("getFavList --- list2");
    console.log(list2);
    return (list2);

  }

  addFavList(id) {

    this._favIdList = this.getFavList();
    this._favIdList.push(id);
    localStorage.setItem('favouriteList', JSON.stringify(this._favIdList));

  }

  removeFavList(id) {

    this._favIdList = this.getFavList();
    let index = this._favIdList.findIndex(fav => fav._id == id);
    this._favIdList.splice(index, 1);
    localStorage.setItem('favouriteList', JSON.stringify(this._favIdList));

  }


  onInput(event) {
    
    let val = event.target.value;
    if (this._searchKey) {
      this._newFilteredList = this._filterList.filter(item => (item.storeName.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.storeDescription.toLowerCase().indexOf(val.toLowerCase()) > -1) );
   }
    else if (!this._searchKey) {
      
      this.onClear();
    }
    
    
  }


  onInStoreInput(loc,storeId) {
     
    this._searchKey = loc;
    let val = storeId;
    if(val)
      this._newFilteredList = this._filterList.filter(item => item.storeId === val);
      if (this._newFilteredList.length > 0)
        this.setMarker(this._newFilteredList[0]);  
    
  }

  onCancel(event){

    
     let latLng = new google.maps.LatLng(this._myCurrentLocation.lat, this._myCurrentLocation.lng);
     this.map.panTo(latLng,30);
     this.map.setZoom(12);
    
  }

  onClear(){
    
     let latLng = new google.maps.LatLng(this._myCurrentLocation.lat, this._myCurrentLocation.lng);
     this.map.panTo(latLng,30);
     this.map.setZoom(12);
  }

    setMarker(data){

      let marker = new google.maps.Marker();
      var latLng = new google.maps.LatLng(data.latitude, data.longitude);
        this.map.panTo(latLng,30);
        this.map.setZoom(14);
  }
  //1.6092 exact value for converting miles to kilometeres

 
  getAllStores(lat, lng, limit) {
  
    this.storeLocatorProvider.getAllStoreLocation(lat,lng, limit)

        .subscribe(res=>{

              this.locationList  = res.storesWithDistance;
              this.updatedLocationList = this.locationList.filter(data=>data.latitude!=0 && data.longitude!=0);
              this._filterList = this.updatedLocationList;
              this.addMarkers(this.map, this.updatedLocationList);
              this.loadFavList(this.updatedLocationList);
              this.loaderProvider.dismissLoader();
          
              if (this.instoreData)
                this.onInStoreInput(this.instoreData, this.storeId);
              
              if(this.navToId && this.navToId!=null && this.navToId!=undefined)
               this.onInStoreInput('', this.navToId);
      }, err => {
        this.loaderProvider.dismissLoader();
        
        });

  }

 gotoStoreDirection(loc) {
    
    this.launchNavigator.navigate([loc.latitude, loc.longitude])
      .then(
         success => console.log('Launched navigator'),
         error => console.log('Error launching navigator', error));    
 
  }  


 gotoStoreDirection2(lat, lng) {
    
  this.launchNavigator.navigate([lat, lng])
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error));    

 }    

 hideKeyboard(ev) {
   console.log(ev.keyCode)
   console.log(ev)
   if (ev.keyCode == 13)
     this.keyboard.close();

}
  


}
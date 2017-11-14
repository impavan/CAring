import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

//All providers goes here
import { StoreLocatorProvider } from '../../providers/store-locator/store-locator';
import { LoaderProvider } from '../../providers/loader/loader';


declare var google;
@IonicPage()
@Component({
  selector: 'page-store-locator',
  templateUrl: 'store-locator.html',
})

export class StoreLocatorPage {
  @ViewChild('myMap') mapElement;
  map: any;
  locationList: any = [];
  updatedLocationList: any = [];
  favouriteList: any = [];
  _favIdList: any = [];
  _filterList:any = [];
  _myCurrentLocation:any = {};
  _newFilteredList:any = [];
  locationState = 'near_you';
  _searchKey:any = '';
  _creteria:any = {
    "storename": '',
  };
  

  constructor(public events:Events,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public storeLocatorProvider: StoreLocatorProvider, 
              private loaderProvider:LoaderProvider,
              private geolocation: Geolocation) {
  }


  ionViewWillEnter() {
    this.loaderProvider.presentLoadingCustom();
    // this.getStores();
    this._favIdList = this.getFavList();
    this.events.publish('changeIcon',"StoreLocatorPage");
  }


  ngAfterViewInit() {
    this.loadMap();
  }

  // getStores() {
  //   this.storeLocatorProvider.getStores().subscribe(res => {
  //     this.locationList = res.data;
  //     this.addMarkers(this.map, this.locationList);
  //     this.loadFavList(this.locationList);
  //   });
  // }

  loadMap() {

   this.geolocation.getCurrentPosition().then((resp) => {

     this.getAllStores(resp.coords.latitude, resp.coords.longitude, 50);
     
    this._myCurrentLocation = {
      lat:resp.coords.latitude,
      lng:resp.coords.longitude,
    }
     
    let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
     
    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
     
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
   }).catch((error) => {
    
     console.log('Error getting location', error);
     
});
  }

  loadFavList(locationList) {

    for (let i in locationList) {
      locationList[i].favourite = this._favIdList.includes(locationList[i]._id);
    }

  }

  addMarkers(map, locationList) {

    for (let i in locationList) {
      let marker = new google.maps.Marker();
      var latLng = new google.maps.LatLng(locationList[i].latitude, locationList[i].longitude);
      marker.setPosition(latLng);
      marker.setTitle(locationList[i].storeName);
      marker.setMap(map);
    }
    // let latA = new google.maps.LatLng(12.914142,74.855957);
    //  let latB = new google.maps.LatLng(12.971599, 77.594563);
    // let curentLatLng = new google.maps.LatLng(3.1655016, 101.65281950000008)
    // this.getDistance(curentLatLng, locationList);
  }

  // distanceValue(){
  //  let  curentLatLng = new google.map.LatLng(this.locationList[0].location.x, this.locationList[0].location.y)
  //      for(let i in this.locationList){
  //             let km = this.getDistance(curentLatLng, new google.maps.LatLng(this.locationList[i].location.x, this.locationList[i].location.y));
  //             console.log("kilometer is:", km);
  //     }
  // }



  // getDistance(currentlatLngA, locationList) {
  //   // let km =  google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
  //   this.updatedLocationList = [];
  //   let that = this;
  //   let service = new google.maps.DistanceMatrixService();
  //   for (let i in locationList) {
  //     service.getDistanceMatrix({
  //       origins: [currentlatLngA],
  //       destinations: [new google.maps.LatLng(locationList[i].location.x, locationList[i].location.y)],
  //       travelMode: google.maps.TravelMode.DRIVING,
  //       unitSystem: google.maps.UnitSystem.METRIC,
  //       avoidHighways: false,
  //       avoidTolls: false
  //     }, function (res) {
  //       locationList[i].km = res.rows[0].elements[0].distance.value / 1000;
  //       that.updatedLocationList.push(locationList[i])
  //       if (locationList.length == that.updatedLocationList.length) {
  //         that.locationState = 'near_you';
  //         that._filterList = that.updatedLocationList;
  //         that.favouriteList = that.updatedLocationList.filter(fav => fav.favourite == true);
  //         that.updatedLocationList.sort((a, b) => {
  //           return parseFloat(a.km) - (b.km);
  //         });
  //         that.favouriteList.sort((a, b) => {
  //           return parseFloat(a.km) - (b.km);
  //         });
  //         // that.updatedLocationList.sort(this.sortBy);
  //         that.loaderProvider.dismissLoader();
  //       }
  //     });
  //   }
  //   //  console.log("km is:", km);
  // }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }


  // sortBy(a,b){
  //       return parseFloat(a.km) - (b.km);
  //  }

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

  onCancel(event){

    
     let latLng = new google.maps.LatLng(3.1655016, 101.65281950000008);
     this.map.panTo(latLng,30);
     this.map.setZoom(12);

  }

  onClear(){
    
     let latLng = new google.maps.LatLng(3.1655016, 101.65281950000008);
     this.map.panTo(latLng,30);
     this.map.setZoom(12);
  }

    setMarker(data){

      console.log(data);
     let marker = new google.maps.Marker();
      var latLng = new google.maps.LatLng(data.latitude, data.longitude);
        this.map.panTo(latLng,30);
        this.map.setZoom(14);
  }
  //1.6092 exact value for converting miles to kilometeres

 
getAllStores(lat, lng, limit){

    this.storeLocatorProvider.getAllStoreLocation(lat,lng, limit)

        .subscribe(res=>{

              this.locationList  = res.storesWithDistance;
              this.updatedLocationList = this.locationList;
              this._filterList =this.locationList;
              this.addMarkers(this.map, this.locationList);
              this.loadFavList(this.locationList);
          
        });

}

}
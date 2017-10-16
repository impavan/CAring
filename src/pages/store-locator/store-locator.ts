import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';

//All providers goes here
import { StoreLocatorProvider } from '../../providers/store-locator/store-locator';
// import { GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';

/**
 * Generated class for the StoreLocatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storeLocatorProvider: StoreLocatorProvider
  ) {
  }


  ionViewWillEnter() {

    this.getStores();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreLocatorPage');


  }

  ngAfterViewInit() {
    this.loadMap();
  }


  getStores() {

    this.storeLocatorProvider.getStores()

      .subscribe(res => {

        console.log(res);
        this.locationList = res.data;
        this.addMarkers(this.map, this.locationList);

      })

  }


  loadMap() {
    // this.mapElement = document.getElementById('map');

    // let mapOptions: GoogleMapOptions = {
    //   camera: {
    //     target: {
    //       lat: 43.0741904,
    //       lng: -89.3809802
    //     },
    //     zoom: 18,
    //     tilt: 30
    //   }
    // };

    // this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // // Wait the MAP_READY before using any methods.
    // this.map.one(GoogleMapsEvent.MAP_READY)
    //   .then(() => {
    //     console.log('Map is ready!');

    //     // Now you can use all methods safely.
    //     this.map.addMarker({
    //         title: 'Ionic',
    //         icon: 'blue',
    //         animation: 'DROP',
    //         position: {
    //           lat: 43.0741904,
    //           lng: -89.3809802
    //         }
    //       })
    //       .then(marker => {
    //         marker.on(GoogleMapsEvent.MARKER_CLICK)
    //           .subscribe(() => {
    //             alert('clicked');
    //           });
    //       });

    //   });


    //  let marker = new google.maps.Marker();
    //         marker.setPosition(latLng);
    //         marker.setTitle("current Position");
    //         marker.setMap(this.map);







    navigator.geolocation.getCurrentPosition((position) => {

      console.log(position);

      let latLng = new google.maps.LatLng(3.1655016, 101.65281950000008);

      let mapOptions = {

        center: latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP


      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);




    })





  }

  addMarkers(map, locationList) {

    for (let i in locationList) {
      let marker = new google.maps.Marker();
      let latLng = new google.maps.LatLng(locationList[i].location.x, locationList[i].location.y);
      marker.setPosition(latLng);
      marker.setTitle(locationList[i].storename);
      marker.setMap(map);

   
    }
      let latA = new google.maps.LatLng(12.914142,74.855957);
       let latB = new google.maps.LatLng(12.971599, 77.594563);
       let km = this.distance(latA, latB);
      console.log("kilometer is:", km);

  }


  distance(latLngA, latLngB) {

    // var radlat1 = Math.PI * lat1 / 180
    // var radlat2 = Math.PI * lat2 / 180
    // var theta = lon1 - lon2
    // var radtheta = Math.PI * theta / 180
    // var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    // dist = Math.acos(dist)
    // dist = dist * 180 / Math.PI
    // dist = dist * 60 * 1.1515
    // if (unit == "K") { dist = dist * 1.609344 }
    // if (unit == "N") { dist = dist * 0.8684 }
    // return dist
  //   var R = 6371; // Radius of the earth in km
  // var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  // var dLon = this.deg2rad(lon2-lon1); 
  // var a = 
  //   Math.sin(dLat/2) * Math.sin(dLat/2) +
  //   Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
  //   Math.sin(dLon/2) * Math.sin(dLon/2)
  //   ; 
  // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  // var d = R * c; // Distance in km
  // return d;
 let km =  google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
         let service =  new google.maps.DistanceMatrixService();
          console.log(service);
         service.getDistanceMatrix({
           origins: ["bangalore"],
            destinations: ["mangalore"],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false

         }, this.successCallBack);
        
 console.log("km is:", km);
}

deg2rad(deg) {
  return deg * (Math.PI/180)
}

successCallBack(res){
  console.log(res);

}

//1.6092 exact value for converting miles to kilometeres
}



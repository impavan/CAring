import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  updatedLocationList:any = [];

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
      var latLng = new google.maps.LatLng(locationList[i].location.x, locationList[i].location.y);
      marker.setPosition(latLng);
      marker.setTitle(locationList[i].storename);
      marker.setMap(map);

   
    }
      // let latA = new google.maps.LatLng(12.914142,74.855957);
      //  let latB = new google.maps.LatLng(12.971599, 77.594563);
       let  curentLatLng = new google.maps.LatLng(3.1655016, 101.65281950000008)
      this.getDistance(curentLatLng,locationList);
   
   

  }


  // distanceValue(){
  //  let  curentLatLng = new google.map.LatLng(this.locationList[0].location.x, this.locationList[0].location.y)
  //      for(let i in this.locationList){
  //             let km = this.getDistance(curentLatLng, new google.maps.LatLng(this.locationList[i].location.x, this.locationList[i].location.y));
  //             console.log("kilometer is:", km);
  //     }

  // }


  getDistance(currentlatLngA, locationList) {
    // let km =  google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
    this.updatedLocationList = [];
    let that = this;
    let service =  new google.maps.DistanceMatrixService();
          console.log(service);
           for(let i in locationList){
              service.getDistanceMatrix({
                origins: [currentlatLngA],
                  destinations: [new google.maps.LatLng(locationList[i].location.x, locationList[i].location.y)],
                  travelMode: google.maps.TravelMode.DRIVING,
                  unitSystem: google.maps.UnitSystem.METRIC,
                  avoidHighways: false,
                  avoidTolls: false

              }, function(res){
                  locationList[i].km = res.rows[0].elements[0].distance.value /1000;
                  that.updatedLocationList.push(locationList[i])
                  if(locationList.length  == that.updatedLocationList.length){
                    that.sortBy(that.updatedLocationList,"km");
                    setTimeout(()=>{
                          console.log( that.updatedLocationList);
                    }, 6000);
                  
                  }
              });
               
           }
      
        
//  console.log("km is:", km);
}

deg2rad(deg) {
  return deg * (Math.PI/180)
}

successCallBack(res){
  console.log(res);
  console.log("distance from current location is",res.rows[0].elements[0].distance.value /1000,"km");


}

sortBy(array , key){
  console.log("In sort");
 for(let i in array){
    for(let j in array){
      if(array[i].km < array[j].km){
        let temp = array[i];
        array[j] = array[i];
        array[i] = temp;
        break;
      }
    }
 }

}

//1.6092 exact value for converting miles to kilometeres
}



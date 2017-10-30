import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';

/**
 * Generated class for the EventLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-event-location',
  templateUrl: 'event-location.html',
})
export class EventLocationPage {
 @ViewChild('myMap') mapElement;
  map:any;
  lat:any;
  lng:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.lat = navParams.get('lat');
    this.lng = navParams.get('lng');
    console.log(this.lat, this.lng);
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventLocationPage');
    this.loadMap();
  }

  ngAfterViewInit() {
     
  }


 loadMap() {
    // navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    let latLng = new google.maps.LatLng(this.lat, this.lng);
    console.log("***************************");
    let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    // })

    console.log(this.map);

    let locationDetails = {
          x:this.lat,
          y:this.lng,
          
    }
    this.addMarkers(this.map, locationDetails);
  }

   addMarkers(map, locationList) {
   
      let marker = new google.maps.Marker();
      var latLng = new google.maps.LatLng(locationList.x, locationList.y);
      marker.setPosition(latLng);
      // marker.setTitle(locationList.storename);
      marker.setMap(map);
   }

}

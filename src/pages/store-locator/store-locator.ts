import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

//All providers goes here
import { StoreLocatorProvider } from '../../providers/store-locator/store-locator';
// import { GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';

/**
 * Generated class for the StoreLocatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-store-locator',
  templateUrl: 'store-locator.html',
})
export class StoreLocatorPage {

  @ViewChild('myMap') mapElement;

map:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storeLocatorProvider:StoreLocatorProvider,
             ) {
  }


  ionViewWillEnter(){

     this.getStores();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreLocatorPage');
   

  }

  ngAfterViewInit(){
       this.loadMap();
  }


  getStores(){

        this.storeLocatorProvider.getStores()

              .subscribe(res => {

                  console.log(res);

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


      

       navigator.geolocation.getCurrentPosition((position)=>{

                let lat =  position.coords.latitude;
                let lng = position.coords.longitude;

                let latLng = new google.maps.LatLng(lat, lng);

         ;

      let mapOptions = {

            center:latLng,
            zoom:18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            

      };

     


      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
            let marker = new google.maps.Marker();
                marker.setPosition(latLng);
                marker.setTitle("current Position");
                marker.setMap(this.map);
       

      })

       
  }
}



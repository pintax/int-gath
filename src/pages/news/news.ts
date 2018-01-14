import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { 
  GoogleMaps, 
  GoogleMapOptions, 
  GoogleMapsEvent, 
  LatLng,
  GoogleMap, 
  MarkerOptions, 
  Marker,
  GoogleMapsAnimation} from "@ionic-native/google-maps";
import { NgFor } from '@angular/common/src/directives';
import { EventProvider } from '../../providers/event/event';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { CustomPageModule } from '../custom-list/custom-list.module';
import { Geolocation } from '@ionic-native/geolocation';

import firebase from 'firebase'; 

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  public currentEvent: any = {};
  public currentUser: any = {};
  public guestEmail: string = "";
  public guestPicture: string = null;
  public userEmail: string;
  public currentCustomRecord: any = {};
  public currentCustomBookmark: any = {};

  public logoGame: any;
  public game: string
  
  // Current Event
  public eventName: string;
  public eventDate: string;
  public eventGame: string;
  public eventVenue: string;
  public eventCity: string;
  
  public eventBookmarked: string = "bookmarked";
  public eventRecord: string = "Recorded";
  public eventConfirmed: string = "Confirmed";

  public firestore = firebase.storage(); 

// Google Maps 
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  lat: number;
  lng: number;

  latmarker: number;
  lngmarker: number;

  markers: any;
  subscription: any;

  public customList: Array<any>;
  public data:any;



  constructor(
    private geo: GeolocationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eventProvider: EventProvider,
  ) { }


  ngAfterViewInit() {
  //  this.loadMap();
    console.log("ngAfterViewInit");
 }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.getUserLocation()
    this.subscription = this.geo.hits
        .subscribe(hits => this.markers = hits)
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  

  private setUserLocation(){
    if (navigator.geolocation) {
      
    }
  }

  private getUserLocation() {
   /// locate the user
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
       this.geo.getLocations(100, [this.lat, this.lng])
     });
   }
 }



//----------------------------------------------------//
//------------------- Google Maps --------------------//
//----------------------------------------------------//

loadMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
     this.lat = position.coords.latitude;
     this.lng = position.coords.longitude;
     this.geo.getLocations(100, [this.lat, this.lng])
   });
 }

  let element: HTMLElement = document.getElementById('map');
  
  let mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: 15,
      tilt: 30
    }
  };

  this.map = GoogleMaps.create(element, mapOptions);
  
  let ionic: LatLng = new LatLng(this.lat, this.lng);

  this.map.one(GoogleMapsEvent.MAP_READY).then(
    () => {
        this.map.addMarker({
          position: ionic,
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert();
            });
        });
        console.log('Map is ready!');
    });  
  } 
}

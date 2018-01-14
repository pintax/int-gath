import { Component, NgZone, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from '../../providers/profile/profile';

import { Camera } from "@ionic-native/camera";

import firebase from 'firebase'; 

import { 
  GoogleMaps, 
  GoogleMapOptions, 
  GoogleMapsEvent, 
  LatLng,
  GoogleMap, 
  GoogleMapsAnimation} from "@ionic-native/google-maps";
import { CustomListPage } from "../custom-list/custom-list";

@IonicPage({
  segment: "custom-detail/:eventId"
})
@Component({
  selector: "page-custom-detail",
  templateUrl: "custom-detail.html"
})
export class CustomDetailPage {
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
  latmarker: number;
  lngmarker: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public cameraPlugin: Camera,
    public profileProvider: ProfileProvider,
    public zone: NgZone
  ) {}


  ngAfterViewInit() {
    this.loadMap();
  }

  
  ionViewDidLoad() {
      this.eventProvider.getCustomDetail(this.navParams.get("eventId"))
        .on("value", eventSnapshot => {
          this.currentEvent = eventSnapshot.val();
          this.currentEvent.id = eventSnapshot.key;
        });

      this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
        this.currentUser = userProfileSnapshot.val();
        this.currentUser.id = userProfileSnapshot.key;
      });

      this.eventProvider.getCustomRecordList(
      this.navParams.get("eventId")).child(`${this.currentUser.id}`)
        .on('value', customRecordList =>
        {
            if(customRecordList.exists())
            {
              this.currentCustomRecord = customRecordList.val();
              this.currentCustomRecord.id = customRecordList.key;   ;      
            }
        });

      this.eventProvider.getCustomBookmarkList(
        this.navParams.get("eventId")).child(`${this.currentUser.id}`)
        .on('value', customBookmarkList =>
        {
          if (customBookmarkList.exists())
          {
            this.currentCustomBookmark = customBookmarkList.val();
            this.currentCustomBookmark.id = customBookmarkList.key;    
          }
       }); 

        Date.now = function now() {
          return new Date().getTime();
        }

      this.logoGame = `assets/game/logo/${this.currentEvent.game}.png`;
/*      
      this.firestore.ref().child(`game/${this.currentEvent.game}.png`).getDownloadURL().then((url) => {
        this.zone.run(() => {
        this.logoGame = url;
           })
      });
*/
}

//----------------------------------------------------//
//------------------- Confirm Event ------------------//
//----------------------------------------------------//

confirmCustomEvent(    
  eventId: string,
  confirmation: string
): void {
  this.eventProvider.confirmCustomEvent(
    eventId,
    confirmation
  );
}

cancelConfirmationCustomEvent(    
  eventId: string,
  confirmation: string
): void {
  this.eventProvider.cancelConfirmationCustomEvent(
    eventId,
    confirmation
  );
}

//----------------------------------------------------//
//------------------- Modify Event -------------------//
//----------------------------------------------------//

goToCustomModify(eventId): void {
  this.navCtrl.push('CustomModifyPage', { eventId: eventId });
  }

//----------------------------------------------------//
//------------------- Cancel Event -------------------//
//----------------------------------------------------//

cancelCustomEvent(
  eventId: string
): void {
  this.eventProvider.cancelCustomEvent(
      this.currentEvent.id
    );
}

goToCustomListPage(): void {
  this.navCtrl.push("CustomListPage");
}

//----------------------------------------------------//
//------------------- Event Bookmark -----------------//
//----------------------------------------------------//

  addEventBookmark(
    guestEmail: string,
    userUID: string
  ): void {
    this.eventProvider.addEventBookmark(
        guestEmail,
        this.currentEvent.id,
        this.currentUser.id
      );
  }

  addUserBookmark(
    eventId: string,
    eventName: string,
    eventDate: string,
    eventGame: string,
    eventVenue: string,
    eventCity: string,
    recordAt: string,
    status: string
  ): void {
    this.eventProvider.addUserBookmark(
        this.currentEvent.id,
        this.currentEvent.name,
        this.currentEvent.date, 
        this.currentEvent.game,
        this.currentEvent.venue,
        this.currentEvent.city,
        Date(),
        this.eventBookmarked
      )
      .then(newEvent => {
        this.navCtrl.pop();
      });
  } 

  deleteEventBookmark(
    userUID: string
  ): void {
    this.eventProvider.deleteEventBookmark(
        this.currentEvent.id,
        this.currentUser.id
      );
  }

//----------------------------------------------------//
//------------------- Event Record -------------------//
//----------------------------------------------------//

  addEventRecord(
    guestEmail: string,
    userUID: string
  ): void {
    this.eventProvider.addEventRecord(
        guestEmail,
        this.currentEvent.id,
        this.currentUser.id
      );
  }

  cancelEventRecord(
    userUID: string
  ): void {
    this.eventProvider.cancelEventRecord(
        this.currentEvent.id,
        this.currentUser.id
      );
  }

  addUserRecord(
    eventId: string,
    eventName: string,
    eventDate: string,
    eventGame: string,
    eventVenue: string,
    eventCity: string,
    recordAt: string,
    status: string
  ): void {
    this.eventProvider.addUserRecord(
        this.currentEvent.id,
        this.currentEvent.name,
        this.currentEvent.date, 
        this.currentEvent.game,
        this.currentEvent.venue,
        this.currentEvent.city,
        Date(),
        this.eventRecord
      )
      .then(newEvent => {
        this.navCtrl.pop();
      });
  } 


  cancelUserBookRecord(
    eventId: string,
  ): void {
    this.eventProvider.cancelUserBookRecord(
      this.currentEvent.id
    )
      .then(newEvent => {
        this.navCtrl.pop();
      });
  } 

//----------------------------------------------------//
//------------------- Google Maps --------------------//
//----------------------------------------------------//

  loadMap() {
    this.eventProvider.getCustomDetail(this.navParams.get("eventId"))
    .on("value", eventSnapshot => {
      this.currentEvent = eventSnapshot.val();
      this.currentEvent.id = eventSnapshot.key;
    });

    let element: HTMLElement = document.getElementById('map');
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.currentEvent.latitude,
          lng: this.currentEvent.longitude
        },
        zoom: 15,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create(element, mapOptions);
    
    let ionic: LatLng = new LatLng(this.currentEvent.latitude, this.currentEvent.longitude);

    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
          this.map.addMarker({
            position: ionic,
            title: this.currentEvent.name
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert(this.currentEvent.createBy);
              });
          });
          console.log('Map is ready!');
      });  
    } 
}

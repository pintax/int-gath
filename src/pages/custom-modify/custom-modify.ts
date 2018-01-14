import { Component, NgZone, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, 
          NavController, 
          NavParams,
          Alert,
          AlertController
         } from "ionic-angular";

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



@IonicPage()
@Component({
  selector: "page-custom-modify",
  templateUrl: "custom-modify.html"
})
export class CustomModifyPage {
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
    public zone: NgZone,
    public alertCtrl: AlertController,
  ) {}


  ionViewDidLoad() {
    this.eventProvider.getCustomDetail(this.navParams.get("eventId"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });

    this.profileProvider.getUserProfile()
      .on('value', userProfileSnapshot => {
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
    }

    updateCustomName(): void {
      const alert: Alert = this.alertCtrl.create({
        message: 'Name',
        inputs: [
          {
            name: 'name',
            placeholder: 'Name',
            value: this.currentEvent.name
          }
        ],
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Save',
            handler: data => {
              this.eventProvider.updateCustomName(this.currentEvent.id, data.name);
            }
          }
        ]
      });
      alert.present();
    }

    updateCustomCity(): void {
      const alert: Alert = this.alertCtrl.create({
        message: 'City',
        inputs: [
          {
            name: 'city',
            placeholder: 'City',
            value: this.currentEvent.city
          }
        ],
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Save',
            handler: data => {
              this.eventProvider.updateCustomCity(this.currentEvent.id, data.city);
            }
          }
        ]
      });
      alert.present();
    }

    updateCustomVenue(): void {
      const alert: Alert = this.alertCtrl.create({
        message: 'Address',
        inputs: [
          {
            name: 'address',
            placeholder: 'Address',
            value: this.currentEvent.venue
          }
        ],
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Save',
            handler: data => {
              this.eventProvider.updateCustomVenue(this.currentEvent.id, data.address);
            }
          }
        ]
      });
      alert.present();
    }


    updateCustomDescription(): void {
      const alert: Alert = this.alertCtrl.create({
        message: 'Description',
        inputs: [
          {
            name: 'description',
            placeholder: 'Description',
            value: this.currentEvent.description
          }
        ],
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Save',
            handler: data => {
              this.eventProvider.updateCustomDescription(this.currentEvent.id, data.description);
            }
          }
        ]
      });
      alert.present();
    }

    updateCustomSeats(): void {
      const alert: Alert = this.alertCtrl.create({
        message: 'Seats',
        inputs: [
          {
            name: 'seats',
            placeholder: 'Seats',
            type: 'number',
            value: this.currentEvent.seats
          }
        ],
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Save',
            handler: data => {
              this.eventProvider.updateCustomSeats(this.currentEvent.id, data.seats);
            }
          }
        ]
      });
      alert.present();
    }

    updateCustomDate(date: string): void {
      this.eventProvider.updateCustomDate(this.currentEvent.id, date);
    }

}
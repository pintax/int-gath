/*
import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from '../../providers/profile/profile';

import { Camera } from "@ionic-native/camera";

import firebase from 'firebase'; 

@IonicPage({
  segment: "event-detail/:eventId"
})
@Component({
  selector: "page-event-detail",
  templateUrl: "event-detail.html"
})
export class EventDetailPage {
  public currentEvent: any = {};
  public currentUser: any = {};
  public currentGuestConfirmID: any = {};
  public currentGuestConfirm: any = {};
  public guestEmail: string = "";
  public guestPicture: string = null;
  public userEmail: string;
  

  public logoGame: any;
  public game: string
  
  // Current Event
  public eventName: string;
  public eventDate: string;
  public eventGame: string;
  public eventVenue: string;
  public eventCity: string;
  
  public eventBookmarked: string = "bookmarked";
  public eventConfirmed: string = "confirmed";

  public firestore = firebase.storage(); 

  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public cameraPlugin: Camera,
    public profileProvider: ProfileProvider,
    public zone: NgZone
  ) {}


  ionViewDidLoad() {
      this.profileProvider.getUserProfile()
      .on('value', userProfileSnapshot => {
        this.currentUser = userProfileSnapshot.val();
        this.currentUser.id = userProfileSnapshot.key;
        this.userEmail = userProfileSnapshot.val().email;
      });

      this.eventProvider.getEventDetail(this.navParams.get("eventId"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });


      this.eventProvider.getGuestConfirmList(
        this.navParams.get("eventId")).child(`${this.currentUser.id}`)
      .on('value', guestConfirmSnapshot =>
      {
        if(guestConfirmSnapshot.exists())
        {
          this.currentGuestConfirm = guestConfirmSnapshot.val();
          this.currentGuestConfirm.id = guestConfirmSnapshot.key;
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

/*
}

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


  addEventConfirm(
    guestEmail: string,
    userUID: string
  ): void {
    this.eventProvider.addEventConfirm(
        guestEmail,
        this.currentEvent.id,
        this.currentUser.id
      );
  }

  addUserConfirm(
    eventId: string,
    eventName: string,
    eventDate: string,
    eventGame: string,
    eventVenue: string,
    eventCity: string,
    recordAt: string,
    status: string
  ): void {
    this.eventProvider.addUserConfirm(
        this.currentEvent.id,
        this.currentEvent.name,
        this.currentEvent.date, 
        this.currentEvent.game,
        this.currentEvent.venue,
        this.currentEvent.city,
        Date(),
        this.eventConfirmed
      )
      .then(newEvent => {
        this.navCtrl.pop();
      });
  } 


  /*
  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality: 95,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      })
      .then(
        imageData => {
          this.guestPicture = imageData;
        },
        error => {
          console.log("ERROR -> " + JSON.stringify(error));
        }
      );
  }
*/
/*

}

*/
